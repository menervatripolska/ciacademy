/**
 * Cloudflare Worker â Ð¿ÑÐ¾ÐºÑÐ¸ Ð´Ð»Ñ AI-ÑÐ°ÑÐ° Ð´Ð°ÑÐ±Ð¾ÑÐ´Ð° Crypto OS.
 *
 * ÐÐ°ÑÐµÐ¼: ÑÑÐ¾Ð½ÑÐµÐ½Ð´ Ð½Ðµ Ð¼Ð¾Ð¶ÐµÑ Ð´ÐµÑÐ¶Ð°ÑÑ API-ÐºÐ»ÑÑ Ð¼Ð¾Ð´ÐµÐ»Ð¸ Ñ ÑÐµÐ±Ñ. Ð­ÑÐ¾Ñ Ð²Ð¾ÑÐºÐµÑ
 * Ð¿ÑÐ¸Ð½Ð¸Ð¼Ð°ÐµÑ { system, messages } Ð¾Ñ ÑÑÐ¾Ð½ÑÐ°, Ð¿Ð¾Ð´ÐºÐ»Ð°Ð´ÑÐ²Ð°ÐµÑ ÑÐµÐºÑÐµÑÐ½ÑÐ¹ ÐºÐ»ÑÑ
 * Ð¸Ð· env Ð¸ Ð¾ÑÐ¿ÑÐ°Ð²Ð»ÑÐµÑ Ð·Ð°Ð¿ÑÐ¾Ñ Ð² Ð²ÑÐ±ÑÐ°Ð½Ð½ÑÐ¹ Ð¿ÑÐ¾Ð²Ð°Ð¹Ð´ÐµÑ (Anthropic / Qwen /
 * Gemini). ÐÑÐ´Ð°ÑÑ ÑÑÐ¾Ð½ÑÑ { reply } Ð¸Ð»Ð¸ { error }.
 *
 * ÐÐµÐ¿Ð»Ð¾Ð¹ (Ð¿Ð¾ÑÐ»Ðµ ÑÐ¾Ð³Ð¾ ÐºÐ°Ðº Di Ð¿Ð¾Ð»Ð¾Ð¶Ð¸Ñ ÐºÐ»ÑÑ):
 *   1) cd workers && npm i -g wrangler
 *   2) wrangler secret put AI_API_KEY    (Ð²ÑÐ±ÑÐ°ÑÑ Ð¿ÑÐ¾Ð²Ð°Ð¹Ð´ÐµÑÐ° Ð² PROVIDER)
 *   3) wrangler deploy
 *   4) Ð ÑÐµÐ¿Ðµ ÑÑÑÐ°Ð½Ð¾Ð²Ð¸ÑÑ VITE_AI_CHAT_URL Ð½Ð° URL Ð²Ð¾ÑÐºÐµÑÐ°
 *      (GitHub â Settings â Secrets and variables â Actions â repo secrets).
 *
 * ÐÐµÑÐµÐºÐ»ÑÑÐµÐ½Ð¸Ðµ Ð¿ÑÐ¾Ð²Ð°Ð¹Ð´ÐµÑÐ° â env.PROVIDER = "anthropic" | "qwen" | "gemini".
 */

export interface Env {
  AI_API_KEY: string;
  PROVIDER?: string; // anthropic | qwen | gemini
  MODEL?: string;    // Ð½Ð°Ð¿Ñ. claude-haiku-4-5-20251001 Ð¸Ð»Ð¸ qwen-plus
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
  if (!r.ok) return { error: data?.error?.message ?? `anthropic ${r.status}` };
  const reply = data?.content?.[0]?.text ?? "";
  return { reply };
}

async function callQwen(env: Env, body: ChatRequest) {
  // Dashscope OpenAI-ÑÐ¾Ð²Ð¼ÐµÑÑÐ¸Ð¼ÑÐ¹ ÑÐ½Ð´Ð¿Ð¾Ð¸Ð½Ñ
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
  if (!r.ok) return { error: data?.error?.message ?? `qwen ${r.status}` };
  const reply = data?.choices?.[0]?.message?.content ?? "";
  return { reply };
}

async function callGemini(env: Env, body: ChatRequest) {
  const model = env.MODEL ?? "gemini-2.5-flash";
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
      generationConfig: { temperature: 0.6, maxOutputTokens: 800, topP: 0.9 },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
      ],
    }),
  });
  const data: any = await r.json();
  if (!r.ok) return { error: data?.error?.message ?? `gemini ${r.status}` };
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return { reply };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN ?? "*";
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS(origin) });
    }
    if (request.method !== "POST") {
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

    if (!env.AI_API_KEY) {
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
