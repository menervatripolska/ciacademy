/*
 * Design: «Neon Fortress» — Cinematic Neon Realism
 * Colors: Deep cosmic black, neon green (#00d4aa), electric purple (#9945ff), cyan (#06b6d4), gold (#f59e0b)
 * Typography: Rajdhani (display) + Manrope (body)
 * Layout: Full-screen cinematic sections, character-driven visuals
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield, Zap, BookOpen, Bot, BarChart3, CheckSquare,
  GraduationCap, Users, Phone, Brain, Eye, ListChecks,
  ChevronDown, Star, Clock, Play, Sparkles, TrendingUp
} from "lucide-react";

// CDN URLs
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
          alt="Kryptan Academy"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06091a]/70 via-[#06091a]/50 to-[#06091a]" />
      </div>
      <FloatingParticles />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border-green bg-[#00d4aa]/5 mb-6">
              <Sparkles className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-sm font-medium text-[#00d4aa]" style={{ fontFamily: "var(--font-body)" }}>Crypto Intelligence</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
              <span className="text-white">Я —</span>{" "}
              <span className="gradient-text">Криптан</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-4 max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              32 анимационных урока, которые превратят тебя из новичка в разумного крипто-инвестора. Без воды, без рисков, без фьючерсов.
            </p>

            <p className="text-base text-gray-400 mb-8 max-w-lg" style={{ fontFamily: "var(--font-body)" }}>
              Хогвартс для криптанов — образовательная вселенная, где сложное становится простым, а разумность становится новым богатством.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
              <button className="cta-button px-8 py-4 rounded-xl text-lg flex items-center gap-2">
                <Play className="w-5 h-5" />
                Начать обучение — $19
              </button>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>~2.5 часа контента</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00d4aa]" />
                <span>Легально в РК</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#f59e0b]" />
                <span>Анти-деген культура</span>
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
            {/* Boy — flying right side */}
            <div className="absolute right-[-20px] top-[30px] animate-fly-right">
              <img
                src={IMAGES.heroBoy}
                alt="Криптан"
                className="h-[420px] object-contain"
              />
            </div>
            {/* Girl — flying left side */}
            <div className="absolute left-[-10px] top-[60px] animate-fly-left">
              <img
                src={IMAGES.heroGirl}
                alt="Криптан"
                className="h-[400px] object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-[#00d4aa]/60" />
        </motion.div>
      </div>
    </section>
  );
}

// ============ PROBLEM SECTION ============
function ProblemSection() {
  const problems = [
    { icon: <TrendingUp className="w-6 h-6" />, title: "99% теряют деньги", desc: "Новички приходят на рынок без знаний и теряют свои сбережения на фьючерсах и скамах." },
    { icon: <Brain className="w-6 h-6" />, title: "Информационный хаос", desc: "Тысячи каналов, гуру и сигналов. Невозможно отличить полезное от мусора." },
    { icon: <Shield className="w-6 h-6" />, title: "Страх и недоверие", desc: "Криптовалюты кажутся сложными, нелегальными и опасными. Но это не так." },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />
      <FloatingParticles />

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Знакомая </span>
              <span className="text-[#ff6b6b]">проблема?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Мир криптовалют полон ловушек для неподготовленных. Мы создали курс, который решает каждую из них.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="relative p-8 rounded-2xl bg-[#0f1328]/80 neon-border-purple backdrop-blur-sm hover:neon-box-purple transition-all duration-500 group h-full">
                <div className="w-12 h-12 rounded-xl bg-[#9945ff]/10 flex items-center justify-center text-[#9945ff] mb-5 group-hover:bg-[#9945ff]/20 transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{p.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SOLUTION / PHILOSOPHY SECTION ============
function PhilosophySection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#080d20] to-[#06091a]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Neon Hogwarts image */}
          <AnimatedSection>
            <div className="relative">
              <img
                src={IMAGES.neonHogwarts}
                alt="Crypto Intelligence Academy"
                className="rounded-2xl w-full neon-box-green"
              />
              <div className="absolute -bottom-4 -right-4 px-5 py-3 rounded-xl bg-[#0f1328] neon-border-green">
                <span className="text-[#00d4aa] font-bold text-lg">Хогвартс для криптанов</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Text */}
          <AnimatedSection delay={0.2}>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="gradient-text">Криптовалюта</span>{" "}
                <span className="text-white">как iPhone</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Мы берём сложнейшую технологию и упаковываем её в интуитивно понятный, безопасный и элегантный продукт. Ты получаешь только необходимые знания — без 99% информационного шума.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Простота", desc: "Поймёт даже ребёнок. Буквально — мы тестируем на 10-летних." },
                  { label: "Безопасность", desc: "Никаких фьючерсов, плечей и скамов. Только спот и долгосрок." },
                  { label: "Легальность", desc: "Все инструменты в рамках законодательства Республики Казахстан." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#0f1328]/60 neon-border-green/30">
                    <div className="w-2 h-2 rounded-full bg-[#00d4aa] mt-2.5 shrink-0" />
                    <div>
                      <span className="text-[#00d4aa] font-bold">{item.label}: </span>
                      <span className="text-gray-300" style={{ fontFamily: "var(--font-body)" }}>{item.desc}</span>
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

// ============ MODULES SECTION ============
function ModulesSection() {
  const modules = [
    { num: "01", title: "Как устроен мир денег", lessons: 4, desc: "От ракушек до цифровых валют. Почему деньги обесцениваются и как это остановить.", color: "#00d4aa" },
    { num: "02", title: "Технология будущего", lessons: 4, desc: "Блокчейн, Bitcoin, Ethereum — сложные технологии, объяснённые через простые аналогии.", color: "#9945ff" },
    { num: "03", title: "Первые шаги", lessons: 4, desc: "Создание кошелька, первая покупка, кибербезопасность — пошаговые инструкции.", color: "#06b6d4" },
    { num: "04", title: "Карта минных полей", lessons: 5, desc: "7 шагов к потере депозита и единственное противоядие — мудрость Баффета и Грэма.", color: "#ff6b6b" },
    { num: "05", title: "Инструменты инвестора", lessons: 6, desc: "DCA, свечной анализ, RSI, волны Эллиотта — всё, что нужно для принятия решений.", color: "#f59e0b" },
    { num: "06", title: "Традиционные рынки", lessons: 4, desc: "ETF, индексные фонды, золото, акции — диверсификация за пределами крипты.", color: "#00d4aa" },
    { num: "07", title: "Создание капитала", lessons: 5, desc: "Сообщество, портфель, AI-дневник, копитрейдинг и квалификация «Криптоинвестор».", color: "#9945ff" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.modulesBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[#06091a]/80" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">7 модулей. </span>
              <span className="gradient-text">32 урока.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Анимационный сериал, где каждый урок — это 3-5 минут концентрированных знаний. Путешествие от полного нуля до уверенного инвестора.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                className="relative p-6 rounded-2xl bg-[#0f1328]/70 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 group h-full"
                style={{ "--accent": m.color } as React.CSSProperties}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-3xl font-bold opacity-30"
                    style={{ color: m.color }}
                  >
                    {m.num}
                  </span>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: m.color + "15", color: m.color, fontFamily: "var(--font-body)" }}
                  >
                    {m.lessons} уроков
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">{m.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{m.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TOOLS SECTION ============
function ToolsSection() {
  const tools = [
    { icon: <Bot className="w-7 h-7" />, title: "Торговые боты", desc: "Автоматизированный копитрейдинг — роботы работают за тебя 24/7", color: "#00d4aa" },
    { icon: <BarChart3 className="w-7 h-7" />, title: "Индикаторы", desc: "Профессиональные инструменты теханализа, адаптированные для новичков", color: "#9945ff" },
    { icon: <CheckSquare className="w-7 h-7" />, title: "Чеклисты", desc: "Пошаговые инструкции для каждого действия — от покупки до ребалансировки", color: "#06b6d4" },
    { icon: <BookOpen className="w-7 h-7" />, title: "Дневник трейдера", desc: "AI-дневник для отслеживания сделок, эмоций и прогресса", color: "#f59e0b" },
    { icon: <Eye className="w-7 h-7" />, title: "Вотчлисты", desc: "Персонализированные списки активов с уведомлениями о ключевых уровнях", color: "#00d4aa" },
    { icon: <Brain className="w-7 h-7" />, title: "AI-Куратор 24/7", desc: "Персональный наставник на базе ИИ — ответит на любой вопрос в любое время", color: "#9945ff" },
    { icon: <Phone className="w-7 h-7" />, title: "Созвоны с наставниками", desc: "Живые консультации с практикующими инвесторами и трейдерами", color: "#06b6d4" },
    { icon: <ListChecks className="w-7 h-7" />, title: "Квалификация", desc: "Экзамен и сертификат «Квалифицированный Криптоинвестор» по итогам курса", color: "#f59e0b" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Tools image */}
          <AnimatedSection>
            <img
              src={IMAGES.tools}
              alt="Инструменты"
              className="rounded-2xl w-full neon-box-purple"
            />
          </AnimatedSection>

          {/* Right: Tools grid */}
          <div>
            <AnimatedSection>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="text-white">Не просто курс — </span>
                <span className="gradient-text">арсенал</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8" style={{ fontFamily: "var(--font-body)" }}>
                Помимо 32 уроков, ты получаешь полный набор инструментов для разумного инвестирования.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-3">
              {tools.map((t, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="p-4 rounded-xl bg-[#0f1328]/60 border border-white/5 hover:border-white/10 transition-all duration-300 group">
                    <div className="mb-3" style={{ color: t.color }}>{t.icon}</div>
                    <h4 className="text-sm font-bold text-white mb-1">{t.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{t.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ AI CURATOR SECTION ============
function AICuratorSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0c0f2e] to-[#06091a]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <AnimatedSection>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-white">Твой персональный </span>
                <span className="gradient-text">AI-наставник</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Забудь о бесконечном поиске ответов в Google. AI-куратор знает весь курс наизусть и готов помочь 24 часа в сутки, 7 дней в неделю.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Ответит на любой вопрос по материалу курса",
                  "Проверит твои домашние задания",
                  "Подскажет следующий шаг в инвестиционном плане",
                  "Объяснит сложные термины простым языком",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00d4aa]/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 text-[#00d4aa]" />
                    </div>
                    <span className="text-gray-300" style={{ fontFamily: "var(--font-body)" }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
                  <Users className="w-4 h-4 text-[#9945ff]" />
                  <span>+ Живые созвоны с наставниками</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: AI image */}
          <AnimatedSection delay={0.2}>
            <div className="relative flex justify-center">
              <img
                src={IMAGES.aiCurator}
                alt="AI Куратор"
                className="w-80 h-80 rounded-2xl object-cover neon-box-green animate-float"
                style={{ animationDuration: "8s" }}
              />
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-[#0f1328] neon-border-green text-sm">
                <span className="text-[#00d4aa] font-bold">24/7</span>
                <span className="text-gray-400 ml-1" style={{ fontFamily: "var(--font-body)" }}>онлайн</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ============ CULTURE SECTION ============
function CultureSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-white">Разумность — </span>
              <span className="gradient-text">новое богатство</span>
            </h2>
            <p className="text-gray-300 text-lg mb-12 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Мы строим анти-деген культуру, где статус определяется не случайным «иксом», а дисциплиной и стратегическим мышлением. В нашем сообществе гордятся многолетним следованием инвестиционному плану.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <AnimatedSection delay={0.1}>
            <div className="relative flex justify-center items-center h-[500px]">
              {/* Girl flying in culture section */}
              <div className="animate-fly-left">
                <img
                  src={IMAGES.heroGirl}
                  alt="Криптан"
                  className="h-[400px] object-contain"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              {[
                { icon: <GraduationCap className="w-6 h-6" />, title: "Образование, а не сигналы", desc: "Мы учим ловить рыбу, а не даём рыбу. Знания остаются с тобой навсегда." },
                { icon: <Shield className="w-6 h-6" />, title: "Безопасность превыше всего", desc: "Никаких фьючерсов, плечей и мемкоинов. Только проверенные стратегии." },
                { icon: <Users className="w-6 h-6" />, title: "Сообщество единомышленников", desc: "Тысячи разумных инвесторов, которые поддерживают друг друга на пути." },
                { icon: <TrendingUp className="w-6 h-6" />, title: "Долгосрочное мышление", desc: "Мы играем в долгую. Стратегия, дисциплина и терпение — наши суперсилы." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-[#0f1328]/60 neon-border-green/20 hover:neon-box-green/50 transition-all duration-500">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center text-[#00d4aa] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ============ PRICING SECTION ============
function PricingSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0c0f2e] to-[#06091a]" />
      <FloatingParticles />

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto">
            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-[#0f1328] to-[#141a3a] neon-box-green overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4aa]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#9945ff]/5 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 neon-border-green mb-6">
                  <Zap className="w-4 h-4 text-[#f59e0b]" />
                  <span className="text-sm font-medium text-[#f59e0b]" style={{ fontFamily: "var(--font-body)" }}>Специальная цена запуска</span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  Всё это за
                </h2>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-7xl sm:text-8xl font-bold gradient-text">$19</span>
                </div>
                <p className="text-gray-400 mb-8 text-lg" style={{ fontFamily: "var(--font-body)" }}>
                  Одноразовый платёж. Доступ навсегда.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8 text-left">
                  {[
                    "32 анимационных урока",
                    "Торговые боты",
                    "Профессиональные индикаторы",
                    "Чеклисты и инструкции",
                    "AI-дневник трейдера",
                    "Персональные вотчлисты",
                    "AI-Куратор 24/7",
                    "Созвоны с наставниками",
                    "Копитрейдинг",
                    "Сертификат «Криптоинвестор»",
                    "Сообщество криптанов",
                    "Обновления курса",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-[#00d4aa]/20 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                      </div>
                      <span className="text-gray-300" style={{ fontFamily: "var(--font-body)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <button className="cta-button w-full py-5 rounded-xl text-xl flex items-center justify-center gap-3">
                  <Play className="w-6 h-6" />
                  Стать Криптаном
                </button>

                <p className="text-gray-500 text-xs mt-4" style={{ fontFamily: "var(--font-body)" }}>
                  Все инструменты и методы курса соответствуют законодательству Республики Казахстан
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
    { q: "Нужен ли опыт в криптовалютах?", a: "Нет. Курс создан для абсолютных новичков. Мы начинаем с основ — что такое деньги и почему они обесцениваются — и постепенно доводим до уверенного уровня инвестора." },
    { q: "Это легально в Казахстане?", a: "Да. Все инструменты и методы курса ориентированы на регуляторные нормы Республики Казахстан. Мы исключили высокорисковые инструменты (фьючерсы, плечи) и фокусируемся на спотовой торговле и долгосрочном хранении." },
    { q: "Сколько времени нужно на прохождение?", a: "Курс состоит из 32 коротких уроков по 3-5 минут. Общее время — около 2.5 часов. Вы можете проходить в своём темпе — доступ навсегда." },
    { q: "Что такое копитрейдинг?", a: "Это возможность автоматически копировать сделки опытных трейдеров. Робот повторяет их действия на вашем счёте. Вы учитесь и зарабатываете одновременно." },
    { q: "Как работает AI-куратор?", a: "Это персональный наставник на базе искусственного интеллекта, который знает весь материал курса. Он доступен 24/7 и ответит на любой вопрос, проверит задания и подскажет следующий шаг." },
    { q: "Есть ли гарантия возврата?", a: "Мы уверены в качестве курса. Если в течение 7 дней вы решите, что курс вам не подходит — мы вернём деньги без вопросов." },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#06091a] via-[#0a0e27] to-[#06091a]" />

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Частые </span>
              <span className="gradient-text">вопросы</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <details className="group p-5 rounded-xl bg-[#0f1328]/60 border border-white/5 hover:border-white/10 transition-all">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-white font-semibold pr-4">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{faq.a}</p>
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
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.neonHogwarts} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06091a] via-[#06091a]/70 to-[#06091a]" />
      </div>
      <FloatingParticles />

      <div className="container relative z-10 text-center">
        <AnimatedSection>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Готов стать </span>
            <span className="gradient-text">Криптаном?</span>
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Присоединяйся к академии, где разумность — это суперсила, а знания — твой щит.
          </p>
          <button className="cta-button px-12 py-5 rounded-xl text-xl inline-flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            Начать обучение — $19
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="absolute inset-0 bg-[#06091a]" />
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#9945ff] flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>CI</span>
            </div>
            <div>
              <span className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Crypto Intelligence</span>
              <p className="text-gray-500 text-xs" style={{ fontFamily: "var(--font-body)" }}>Academy</p>
            </div>
          </div>

          <p className="text-gray-500 text-sm text-center" style={{ fontFamily: "var(--font-body)" }}>
            Образовательная платформа. Не является инвестиционной рекомендацией.
            <br />
            Все инструменты соответствуют законодательству Республики Казахстан.
          </p>

          <p className="text-gray-600 text-xs" style={{ fontFamily: "var(--font-body)" }}>
            &copy; {new Date().getFullYear()} Crypto Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============ NAVBAR ============
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06091a]/80 backdrop-blur-xl border-b border-white/5">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#9945ff] flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>CI</span>
          </div>
          <span className="text-white font-bold text-lg hidden sm:block" style={{ fontFamily: "var(--font-display)" }}>Crypto Intelligence</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#modules" className="text-gray-400 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>Программа</a>
          <a href="#tools" className="text-gray-400 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>Инструменты</a>
          <a href="#faq" className="text-gray-400 hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>FAQ</a>
        </div>

        <button className="cta-button px-5 py-2 rounded-lg text-sm">
          Начать — $19
        </button>
      </div>
    </nav>
  );
}

// ============ MAIN PAGE ============
export default function Home() {
  return (
    <div className="min-h-screen bg-[#06091a] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <PhilosophySection />
      <div id="modules">
        <ModulesSection />
      </div>
      <div id="tools">
        <ToolsSection />
      </div>
      <AICuratorSection />
      <CultureSection />
      <PricingSection />
      <div id="faq">
        <FAQSection />
      </div>
      <FinalCTASection />
      <Footer />
    </div>
  );
}
