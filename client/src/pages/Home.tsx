/*
 * Design: «Neon Fortress» — Cinematic Neon Realism
 * Colors: Deep cosmic black, neon green (#00d4aa), electric purple (#9945ff), cyan (#06b6d4), gold (#f59e0b)
 * Typography: Rajdhani (display) + Manrope (body)
 * Layout: Full-screen cinematic sections, character-driven visuals
 * Glass: iOS-style bg-white/10 backdrop-blur-xl border border-white/20 on nav/footer
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield, Zap, BookOpen, Bot, BarChart3, CheckSquare,
  GraduationCap, Users, MessageCircle, Brain, Eye, ListChecks,
  ChevronDown, Clock, Play, Sparkles, TrendingUp, FileText, Award,
  Gauge, Calendar, Info, Menu, X
} from "lucide-react";
import { useState } from "react";

const COURSE_URL = "https://courstore.kz/";

// CDN URLs (letting heroes fly — не трогаем)
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
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border-green bg-[#00d4aa]/5 mb-6">
              <Sparkles className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-sm font-medium text-[#00d4aa]" style={{ fontFamily: "var(--font-body)" }}>Crypto OS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 tracking-tight">
              <span className="text-white">Crypto OS — </span>
              <span className="gradient-text">методика, которая собирает твой крипто-портфель за тебя</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Восемь уроков, после которых ты один раз настраиваешь систему — и годами пользуешься. Макро- и крипто-мультипликаторы собирают картину рынка автоматически: тебе не нужно каждый день сидеть в каналах и сравнивать скриншоты. Дашборд сам выдаёт кандидатов для твоего watchlist по чек-листу, боты сами покупают по методике DCA, AI-ассистент отвечает на вопросы по курсу 24/7. Ты просто смотришь и решаешь — да или нет.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
              <a
                href={COURSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button px-6 sm:px-8 py-4 rounded-xl text-base sm:text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Play className="w-5 h-5" />
                Получить курс — $39
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>Доступ навсегда</span>
              </div>
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

          {/* Right: Characters — cutout PNGs with flying animation */}
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
              <span className="gradient-text">Crypto OS</span>
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#0f1328]/60 border border-white/10">
                <p className="text-base sm:text-lg">
                  Ты знаешь, что крипта — это возможность, но времени сидеть в каналах и разбираться в токеномике у тебя нет. Читаешь чужие сигналы, покупаешь на эмоциях, потом жалеешь. Хочется системы, а не гадания.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#0f1328]/60 border border-[#00d4aa]/20">
                <p className="text-base sm:text-lg">
                  Crypto OS — это рабочая методика и готовая инфраструктура в одном месте. Восемь уроков учат читать рынок через макро- и крипто-мультипликаторы: ты видишь, в какой фазе мы сейчас, и какой режим сейчас актуален — накапливать, удерживать, снижать позицию или ждать. Дашборд по этой системе сам отбирает монеты по чек-листу токеномики и выдаёт их тебе как кандидатов для изучения.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#0f1328]/60 border border-[#9945ff]/20">
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
    { num: "2000+", suffix: "", label: "учеников обучено лично" },
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border-purple bg-[#9945ff]/5 mb-6">
                <Sparkles className="w-4 h-4 text-[#9945ff]" />
                <span className="text-sm font-medium text-[#9945ff]" style={{ fontFamily: "var(--font-body)" }}>Автор курса</span>
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
                За 8 лет автор курса прошёл рынок во всех его фазах и обучил <span className="text-[#00d4aa] font-semibold">более 2000 человек лично</span>.
              </p>
              <p className="text-base">
                Crypto OS — это выжимка того, что реально работает в долгую: макро-фундамент, чтение фаз рынка через мультипликаторы, отбор активов по токеномике, DCA-распределение и правила удержания позиций.
              </p>
              <p className="text-base text-gray-400">
                Методика построена на спот-подходе. Курс — образовательный продукт, решения о покупке активов ученик принимает самостоятельно.
              </p>
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
    { num: "01", title: "Деньги, инфляция и макроцикл", artifact: "Macro Multiplier", desc: "Как устроены деньги, почему банки расширяют массу кредитом и как ставка ЦБ двигает ликвидность. Макро как фундамент всех решений по активам.", color: "#00d4aa" },
    { num: "02", title: "Три оси индустрии: BTC, ETH, SOL", artifact: "Asset Roles Map", desc: "Зачем появились крипта и блокчейн. BTC как ценность, ETH как инфраструктура, SOL как скорость. Базовый словарь индустрии.", color: "#9945ff" },
    { num: "03", title: "Фазы рынка и крипто-мультипликатор", artifact: "Crypto Multiplier", desc: "Индикаторы среды в одном дашборде: настроение рынка, доминация BTC, соотношение ETH/BTC, ончейн-сигналы, циклические уровни.", color: "#06b6d4" },
    { num: "04", title: "Как не стать орангутангом", artifact: "Anti-Hamster Filter", desc: "FOMO, культ гуру, ошибка выжившего, плечо. Почему капитал разрушается не рынком, а психикой. Личный список запретов и триггеров срыва.", color: "#ff6b6b" },
    { num: "05", title: "Отбор проектов: секторы и red flags", artifact: "Asset Checklists + Watchlist", desc: "Карта крипторынка по секторам (L1, L2, DeFi, RWA, DePIN, AI, инфра), 8 red flags, чек-лист разбора токена, правила формирования watchlist.", color: "#f59e0b" },
    { num: "06", title: "Распределение капитала: DCA и ребалансировка", artifact: "Portfolio Map", desc: "Портфель, разложенный по функциям: индексный слой, защитные активы, BTC/ETH/SOL, фавориты, кандидат недели. Ритм DCA и ребалансировки.", color: "#00d4aa" },
    { num: "07", title: "Сигналы рынка и признаки разворота", artifact: "Signal Map", desc: "Слои подтверждения: скользящие средние, RSI, свечи, уровни, ложные пробои, структура тренда. Чек-лист разворота вверх и вниз.", color: "#9945ff" },
    { num: "08", title: "Финальная сборка Crypto OS", artifact: "Finale OS", desc: "Интеграция всех слоёв в одну систему. Карта треков продолжения. Правило дисциплины вместо плеча.", color: "#06b6d4" },
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
          {modules.map((m, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div
                className="relative p-5 sm:p-6 rounded-2xl bg-[#0f1328]/70 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 group h-full"
              >
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span
                    className="text-2xl sm:text-3xl font-bold opacity-30"
                    style={{ color: m.color }}
                  >
                    {m.num}
                  </span>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: m.color + "15", color: m.color, fontFamily: "var(--font-body)" }}
                  >
                    {m.artifact}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">{m.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{m.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ WHAT YOU GET SECTION ============
function WhatYouGetSection() {
  const desktop = [
    { icon: <BarChart3 className="w-6 h-6" />, title: "Дашборд с макро- и крипто-мультипликаторами", desc: "Картина рынка без ручного ресёрча — режимы среды собираются автоматически." },
    { icon: <CheckSquare className="w-6 h-6" />, title: "Автоподбор монет по чек-листу токеномики", desc: "«Кандидат дня» и «кандидат недели» сразу в твой watchlist для изучения." },
    { icon: <Bot className="w-6 h-6" />, title: "Настроенные DCA-боты по методике", desc: "Один раз настроил — работают сами по расписанию регулярных закупок." },
    { icon: <Gauge className="w-6 h-6" />, title: "Уникальные индикаторы с интерпретацией", desc: "Понятные режимы: вход / удержание / пауза. Сигнал для твоего самостоятельного анализа." },
    { icon: <Eye className="w-6 h-6" />, title: "Публичный портфель системы в онлайн-режиме", desc: "Пример того, как методика применяется на практике." },
    { icon: <MessageCircle className="w-6 h-6" />, title: "AI-ассистент с базой знаний курса", desc: "Задаёшь вопрос по методике — получаешь ответ 24/7 со ссылкой на урок." },
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
              {desktop.map((t, i) => (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <div className="p-5 rounded-2xl bg-[#0f1328]/60 border border-white/5 hover:border-[#00d4aa]/30 transition-all h-full">
                    <div className="w-11 h-11 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center text-[#00d4aa] mb-4">
                      {t.icon}
                    </div>
                    <h4 className="text-white font-bold mb-2 text-base">{t.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{t.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
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

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                  Crypto OS
                </h2>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-bold gradient-text">$39</span>
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
                  Получить курс
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
    { q: "Нужен ли опыт в криптовалютах?", a: "Нет. Первый урок начинается с того, как устроены деньги и инфляция — до крипты мы дойдём на втором уроке. Курс спроектирован для того, у кого есть сбережения и желание разобраться в методике." },
    { q: "Сколько времени нужно на прохождение?", a: "8 уроков Crypto OS. Смотришь в своём ритме. Настройка рабочего стола (мультипликаторы, watchlist, DCA) — ещё пара часов. Доступ к материалам навсегда." },
    { q: "Какой формат уроков?", a: "Видеоуроки с разборами методики и рабочими шаблонами. К каждому уроку прилагается артефакт-шаблон, который ты наполняешь своими данными." },
    { q: "Для кого этот курс?", a: "Для тех, кто хочет разобраться в крипте системно, а не по каналам и сигналам. Ученики обычно — это люди с работой, у которых нет времени сидеть в рынке 8 часов в день." },
    { q: "Что я буду делать после курса?", a: "У тебя будет настроенный рабочий стол: мультипликаторы, watchlist, DCA-боты, AI-ассистент. Раз в неделю — созвон. Задача — принимать решения по кандидатам, которых система тебе подаёт, и вести свой портфель по методике." },
    { q: "Это финансовая рекомендация?", a: "Нет. Курс носит строго образовательный характер и не является индивидуальной инвестиционной рекомендацией в понимании ст. 3 Закона РК «О рынке ценных бумаг», а также не является финансовой, налоговой или юридической консультацией. Все решения по сделкам ученик принимает самостоятельно." },
    { q: "Есть ли гарантия возврата?", a: "Да. 7 дней с момента покупки без вопросов — возврат на ту же карту или кошелёк. Условия описаны в публичной оферте." },
    { q: "Сколько длится доступ?", a: "Доступ к урокам и обновлениям курса — навсегда. Доступ к рабочему столу, живым созвонам и AI-ассистенту действует пока курс активен." },
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
            Crypto OS — восемь уроков и рабочий стол, который собирает картину рынка за тебя.
          </p>
          <a
            href={COURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button px-8 sm:px-12 py-4 sm:py-5 rounded-xl text-lg sm:text-xl inline-flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            Получить курс — $39
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ FOOTER (glassmorphism) ============
function Footer() {
  return (
    <footer className="relative pt-12 pb-8">
      <div className="absolute inset-0 bg-[#06091a]" />
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-t border-white/10" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#9945ff] flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>CI</span>
              </div>
              <div>
                <span className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>CI Academy</span>
                <p className="text-gray-500 text-xs" style={{ fontFamily: "var(--font-body)" }}>Crypto OS</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              CI Academy — образовательная платформа. Курс Crypto OS обучает методике работы с криптоактивами в спот-подходе.
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

// ============ NAVBAR (glassmorphism) ============
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#9945ff] flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>CI</span>
          </div>
          <span className="text-white font-bold text-base sm:text-lg" style={{ fontFamily: "var(--font-display)" }}>CI Academy</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#modules" className="text-gray-300 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>Программа</a>
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
            Получить — $39
          </a>
          <button
            className="md:hidden text-white p-2 rounded-lg bg-white/5 border border-white/10"
            onClick={() => setMenuOpen(\!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/5 backdrop-blur-xl border-t border-white/10">
          <div className="container py-4 flex flex-col gap-3">
            <a href="#modules" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm py-2" style={{ fontFamily: "var(--font-body)" }}>Программа</a>
            <a href="#get" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm py-2" style={{ fontFamily: "var(--font-body)" }}>Что получаешь</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm py-2" style={{ fontFamily: "var(--font-body)" }}>Цена</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm py-2" style={{ fontFamily: "var(--font-body)" }}>FAQ</a>
            <a
              href={COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button px-5 py-3 rounded-lg text-sm text-center mt-2 sm:hidden"
            >
              Получить курс — $39
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
      <div id="get">
        <WhatYouGetSection />
      </div>
      <CultureSection />
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
