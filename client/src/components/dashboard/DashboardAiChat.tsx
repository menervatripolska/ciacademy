import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, X, Zap } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

// URL прокси-воркера. На прод вставляется через Vite env (VITE_AI_CHAT_URL),
// локально можно задать .env.local. Если пусто — показываем заглушку.
const AI_CHAT_URL = ((import.meta as any)?.env?.VITE_AI_CHAT_URL as string | undefined) ?? "";

const SYSTEM_HINT =
  "Ты ассистент Crypto OS. Отвечай кратко, строго по методологии курса: макрорежимы, DCA, BTC-доминация, ETH/BTC, монета недели/дня. Никаких финансовых советов — только образовательные объяснения. Если вопрос не про крипту/методологию — вежливо перенаправь.";

const STARTER_SUGGESTIONS = [
  "Что такое BTC-фаза рынка?",
  "Как работает DCA по монете недели?",
  "Когда ждать альтсезон?",
  "Почему Fear & Greed = страх — это хорошо?",
];

export function DashboardAiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Привет, я Нова — гид по Crypto OS. Разложу любую секцию: макрорежим, DCA, BTC-структура, монета недели. Спрашивай коротко — отвечу по делу.",
      timestamp: Date.now(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, sending]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      if (!AI_CHAT_URL) {
        await new Promise((r) => setTimeout(r, 400));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Чат почти подключён — API-ключ ещё вставляется в прокси. Как только пропишем, отвечу по методологии. А пока секции дашборда выше уже всё объясняют текстом.",
            timestamp: Date.now(),
          },
        ]);
        return;
      }

      const res = await fetch(AI_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_HINT,
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${errText}`);
      }

      const data = (await res.json()) as { reply?: string; error?: string };
      const reply = data.reply ?? data.error ?? "Пустой ответ от модели.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, timestamp: Date.now() },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "сеть";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Не дотянулся до модели (${msg}). Попробуй ещё раз через минуту.`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрыть AI-ассистента" : "Открыть AI-ассистента"}
        data-testid="button-ai-chat-toggle"
        className={
          "fixed z-[60] bottom-5 right-5 flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold shadow-lg transition " +
          (open
            ? "border-white/20 bg-black/70 text-white/80 backdrop-blur"
            : "border-[#00d4aa]/40 bg-gradient-to-br from-[#9945ff]/70 to-[#00d4aa]/70 text-white hover:scale-105")
        }
        style={
          open
            ? undefined
            : { boxShadow: "0 8px 30px rgba(0,212,170,0.35), 0 0 0 1px rgba(255,255,255,0.05)" }
        }
      >
        {open ? <X className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
        {open ? "Закрыть" : "Нова · AI-гид"}
      </button>

      {open ? (
        <div
          className="fixed z-[59] bottom-24 right-5 w-[min(400px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-8rem))] rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,12,24,0.96), rgba(8,10,20,0.96))",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
          }}
          data-testid="panel-ai-chat"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#9945ff]/60 to-[#00d4aa]/60">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">Нова · гид по Crypto OS</div>
                <div className="text-[11px] text-white/45">методология курса, без финсоветов</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  "max-w-[92%] rounded-xl px-3 py-2 leading-relaxed " +
                  (m.role === "user"
                    ? "ml-auto bg-[#3ba5ff]/15 border border-[#3ba5ff]/25 text-white"
                    : "mr-auto bg-white/5 border border-white/10 text-white/90")
                }
              >
                {m.content}
              </div>
            ))}
            {sending ? (
              <div className="mr-auto max-w-[92%] rounded-xl px-3 py-2 bg-white/5 border border-white/10 text-white/60 text-xs">
                печатает…
              </div>
            ) : null}
            {messages.length <= 1 && !sending ? (
              <div className="pt-2">
                <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">
                  Попробуй спросить
                </div>
                <div className="flex flex-wrap gap-2">
                  {STARTER_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/75 hover:border-white/25 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 bg-white/[0.02] px-3 py-3 flex items-end gap-2"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Спроси про секцию дашборда…"
              rows={1}
              disabled={sending}
              className="flex-1 resize-none rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#3ba5ff]/50 focus:outline-none max-h-28"
              data-testid="input-ai-chat"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-md bg-gradient-to-br from-[#9945ff] to-[#00d4aa] px-3 py-2 text-white disabled:opacity-40 disabled:cursor-not-allowed"
              data-testid="button-ai-chat-send"
              aria-label="Отправить"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default DashboardAiChat;
