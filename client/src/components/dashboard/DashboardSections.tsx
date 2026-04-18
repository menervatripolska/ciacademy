import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Brain,
  Coins,
  Compass,
  Eye,
  Flame,
  Gauge,
  Globe2,
  Layers,
  LineChart,
  Lock,
  Map as MapIcon,
  Network,
  Radar,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  History,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react";
import { useDashboardLiveData } from "@/hooks/useDashboardLiveData";
import type { CryptoMapRow } from "./dashboardData";

// ----- shared primitives -----

function SectionHeader({
  icon: Icon,
  title,
  kicker,
  right,
}: {
  icon: React.ElementType;
  title: string;
  kicker?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        {kicker && (
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/45 mb-1">
            {kicker}
          </div>
        )}
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-[#00d4aa]" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h2>
        </div>
      </div>
      {right && <div className="text-sm text-white/60">{right}</div>}
    </div>
  );
}

function Card({
  children,
  className = "",
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border ${
        accent ? "border-[#00d4aa]/30" : "border-white/10"
      } bg-white/[0.03] backdrop-blur-sm ${className}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
      }}
    >
      {children}
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  tone?: "neutral" | "up" | "down" | "warn" | "hot";
}) {
  const toneClass =
    tone === "up"
      ? "text-[#00d4aa]"
      : tone === "down"
      ? "text-red-400"
      : tone === "warn"
      ? "text-[#f59e0b]"
      : tone === "hot"
      ? "text-[#9945ff]"
      : "text-white";
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3">
      <div className="text-[11px] uppercase tracking-wider text-white/45">{label}</div>
      <div className={`text-xl font-bold mt-0.5 ${toneClass}`}>{value}</div>
      {hint && <div className="text-xs text-white/50 mt-0.5">{hint}</div>}
    </div>
  );
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "up" | "down" | "warn" | "hot";
}) {
  const map: Record<string, string> = {
    neutral: "bg-white/10 text-white/80",
    up: "bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30",
    down: "bg-red-500/15 text-red-400 border border-red-500/30",
    warn: "bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30",
    hot: "bg-[#9945ff]/15 text-[#9945ff] border border-[#9945ff]/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${map[tone]}`}
    >
      {children}
    </span>
  );
}

function Change({ v }: { v: number }) {
  const up = v >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-sm font-medium ${up ? "text-[#00d4aa]" : "text-red-400"}`}>
      {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {up ? "+" : ""}
      {v.toFixed(2)}%
    </span>
  );
}

// ============ 1. HERO OVERVIEW ============

export function HeroOverviewSection() {
  const { macro, crypto, snapshotLabel } = useDashboardLiveData();
  const items = [
    {
      icon: Gauge,
      label: "Макро-режим",
      value: "Transition",
      hint: `${macro.cyclePhase} · сигнал ${macro.signal}`,
      tone: "warn" as const,
    },
    {
      icon: Compass,
      label: "Крипто-сигнал",
      value: crypto.signal,
      hint: `F&G ${crypto.fearGreed} · ${crypto.fearGreedLabel}`,
      tone: "up" as const,
    },
    {
      icon: Coins,
      label: "BTC",
      value: `$${crypto.btcPrice.toLocaleString("en-US")}`,
      hint: `24h ${crypto.btc24h >= 0 ? "+" : ""}${crypto.btc24h.toFixed(2)}%`,
      tone: crypto.btc24h >= 0 ? ("up" as const) : ("down" as const),
    },
    {
      icon: Flame,
      label: "Доминация BTC",
      value: `${crypto.btcDominance.toFixed(1)}%`,
      hint: "Цикл в BTC-фазе",
      tone: "hot" as const,
    },
  ];
  return (
    <section>
      <SectionHeader
        icon={Rocket}
        title="Сегодня на рынке"
        kicker="01 · Обзор"
        right={<span>Срез: {snapshotLabel}</span>}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <Card key={it.label} className="p-4">
              <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
                <Icon className="w-4 h-4" />
                {it.label}
              </div>
              <div
                className={`text-2xl font-bold tracking-tight ${
                  it.tone === "up"
                    ? "text-[#00d4aa]"
                    : it.tone === "down"
                    ? "text-red-400"
                    : it.tone === "warn"
                    ? "text-[#f59e0b]"
                    : it.tone === "hot"
                    ? "text-[#9945ff]"
                    : "text-white"
                }`}
              >
                {it.value}
              </div>
              <div className="text-xs text-white/50 mt-1">{it.hint}</div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

// ============ 2. MACRO REGIME ============

export function MacroRegimeSection() {
  const { macro } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader
        icon={Globe2}
        title="Макро-режим"
        kicker="02 · Контекст"
        right={<Badge tone="warn">Режим: transition</Badge>}
      />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5 lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat
              label="CPI YoY"
              value={`${macro.cpiYoY}%`}
              hint={`Пред: ${macro.cpiPrevYoY}%`}
              tone="warn"
            />
            <Stat
              label="Ставка ФРС"
              value={`${macro.fedFundsLow}–${macro.fedFundsHigh}%`}
              hint="Без изменений"
              tone="hot"
            />
            <Stat
              label="DXY"
              value={macro.dxy.toFixed(2)}
              hint={`30d ${macro.dxy30dChange.toFixed(2)}%`}
              tone={macro.dxy30dChange < 0 ? "up" : "down"}
            />
            <Stat label="M2 YoY" value={`${macro.m2YoY}%`} hint={macro.liquidity} tone="neutral" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white/75 leading-relaxed">
            <span className="text-white font-semibold">Читаем сигнал:</span> {macro.rationale}
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-white/45 mb-1">
            Текущий сигнал
          </div>
          <div className="text-3xl font-bold text-[#f59e0b]">{macro.signal}</div>
          <div className="text-sm text-white/60 mt-1">{macro.cyclePhase}</div>

          <div className="mt-5 space-y-2">
            {(["BUY", "ACCUMULATE", "HOLD", "REDUCE", "WAIT"] as const).map((s) => (
              <div
                key={s}
                className={`flex items-center justify-between rounded-lg px-3 py-2 border ${
                  s === macro.signal
                    ? "bg-[#f59e0b]/15 border-[#f59e0b]/30"
                    : "border-white/5"
                }`}
              >
                <span className="text-sm">{s}</span>
                {s === macro.signal && (
                  <span className="text-xs text-[#f59e0b]">← сейчас</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

// ============ 3. CRYPTO MULTIPLIER ============

export function CryptoMultiplierSection() {
  const { crypto } = useDashboardLiveData();
  const fngPct = crypto.fearGreed;
  return (
    <section>
      <SectionHeader
        icon={Activity}
        title="Крипто-мультипликатор"
        kicker="03 · Скор рынка"
      />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-white/45 mb-2">
            Fear & Greed
          </div>
          <div className="flex items-end gap-3">
            <div className="text-5xl font-black text-[#f59e0b]">{crypto.fearGreed}</div>
            <div className="text-sm text-white/60 mb-2">{crypto.fearGreedLabel}</div>
          </div>
          <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${fngPct}%`,
                background:
                  "linear-gradient(90deg, #ef4444, #f59e0b, #fbbf24, #10b981, #00d4aa)",
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/40 mt-1">
            <span>0 · Экстр. страх</span>
            <span>100 · Экстр. жадность</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs uppercase tracking-wider text-white/45 mb-2">
            BTC-доминация
          </div>
          <div className="text-5xl font-black text-[#9945ff]">
            {crypto.btcDominance.toFixed(1)}%
          </div>
          <div className="text-sm text-white/60 mt-2">
            Стейблы: {crypto.stableDominance.toFixed(1)}% · Альты: {(100 - crypto.btcDominance - crypto.stableDominance).toFixed(1)}%
          </div>
          <div className="mt-4 h-3 flex rounded-full overflow-hidden">
            <div style={{ width: `${crypto.btcDominance}%` }} className="bg-[#f59e0b]" />
            <div style={{ width: `${crypto.stableDominance}%` }} className="bg-white/30" />
            <div
              style={{ width: `${100 - crypto.btcDominance - crypto.stableDominance}%` }}
              className="bg-[#9945ff]"
            />
          </div>
        </Card>

        <Card className="p-5" accent>
          <div className="text-xs uppercase tracking-wider text-white/45 mb-1">
            Сигнал цикла
          </div>
          <div className="text-3xl font-bold text-[#00d4aa]">{crypto.signal}</div>
          <div className="text-sm text-white/70 leading-relaxed mt-3">
            {crypto.rationale}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <Stat label="BTC" value={`$${crypto.btcPrice.toLocaleString("en-US")}`} hint={`7d ${crypto.btc7d.toFixed(1)}%`} tone={crypto.btc7d >= 0 ? "up" : "down"} />
        <Stat label="ETH" value={`$${crypto.ethPrice.toLocaleString("en-US")}`} hint={`24h ${crypto.eth24h.toFixed(1)}%`} tone={crypto.eth24h >= 0 ? "up" : "down"} />
        <Stat label="SOL" value={`$${crypto.solPrice.toFixed(2)}`} hint={`24h ${crypto.sol24h.toFixed(1)}%`} tone={crypto.sol24h >= 0 ? "up" : "down"} />
        <Stat label="Total MC" value={`$${crypto.totalMarketCapT.toFixed(2)}T`} hint="весь крипто-рынок" />
      </div>
    </section>
  );
}

// ============ 4. BTC STRUCTURE ============

export function BtcStructureSection() {
  const { btc } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader
        icon={Network}
        title="Структура BTC"
        kicker="04 · On-chain"
      />
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Stat label="Хэшрейт" value={`${btc.hashRateEH} EH/s`} hint={`30d ${btc.hashRate30dChange >= 0 ? "+" : ""}${btc.hashRate30dChange}%`} tone="up" />
        <Stat label="Сложность" value={`${btc.difficultyT} T`} hint={`ретаргет ${btc.nextDiffAdjustment}`} />
        <Stat label="Киты 30д" value={`+${(btc.whaleAccumulation30d / 1000).toFixed(0)}k BTC`} hint="накопление" tone="up" />
        <Stat label="ETF нетто 7д" value={`+$${btc.etfNetFlow7dB.toFixed(2)}B`} hint="приток" tone="up" />
        <Stat label="MVRV" value={btc.mvrv.toFixed(2)} hint="зона оценки" tone="warn" />
        <Stat label="Supply in profit" value={`${btc.supplyInProfit}%`} hint="нет капитуляции" />
      </div>
      <Card className="p-5 mt-4">
        <div className="text-sm text-white/75 leading-relaxed">
          <span className="text-white font-semibold">Интерпретация.</span> Хэшрейт держится на рекордных{" "}
          <span className="text-[#00d4aa]">{btc.hashRateEH} EH/s</span>, сложность скорректируется вниз на
          ретаргете {btc.nextDiffAdjustment} — майнеры не разбегаются. Киты накопили{" "}
          <span className="text-[#00d4aa]">+{(btc.whaleAccumulation30d / 1000).toFixed(0)}k BTC</span> за 30 дней,
          ETF даёт +${btc.etfNetFlow7dB.toFixed(2)}B за неделю. Retail — в страхе, institutional — копит.
          Это сигнал накопления, а не раздачи.
        </div>
      </Card>
    </section>
  );
}

// ============ 5. CRYPTO MAP ============

export function CryptoMapSection() {
  const { cryptoMap } = useDashboardLiveData();
  const statusTone = (s: CryptoMapRow["status"]): "up" | "down" | "warn" | "neutral" | "hot" => {
    switch (s) {
      case "Лидер":
        return "up";
      case "Догоняет":
        return "hot";
      case "Переоценён":
        return "warn";
      case "Выпадает":
        return "down";
      default:
        return "neutral";
    }
  };
  return (
    <section>
      <SectionHeader icon={MapIcon} title="Карта крипто-рынка" kicker="05 · Топ-12" />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-white/45 border-b border-white/5">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Актив</th>
                <th className="px-4 py-3 text-right">Цена</th>
                <th className="px-4 py-3 text-right">24h</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">7d</th>
                <th className="px-4 py-3 text-right hidden md:table-cell">MC (B)</th>
                <th className="px-4 py-3 hidden md:table-cell">Сектор</th>
                <th className="px-4 py-3">Мультипликатор</th>
                <th className="px-4 py-3">Статус</th>
              </tr>
            </thead>
            <tbody>
              {cryptoMap.map((r) => (
                <tr key={r.symbol} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-white/50">{r.rank}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{r.symbol}</div>
                    <div className="text-[11px] text-white/45">{r.name}</div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    ${r.price >= 1 ? r.price.toLocaleString("en-US") : r.price.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Change v={r.change24h} />
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">
                    <Change v={r.change7d} />
                  </td>
                  <td className="px-4 py-3 text-right hidden md:table-cell tabular-nums text-white/70">
                    {r.marketCapB.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <Badge tone="neutral">{r.sector}</Badge>
                  </td>
                  <td className="px-4 py-3 font-semibold">{r.multiplier}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}

// ============ 6. WATCHLIST ============

export function WatchlistSection() {
  const { watchlist } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader
        icon={Radar}
        title="Watchlist недели"
        kicker="06 · Что наблюдаем"
        right={<span>{watchlist.length} тикеров</span>}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {watchlist.map((t) => (
          <motion.div
            key={t.symbol}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-5 h-full">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-lg font-bold">{t.symbol}</div>
                  <div className="text-xs text-white/50">{t.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-white/40">Score</div>
                  <div className="text-2xl font-bold text-[#00d4aa]">{t.score}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {t.galaxyScore !== undefined && (
                  <Badge tone="hot">Galaxy {t.galaxyScore}</Badge>
                )}
                {t.altRank !== undefined && <Badge tone="neutral">AltRank #{t.altRank}</Badge>}
                <Badge tone={t.risk === "Низкий" ? "up" : t.risk === "Высокий" ? "down" : "warn"}>
                  Риск: {t.risk}
                </Badge>
                <Badge tone="neutral">{t.timeframe}</Badge>
              </div>
              <div className="text-sm text-white/70 mt-3 leading-relaxed">{t.trigger}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============ 6b. COIN OF THE WEEK ============

export function CoinOfTheWeekSection() {
  const { coinOfTheWeek: c, weeksHistory } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader
        icon={Trophy}
        title="Монета недели"
        kicker="06+ · Airtable · Coin of the Week"
        right={<Badge tone="up">{c.week}</Badge>}
      />
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Main card */}
        <Card className="p-6 lg:col-span-2 relative overflow-hidden" accent>
          <div className="absolute -top-10 -right-10 text-[140px] font-black text-white/[0.03] tracking-tighter select-none">
            {c.ticker}
          </div>
          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/45 mb-1">
                  {c.sector}
                </div>
                <div className="flex items-end gap-3">
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight">{c.ticker}</h3>
                  <span className="text-lg text-white/60 mb-1">{c.name}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge tone="up">AI Score {c.aiScore}/10</Badge>
                <Badge tone="hot">Social {c.socialScore}</Badge>
                <Badge tone="warn">{c.allocationBucket}</Badge>
              </div>
            </div>

            <div className="text-sm text-white/80 leading-relaxed mb-4">{c.reason}</div>

            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 mb-4">
              <div className="text-[11px] uppercase tracking-wider text-white/45 mb-1">
                Ключевой тезис
              </div>
              <div className="text-sm text-white/85 leading-relaxed">{c.thesis}</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <div className="text-xs font-semibold text-[#00d4aa] mb-2">Сильные стороны</div>
                <ul className="space-y-1.5">
                  {c.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-white/75 leading-relaxed flex gap-2">
                      <span className="text-[#00d4aa] mt-0.5">+</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-red-400 mb-2">Риски</div>
                <ul className="space-y-1.5">
                  {c.risks.map((r, i) => (
                    <li key={i} className="text-xs text-white/75 leading-relaxed flex gap-2">
                      <span className="text-red-400 mt-0.5">−</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* History */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-white/60" />
            <div className="text-sm font-semibold">История недель</div>
          </div>
          <div className="space-y-2">
            {weeksHistory.map((w, i) => (
              <div
                key={w.week}
                className={`rounded-xl p-3 border ${
                  i === 0
                    ? "bg-[#00d4aa]/10 border-[#00d4aa]/30"
                    : "bg-white/[0.03] border-white/5"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-bold">{w.ticker}</div>
                  <Badge tone={i === 0 ? "up" : "neutral"}>AI {w.aiScore}</Badge>
                </div>
                <div className="text-[11px] text-white/45 mb-1">{w.week}</div>
                <div className="text-[11px] text-white/60 leading-relaxed">{w.shortReason}</div>
                <div className="text-[10px] text-white/35 mt-1">{w.sector}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-white/40 mt-3 leading-relaxed">
            Источник: Airtable «Crypto OS» → «Coin of the Week». Обновляется планировщиком
            crypto-os-coin-of-the-week каждый понедельник 10:10.
          </div>
        </Card>
      </div>
    </section>
  );
}

// ============ 7. DCA ============

export function DcaSection() {
  const { dcaPlans } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader icon={Target} title="DCA-движок" kicker="07 · Автозакупка" />
      <div className="grid md:grid-cols-3 gap-4">
        {dcaPlans.map((p) => (
          <Card key={p.asset} className="p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold">{p.asset}</div>
              <Badge tone={p.multiplier > 1 ? "up" : p.multiplier === 1 ? "neutral" : "warn"}>
                x{p.multiplier}
              </Badge>
            </div>
            <div className="text-xs text-white/50 mb-3">{p.frequency} · след. {p.nextBuyDate}</div>
            <div className="flex items-end gap-2 mb-3">
              <div className="text-3xl font-bold">${p.recommendedMonthlyUsd}</div>
              <div className="text-xs text-white/45 mb-1">/мес</div>
            </div>
            <div className="text-xs text-white/50 mb-3">База ${p.baseMonthlyUsd} × {p.multiplier}</div>
            <div className="text-sm text-white/70 leading-relaxed">{p.reason}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ============ 8. GRID ============

export function GridSection() {
  const { gridBots } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader icon={Workflow} title="Grid-боты" kicker="08 · Автоматизация" />
      <div className="grid md:grid-cols-3 gap-4">
        {gridBots.map((b) => {
          const tone =
            b.status === "Запущен" ? "up" : b.status === "Пауза" ? "warn" : "neutral";
          return (
            <Card key={b.pair} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-bold">{b.pair}</div>
                <Badge tone={tone}>{b.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/[0.03] rounded-lg p-2">
                  <div className="text-white/45">Диапазон</div>
                  <div className="text-white font-semibold">
                    ${b.range[0].toLocaleString("en-US")}–${b.range[1].toLocaleString("en-US")}
                  </div>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2">
                  <div className="text-white/45">Сеток</div>
                  <div className="text-white font-semibold">{b.grids}</div>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2">
                  <div className="text-white/45">Ожид. в мес</div>
                  <div className="text-[#00d4aa] font-semibold">{b.expectedMonthly}%</div>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2">
                  <div className="text-white/45">PnL 30д</div>
                  <div className={`font-semibold ${b.pnl30d >= 0 ? "text-[#00d4aa]" : "text-red-400"}`}>
                    {b.pnl30d >= 0 ? "+" : ""}
                    {b.pnl30d}%
                  </div>
                </div>
              </div>
              <div className="text-xs text-white/45 mt-3">
                Сделок за 30 дней: {b.trades30d}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

// ============ 9. AI GUIDE ============

export function AiGuideSection() {
  const { aiGuideInsights } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader
        icon={Brain}
        title="AI-гид"
        kicker="09 · Ответы на сегодня"
        right={<Badge tone="hot">Gemini 2.5 · beta</Badge>}
      />
      <div className="grid md:grid-cols-2 gap-4">
        {aiGuideInsights.map((q) => (
          <Card key={q.id} className="p-5">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#9945ff] mt-1" />
              <div className="text-base font-semibold">{q.question}</div>
            </div>
            <div className="text-sm text-white/75 leading-relaxed">{q.answer}</div>
            <div className="flex flex-wrap gap-1 mt-3">
              {q.tags.map((t) => (
                <Badge key={t} tone="neutral">
                  #{t}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ============ 10. SEMI-CORE ============

export function SemiCoreSection() {
  const { semiCore } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader
        icon={Wallet}
        title="Semi-Core портфель"
        kicker="10 · Базовая аллокация"
      />
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row gap-2 mb-4 h-3 rounded-full overflow-hidden">
          {semiCore.map((a, i) => {
            const colors = [
              "#f59e0b",
              "#9945ff",
              "#00d4aa",
              "#06b6d4",
              "#ef4444",
              "#64748b",
            ];
            return (
              <div
                key={a.symbol}
                style={{
                  width: `${a.allocationPct}%`,
                  background: colors[i % colors.length],
                }}
                title={`${a.symbol} ${a.allocationPct}%`}
              />
            );
          })}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {semiCore.map((a) => (
            <div
              key={a.symbol}
              className="rounded-xl bg-white/[0.03] border border-white/5 p-3"
            >
              <div className="flex items-center justify-between">
                <div className="text-base font-bold">{a.symbol}</div>
                <div className="text-sm text-white/70">{a.allocationPct}%</div>
              </div>
              <div className="text-xs text-white/60 mt-1">{a.thesis}</div>
              <div className="text-[11px] text-[#00d4aa] mt-1">Множитель: {a.multiplier}</div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

// ============ 11. ADVANCED MODULES ============

export function AdvancedModulesSection() {
  const { advancedModules } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader
        icon={Layers}
        title="Продвинутые модули"
        kicker="11 · Под капотом Crypto OS"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {advancedModules.map((m) => (
          <Card key={m.name} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">{m.name}</div>
              <Badge
                tone={
                  m.status === "Активен"
                    ? "up"
                    : m.status === "Тестируется"
                    ? "hot"
                    : "warn"
                }
              >
                {m.status}
              </Badge>
            </div>
            <div className="text-xs text-white/60 leading-relaxed">{m.description}</div>
            {m.metric && (
              <div className="text-[11px] text-[#00d4aa] mt-2 font-semibold">
                {m.metric}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

// ============ 12. ARCHITECTURE LAYERS ============

export function ArchitectureLayersSection() {
  const { architectureLayers } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader
        icon={LineChart}
        title="Архитектура"
        kicker="12 · Как устроена Crypto OS"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {architectureLayers.map((l, i) => (
          <Card key={l.name} className="p-5 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 text-7xl font-black text-white/[0.03]">
              0{i + 1}
            </div>
            <div className="relative">
              <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
                Слой {i + 1}
              </div>
              <div className="text-lg font-bold mb-2">{l.name}</div>
              <div className="text-sm text-white/70 mb-3">{l.role}</div>
              <div className="flex flex-wrap gap-1">
                {l.tools.map((t) => (
                  <Badge key={t} tone="neutral">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ============ 13. EXECUTION MODULES ============

export function ExecutionModulesSection() {
  const { executionModules } = useDashboardLiveData();
  return (
    <section>
      <SectionHeader
        icon={Zap}
        title="Модули исполнения"
        kicker="13 · Что делаем руками или автоматом"
      />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-white/45 border-b border-white/5">
                <th className="px-4 py-3">Модуль</th>
                <th className="px-4 py-3">Когда срабатывает</th>
                <th className="px-4 py-3">Что делает</th>
                <th className="px-4 py-3 hidden sm:table-cell">Частота</th>
              </tr>
            </thead>
            <tbody>
              {executionModules.map((m) => (
                <tr key={m.name} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-semibold">{m.name}</td>
                  <td className="px-4 py-3 text-white/70">{m.trigger}</td>
                  <td className="px-4 py-3 text-white/70">{m.action}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge tone="neutral">{m.cadence}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="mt-4 flex items-start gap-2 text-xs text-white/50">
        <AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5" />
        <div>
          Crypto OS — обучающая система. Конкретные сделки, размеры позиций и точки
          входа каждый ученик принимает сам. Это не финсовет.
        </div>
      </div>
    </section>
  );
}
