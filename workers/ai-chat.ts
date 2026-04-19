/**
 * Cloudflare Worker — прокси для AI-чата дашборда Crypto OS.
 *
 * Зачем: фронтенд не может держать API-ключ модели у себя. Этот воркер
 * принимает { system, messages } от фронта, подкладывает секретный ключ
 * из env и отправляет запрос в выбранный провайдер (Anthropic / Qwen /
 * Gemini). Отдаёт фронту { reply } или { error }.
 *
 * Деплой (после того как Di положит ключ):
 *   1) cd workers && npm i -g wrangler
 *   2) wrangler secret put AI_API_KEY    (выбрать провайдера в PROVIDER)
 *   3) wrangler deploy
 *   4) В репе установить VITE_AI_CHAT_URL на URL воркера
 *      (GitHub → Settings → Secrets and variables → Actions → repo secrets).
 *
 * Переключение провайдера — env.PROVIDER = "anthropic" | "qwen" | "gemini".
 */

export interface Env {
  AI_API_KEY: string;
  PROVIDER?: string; // anthropic | qwen | gemini
  MODEL?: string;    // напр. claude-haiku-4-5-20251001 или qwen-plus
  ALLOWED_ORIGIN?: string; // https://ciacademy.kz
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  system?: string;
  messages?: ChatMessage[];
}

const CORS = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
});

async function callAnthropic(env: Env, body: ChatRequest) {
  const model = env.MODEL ?? "claude-haiku-4-5-20251001";
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": env.AI_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 800,
      system: body.system ?? undefined,
      messages: (body.messages ?? []).map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  const data: any = await r.json();
  if (\!r.ok) return { error: data?.error?.message ?? `anthropic ${r.status}` };
  const reply = data?.content?.[0]?.text ?? "";
  return { reply };
}

async function callQwen(env: Env, body: ChatRequest) {
  // Dashscope OpenAI-совместимый эндпоинт
  const model = env.MODEL ?? "qwen-plus";
  const messages = [
    ...(body.system ? [{ role: "system", content: body.system }] : []),
    ...(body.messages ?? []),
  ];
  const r = await fetch(
    "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${env.AI_API_KEY}`,
      },
      body: JSON.stringify({ model, messages, max_tokens: 800 }),
    }
  );
  const data: any = await r.json();
  if (\!r.ok) return { error: data?.error?.message ?? `qwen ${r.status}` };
  const reply = data?.choices?.[0]?.message?.content ?? "";
  return { reply };
}

async function callGemini(env: Env, body: ChatRequest) {
  const model = env.MODEL ?? "gemini-2.0-flash";
  const contents = (body.messages ?? []).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.AI_API_KEY}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      systemInstruction: body.system ? { parts: [{ text: body.system }] } : undefined,
      contents,
    }),
  });
  const data: any = await r.json();
  if (\!r.ok) return { error: data?.error?.message ?? `gemini ${r.status}` };
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return { reply };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN ?? "*";
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS(origin) });
    }
    if (request.method \!== "POST") {
      return new Response("Method not allowed", { status: 405, headers: CORS(origin) });
    }

    let body: ChatRequest;
    try {
      body = (await request.json()) as ChatRequest;
    } catch {
      return new Response(JSON.stringify({ error: "invalid json" }), {
        status: 400,
        headers: { "content-type": "application/json", ...CORS(origin) },
      });
    }

    if (\!env.AI_API_KEY) {
      return new Response(JSON.stringify({ error: "AI_API_KEY not configured" }), {
        status: 500,
        headers: { "content-type": "application/json", ...CORS(origin) },
      });
    }

    const provider = (env.PROVIDER ?? "anthropic").toLowerCase();
    let result: { reply?: string; error?: string };
    if (provider === "qwen") result = await callQwen(env, body);
    else if (provider === "gemini") result = await callGemini(env, body);
    else result = await callAnthropic(env, body);

    const status = result.error ? 502 : 200;
    return new Response(JSON.stringify(result), {
      status,
      headers: { "content-type": "application/json", ...CORS(origin) },
    });
  },
};
