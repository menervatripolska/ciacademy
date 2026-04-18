import { useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { KeyRound, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidAccessCode, ACCESS_LS_KEY, ACCESS_CODE_LS_KEY } from "@/config/accessCodes";

interface CryptoGateDialogProps {
  children: ReactNode;
}

export function CryptoGateDialog({ children }: CryptoGateDialogProps) {
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const trimmed = code.trim().toUpperCase();

    try {
      // Пытаемся валидировать на сервере (если есть), иначе — локально.
      let valid = false;
      try {
        const res = await fetch("/api/validate-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: trimmed }),
        });
        if (res.ok) {
          const data = await res.json();
          valid = Boolean(data?.valid);
        } else {
          valid = isValidAccessCode(trimmed);
        }
      } catch {
        valid = isValidAccessCode(trimmed);
      }

      if (valid) {
        localStorage.setItem(ACCESS_LS_KEY, "granted");
        localStorage.setItem(ACCESS_CODE_LS_KEY, trimmed);
        setOpen(false);
        setCode("");
        setLocation("/dashboard");
      } else {
        setError("Код не подошёл. Проверь раскладку и регистр.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-md border-white/10 text-white"
        style={{
          background: "linear-gradient(180deg, rgba(12,14,36,0.96), rgba(6,8,22,0.96))",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
        }}
      >
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9945ff]/25 to-[#00d4aa]/25 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#00d4aa]" />
            </div>
            <DialogTitle className="text-2xl font-bold">Я криптан</DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            Вход в Crypto OS — личный дашборд ученика. Введи код из письма после оплаты
            или из твоего профиля в Telegram-боте @cicelectionbot.
          </DialogDescription>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          onSubmit={handleSubmit}
          className="space-y-4 mt-3"
        >
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">
              Код доступа
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                placeholder="OS-ALPHA-2026"
                className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00d4aa]/60"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || code.length < 3}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#9945ff] to-[#00d4aa] hover:opacity-90 text-white"
          >
            {loading ? "Проверяю…" : "Войти в Crypto OS"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-white/40 text-center leading-relaxed">
            Дашборд — демо-версия, не финсовет. Полный доступ открывается после оплаты курса.
          </p>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}

export default CryptoGateDialog;
