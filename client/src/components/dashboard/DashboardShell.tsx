import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Layers,
  LogOut,
  Activity,
  Clock,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { ACCESS_LS_KEY, ACCESS_CODE_LS_KEY } from "@/config/accessCodes";
import { useDashboardLiveData } from "@/hooks/useDashboardLiveData";
import { DashboardAiChat } from "@/components/dashboard/DashboardAiChat";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [, setLocation] = useLocation();
  const [now, setNow] = useState<Date>(new Date());
  const [granted, setGranted] = useState<boolean | null>(null);
  const live = useDashboardLiveData();

  // Гейт доступа
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ok = localStorage.getItem(ACCESS_LS_KEY) === "granted";
    setGranted(ok);
    if (!ok) setLocation("/access");
  }, [setLocation]);

  // Часы
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const logout = () => {
    localStorage.removeItem(ACCESS_LS_KEY);
    localStorage.removeItem(ACCESS_CODE_LS_KEY);
    setLocation("/");
  };

  if (granted === false) {
    return null;
  }

  const timeStr = now.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateStr = now.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen text-white" style={{ background: "radial-gradient(1200px 800px at 30% 10%, rgba(153,69,255,0.10), transparent 60%), radial-gradient(900px 700px at 90% 20%, rgba(0,212,170,0.07), transparent 60%), #05070f" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-white/5"
        style={{
          background: "linear-gradient(180deg, rgba(8,10,24,0.85), rgba(8,10,24,0.70))",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#9945ff]/40 to-[#00d4aa]/40 border border-white/10">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight">Crypto OS</div>
              <div className="text-[11px] text-white/50 uppercase tracking-wider">
                CI Academy · dashboard
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-4 h-4" />
              <span className="tabular-nums">{timeStr}</span>
              <span className="text-white/30">·</span>
              <span>{dateStr}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
              <span className="text-white/70">Срез: {live.snapshotLabel}</span>
            </div>
          </div>

          <button
            onClick={logout}
            className="text-sm text-white/60 hover:text-white flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </header>

      {/* Banner */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl p-4 sm:p-5 border border-white/10 flex items-start gap-3"
          style={{
            background:
              "linear-gradient(90deg, rgba(153,69,255,0.10), rgba(6,182,212,0.08), rgba(0,212,170,0.12))",
          }}
        >
          <Sparkles className="w-5 h-5 text-[#00d4aa] mt-0.5" />
          <div className="text-sm text-white/80 leading-relaxed">
            <span className="text-white font-semibold">Crypto OS — это операционка для криптана.</span>{" "}
            Не торговый терминал, не сигналы. Система, которая каждый день отвечает на{" "}
            <span className="text-white">три вопроса</span>: какой сейчас рынок, что с этим делать,
            и как это делать без эмоций. Данные — публичные источники
            (CoinGecko, FRED, mempool, LunarCrush). Всё, что видишь ниже, — не финсовет.
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-10">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/45">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>
              Демо-дашборд курса CI Academy. Не является индивидуальной инвестиционной рекомендацией.
              Учись, но решения принимай сам.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Activity className="w-3 h-3" />
            <span>Срез данных: {live.snapshotDate}</span>
            <span>·</span>
            <span>© CI Academy, 2026</span>
          </div>
        </div>
      </footer>
      <DashboardAiChat />
    </div>
  );
}

export default DashboardShell;
