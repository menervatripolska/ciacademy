/*
 * Design: «Neon Fortress» — Cinematic Neon Realism
 * Course: «Я — Криптан + твоя личная Crypto OS» (CI Academy)
 * Colors: Deep cosmic black, neon green (#00d4aa), electric purple (#9945ff), cyan (#06b6d4), gold (#f59e0b)
 * Typography: Rajdhani (display) + Manrope (body)
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Shield, ShieldCheck, Zap, BookOpen, Bot, BarChart3, CheckSquare, CheckCircle2,
  GraduationCap, Users, MessageCircle, Brain, Eye, ListChecks,
  ChevronDown, Clock, Play, Sparkles, TrendingUp, FileText, Award,
  Gauge, Calendar, Info, Menu, X,
  Coins, Compass, Layers, PieChart, Activity, Target, LineChart,
  Rocket, Repeat, ArrowRight, XCircle,
} from "lucide-react";

const COURSE_URL = "https://courstore.kz/";
const OLD_PRICE = "$1000";
const NEW_PRICE = "$39";
const SAVINGS = "$961";

// CDN URLs (герои летают — не трогаем)
const IMAGES = {
  heroAcademy: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663277282118/nztUJviYHysCLjpd.png",
  heroBoy: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663277282118/mcnaQpHSLpBDnqTc.png",
  heroGirl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663277282118/ytWuiWcrrzSwqcLB.png",
  tools: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663277282118/nrfbErrJdKNURVbn.png",
  modulesBg: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663277282118/YITCvQoFYReYOrrD.png",
  aiCurator: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663277282118/nxNLTJnbxUbcyaRS.png",
  neonHogwarts: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663277282118/OpPcZquiokZacskq.png",
  origBoy: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663277282118/CqQUhWACrRelfaaV.png",
  origGirl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663277282118/IWQQdxNNCrDMHqaE.png",
};

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse-glow"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            background: i % 3 === 0 ? "#00d4aa" : i % 3 === 1 ? "#9945ff" : "#06b6d4",
            animationDelay: Math.random() * 5 + "s",
            animationDuration: Math.random() * 3 + 3 + "s",
          }}
        />
      ))}
    </div>
  );
}

// ============ Small reusable price-tag ============
function PriceTag({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  if (size === "lg") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-end justify-center gap-3">
          <span className="text-2xl sm:text-3xl text-white/50 line-through decoration-red-500/70 decoration-2">{OLD_PRICE}</span>
          <span className="text-6xl sm:text-7xl md:text-8xl font-bold gradient-text leading-none">{NEW_PRICE}</span>
        </div>
        <div className="text-xs sm:text-sm uppercase tracking-wider text-[#00d4aa]" style={{ fontFamily: "var(--font-body)" }}>
          Специальная цена запуска · экономия {SAVINGS}
        </div>
      </div>
    );
  }
  if (size === "md") {
    return (
      <div className="flex items-end justify-center gap-2">
        <span className="text-lg text-white/50 line-through decoration-red-500/70 decoration-2">{OLD_PRICE}</span>
        <span className="text-3xl font-bold gradient-text leading-none">{NEW_PRICE}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-sm" style={{ fontFamily: "var(--font-body)" }}>
      <span className="text-white/50 line-through decoration-red-500/70">{OLD_PRICE}</span>
      <span className="font-bold text-[#00d4aa]">{NEW_PRICE}</span>
    </div>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroAcademy}
          alt="Crypto OS Academy"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06091a]/70 via-[#06091a]/50 to-[#06091a]" />
      </div>
      <FloatingParticles />

      <div className="container relative z-10 pt-28 pb-16">
        {/* MOBILE / TABLET: flying heroes stacked over text */}
        <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
          <div className="animate-fly-left shrink-0">
            <img
              src={IMAGES.heroGirl}
              alt=""
              loading="lazy"
              className="w-24 sm:w-32 h-auto object-contain"
            />
          </div>
          <div className="animate-fly-right shrink-0">
            <img
              src={IMAGES.heroBoy}
              alt=""
              loading="lazy"
              className="w-24 sm:w-32 h-auto object-contain"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Eyebrow: academy brand */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border-green bg-[#00d4aa]/5 mb-6">
              <Sparkles className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-xs sm:text-sm font-medium text-[#00d4aa]" style={{ fontFamily: "var(--font-body)" }}>
                Crypto Intelligence
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 tracking-tight">
              <span className="gradient-text">«Я — Криптан»</span>
              <span className="text-white"> — это твоя личная Crypto OS</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Восемь уроков, после которых ты один раз настраиваешь систему — и годами пользуешься. Макро- и крипто-мультипликаторы собирают картину рынка автоматически: тебе не нужно каждый день сидеть в каналах и сравнивать скриншоты. Дашборд сам выдаёт кандидатов для твоего watchlist по чек-листу, боты сами покупают по методике DCA, AI-ассистент отвечает на вопросы по курсу 24/7. Ты просто смотришь и решаешь — да или нет.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
              <a
                href={COURSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button px-6 sm:px-8 py-4 rounded-xl text-base sm:text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Play className="w-5 h-5" />
                Получить курс — {NEW_PRICE}
              </a>
              <PriceTag size="sm" />
            </div>

            <div className="flex items-center gap-2 text-gray-400 mb-6">
              <Clock className="w-4 h-4" />
              <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>Доступ навсегда</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00d4aa]" />
                <span>Образовательный курс</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#f59e0b]" />
                <span>Макро- и крипто-мультипликаторы</span>
              </div>
            </div>
          </motion.div>

          {/* Right (desktop only): Characters flying side-by-side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center items-center h-[600px]"
          >
            <div className="absolute right-[-20px] top-[30px] animate-fly-right">
              <img
                src={IMAGES.heroBoy}
                alt=""
                className="h-[420px] object-contain"
              />
            </div>
            <div className="absolute left-[-10px] top-[60px] animate-fly-left">
              <img
                src={IMAGES.heroGirl}
                alt=""
                className="h-[400px] object-contain"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-[#00d4aa]/60" />
        </motion.div>
      </div>
    </section>
  );
}

// ============ POSITIONING SECTION ============
function PositioningSection() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />
      <FloatingParticles />
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center leading-[1.1] tracking-tight">
              <span className="text-white">Зачем </span>
              <span className="gradient-text">Я — Криптан + Crypto OS</span>
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              {/* 1. Pain */}
              <div className="relative p-6 sm:p-7 rounded-2xl bg-[#0f1328]/60 border border-white/10 overflow-hidden">
                <div className="absolute top-3 right-3 opacity-30">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <path d="M8 40 L 18 30 L 28 36 L 40 20 L 50 26" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="50" cy="26" r="3" fill="#ff6b6b" />
                    <circle cx="18" cy="30" r="2" fill="#ff6b6b" opacity="0.6" />
                    <circle cx="28" cy="36" r="2" fill="#ff6b6b" opacity="0.6" />
                    <path d="M6 48 L 52 48" stroke="#ff6b6b" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-2 mb-3 px-2 py-1 rounded-md bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 text-[10px] uppercase tracking-wider text-[#ff6b6b]">
                  <XCircle className="w-3 h-3" /> Сейчас
                </div>
                <p className="text-base sm:text-lg">
                  Ты знаешь, что крипта — это возможность, но времени сидеть в каналах и разбираться в токеномике у тебя нет. Читаешь чужие сигналы, покупаешь на эмоциях, потом жалеешь. Хочется системы, а не гадания.
                </p>
              </div>

              {/* 2. Method */}
              <div className="relative p-6 sm:p-7 rounded-2xl bg-[#0f1328]/60 border border-[#00d4aa]/20 overflow-hidden">
                <div className="absolute top-3 right-3 opacity-50">
                  <svg width="60" height="56" viewBox="0 0 60 56" fill="none">
                    <defs>
                      <linearGradient id="pgg" x1="0" x2="1">
                        <stop offset="0%" stopColor="#00d4aa" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <path d="M8 44 A 22 22 0 0 1 52 44" fill="none" stroke="#1a2040" strokeWidth="5" strokeLinecap="round" />
                    <path d="M8 44 A 22 22 0 0 1 52 44" fill="none" stroke="url(#pgg)" strokeWidth="5" strokeLinecap="round" strokeDasharray="70" strokeDashoffset="20" />
                    <circle cx="30" cy="44" r="2" fill="#00d4aa" />
                    <line x1="30" y1="44" x2="44" y2="28" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" />
                    <text x="30" y="52" textAnchor="middle" fill="#00d4aa" fontSize="7" fontWeight="700">BUY-ZONE</text>
                  </svg>
                </div>
                <div className="inline-flex items-center gap-2 mb-3 px-2 py-1 rounded-md bg-[#00d4aa]/10 border border-[#00d4aa]/20 text-[10px] uppercase tracking-wider text-[#00d4aa]">
                  <Gauge className="w-3 h-3" /> Методика
                </div>
                <p className="text-base sm:text-lg">
                  «Я — Криптан + твоя личная Crypto OS» — это рабочая методика и готовая инфраструктура в одном месте. Восемь уроков учат читать рынок через макро- и крипто-мультипликаторы: ты видишь, в какой фазе мы сейчас, и какой режим сейчас актуален — накапливать, удерживать, снижать позицию или ждать. Дашборд по этой системе сам отбирает монеты по чек-листу токеномики и выдаёт их тебе как кандидатов для изучения.
                </p>
              </div>

              {/* 3. Result */}
              <div className="relative p-6 sm:p-7 rounded-2xl bg-[#0f1328]/60 border border-[#9945ff]/20 overflow-hidden">
                <div className="absolute top-3 right-3 opacity-60">
                  <svg width="64" height="56" viewBox="0 0 64 56" fill="none">
                    <rect x="4" y="12" width="22" height="14" rx="3" fill="#9945ff" opacity="0.15" stroke="#9945ff" strokeWidth="1" />
                    <rect x="30" y="12" width="14" height="14" rx="3" fill="#06b6d4" opacity="0.15" stroke="#06b6d4" strokeWidth="1" />
                    <rect x="48" y="12" width="14" height="14" rx="3" fill="#00d4aa" opacity="0.15" stroke="#00d4aa" strokeWidth="1" />
                    <rect x="4" y="30" width="14" height="14" rx="3" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
                    <rect x="22" y="30" width="22" height="14" rx="3" fill="#9945ff" opacity="0.15" stroke="#9945ff" strokeWidth="1" />
                    <rect x="48" y="30" width="14" height="14" rx="3" fill="#06b6d4" opacity="0.15" stroke="#06b6d4" strokeWidth="1" />
                    <circle cx="12" cy="19" r="1.5" fill="#9945ff" />
                    <circle cx="37" cy="19" r="1.5" fill="#06b6d4" />
                    <circle cx="55" cy="19" r="1.5" fill="#00d4aa" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-2 mb-3 px-2 py-1 rounded-md bg-[#9945ff]/10 border border-[#9945ff]/20 text-[10px] uppercase tracking-wider text-[#9945ff]">
                  <Layers className="w-3 h-3" /> Результат
                </div>
                <p className="text-base sm:text-lg">
                  После курса у тебя настроенный рабочий стол с мультипликаторами, watchlist, DCA-ботами и AI-ассистентом с базой знаний курса. Раз в неделю — живой созвон с преподавателями, в чате — закрытое комьюнити учеников. Основную работу делает система. Ты смотришь на её выводы и принимаешь решение — брать или пропустить.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ AUTHOR SECTION ============
function AuthorSection() {
  const stats = [
    { num: "8", suffix: " лет", label: "на крипторынке" },
    { num: "2000+", suffix: "", label: "учеников обучила лично" },
    { num: "8", suffix: "", label: "уроков в курсе" },
    { num: "9", suffix: "", label: "рабочих шаблонов" },
  ];
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0f2a] to-[#06091a]" />
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 items-center">
            <div className="lg:col-span-2">
              {/* Author portrait + live loop */}
              <div className="relative mb-6">
                <div className="relative inline-block">
                  {/* Glow ring behind portrait */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#00d4aa]/60 via-[#06b6d4]/40 to-[#9945ff]/60 blur-xl opacity-70" />
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden ring-2 ring-white/10 shadow-[0_0_60px_rgba(0,212,170,0.3)]">
                    <img
                      src="/author/di_portrait_800.jpg"
                      alt="Di — автор методики Crypto OS"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#06091a]/30 via-transparent to-transparent" />
                  </div>
                  <span className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full bg-[#0f1328] border border-[#00d4aa]/60 text-[11px] font-bold text-[#00d4aa] uppercase shadow-[0_0_20px_rgba(0,212,170,0.4)]" style={{ fontFamily: "var(--font-body)" }}>
                    8 лет на рынке
                  </span>
                </div>

                <div className="mt-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neon-border-purple bg-[#9945ff]/5 mb-2">
                    <Sparkles className="w-3 h-3 text-[#9945ff]" />
                    <span className="text-xs font-medium text-[#9945ff]" style={{ fontFamily: "var(--font-body)" }}>Автор методики</span>
                  </div>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "var(--font-body)" }}>Методика проверена 8 лет на живом рынке</p>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-[1.1] tracking-tight">
                <span className="text-white">Методика, собранная </span>
                <span className="gradient-text">за 8 лет практики</span>
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="p-4 sm:p-5 rounded-xl bg-[#0f1328]/70 border border-[#00d4aa]/20 backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      {s.num}<span className="text-base sm:text-lg text-[#00d4aa]">{s.suffix}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400" style={{ fontFamily: "var(--font-body)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <p className="text-lg sm:text-xl text-white">
                За 8 лет я прошла рынок во всех его фазах и <span className="text-[#00d4aa] font-semibold">обучила более 2000 человек лично</span>.
              </p>
              <p className="text-base">
                «Я — Криптан + твоя личная Crypto OS» — это выжимка того, что реально работает в долгую: макро-фундамент, чтение фаз рынка через мультипликаторы, отбор активов по токеномике, DCA-распределение и правила удержания позиций.
              </p>
              <p className="text-base text-gray-400">
                Методика построена на спот-подходе. Курс — образовательный продукт, решения о покупке активов ученик принимает самостоятельно.
              </p>

              {/* Live accent — subtle looping moment, подписей нет, "внутрь уроков" не лезем */}
              <div className="relative mt-2 rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] max-w-md shadow-[0_0_40px_rgba(0,212,170,0.15)]">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/author/di_loop_6s.mp4"
                  poster="/author/di_loop_poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#06091a]/50 via-transparent to-[#06091a]/20 pointer-events-none" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider text-[#00d4aa] font-semibold" style={{ fontFamily: "var(--font-body)" }}>Live</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f1328]/80 border border-[#00d4aa]/30 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-[#00d4aa]" />
                  <span>Спот-подход</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f1328]/80 border border-[#9945ff]/30 text-sm text-gray-300">
                  <Brain className="w-4 h-4 text-[#9945ff]" />
                  <span>Система по чек-листам</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f1328]/80 border border-[#00d4aa]/30 text-sm text-gray-300">
                  <TrendingUp className="w-4 h-4 text-[#00d4aa]" />
                  <span>Образовательный курс</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ MODULES SECTION ============
function ModulesSection() {
  const modules = [
    { num: "01", title: "Деньги, инфляция и макроцикл", artifact: "Macro Multiplier", desc: "Как устроены деньги, почему банки расширяют массу кредитом и как ставка ЦБ двигает ликвидность. Макро как фундамент всех решений по активам.", color: "#00d4aa", Icon: Coins, bg: "/courseware/03_inflation.jpg" },
    { num: "02", title: "Три оси индустрии: BTC, ETH, SOL", artifact: "Asset Roles Map", desc: "Зачем появились крипта и блокчейн. BTC как ценность, ETH как инфраструктура, SOL как скорость. Базовый словарь индустрии.", color: "#9945ff", Icon: Compass, bg: "/courseware/07_blockchain.jpg" },
    { num: "03", title: "Фазы рынка и крипто-мультипликатор", artifact: "Crypto Multiplier", desc: "Индикаторы среды в одном дашборде: настроение рынка, доминация BTC, соотношение ETH/BTC, ончейн-сигналы, циклические уровни.", color: "#06b6d4", Icon: Gauge, bg: "/courseware/08_halving.jpg" },
    { num: "04", title: "Как не стать орангутангом", artifact: "Anti-Hamster Filter", desc: "FOMO, культ гуру, ошибка выжившего, плечо. Почему капитал разрушается не рынком, а психикой. Личный список запретов и триггеров срыва.", color: "#ff6b6b", Icon: Shield, bg: "/courseware/01_packaging.jpg" },
    { num: "05", title: "Отбор проектов: секторы и red flags", artifact: "Asset Checklists + Watchlist", desc: "Карта крипторынка по секторам (L1, L2, DeFi, RWA, DePIN, AI, инфра), 8 red flags, чек-лист разбора токена, правила формирования watchlist.", color: "#f59e0b", Icon: Layers, bg: "/courseware/09_ethereum.jpg" },
    { num: "06", title: "Распределение капитала: DCA и ребалансировка", artifact: "Portfolio Map", desc: "Портфель, разложенный по функциям: индексный слой, защитные активы, BTC/ETH/SOL, фавориты, кандидат недели. Ритм DCA и ребалансировки.", color: "#00d4aa", Icon: PieChart, bg: "/courseware/02_functions.jpg" },
    { num: "07", title: "Сигналы рынка и признаки разворота", artifact: "Signal Map", desc: "Слои подтверждения: скользящие средние, RSI, свечи, уровни, ложные пробои, структура тренда. Чек-лист разворота вверх и вниз.", color: "#9945ff", Icon: Activity, bg: "/courseware/06_real_rate.jpg" },
    { num: "08", title: "Финальная сборка Crypto OS", artifact: "Finale OS", desc: "Интеграция всех слоёв в одну систему. Карта треков продолжения. Правило дисциплины вместо плеча.", color: "#06b6d4", Icon: CheckCircle2, bg: "/courseware/04_bank_node.jpg" },
  ];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.modulesBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[#06091a]/80" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">8 уроков, </span>
              <span className="gradient-text">9 шаблонов</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Курс ведёт от макро-фундамента до собранной системы. Каждый урок оставляет у тебя рабочий шаблон-артефакт, с которым ты работаешь дальше.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {modules.map((m, i) => {
            const Ico = m.Icon;
            return (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div
                  className="relative rounded-2xl bg-[#0f1328]/70 backdrop-blur-sm border border-white/5 hover:border-white/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,212,170,0.15)] transition-all duration-500 group h-full overflow-hidden flex flex-col"
                >
                  {/* Top visual — инфографика в фоне, без подписей, декоративно */}
                  <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                    <img
                      src={m.bg}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-80 group-hover:scale-[1.06] transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#06091a]/35 via-[#0f1328]/55 to-[#0f1328]" />
                    <div
                      className="absolute inset-0 mix-blend-overlay pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${m.color}33, transparent 60%)` }}
                    />
                    <span
                      className="absolute top-3 left-3 text-3xl sm:text-4xl font-bold"
                      style={{ color: m.color, textShadow: "0 2px 20px rgba(6,9,26,0.8)", fontFamily: "var(--font-display)" }}
                    >
                      {m.num}
                    </span>
                    <div
                      className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      style={{ background: m.color + "25", color: m.color, border: `1px solid ${m.color}55` }}
                    >
                      <Ico className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <div
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: m.color + "15", color: m.color, fontFamily: "var(--font-body)" }}
                      >
                        {m.artifact}
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">{m.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{m.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ ARCHITECTURE SECTION — mini dashboards ============

// Mini dashboard 1: Multipliers (gauge + phase)
function MultiplierMini() {
  return (
    <div className="relative w-full h-full min-h-[140px] p-3 rounded-xl bg-[#06091a]/80 border border-[#00d4aa]/25 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,212,170,0.15),transparent_60%)]" />
      <div className="relative flex items-center gap-3 h-full">
        {/* Semicircle gauge */}
        <svg viewBox="0 0 100 60" className="w-20 h-12 shrink-0">
          <defs>
            <linearGradient id="gg" x1="0" x2="1">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#00d4aa" />
            </linearGradient>
          </defs>
          <path d="M10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1a2040" strokeWidth="8" strokeLinecap="round" />
          <path d="M10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#gg)" strokeWidth="8" strokeLinecap="round" strokeDasharray="125" strokeDashoffset="35" />
          <circle cx="72" cy="22" r="3.5" fill="#00d4aa" />
          <line x1="50" y1="50" x2="72" y2="22" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-medium">
            <span className="text-gray-400" style={{ fontFamily: "var(--font-body)" }}>Макро-фаза</span>
            <span className="px-1.5 py-0.5 rounded bg-[#00d4aa]/15 text-[#00d4aa] uppercase tracking-wider">HOLD</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-medium">
            <span className="text-gray-400" style={{ fontFamily: "var(--font-body)" }}>Крипто-цикл</span>
            <span className="px-1.5 py-0.5 rounded bg-[#06b6d4]/15 text-[#06b6d4] uppercase tracking-wider">BUY-ZONE</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-medium">
            <span className="text-gray-400" style={{ fontFamily: "var(--font-body)" }}>BTC dom.</span>
            <span className="text-white">54.2%</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-medium">
            <span className="text-gray-400" style={{ fontFamily: "var(--font-body)" }}>ETH/BTC</span>
            <span className="text-[#00d4aa]">▲ 0.047</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini dashboard 2: Watchlist
function WatchlistMini() {
  const rows = [
    { sym: "SOL",  status: "approved", color: "#00d4aa" },
    { sym: "LINK", status: "watch",    color: "#f59e0b" },
    { sym: "TAO",  status: "approved", color: "#00d4aa" },
    { sym: "APT",  status: "reject",   color: "#ff6b6b" },
  ];
  return (
    <div className="relative w-full h-full min-h-[140px] p-3 rounded-xl bg-[#06091a]/80 border border-[#06b6d4]/25 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.12),transparent_60%)]" />
      <div className="relative">
        <div className="flex items-center justify-between text-[10px] font-medium mb-2">
          <span className="text-gray-400 flex items-center gap-1" style={{ fontFamily: "var(--font-body)" }}>
            <ListChecks className="w-3 h-3 text-[#06b6d4]" /> Watchlist
          </span>
          <span className="text-[9px] text-gray-500">checklist 9/12</span>
        </div>
        <div className="space-y-1">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center justify-between py-1 px-2 rounded-md bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: r.color + "25", color: r.color }}>
                  {r.sym[0]}
                </div>
                <span className="text-[11px] font-semibold text-white">{r.sym}</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: r.color + "15", color: r.color }}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mini dashboard 3: DCA bots + indicators
function DCAMini() {
  return (
    <div className="relative w-full h-full min-h-[140px] p-3 rounded-xl bg-[#06091a]/80 border border-[#f59e0b]/25 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(245,158,11,0.12),transparent_60%)]" />
      <div className="relative flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1 text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
            <Bot className="w-3 h-3 text-[#f59e0b]" /> DCA · авто-закуп
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse" />
            <span className="text-[#00d4aa] text-[9px]">RUNNING</span>
          </span>
        </div>
        {/* Mini sparkline + dots */}
        <svg viewBox="0 0 200 50" className="w-full h-12">
          <defs>
            <linearGradient id="dcag" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 40 Q 30 30 50 32 T 100 25 T 150 18 T 200 12 L 200 50 L 0 50 Z" fill="url(#dcag)" />
          <path d="M0 40 Q 30 30 50 32 T 100 25 T 150 18 T 200 12" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          {[0, 40, 80, 120, 160, 195].map((x, i) => (
            <circle key={i} cx={x} cy={[40, 32, 28, 22, 16, 12][i]} r="2.5" fill="#f59e0b" />
          ))}
        </svg>
        <div className="grid grid-cols-3 gap-1 text-center">
          <div className="py-1 rounded bg-[#00d4aa]/10 border border-[#00d4aa]/20">
            <div className="text-[8px] uppercase text-[#00d4aa] tracking-wider">вход</div>
          </div>
          <div className="py-1 rounded bg-[#06b6d4]/10 border border-[#06b6d4]/20">
            <div className="text-[8px] uppercase text-[#06b6d4] tracking-wider">удержание</div>
          </div>
          <div className="py-1 rounded bg-white/5 border border-white/10">
            <div className="text-[8px] uppercase text-gray-500 tracking-wider">пауза</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini dashboard 4: AI chat + community
function AIChatMini() {
  return (
    <div className="relative w-full h-full min-h-[140px] p-3 rounded-xl bg-[#06091a]/80 border border-[#9945ff]/25 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(153,69,255,0.15),transparent_60%)]" />
      <div className="relative flex flex-col gap-1.5 h-full text-[10px]" style={{ fontFamily: "var(--font-body)" }}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-gray-400">
            <Brain className="w-3 h-3 text-[#9945ff]" /> AI-ассистент
          </span>
          <span className="flex items-center gap-1 text-[#00d4aa] text-[9px]">
            <Calendar className="w-2.5 h-2.5" /> созвон чт 20:00
          </span>
        </div>
        {/* User question */}
        <div className="self-end max-w-[80%] px-2 py-1 rounded-lg rounded-br-sm bg-[#06b6d4]/20 border border-[#06b6d4]/30 text-white text-[10px]">
          как выбрать L1 под watchlist?
        </div>
        {/* AI answer */}
        <div className="self-start max-w-[85%] px-2 py-1 rounded-lg rounded-bl-sm bg-[#9945ff]/15 border border-[#9945ff]/30 text-gray-200 text-[10px]">
          Смотри чек-лист токеномики из Урока 5: unlocks, команда, TVL…
        </div>
        {/* Community avatars */}
        <div className="flex items-center gap-1 mt-auto pt-1">
          <div className="flex -space-x-2">
            {["#00d4aa", "#06b6d4", "#9945ff", "#f59e0b"].map((c, i) => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-[#06091a]" style={{ background: c + "50" }} />
            ))}
          </div>
          <span className="text-[9px] text-gray-500">комьюнити учеников в Telegram</span>
        </div>
      </div>
    </div>
  );
}

// ============ ARCHITECTURE SECTION — How Crypto OS is layered ============
function ArchitectureSection() {
  const layers = [
    {
      label: "Слой 1 — чтение рынка",
      title: "Макро + Крипто-мультипликаторы",
      desc: "Один дашборд показывает, в какой фазе сейчас рынок и какой режим актуален.",
      color: "#00d4aa",
      Icon: Gauge,
      Visual: MultiplierMini,
    },
    {
      label: "Слой 2 — отбор кандидатов",
      title: "Watchlist по чек-листу токеномики",
      desc: "Система сама подбирает монеты под разбор — у тебя готовый список для изучения.",
      color: "#06b6d4",
      Icon: ListChecks,
      Visual: WatchlistMini,
    },
    {
      label: "Слой 3 — исполнение",
      title: "DCA-боты + уникальные индикаторы",
      desc: "Один раз настроил — закупки идут по плану, индикаторы показывают режимы.",
      color: "#f59e0b",
      Icon: Bot,
      Visual: DCAMini,
    },
    {
      label: "Слой 4 — поддержка",
      title: "AI-ассистент + живые созвоны + комьюнити",
      desc: "Вопрос по методике — ответ 24/7. Раз в неделю — созвон. В чате — ученики.",
      color: "#9945ff",
      Icon: MessageCircle,
      Visual: AIChatMini,
    },
  ];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />
      <FloatingParticles />
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border-green bg-[#00d4aa]/5 mb-4">
              <Layers className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-xs sm:text-sm font-medium text-[#00d4aa]" style={{ fontFamily: "var(--font-body)" }}>Архитектура</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Как устроена </span>
              <span className="gradient-text">Crypto OS</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Четыре слоя, из которых собран рабочий стол криптана. Каждый слой — это конкретный инструмент, а не абстракция.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
          {layers.map((l, i) => {
            const Ico = l.Icon;
            const Visual = l.Visual;
            return (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div
                  className="relative p-4 sm:p-5 rounded-2xl backdrop-blur-xl bg-[#0f1328]/60 border grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4 items-center hover:translate-x-1 transition-all"
                  style={{ borderColor: l.color + "40" }}
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: l.color + "15", color: l.color, boxShadow: `0 0 30px ${l.color}25` }}
                    >
                      <Ico className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider mb-1" style={{ color: l.color, fontFamily: "var(--font-body)" }}>
                        {l.label}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">{l.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{l.desc}</p>
                    </div>
                  </div>
                  <div className="md:min-w-[240px]">
                    <Visual />
                  </div>
                </div>
                {i < layers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ChevronDown className="w-4 h-4 text-white/30" />
                  </div>
                )}
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ WHAT YOU GET SECTION ============
function WhatYouGetSection() {
  const desktop = [
    { Icon: Gauge, title: "Дашборд с макро- и крипто-мультипликаторами", desc: "Картина рынка без ручного ресёрча — режимы среды собираются автоматически." },
    { Icon: Target, title: "Автоподбор монет по чек-листу токеномики", desc: "«Кандидат дня» и «кандидат недели» сразу в твой watchlist для изучения." },
    { Icon: Bot, title: "Настроенные DCA-боты по методике", desc: "Один раз настроил — работают сами по расписанию регулярных закупок." },
    { Icon: Activity, title: "Уникальные индикаторы с интерпретацией", desc: "Понятные режимы: вход / удержание / пауза. Сигнал для твоего самостоятельного анализа." },
    { Icon: LineChart, title: "Публичный портфель системы в онлайн-режиме", desc: "Пример того, как методика применяется на практике." },
    { Icon: MessageCircle, title: "AI-ассистент с базой знаний курса", desc: "Задаёшь вопрос по методике — получаешь ответ 24/7 со ссылкой на урок." },
  ];

  const forever = [
    { icon: <BookOpen className="w-5 h-5" />, title: "8 уроков Crypto OS", desc: "Видео, доступ навсегда + обновления курса" },
    { icon: <ListChecks className="w-5 h-5" />, title: "9 рабочих шаблонов-артефактов", desc: "Asset Roles Map, Portfolio Map, Watchlist, Signal Map, Macro Multiplier, Crypto Multiplier, Anti-Hamster Filter, Asset Checklists, Finale OS" },
    { icon: <Calendar className="w-5 h-5" />, title: "Еженедельные живые созвоны", desc: "Групповой Q&A с преподавателями" },
    { icon: <Users className="w-5 h-5" />, title: "Закрытое Telegram-комьюнити учеников", desc: "Обмен опытом внутри чата курса" },
    { icon: <FileText className="w-5 h-5" />, title: "Список литературы для углубления", desc: "Подборка для самостоятельного расширения знаний" },
    { icon: <Award className="w-5 h-5" />, title: "Сертификат о прохождении курса", desc: "Документ о завершении Crypto OS" },
    { icon: <Shield className="w-5 h-5" />, title: "7 дней возврата без вопросов", desc: "Если не подойдёт — вернём на ту же карту" },
  ];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Что ты </span>
              <span className="gradient-text">получаешь</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Рабочий стол */}
        <AnimatedSection>
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#00d4aa]/40" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#00d4aa] px-2" style={{ fontFamily: "var(--font-display)" }}>Рабочий стол</h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#00d4aa]/40" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {desktop.map((t, i) => {
                const Ico = t.Icon;
                return (
                  <AnimatedSection key={i} delay={i * 0.06}>
                    <div className="p-5 rounded-2xl bg-[#0f1328]/60 border border-white/5 hover:border-[#00d4aa]/30 hover:shadow-[0_0_30px_rgba(0,212,170,0.1)] transition-all h-full">
                      <div className="w-11 h-11 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center text-[#00d4aa] mb-4">
                        <Ico className="w-6 h-6" />
                      </div>
                      <h4 className="text-white font-bold mb-2 text-base">{t.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{t.desc}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Disclaimer 1 — мультипликаторы */}
            <div className="mt-6 p-4 rounded-xl bg-[#0f1328]/40 border border-white/10 flex items-start gap-3">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Режимы «вход / удержание / пауза», выдаваемые мультипликаторами, являются сигналом для твоего самостоятельного анализа и не являются индивидуальной инвестиционной рекомендацией в значении ст. 3 Закона РК «О рынке ценных бумаг».
              </p>
            </div>

            {/* Disclaimer 2 — DCA-боты */}
            <div className="mt-3 p-4 rounded-xl bg-[#0f1328]/40 border border-white/10 flex items-start gap-3">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Автоматизированные торговые стратегии (DCA-боты, алгоритмические стратегии) связаны с риском частичной или полной потери средств. Подключение ботов и пополнение биржевых счетов ученик осуществляет самостоятельно, на свой страх и риск.
              </p>
            </div>

            {/* Disclaimer 3 — публичный портфель */}
            <div className="mt-3 p-4 rounded-xl bg-[#0f1328]/40 border border-white/10 flex items-start gap-3">
              <Info className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Публичный портфель системы демонстрирует пример применения методики. Прошлые результаты не гарантируют будущих. Копирование состава портфеля не является гарантией аналогичного финансового результата. Курс имеет образовательный характер.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Остаётся навсегда */}
        <AnimatedSection>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#9945ff]/40" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#9945ff] px-2" style={{ fontFamily: "var(--font-display)" }}>Остаётся с тобой навсегда</h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#9945ff]/40" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {forever.map((t, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[#0f1328]/60 border border-white/5 hover:border-[#9945ff]/30 transition-all h-full">
                    <div className="w-9 h-9 rounded-lg bg-[#9945ff]/10 flex items-center justify-center text-[#9945ff] shrink-0">
                      {t.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 text-sm sm:text-base">{t.title}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{t.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ BEFORE / AFTER SECTION ============
function BeforeAfterSection() {
  const before = [
    "Панически читаешь каналы — и всё равно опаздываешь",
    "Покупаешь на эмоциях, продаёшь на страхе",
    "Не видишь общей картины рынка и фазы",
    "Теряешь деньги на локальных пиках",
    "Сигналы гуру противоречат друг другу",
  ];
  const after = [
    "Смотришь на режим мультипликатора — видишь фазу рынка",
    "Кандидаты сами попадают в watchlist по чек-листу",
    "DCA-боты закупают по плану, без эмоций",
    "Решаешь раз в неделю: да или нет",
    "AI-ассистент отвечает по методике со ссылкой на урок",
  ];
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0f2a] to-[#06091a]" />
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border-purple bg-[#9945ff]/5 mb-4">
              <Repeat className="w-4 h-4 text-[#9945ff]" />
              <span className="text-xs sm:text-sm font-medium text-[#9945ff]" style={{ fontFamily: "var(--font-body)" }}>Сдвиг</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">До / после </span>
              <span className="gradient-text">Crypto OS</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* BEFORE */}
          <AnimatedSection delay={0.1}>
            <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#180f13]/70 border border-red-500/25 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>ДО</h3>
              </div>
              <ul className="space-y-3">
                {before.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-300" style={{ fontFamily: "var(--font-body)" }}>
                    <XCircle className="w-4 h-4 text-red-400/70 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* AFTER */}
          <AnimatedSection delay={0.2}>
            <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#0c1a16]/70 border border-[#00d4aa]/30 backdrop-blur-sm shadow-[0_0_40px_rgba(0,212,170,0.1)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center text-[#00d4aa]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>ПОСЛЕ</h3>
              </div>
              <ul className="space-y-3">
                {after.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-200" style={{ fontFamily: "var(--font-body)" }}>
                    <CheckCircle2 className="w-4 h-4 text-[#00d4aa] mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ============ TIMELINE SECTION — Как проходит курс ============
function TimelineSection() {
  const steps = [
    {
      label: "Неделя 1",
      title: "Смотришь 8 уроков, собираешь рабочий стол",
      desc: "Проходишь методику, наполняешь шаблоны, подключаешь дашборд с мультипликаторами.",
      Icon: BookOpen,
      color: "#00d4aa",
    },
    {
      label: "Недели 2–4",
      title: "Практика с чек-листами, первый DCA",
      desc: "Формируешь watchlist, настраиваешь DCA-боты по методике, разбираешь кандидатов.",
      Icon: Repeat,
      color: "#06b6d4",
    },
    {
      label: "Месяц 2+",
      title: "Система работает, ты решаешь раз в неделю",
      desc: "Мультипликаторы показывают режим, watchlist обновляется сам, ты принимаешь решения по кандидатам.",
      Icon: Rocket,
      color: "#9945ff",
    },
  ];
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border-green bg-[#00d4aa]/5 mb-4">
              <Calendar className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-xs sm:text-sm font-medium text-[#00d4aa]" style={{ fontFamily: "var(--font-body)" }}>Как проходит курс</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Путь внутри </span>
              <span className="gradient-text">Crypto OS</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => {
            const Ico = s.Icon;
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className="relative h-full p-6 rounded-2xl bg-[#0f1328]/60 border backdrop-blur-sm"
                  style={{ borderColor: s.color + "30" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: s.color + "15", color: s.color }}
                    >
                      <Ico className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold" style={{ color: s.color, fontFamily: "var(--font-body)" }}>
                      {s.label}
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{s.desc}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20" />
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ CULTURE / WEEKLY SECTION ============
function CultureSection() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <AnimatedSection delay={0.1}>
            <div className="relative flex justify-center items-center h-[300px] sm:h-[400px] md:h-[500px]">
              <div className="animate-fly-left">
                <img
                  src={IMAGES.heroGirl}
                  alt=""
                  loading="lazy"
                  className="h-[240px] sm:h-[320px] md:h-[400px] object-contain"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">
                <span className="text-white">Ты с системой — </span>
                <span className="gradient-text">и с людьми</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Основную работу делает Crypto OS. Рядом — живые преподаватели и комьюнити учеников, с которыми можно разобрать частный случай и свериться с общим ходом рынка.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Calendar className="w-6 h-6" />, title: "Еженедельные созвоны", desc: "Групповой Q&A с преподавателями. Разбор твоих вопросов по методике и по текущему рынку." },
                  { icon: <Users className="w-6 h-6" />, title: "Закрытое комьюнити учеников", desc: "Telegram-чат тех, кто уже внутри системы. Обмен опытом, кандидаты, фазы рынка." },
                  { icon: <MessageCircle className="w-6 h-6" />, title: "AI-ассистент по курсу", desc: "Вопросы по методике 24/7. Отвечает по базе знаний курса со ссылкой на конкретный урок." },
                  { icon: <GraduationCap className="w-6 h-6" />, title: "Образовательный формат", desc: "Курс учит методике. Все решения по сделкам ученик принимает самостоятельно." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-[#0f1328]/60 border border-[#00d4aa]/20 hover:border-[#00d4aa]/40 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center text-[#00d4aa] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ============ GUARANTEE SECTION ============
function GuaranteeSection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0c0f2e] to-[#06091a]" />
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0f1328]/60 border border-[#00d4aa]/30 backdrop-blur-xl shadow-[0_0_60px_rgba(0,212,170,0.15)] flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#00d4aa]/20 to-[#9945ff]/20 flex items-center justify-center border-2 border-[#00d4aa]/40 shadow-[0_0_40px_rgba(0,212,170,0.3)]">
                <ShieldCheck className="w-12 h-12 sm:w-14 sm:h-14 text-[#00d4aa]" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#00d4aa] text-[#06091a] text-xs font-bold whitespace-nowrap" style={{ fontFamily: "var(--font-body)" }}>
                7 дней
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Гарантия возврата 7 дней
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Если курс не подойдёт — вернём на ту же карту или кошелёк. Без вопросов. Условия описаны в публичной оферте.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ PRICING SECTION ============
function PricingSection() {
  const bullets = [
    "8 уроков Crypto OS (видео)",
    "9 рабочих шаблонов-артефактов",
    "Доступ к дашборду с мультипликаторами",
    "Настроенные DCA-боты по методике",
    "AI-ассистент с базой знаний курса",
    "Еженедельные живые созвоны",
    "Закрытое Telegram-комьюнити",
    "Список литературы для углубления",
    "Сертификат о прохождении",
    "Доступ навсегда + обновления курса",
    "7 дней возврата без вопросов",
  ];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0c0f2e] to-[#06091a]" />
      <FloatingParticles />

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto">
            <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0f1328] to-[#141a3a] border-2 border-[#00d4aa]/40 overflow-hidden shadow-[0_0_80px_rgba(0,212,170,0.15)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4aa]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#9945ff]/5 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#00d4aa]/30 mb-6">
                  <Zap className="w-4 h-4 text-[#f59e0b]" />
                  <span className="text-sm font-medium text-[#f59e0b]" style={{ fontFamily: "var(--font-body)" }}>Одна цена. Всё включено.</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Я — Криптан +<br className="sm:hidden" /> твоя личная Crypto OS
                </h2>

                <div className="mb-4">
                  <PriceTag size="lg" />
                </div>

                <p className="text-gray-400 mb-8 text-base sm:text-lg" style={{ fontFamily: "var(--font-body)" }}>
                  Разовый платёж. Доступ навсегда.
                </p>

                <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 mb-8 text-left">
                  {bullets.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-[#00d4aa]/20 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                      </div>
                      <span className="text-gray-300" style={{ fontFamily: "var(--font-body)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={COURSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button w-full py-4 sm:py-5 rounded-xl text-lg sm:text-xl flex items-center justify-center gap-3"
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  Получить курс — {NEW_PRICE}
                </a>

                <p className="text-gray-500 text-xs mt-4" style={{ fontFamily: "var(--font-body)" }}>
                  Образовательный курс. Не является индивидуальной инвестиционной рекомендацией.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ FAQ SECTION ============
function FAQSection() {
  const faqs = [
    { q: "Нужен ли опыт в криптовалютах?", a: "Нет. Курс «Я — Криптан + твоя личная Crypto OS» рассчитан в том числе на тех, кто раньше не занимался крипторынком. Первый урок начинается с того, как устроены деньги и инфляция — до крипты мы дойдём на втором уроке. Курс спроектирован для того, у кого есть сбережения и желание разобраться в методике." },
    { q: "Сколько времени нужно на прохождение?", a: "8 уроков Crypto OS. Смотришь в своём ритме. Настройка рабочего стола (мультипликаторы, watchlist, DCA) — ещё пара часов. Доступ к материалам навсегда." },
    { q: "Какой формат уроков?", a: "Видеоуроки с разборами методики и рабочими шаблонами. К каждому уроку прилагается артефакт-шаблон, который ты наполняешь своими данными." },
    { q: "Для кого этот курс?", a: "«Я — Криптан + твоя личная Crypto OS» — для тех, кто хочет разобраться в крипте системно, а не по каналам и сигналам. Ученики обычно — это люди с работой, у которых нет времени сидеть в рынке 8 часов в день." },
    { q: "Что я буду делать после курса?", a: "У тебя будет настроенный рабочий стол: мультипликаторы, watchlist, DCA-боты, AI-ассистент. Раз в неделю — созвон. Задача — принимать решения по кандидатам, которых система тебе подаёт, и вести свой портфель по методике." },
    { q: "Это финансовая рекомендация?", a: "Нет. Курс носит строго образовательный характер и не является индивидуальной инвестиционной рекомендацией в понимании ст. 3 Закона РК «О рынке ценных бумаг», а также не является финансовой, налоговой или юридической консультацией. Все решения по сделкам ученик принимает самостоятельно." },
    { q: "Есть ли гарантия возврата?", a: "Да. 7 дней с момента покупки без вопросов — возврат на ту же карту или кошелёк. Условия описаны в публичной оферте." },
    { q: "Сколько длится доступ?", a: "Доступ к урокам и обновлениям курса — навсегда. Доступ к рабочему столу, живым созвонам и AI-ассистенту действует пока курс активен." },
    { q: "Почему такая низкая цена — $39 вместо $1000?", a: "$39 — это специальная цена запуска курса «Я — Криптан + твоя личная Crypto OS». Полная стоимость методики и инфраструктуры — $1000. Цена запуска действует, чтобы собрать первую волну учеников." },
  ];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Частые </span>
              <span className="gradient-text">вопросы</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <details className="group p-5 rounded-xl bg-[#0f1328]/60 border border-white/5 hover:border-white/10 transition-all">
                <summary className="flex items-center justify-between cursor-pointer list-none gap-3">
                  <span className="text-white font-semibold text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed text-sm sm:text-base" style={{ fontFamily: "var(--font-body)" }}>{faq.a}</p>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FINAL CTA SECTION ============
function FinalCTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.neonHogwarts} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06091a] via-[#06091a]/70 to-[#06091a]" />
      </div>
      <FloatingParticles />

      <div className="container relative z-10 text-center">
        <AnimatedSection>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.08]">
            <span className="text-white">Один раз настраиваешь — </span>
            <span className="gradient-text">годами пользуешься</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-xl mb-10 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Курс «Я — Криптан + твоя личная Crypto OS» — восемь уроков и рабочий стол, который собирает картину рынка за тебя.
          </p>
          <a
            href={COURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button px-8 sm:px-12 py-4 sm:py-5 rounded-xl text-lg sm:text-xl inline-flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            Получить курс — {NEW_PRICE}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ CI LOGO (SVG monogram with unicorn gradient + spark) ============
function CILogo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_12px_rgba(167,139,250,0.45)] shrink-0"
      aria-label="CI Academy"
    >
      <defs>
        <linearGradient id="ciGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="ciGradSoft" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
        </linearGradient>
        <filter id="ciGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* iOS-style rounded frame */}
      <rect x="3" y="3" width="58" height="58" rx="14" fill="url(#ciGradSoft)" />
      <rect x="3" y="3" width="58" height="58" rx="14" stroke="url(#ciGrad)" strokeWidth="2" fill="none" />
      {/* C — open crescent */}
      <path
        d="M 26 22 A 10 10 0 1 0 26 42"
        stroke="url(#ciGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        filter="url(#ciGlow)"
      />
      {/* I — bold vertical with serifs */}
      <rect x="40" y="20" width="4" height="24" rx="1.5" fill="url(#ciGrad)" filter="url(#ciGlow)" />
      <rect x="36" y="19" width="12" height="2.5" rx="1" fill="url(#ciGrad)" />
      <rect x="36" y="42.5" width="12" height="2.5" rx="1" fill="url(#ciGrad)" />
      {/* Unicorn spark — rotating 4-point star */}
      <g style={{ transformOrigin: "54px 12px" }}>
        <path d="M 54 8 L 55.4 11.2 L 58.5 12.6 L 55.4 14 L 54 17 L 52.6 14 L 49.5 12.6 L 52.6 11.2 Z" fill="#fde68a" opacity="0.95">
          <animateTransform attributeName="transform" type="rotate" from="0 54 12" to="360 54 12" dur="6s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

// ============ FOOTER (true iOS glass) ============
function Footer() {
  return (
    <footer className="relative pt-12 pb-8">
      <div className="absolute inset-0 bg-[#06091a]" />
      {/* True glass overlay */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/40 border-t border-white/20 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] supports-[backdrop-filter]:bg-black/30" />
      {/* Inner gradient sheen */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/5 via-transparent to-transparent" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <CILogo size={56} />
              <div>
                <div className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>CI Academy</div>
                <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/80" style={{ fontFamily: "var(--font-body)" }}>
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span>Crypto Intelligence</span>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              CI Academy — образовательная платформа. Курс «Я — Криптан + твоя личная Crypto OS» обучает методике работы с криптоактивами в спот-подходе.
            </p>
          </div>

          {/* Docs */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm" style={{ fontFamily: "var(--font-display)" }}>Документы</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/offer" className="text-gray-400 hover:text-white transition-colors">Публичная оферта</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Политика ПДн</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Пользовательское соглашение</a></li>
            </ul>
          </div>

          {/* Legal disclaimers collection */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm" style={{ fontFamily: "var(--font-display)" }}>Правовая информация</h4>
            <details className="text-xs text-gray-500 group">
              <summary className="cursor-pointer hover:text-gray-300 transition-colors flex items-center gap-2">
                <span>Дисклеймеры</span>
                <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-3 space-y-3 leading-relaxed">
                <p>
                  Режимы «вход / удержание / пауза», выдаваемые мультипликаторами, являются сигналом для самостоятельного анализа и не являются индивидуальной инвестиционной рекомендацией в значении ст. 3 Закона РК «О рынке ценных бумаг».
                </p>
                <p>
                  Автоматизированные торговые стратегии (DCA-боты, алгоритмические стратегии) связаны с риском частичной или полной потери средств. Подключение ботов и пополнение биржевых счетов ученик осуществляет самостоятельно, на свой страх и риск.
                </p>
                <p>
                  Публичный портфель системы демонстрирует пример применения методики. Прошлые результаты не гарантируют будущих. Копирование состава портфеля не является гарантией аналогичного финансового результата. Курс имеет образовательный характер.
                </p>
              </div>
            </details>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-gray-500 text-xs leading-relaxed max-w-3xl" style={{ fontFamily: "var(--font-body)" }}>
            Материалы курса не являются индивидуальной инвестиционной рекомендацией в понимании ст. 3 Закона РК «О рынке ценных бумаг» и не являются финансовой, налоговой или юридической консультацией. Решения о покупке, продаже или удержании цифровых активов вы принимаете самостоятельно и на свой страх и риск. Доходность не гарантируется.
          </p>
          <p className="text-gray-600 text-xs shrink-0" style={{ fontFamily: "var(--font-body)" }}>
            &copy; {new Date().getFullYear()} CI Academy
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============ NAVBAR (true iOS glass) ============
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/30 border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] supports-[backdrop-filter]:bg-black/20">
      {/* Inner sheen for iOS glass feel */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-transparent" />

      <div className="container relative flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-3">
          <CILogo size={36} />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-sm sm:text-base" style={{ fontFamily: "var(--font-display)" }}>CI Academy</span>
            <span className="text-[10px] sm:text-[11px] text-[#00d4aa]/80 -mt-0.5" style={{ fontFamily: "var(--font-body)" }}>Crypto Intelligence</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#modules" className="text-gray-300 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>Программа</a>
          <a href="#architecture" className="text-gray-300 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>Как устроено</a>
          <a href="#get" className="text-gray-300 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>Что получаешь</a>
          <a href="#pricing" className="text-gray-300 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>Цена</a>
          <a href="#faq" className="text-gray-300 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={COURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm hidden sm:inline-block"
          >
            Получить — {NEW_PRICE}
          </a>
          <button
            className="md:hidden text-white p-2 rounded-lg bg-white/5 border border-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden backdrop-blur-2xl bg-black/40 border-t border-white/20">
          <div className="container py-4 flex flex-col gap-3 relative">
            <a href="#modules" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm py-2" style={{ fontFamily: "var(--font-body)" }}>Программа</a>
            <a href="#architecture" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm py-2" style={{ fontFamily: "var(--font-body)" }}>Как устроено</a>
            <a href="#get" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm py-2" style={{ fontFamily: "var(--font-body)" }}>Что получаешь</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm py-2" style={{ fontFamily: "var(--font-body)" }}>Цена</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm py-2" style={{ fontFamily: "var(--font-body)" }}>FAQ</a>
            <a
              href={COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button px-5 py-3 rounded-lg text-sm text-center mt-2 sm:hidden"
            >
              Получить курс — {NEW_PRICE}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ============ MAIN PAGE ============
export default function Home() {
  return (
    <div className="min-h-screen bg-[#06091a] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PositioningSection />
      <AuthorSection />
      <div id="modules">
        <ModulesSection />
      </div>
      <div id="architecture">
        <ArchitectureSection />
      </div>
      <div id="get">
        <WhatYouGetSection />
      </div>
      <BeforeAfterSection />
      <TimelineSection />
      <CultureSection />
      <GuaranteeSection />
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <FinalCTASection />
      <Footer />
    </div>
  );
}
