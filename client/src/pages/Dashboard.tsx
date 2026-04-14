import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, Shield, Zap, Brain, BarChart3,
  ListChecks, Search, Star, ArrowUpRight, ArrowDownRight,
  AlertTriangle, Activity, DollarSign, Clock, Eye, Bot
} from "lucide-react";

// Check auth
function requireAuth() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cryptoos_access") === "granted";
}

// ============ MACRO MULTIPLIER ============
function MacroMultiplier() {
  // Simulated macro data
  const macro = {
    inflation: 3.2,
    rate: 4.5,
    liquidity: "Сжатие",
    phase: "Распределение",
    signal: "reduce" as const,
  };

  const signalColors: Record<string, string> = {
    buy: "#00d4aa",
    hold: "#f0c040",
    reduce: "#f59e0b",
    wait: "#9945ff",
  };

  const signalLabels: Record<string, string> = {
    buy: "BUY — Накопление",
    hold: "HOLD — Держать",
    reduce: "REDUCE — Снижать риск",
    wait: "WAIT — Ждать",
  };

  return (
    <div className="bg-[#0f1328] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-[#00d4aa]" />
        <h3 className="text-lg font-bold">Макро-Мультипликатор</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#0a0e27] rounded-xl p-3">
          <p className="text-gray-500 text-xs mb-1">Инфляция</p>
          <p className="text-xl font-bold text-[#f59e0b]">{macro.inflation}%</p>
        </div>
        <div className="bg-[#0a0e27] rounded-xl p-3">
          <p className="text-gray-500 text-xs mb-1">Ставка ФРС</p>
          <p className="text-xl font-bold text-[#9945ff]">{macro.rate}%</p>
        </div>
        <div className="bg-[#0a0e27] rounded-xl p-3">
          <p className="text-gray-500 text-xs mb-1">Ликвидность</p>
          <p className="text-xl font-bold text-red-400">{macro.liquidity}</p>
        </div>
        <div className="bg-[#0a0e27] rounded-xl p-3">
          <p className="text-gray-500 text-xs mb-1">Фаза цикла</p>
          <p className="text-xl font-bold text-[#f59e0b]">{macro.phase}</p>
        </div>
      </div>

      <div
        className="rounded-xl p-4 text-center"
        style={{ backgroundColor: signalColors[macro.signal] + "15", border: `1px solid ${signalColors[macro.signal]}30` }}
      >
        <p className="text-gray-400 text-xs mb-1">Текущий сигнал</p>
        <p className="text-2xl font-bold" style={{ color: signalColors[macro.signal] }}>
          {signalLabels[macro.signal]}
        </p>
      </div>
    </div>
  );
}

// ============ CRYPTO MULTIPLIER ============
function CryptoMultiplier() {
  const crypto = {
    hashRibbons: "Капитуляция",
    s2fPrice: 82000,
    currentBtc: 84500,
    halvingDate: "Апрель 2024",
    piCycle: "Пересечение через ~45 дней",
    miningCost: 42000,
  };

  return (
    <div className="bg-[#0f1328] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-[#9945ff]" />
        <h3 className="text-lg font-bold">Крипто-Мультипликатор</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-[#0a0e27] rounded-xl">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-gray-400 text-sm">Hash Ribbons</span>
          </div>
          <span className="text-[#00d4aa] font-semibold text-sm">{crypto.hashRibbons}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#0a0e27] rounded-xl">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-gray-400 text-sm">S2F Модель</span>
          </div>
          <span className="text-white font-semibold text-sm">${crypto.s2fPrice.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#0a0e27] rounded-xl">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#9945ff]" />
            <span className="text-gray-400 text-sm">BTC Цена</span>
          </div>
          <span className="text-white font-semibold text-sm">${crypto.currentBtc.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#0a0e27] rounded-xl">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-gray-400 text-sm">Халвинг</span>
          </div>
          <span className="text-[#06b6d4] font-semibold text-sm">{crypto.halvingDate}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#0a0e27] rounded-xl">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-gray-400 text-sm">Себестоимость майнинга</span>
          </div>
          <span className="text-[#f59e0b] font-semibold text-sm">${crypto.miningCost.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#0a0e27] rounded-xl">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#9945ff]" />
            <span className="text-gray-400 text-sm">Pi Cycle</span>
          </div>
          <span className="text-[#9945ff] font-semibold text-sm">{crypto.piCycle}</span>
        </div>
      </div>
    </div>
  );
}

// ============ ASSETS TABLE ============
function AssetsTable() {
  const [assets] = useState([
    { asset: "BTC", type: "Spot", goal: "Long-term hold", horizon: "5+ лет", yield: "+240% 1y", exchange: "Binance", dist: "40%", forecast: "$150K" },
    { asset: "ETH", type: "Staking", goal: "Income", horizon: "2+ года", yield: "+120% 1y", exchange: "Bybit", dist: "25%", forecast: "$6K" },
    { asset: "SOL", type: "Spot", goal: "Growth", horizon: "1-2 года", yield: "+380% 1y", exchange: "KuCoin", dist: "15%", forecast: "$300" },
    { asset: "USDT", type: "DCA", goal: "Dry powder", horizon: "Постоянно", yield: "—", exchange: "Binance", dist: "10%", forecast: "—" },
    { asset: "GNK", type: "Spot", goal: "Early", horizon: "6-12 мес", yield: "+180% 1y", exchange: "KuCoin", dist: "10%", forecast: "$2.5" },
  ]);

  return (
    <div className="bg-[#0f1328] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-[#00d4aa]" />
          <h3 className="text-lg font-bold">Таблица Активов Crypto OS</h3>
        </div>
        <button className="text-[#00d4aa] text-sm hover:underline">+ Добавить</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-white/5">
              <th className="text-left py-2 px-2">Актив</th>
              <th className="text-left py-2 px-2">Тип</th>
              <th className="text-left py-2 px-2 hidden sm:table-cell">Цель</th>
              <th className="text-left py-2 px-2 hidden md:table-cell">Горизонт</th>
              <th className="text-left py-2 px-2">Доходн.</th>
              <th className="text-left py-2 px-2 hidden lg:table-cell">Биржа</th>
              <th className="text-left py-2 px-2 hidden lg:table-cell">% Портф.</th>
              <th className="text-left py-2 px-2 hidden md:table-cell">Прогноз</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-2 font-bold text-white">{a.asset}</td>
                <td className="py-3 px-2 text-gray-400">{a.type}</td>
                <td className="py-3 px-2 text-gray-400 hidden sm:table-cell">{a.goal}</td>
                <td className="py-3 px-2 text-gray-400 hidden md:table-cell">{a.horizon}</td>
                <td className="py-3 px-2">
                  <span className="text-[#00d4aa] font-semibold">{a.yield}</span>
                </td>
                <td className="py-3 px-2 text-gray-400 hidden lg:table-cell">{a.exchange}</td>
                <td className="py-3 px-2 text-gray-400 hidden lg:table-cell">{a.dist}</td>
                <td className="py-3 px-2 hidden md:table-cell">
                  <span className="text-[#9945ff] font-semibold">{a.forecast}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ WATCHLIST ============
function WatchlistSection() {
  const [watchlist] = useState([
    { coin: "BTC", score: 87, signal: "HOLD", price: "$84,500", change: "+2.1%", ai: "Сильная поддержка $82K" },
    { coin: "ETH", score: 72, signal: "ACCUM", price: "$2,150", change: "-0.5%", ai: "Накопление перед апгрейдом" },
    { coin: "SOL", score: 81, signal: "BUY", price: "$172", change: "+5.3%", ai: "Рост TVL, сильная экосистема" },
    { coin: "GNK", score: 65, signal: "WATCH", price: "$0.82", change: "+12%", ai: "Ранняя стадия, высокий потенциал" },
    { coin: "AVAX", score: 58, signal: "WAIT", price: "$28", change: "-1.2%", ai: "Ждём подтверждения тренда" },
  ]);

  return (
    <div className="bg-[#0f1328] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-[#f59e0b]" />
          <h3 className="text-lg font-bold">Watchlist монет для DCA</h3>
        </div>
        <button className="text-[#00d4aa] text-sm hover:underline flex items-center gap-1">
          <Search className="w-3 h-3" /> AI-чеклист
        </button>
      </div>

      <div className="space-y-2">
        {watchlist.map((w, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-[#0a0e27] rounded-xl hover:bg-[#0f1328] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4aa]/20 to-[#9945ff]/20 flex items-center justify-center">
                <span className="text-white font-bold text-xs">{w.coin.slice(0, 2)}</span>
              </div>
              <div>
                <p className="text-white font-semibold">{w.coin}</p>
                <p className="text-gray-500 text-xs">{w.price} <span className={w.change.startsWith("+") ? "text-[#00d4aa]" : "text-red-400"}>{w.change}</span></p>
              </div>
            </div>

            <div className="text-right">
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{
                  backgroundColor: w.signal === "BUY" ? "#00d4aa20" : w.signal === "HOLD" ? "#f0c04020" : w.signal === "ACCUM" ? "#9945ff20" : "#9945ff10",
                  color: w.signal === "BUY" ? "#00d4aa" : w.signal === "HOLD" ? "#f0c040" : w.signal === "ACCUM" ? "#9945ff" : "#9945ff",
                }}
              >
                {w.signal}
              </span>
              <p className="text-gray-500 text-xs mt-1 max-w-[200px] truncate">{w.ai}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ ACTIVE BOTS ============
function ActiveBots() {
  const bots = [
    { name: "Алго-бот KuCoin", status: "active", return: "+20%/мес", color: "#00d4aa" },
    { name: "DCA-бот Binance", status: "active", return: "Накопление", color: "#9945ff" },
    { name: "Grid-бот Bybit", status: "active", return: "+8%/мес", color: "#06b6d4" },
    { name: "ИИ-агент BitGet", status: "paused", return: "Диагностика", color: "#f59e0b" },
  ];

  return (
    <div className="bg-[#0f1328] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-5 h-5 text-[#06b6d4]" />
        <h3 className="text-lg font-bold">Активные боты и агенты</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {bots.map((b, i) => (
          <div key={i} className="p-4 bg-[#0a0e27] rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold text-sm">{b.name}</span>
              <span className={`w-2 h-2 rounded-full ${b.status === "active" ? "bg-[#00d4aa] animate-pulse" : "bg-[#f59e0b]"}`} />
            </div>
            <p className="text-gray-500 text-xs">{b.status === "active" ? "Работает" : "На паузе"}</p>
            <p className="text-sm font-bold mt-1" style={{ color: b.color }}>{b.return}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ AI ASSISTANT ============
function AIAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{role: string; text: string}[]>([
    { role: "ai", text: "Привет! Я твой AI-проводник Crypto OS. Спрашивай что угодно про рынок, портфель или стратегию." }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: message }]);
    setMessage("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: "Анализирую рынок... Сейчас BTC в фазе распределения, рекомендую снизить риск по альтам и держать BTC. Hash Ribbons показывают капитуляцию — это исторически зона накопления." }]);
    }, 1000);
  };

  return (
    <div className="bg-[#0f1328] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-[#9945ff]" />
        <h3 className="text-lg font-bold">ИИ-проводник 24/7</h3>
      </div>

      <div className="bg-[#0a0e27] rounded-xl p-4 mb-4 max-h-60 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[80%] px-3 py-2 rounded-xl text-sm"
              style={{
                background: m.role === "user" ? "linear-gradient(135deg, #00d4aa30, #9945ff30)" : "#0f1328",
                border: `1px solid ${m.role === "user" ? "#00d4aa30" : "#ffffff10"}`,
              }}
            >
              <p className="text-gray-300">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Спроси про рынок..."
          className="flex-1 px-3 py-2 rounded-xl bg-[#0a0e27] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00d4aa]"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #00d4aa, #9945ff)" }}
        >
          →
        </button>
      </div>
    </div>
  );
}

// ============ DASHBOARD ============
export default function Dashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!requireAuth()) {
      setLocation("/access");
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-[#06091a] text-white">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-[#06091a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#9945ff] flex items-center justify-center">
              <span className="text-white font-bold text-sm">CI</span>
            </div>
            <span className="text-white font-bold" style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}>
              Crypto OS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs hidden sm:block">Последнее обновление: 15.04.2026</span>
            <button
              onClick={() => { localStorage.removeItem("cryptoos_access"); setLocation("/access"); }}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <h1 className="text-2xl font-bold mb-1">
            Добро пожаловать в <span className="text-[#00d4aa]">Crypto OS</span>
          </h1>
          <p className="text-gray-500 text-sm">Твоя личная операционная система крипто-инвестора</p>
        </motion.div>

        {/* Row 1: Multipliers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <MacroMultiplier />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <CryptoMultiplier />
          </motion.div>
        </div>

        {/* Row 2: Assets */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <AssetsTable />
        </motion.div>

        {/* Row 3: Watchlist + Bots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <WatchlistSection />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <ActiveBots />
          </motion.div>
        </div>

        {/* Row 4: AI Assistant */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <AIAssistant />
        </motion.div>
      </div>
    </div>
  );
}
