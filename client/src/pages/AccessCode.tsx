import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Shield, Zap, BookOpen, Brain } from "lucide-react";
import { isValidAccessCode, ACCESS_LS_KEY, ACCESS_CODE_LS_KEY } from "@/config/accessCodes";


export default function AccessCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const trimmed = code.trim().toUpperCase();
      if (isValidAccessCode(trimmed)) {
        localStorage.setItem(ACCESS_LS_KEY, "granted");
        localStorage.setItem(ACCESS_CODE_LS_KEY, trimmed);
        setLocation("/dashboard");
      } else {
        setError("Неверный код доступа. Проверьте и попробуйте снова.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#06091a] text-white flex items-center justify-center p-4">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: i % 3 === 0 ? "#00d4aa" : i % 3 === 1 ? "#9945ff" : "#06b6d4",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 3 + 3 + "s",
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#00d4aa] to-[#9945ff] flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-white">Crypto </span>
            <span className="text-[#00d4aa]">OS</span>
          </h1>
          <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-body, Manrope, sans-serif)" }}>
            Введи свой персональный код доступа
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#0f1328]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            <label className="block text-gray-300 text-sm mb-2" style={{ fontFamily: "var(--font-body, Manrope, sans-serif)" }}>
              Код доступа из урока
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="CRYPTO-2026-XXX"
              className="w-full px-4 py-3 rounded-xl bg-[#0a0e27] border border-white/10 text-white text-lg tracking-wider text-center font-mono focus:outline-none focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa] transition-all placeholder:text-gray-600"
              autoFocus
            />

            {error && (
              <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || code.length < 5}
              className="w-full mt-6 py-3 rounded-xl font-bold text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #00d4aa, #9945ff)",
                color: "white",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Проверка...
                </span>
              ) : (
                "Войти в Crypto OS"
              )}
            </button>
          </form>

          {/* Features */}
          <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
            {[
              { icon: Brain, text: "AI-проводник 24/7" },
              { icon: Zap, text: "Макро и крипто-мультипликатор" },
              { icon: BookOpen, text: "Таблица активов и Watchlist" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                <Icon className="w-4 h-4 text-[#00d4aa]" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back to landing */}
        <p className="text-center mt-6 text-gray-500 text-sm">
          <a href="/" className="hover:text-gray-300 transition-colors">
            ← На главную
          </a>
        </p>
      </motion.div>
    </div>
  );
}
