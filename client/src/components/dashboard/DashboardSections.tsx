import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDown as ArrowDownIcon,
  BellRing,
  BookOpen,
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
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart as RechartsLineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardLiveData } from "@/hooks/useDashboardLiveData";
import { useLiveStrategyMetrics } from "@/hooks/useLiveStrategyMetrics";
import type { CryptoMapRow, LiveStrategy, MacroSignalKey, MultiplierKey } from "./dashboardData";
import {
  altseasonIndexToday,
  btcDominanceZones,
  btcS2fNowIndex,
  btcS2fSeries,
  fearGreedToday,
  hashRibbonsStatus,
  liveStrategies,
  macroSignalModes,
  marketWidgetLinks,
  miningCostExplain,
  miningCostSeries,
  miningCostToday,
  multiplierModes,
  piCycleStatus,
  publishedCharts,
  s2fExplain,
} from "./dashboardData";


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
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-[#f59e0b]">
              {macroSignalModes[macro.signal as MacroSignalKey]?.label ?? macro.signal}
            </div>
            <HelpHint title="Как читать макро-сигнал">
              <div>
                <span className="text-white">BUY / Покупать</span> — сильный вход, DCA по полному плану.
              </div>
              <div>
                <span className="text-white">ACCUMULATE / Накапливать</span> — плавный DCA, не всей суммой.
              </div>
              <div>
                <span className="text-white">HOLD / Держать</span> — сидим в позициях, ничего не делаем.
              </div>
              <div>
                <span className="text-white">REDUCE / Снижать</span> — фиксируем часть прибыли, уходим в BTC/стейблы.
              </div>
              <div>
                <span className="text-white">WAIT / Ждать</span> — DCA на паузе, ждём сигнал разворота.
              </div>
            </HelpHint>
          </div>
          <div className="text-sm text-white/60 mt-1">{macro.cyclePhase}</div>
          <div className="mt-3 rounded-md border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-3 text-[12px] text-white/80 leading-relaxed">
            {macroSignalModes[macro.signal as MacroSignalKey]?.action ?? "Следуем плану DCA."}
          </div>

          <div className="mt-5 space-y-2">
            {(["BUY", "ACCUMULATE", "HOLD", "REDUCE", "WAIT"] as const).map((s) => {
              const m = macroSignalModes[s];
              return (
                <div
                  key={s}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 border ${
                    s === macro.signal
                      ? "bg-[#f59e0b]/15 border-[#f59e0b]/30"
                      : "border-white/5"
                  }`}
                >
                  <span className="text-sm">
                    <span className="text-white/90">{m.label}</span>
                    <span className="text-white/40 text-xs ml-2">{s}</span>
                  </span>
                  {s === macro.signal && (
                    <span className="text-xs text-[#f59e0b]">← сейчас</span>
                  )}
                </div>
              );
            })}
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
          <DominanceInterpret dominance={crypto.btcDominance} />
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

      <MultiplierLegend />
    </section>
  );
}


// ============================================================================
// BTC Structure — вспомогательные виджеты (Hash Ribbons lamp, Pi Cycle arrow,
// Mining Cost Zones chart, S2F chart, TV mini-widgets, F&G round, Altseason)
// ============================================================================

function ChartCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          {subtitle ? <div className="text-[11px] text-white/50">{subtitle}</div> : null}
        </div>
      </div>
      <div className="h-[240px]">{children}</div>
      {footer ? <div className="mt-3 text-xs text-white/70">{footer}</div> : null}
    </Card>
  );
}

function TvMiniSymbol({ url, title }: { url: string; title: string }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-4 pt-3 pb-1 text-[11px] uppercase tracking-wider text-white/45">{title}</div>
      <iframe
        src={url}
        title={title}
        loading="lazy"
        style={{ width: "100%", height: 200, border: 0, background: "transparent" }}
      />
    </Card>
  );
}

function TvAdvancedChart({
  interval,
  caption,
}: {
  interval: "W" | "D";
  caption: string;
}) {
  // TradingView advanced-chart widget: BTCUSD с двумя MA, которые формируют классический
  // Pi Cycle Top сигнал (MA111 оранжевая + MA350 зелёная ×2). Visual Hash Ribbons у нас
  // уже нарисован выше в HashRibbonsWidget — эти чарты дают «сырую» картину рынка от TV.
  const intervalLabel = interval === "W" ? "1W" : "1D";
  const config = {
    symbol: "BITSTAMP:BTCUSD",
    interval,
    theme: "dark",
    style: "1",
    locale: "ru",
    withdateranges: true,
    hide_side_toolbar: false,
    allow_symbol_change: false,
    save_image: false,
    studies: [
      "MASimple@tv-basicstudies",
      "MASimple@tv-basicstudies",
    ],
    studies_overrides: {
      "moving average.length": 111,
      "moving average.plot.color": "#f59e0b",
      "moving average 2.length": 350,
      "moving average 2.plot.color": "#00d4aa",
    },
    hide_top_toolbar: false,
    hide_legend: false,
    backgroundColor: "rgba(10,12,24,0.0)",
    gridColor: "rgba(255,255,255,0.05)",
    support_host: "https://www.tradingview.com",
  };
  const src = `https://s.tradingview.com/widgetembed/?${new URLSearchParams({
    symbol: config.symbol,
    interval,
    theme: "dark",
    style: "1",
    locale: "ru",
    toolbarbg: "0a0c18",
    studies: JSON.stringify(["MASimple@tv-basicstudies(111)", "MASimple@tv-basicstudies(350)"]),
    withdateranges: "1",
    hide_side_toolbar: "0",
    allow_symbol_change: "0",
    save_image: "0",
    hideideas: "1",
  }).toString()}`;
  const openUrl = `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(config.symbol)}&interval=${interval}`;
  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="text-[11px] uppercase tracking-wider text-white/45">
          TradingView · BTC / USD
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-white/80">
            {intervalLabel}
          </div>
          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] uppercase tracking-wider text-[#3ba5ff] hover:underline"
          >
            открыть →
          </a>
        </div>
      </div>
      <div className="relative bg-black/40" style={{ aspectRatio: "16 / 10" }}>
        <iframe
          src={src}
          title={`TradingView BTCUSD ${intervalLabel} · Pi Cycle + Hash Ribbons`}
          loading="lazy"
          style={{ width: "100%", height: "100%", border: 0, background: "transparent" }}
        />
      </div>
      <div className="px-4 py-3 text-[12px] leading-relaxed text-white/60 border-t border-white/5">
        {caption}
      </div>
    </Card>
  );
}

function TvPublishedEmbed({ url, label }: { url: string; label: string }) {
  if (!url) {
    return (
      <div className="mt-3 rounded-md border border-dashed border-white/15 p-3 text-[11px] text-white/45">
        {label}: публикация TradingView будет вставлена сюда (URL пустой — обнови publishedCharts).
      </div>
    );
  }
  const snapshotMatch = url.match(/^https?:\/\/www\.tradingview\.com\/x\/([A-Za-z0-9]+)\/?$/);
  if (snapshotMatch) {
    const hash = snapshotMatch[1];
    const imgUrl = `https://s3.tradingview.com/snapshots/${hash[0].toLowerCase()}/${hash}.png`;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block overflow-hidden rounded-md border border-white/10 bg-black/30 hover:border-white/25 transition"
      >
        <img src={imgUrl} alt={label} loading="lazy" style={{ width: "100%", display: "block" }} />
        <div className="px-3 py-1.5 text-[11px] text-white/55 bg-black/40 border-t border-white/10">
          {label} · открыть в TradingView ↗
        </div>
      </a>
    );
  }
  return (
    <div className="mt-3 overflow-hidden rounded-md border border-white/10 bg-black/30">
      <iframe
        src={url}
        title={label}
        loading="lazy"
        style={{ width: "100%", height: 320, border: 0 }}
      />
    </div>
  );
}

function TimeframeToggle({
  value,
  onChange,
}: {
  value: "daily" | "weekly";
  onChange: (v: "daily" | "weekly") => void;
}) {
  const btn = (v: "daily" | "weekly", label: string) => (
    <button
      type="button"
      onClick={() => onChange(v)}
      className={
        "px-3 py-1 text-xs rounded-md border transition " +
        (value === v
          ? "border-white/30 bg-white/10 text-white"
          : "border-white/10 text-white/60 hover:text-white")
      }
    >
      {label}
    </button>
  );
  return (
    <div className="inline-flex gap-1.5">
      {btn("daily", "1D")}
      {btn("weekly", "1W")}
    </div>
  );
}

function HashRibbonsLamp({ on }: { on: boolean }) {
  return (
    <div
      className={
        "relative inline-flex h-14 w-14 items-center justify-center rounded-full border " +
        (on ? "border-[#3ba5ff]/70 bg-[#0a2540]" : "border-white/15 bg-black/30")
      }
      style={on ? { boxShadow: "0 0 22px rgba(59,165,255,0.55)" } : undefined}
      aria-label={on ? "Hash Ribbons buy — сигнал активен" : "Hash Ribbons — сигнала нет"}
    >
      <BellRing className={"h-6 w-6 " + (on ? "text-[#7bc6ff]" : "text-white/35")} />
    </div>
  );
}

function PiCycleArrow({ on }: { on: boolean }) {
  return (
    <div
      className={
        "relative inline-flex h-14 w-14 items-center justify-center rounded-full border " +
        (on ? "border-[#ff4d4f]/80 bg-[#2a0a0a]" : "border-white/15 bg-black/30")
      }
      style={on ? { boxShadow: "0 0 22px rgba(255,77,79,0.55)" } : undefined}
      aria-label={on ? "Pi Cycle TOP — сигнал активен" : "Pi Cycle — сигнала нет"}
    >
      <ArrowDownIcon className={"h-6 w-6 " + (on ? "text-[#ff8a8a]" : "text-white/35")} />
    </div>
  );
}

function HashRibbonsWidget() {
  const [tf, setTf] = useState<"daily" | "weekly">("daily");
  const cur = hashRibbonsStatus.timeframes[tf];
  const on = cur.state === "recovery";
  const spreadPct = (((cur.ma30 - cur.ma60) / cur.ma60) * 100).toFixed(2);
  const snapshotUrl = tf === "daily" ? publishedCharts.hashRibbonsDaily : publishedCharts.hashRibbonsWeekly;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <HashRibbonsLamp on={on} />
          <div>
            <div className="text-sm font-semibold text-white">Hash Ribbons</div>
            <div className="text-[11px] text-white/50">
              Обновлено {new Date(hashRibbonsStatus.updatedAt).toLocaleString("ru-RU")}
            </div>
          </div>
        </div>
        <TimeframeToggle value={tf} onChange={setTf} />
      </div>
      <div className="mt-4 text-sm text-white/80">{cur.label}</div>
      <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">MA30 хэшрейт</div>
          <div className="text-white tabular-nums">{cur.ma30} EH/s</div>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">MA60 хэшрейт</div>
          <div className="text-white tabular-nums">{cur.ma60} EH/s</div>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">Спред MA30 − MA60</div>
          <div className={"tabular-nums " + (on ? "text-[#7bc6ff]" : "text-white/70")}>
            {on ? "+" : ""}
            {spreadPct}%
          </div>
        </div>
      </div>
      <div className="mt-3 text-[12px] text-white/60">
        Последний Buy: <span className="text-white">{cur.lastBuy}</span> · Последняя капитуляция:{" "}
        <span className="text-white/80">{cur.lastCapitulation}</span>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-white/75">{cur.interpretation}</div>
      <TvPublishedEmbed url={snapshotUrl} label={`Hash Ribbons · ${tf === "daily" ? "дневной ТФ" : "недельный ТФ"}`} />
    </Card>
  );
}

function PiCycleWidget() {
  const [tf, setTf] = useState<"daily" | "weekly">("daily");
  const cur = piCycleStatus.timeframes[tf];
  const on = cur.state === "top-signal";
  const snapshotUrl = tf === "daily" ? publishedCharts.piCycleDaily : publishedCharts.piCycleWeekly;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <PiCycleArrow on={on} />
          <div>
            <div className="text-sm font-semibold text-white">Pi Cycle Top</div>
            <div className="text-[11px] text-white/50">
              Обновлено {new Date(piCycleStatus.updatedAt).toLocaleString("ru-RU")}
            </div>
          </div>
        </div>
        <TimeframeToggle value={tf} onChange={setTf} />
      </div>
      <div className="mt-4 text-sm text-white/80">{cur.label}</div>
      <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">MA111</div>
          <div className="text-white tabular-nums">${cur.ma111.toLocaleString("en-US")}</div>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">MA350×2</div>
          <div className="text-white tabular-nums">${cur.ma350x2.toLocaleString("en-US")}</div>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">До top-зоны</div>
          <div className={"tabular-nums " + (on ? "text-[#ff8a8a]" : "text-white/70")}>
            {cur.distancePct.toFixed(1)}%
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-white/75">{cur.interpretation}</div>
      <TvPublishedEmbed url={snapshotUrl} label={`Pi Cycle · ${tf === "daily" ? "дневной ТФ" : "недельный ТФ"}`} />
    </Card>
  );
}



function S2FExplainBox() {
  return (
    <Card className="p-5 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Compass className="w-4 h-4 text-[#f59e0b]" />
        <div className="text-sm font-semibold text-white">{s2fExplain.title}</div>
      </div>
      <div className="text-[13px] text-white/80 leading-relaxed mb-4">{s2fExplain.lead}</div>
      <div className="grid gap-3 md:grid-cols-3">
        {s2fExplain.waypoints.map((w, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-black/20 p-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#f59e0b] mb-1">{w.phase}</div>
            <div className="text-[12px] text-white/75 leading-relaxed">{w.hint}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-[#f59e0b]/25 bg-[#f59e0b]/5 p-3 text-[12px] text-white/80 leading-relaxed italic">
        {s2fExplain.closing}
      </div>
    </Card>
  );
}

// ---------- интерпретации (мультипликаторы / доминация / тултипы) ----------

function HelpHint({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block align-middle">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Как читать: ${title}`}
        className={
          "inline-flex items-center justify-center w-4 h-4 text-[10px] font-semibold rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition " +
          (open ? "bg-white/10 text-white border-white/60" : "bg-transparent")
        }
      >
        ?
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute z-40 top-5 right-0 w-72 rounded-lg border border-white/15 bg-[#0b0b10]/95 p-3 text-left shadow-xl backdrop-blur">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1.5">{title}</div>
            <div className="text-[12px] text-white/80 leading-relaxed space-y-2">{children}</div>
          </div>
        </>
      )}
    </span>
  );
}

function MultiplierLegend() {
  return (
    <Card className="p-5 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Gauge className="w-4 h-4 text-[#00d4aa]" />
        <div className="text-sm font-semibold text-white">Режимы мультипликатора — что делать</div>
      </div>
      <div className="grid gap-2 md:grid-cols-5 sm:grid-cols-2 grid-cols-1">
        {(Object.entries(multiplierModes) as [MultiplierKey, (typeof multiplierModes)[MultiplierKey]][]).map(
          ([key, m]) => (
            <div key={key} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">{key}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">{m.label}</div>
              </div>
              <div className="mt-1 text-[11px] text-white/60 leading-relaxed">{m.short}</div>
              <div className="mt-2 text-[11px] text-white/75 leading-relaxed">{m.action}</div>
              <div className="mt-2 text-[10px] text-white/45 leading-relaxed">Когда: {m.useWhen}</div>
            </div>
          ),
        )}
      </div>
    </Card>
  );
}

function pickDominanceZone(value: number) {
  return (
    btcDominanceZones.find((z) => value >= z.min && value < z.max) ??
    btcDominanceZones[btcDominanceZones.length - 1]
  );
}

function DominanceInterpret({ dominance }: { dominance: number }) {
  const zone = pickDominanceZone(dominance);
  const toneCls =
    zone.tone === "up"
      ? "text-[#00d4aa]"
      : zone.tone === "hot"
      ? "text-[#9945ff]"
      : zone.tone === "warn"
      ? "text-[#f59e0b]"
      : zone.tone === "down"
      ? "text-red-400"
      : "text-white/80";
  return (
    <div className="mt-3 rounded-md border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className={"text-[11px] uppercase tracking-[0.18em] " + toneCls}>{zone.label}</span>
        <span className="text-[11px] text-white/40">· BTC.D {dominance.toFixed(1)}%</span>
      </div>
      <div className="text-[12px] text-white/75 leading-relaxed">{zone.action}</div>
    </div>
  );
}

// ============ 4. BTC STRUCTURE ============


export function BtcStructureSection() {
  const { btc, crypto } = useDashboardLiveData();
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

      {/* --- Дополнительный слой: рыночный контекст + цикл + Hash Ribbons + Pi Cycle --- */}

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-wider text-white/45">Fear &amp; Greed · alternative.me</div>
          <div className="mt-3 flex items-center justify-center">
            <a
              href={fearGreedToday.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="block"
              title="Открыть на alternative.me"
            >
              <img
                src={fearGreedToday.widgetImgUrl}
                alt={`Fear & Greed Index: ${fearGreedToday.value} · ${fearGreedToday.label}`}
                loading="lazy"
                style={{ width: 200, height: 200, display: "block" }}
              />
            </a>
          </div>
          <div className="mt-3 text-[12px] text-white/65">
            Сейчас <span className="text-white">{fearGreedToday.value}</span> · {fearGreedToday.label}. Неделю
            назад было {fearGreedToday.history7d[0].value}.
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-wider text-white/45">Altseason Index</div>
          <div className="mt-3 flex items-end gap-3">
            <div className="text-5xl font-black text-[#f59e0b] tabular-nums">{altseasonIndexToday.value}</div>
            <div className="pb-1 text-sm text-white/60">/ 100 · {altseasonIndexToday.label}</div>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded bg-white/5">
            <div
              style={{ width: `${altseasonIndexToday.value}%` }}
              className="h-2 bg-gradient-to-r from-[#f59e0b] via-[#00d4aa] to-[#3ba5ff]"
            />
          </div>
          <div className="mt-3 text-[12px] text-white/60">{altseasonIndexToday.note}</div>
          <a
            href={altseasonIndexToday.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-[11px] text-[#3ba5ff] hover:underline"
          >
            blockchaincenter.net →
          </a>
        </Card>
        <TvMiniSymbol url={marketWidgetLinks.totalMarketCap} title="Крипторынок · Total Market Cap" />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <TvMiniSymbol url={marketWidgetLinks.btcDominance} title="Доминация BTC · BTC.D" />
        <Card className="p-0 overflow-hidden">
          <div className="px-4 pt-3 pb-1 text-[11px] uppercase tracking-wider text-white/45">Сила альтов · ETH / BTC</div>
          <iframe
            src={marketWidgetLinks.ethBtc}
            title="ETH/BTC"
            loading="lazy"
            style={{ width: "100%", height: 200, border: 0, background: "transparent" }}
          />
          <div className="px-4 pb-4 pt-1 text-[12px] leading-relaxed text-white/75">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
              <span className="text-white/50 text-[11px] uppercase tracking-wider">Сейчас</span>
              <span className="text-base font-semibold text-white tabular-nums">{crypto.ethBtcRatio.toFixed(4)}</span>
              <span className="rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#f59e0b]">BTC-фаза</span>
            </div>
            <p>
              ETH/BTC держится у минимумов цикла — капитал не перетекает из BTC в альты. Пока этот коэффициент{" "}
              <span className="text-white/90">не пробьёт вверх зону 0.040–0.055</span>, альтсезона не будет: ETH и весь рынок альтов продолжают слабеть относительно биткоина.
            </p>
            <p className="mt-2 text-white/60">
              <span className="text-white/80">Триггер разворота:</span> рост выше 0.055 + падение BTC.D ниже 55%. До этого — альты только для точечных идей, не для широкой закупки.
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <div className="text-sm font-semibold text-white">Зоны себестоимости майнинга</div>
              <div className="text-[11px] text-white/50">Цена BTC vs диапазоны себестоимости добычи (6 мес)</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
            <div className="rounded-md border border-white/10 bg-black/30 p-3">
              <div className="text-[11px] text-white/45">Цена BTC</div>
              <div className="text-lg font-semibold text-white tabular-nums">${miningCostToday.price.toLocaleString("en-US")}</div>
            </div>
            <div className="rounded-md border border-[#f59e0b]/25 bg-[#f59e0b]/10 p-3">
              <div className="text-[11px] text-[#f59e0b]">Средняя себестоимость</div>
              <div className="text-lg font-semibold text-white tabular-nums">${miningCostToday.avgCostUsd.toLocaleString("en-US")}</div>
            </div>
            <div className="rounded-md border border-[#00d4aa]/25 bg-[#00d4aa]/10 p-3">
              <div className="text-[11px] text-[#00d4aa]">Маржа майнеров</div>
              <div className="text-lg font-semibold text-white tabular-nums">+{miningCostToday.marginPct.toFixed(1)}%</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3 text-[11px]">
            <div className="rounded border border-white/10 bg-black/20 p-2">
              <span className="text-[#00d4aa]">эффективные майнеры</span>{" "}
              <span className="text-white tabular-nums">${miningCostToday.efficientCostUsd.toLocaleString("en-US")}</span>
            </div>
            <div className="rounded border border-white/10 bg-black/20 p-2">
              <span className="text-[#ff4d4f]">высокая себес (риск капитуляции)</span>{" "}
              <span className="text-white tabular-nums">${miningCostToday.highCostUsd.toLocaleString("en-US")}</span>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={miningCostSeries} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
                <defs>
                  <linearGradient id="miningGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00d4aa" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="miningYellow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="miningRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff4d4f" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#ff4d4f" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }} />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
                  width={62}
                  domain={[40000, 100000]}
                  ticks={[40000, 55000, 68200, 76100, 85000, 100000]}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ background: "#0b0b10", border: "1px solid rgba(255,255,255,0.12)", fontSize: 12 }}
                  labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                  formatter={(v: number) => `$${v.toLocaleString("en-US")}`}
                />
                <Area type="monotone" dataKey="redZone" stroke="#ff4d4f" fill="url(#miningRed)" strokeWidth={1} />
                <Area type="monotone" dataKey="yellowZone" stroke="#f59e0b" fill="url(#miningYellow)" strokeWidth={1} />
                <Area type="monotone" dataKey="greenZone" stroke="#00d4aa" fill="url(#miningGreen)" strokeWidth={1} />
                <Line type="monotone" dataKey="price" stroke="#ffffff" strokeWidth={2} dot={false} />
                <ReferenceLine
                  y={miningCostToday.avgCostUsd}
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  label={{ value: `себес ${(miningCostToday.avgCostUsd / 1000).toFixed(1)}k`, position: "insideRight", fill: "#f59e0b", fontSize: 10 }}
                />
                <ReferenceLine
                  y={miningCostToday.price}
                  stroke="#ffffff"
                  strokeDasharray="2 2"
                  label={{ value: `цена ${(miningCostToday.price / 1000).toFixed(1)}k`, position: "insideRight", fill: "#ffffff", fontSize: 10 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 rounded-md border border-[#00d4aa]/30 bg-[#00d4aa]/5 p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#00d4aa]">Как читать</span>
              <HelpHint title="Где закупать BTC">
                <div>{miningCostExplain.summary}</div>
                <div className="text-white/75">{miningCostExplain.greenZoneRule}</div>
              </HelpHint>
            </div>
            <div className="text-[12px] text-white/80 leading-relaxed">
              <span className="text-white font-semibold">Зелёная зона</span> — между коммерческой и промышленной себестоимостью. Это диапазон закупа BTC.{" "}
              <span className="text-[#00d4aa]">Нижняя зелёная граница (~${miningCostToday.efficientCostUsd.toLocaleString("en-US")})</span> —
              исторически дно рынка: ниже этой линии BTC почти не бывал.
            </div>
            <ul className="mt-2 space-y-1 text-[12px] text-white/75 list-none">
              {miningCostExplain.howToAct.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#00d4aa] mt-0.5">›</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 text-[11px] text-white/55">
              Сейчас: цена ${miningCostToday.price.toLocaleString("en-US")}, средняя себес ${miningCostToday.avgCostUsd.toLocaleString("en-US")},
              маржа <span className="text-[#00d4aa]">+{miningCostToday.marginPct.toFixed(1)}%</span>.
            </div>
          </div>
        </Card>

        <ChartCard
          title="Stock-to-Flow · модель vs факт"
          subtitle="Где BTC относительно модельной кривой Plan B"
          footer={
            <>
              Сегодня цена{" "}
              <span className="text-white">
                ${btcS2fSeries[btcS2fNowIndex].price.toLocaleString("en-US")}
              </span>{" "}
              при модели{" "}
              <span className="text-white">
                ${btcS2fSeries[btcS2fNowIndex].model.toLocaleString("en-US")}
              </span>{" "}
              — цикл догоняет модель после халвинга 2024.
            </>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={btcS2fSeries} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }} />
              <YAxis
                scale="log"
                domain={["auto", "auto"]}
                tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
                width={58}
              />
              <Tooltip
                contentStyle={{ background: "#0b0b10", border: "1px solid rgba(255,255,255,0.12)", fontSize: 12 }}
                labelStyle={{ color: "rgba(255,255,255,0.6)" }}
              />
              <Line type="monotone" dataKey="model" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="price" stroke="#3ba5ff" strokeWidth={2} dot={false} />
              <ReferenceDot
                x={btcS2fSeries[btcS2fNowIndex].date}
                y={btcS2fSeries[btcS2fNowIndex].price}
                r={5}
                fill="#ffffff"
                stroke="#ffffff"
                label={{ value: "мы здесь", position: "top", fill: "#ffffff", fontSize: 10 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <HashRibbonsWidget />
        <PiCycleWidget />
      </div>

      <S2FExplainBox />
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
  const [capital, setCapital] = useState<number>(10000);
  const [capitalInput, setCapitalInput] = useState<string>("10000");

  const applyCapital = (value: string) => {
    setCapitalInput(value);
    const digitsOnly = value.replace(/[^0-9]/g, "");
    const parsed = digitsOnly === "" ? 0 : parseInt(digitsOnly, 10);
    setCapital(isFinite(parsed) ? parsed : 0);
  };

  const presets = [1000, 5000, 10000, 50000];

  return (
    <section>
      <SectionHeader icon={Target} title="DCA-движок" kicker="07 · Автозакупка" />

      <Card className="p-5 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-wider text-white/45 mb-1">Ваш капитал (весь портфель)</div>
            <div className="flex items-center gap-2">
              <span className="text-xl text-white/60">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={capitalInput}
                onChange={(e) => applyCapital(e.target.value)}
                className="w-full max-w-[220px] rounded-md border border-white/15 bg-black/30 px-3 py-2 text-2xl font-bold tabular-nums text-white focus:border-[#3ba5ff]/60 focus:outline-none"
                placeholder="10000"
                data-testid="input-dca-capital"
              />
            </div>
            <div className="mt-2 text-[12px] text-white/55 leading-relaxed">
              Монета недели — 1% капитала ({'$'}{(capital * 0.01).toLocaleString("en-US", { maximumFractionDigits: 2 })}),
              монета дня — 0.5% ({'$'}{(capital * 0.005).toLocaleString("en-US", { maximumFractionDigits: 2 })}). Каждый
              бакет делится на 3 равные закупки по ценовым уровням.
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => applyCapital(String(v))}
                className={
                  "rounded-md border px-3 py-1.5 text-xs tabular-nums transition " +
                  (capital === v
                    ? "border-[#3ba5ff]/60 bg-[#3ba5ff]/15 text-white"
                    : "border-white/15 bg-black/30 text-white/70 hover:border-white/30")
                }
                data-testid={`button-dca-preset-${v}`}
              >
                ${v.toLocaleString("en-US")}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {dcaPlans.map((p) => {
          const bucketUsd = (capital * p.totalPctOfCapital) / 100;
          return (
            <Card key={p.bucket} className="p-5">
              <div className="flex items-start justify-between mb-3 gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-white/45">{p.label}</div>
                  <div className="text-xl font-bold tabular-nums">{p.ticker}</div>
                  <div className="text-xs text-white/55">{p.name} · {p.sector}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wider text-white/45">Всего</div>
                  <div className="text-lg font-semibold text-white tabular-nums">
                    ${bucketUsd.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-white/50">
                    {p.totalPctOfCapital}% от капитала
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-white/50 mb-2">
                Текущая цена: ${p.currentPriceUsd.toLocaleString("en-US", { maximumFractionDigits: 4 })}
              </div>

              <div className="rounded-md border border-white/10 bg-black/20 overflow-hidden mb-3">
                <div className="grid grid-cols-[auto,1fr,1fr,1fr] gap-2 px-3 py-2 text-[10px] uppercase tracking-wider text-white/45 border-b border-white/10">
                  <div>Уровень</div>
                  <div className="text-right">Цена</div>
                  <div className="text-right">Сумма</div>
                  <div className="text-right">Кол-во</div>
                </div>
                {p.splits.map((s) => {
                  const price = p.currentPriceUsd * s.priceMultiplier;
                  const usd = bucketUsd * s.shareOfBucket;
                  const qty = price > 0 ? usd / price : 0;
                  const tone =
                    s.level === "now"
                      ? "text-white"
                      : s.level === "-5%"
                      ? "text-[#f59e0b]"
                      : "text-[#ff4d4f]";
                  return (
                    <div
                      key={s.level}
                      className="grid grid-cols-[auto,1fr,1fr,1fr] gap-2 px-3 py-2 text-[12px] tabular-nums border-b border-white/5 last:border-b-0"
                    >
                      <div className={"font-semibold " + tone}>{s.level === "now" ? "Сейчас" : s.level}</div>
                      <div className="text-right text-white/80">
                        ${price.toLocaleString("en-US", { maximumFractionDigits: 4 })}
                      </div>
                      <div className="text-right text-white">
                        ${usd.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-right text-white/70">
                        {qty.toLocaleString("en-US", { maximumFractionDigits: 4 })} {p.ticker}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-sm text-white/75 leading-relaxed">{p.reason}</div>
            </Card>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] leading-relaxed text-white/50">
        Логика: не «всё и сразу», а лесенка закупок. Если цена идёт вверх — уже взяли первую треть по текущей.
        Если падает — вторая и третья трети отрабатывают на коррекциях −5% и −10%, делая среднюю цену лучше.
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

// ============ LIVE STRATEGIES — демонстрация в реальном времени ============

function StrategyStatusDot({ status }: { status: LiveStrategy["status"] }) {
  const color =
    status === "live"
      ? "#00d4aa"
      : status === "rebalance"
      ? "#f4b000"
      : "#8a8f9c";
  const pulse = status === "live";
  return (
    <span
      className={"inline-block w-2 h-2 rounded-full " + (pulse ? "animate-pulse" : "")}
      style={{ background: color, boxShadow: pulse ? `0 0 10px ${color}` : undefined }}
    />
  );
}

function LiveStrategyCard({ s }: { s: LiveStrategy }) {
  const { metrics: m, live, updatedAt } = useLiveStrategyMetrics(s);
  const pnlPositive = m.roi30d >= 0;
  return (
    <Card className="p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <StrategyStatusDot status={s.status} />
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">
              {s.statusLabel}
            </div>
          </div>
          <div className="mt-2 text-lg font-semibold text-white">{s.title}</div>
          <div className="text-[12px] text-white/55">{s.subtitle}</div>
        </div>
        <Badge tone={pnlPositive ? "up" : "warn"}>
          {pnlPositive ? "+" : ""}
          {m.roi30d.toFixed(1)}% · 30д
        </Badge>
      </div>

      <div className="text-sm leading-relaxed text-white/75">{s.description}</div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">ROI 30д</div>
          <div
            className={
              "tabular-nums font-semibold " +
              (pnlPositive ? "text-[#00d4aa]" : "text-red-400")
            }
          >
            {pnlPositive ? "+" : ""}
            {m.roi30d.toFixed(1)}%
          </div>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">Winrate</div>
          <div className="tabular-nums text-white font-semibold">{m.winrate}%</div>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">Max DD</div>
          <div className="tabular-nums text-white/85 font-semibold">
            {m.maxDrawdown.toFixed(1)}%
          </div>
        </div>
        <div className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="text-white/45 text-[11px]">Активные сделки</div>
          <div className="tabular-nums text-white font-semibold">{m.activeTrades}</div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="text-[11px] text-white/40">
          Обновлено {new Date(updatedAt).toLocaleString("ru-RU")}{live ? " · live" : ""}
        </div>
        <a
          href={s.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#9945ff] to-[#00d4aa] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          <Eye className="w-4 h-4" />
          {s.ctaLabel}
        </a>
      </div>

      {s.note && (
        <div className="text-[11px] text-white/35 leading-relaxed">{s.note}</div>
      )}
    </Card>
  );
}

export function LiveStrategiesSection() {
  if (!liveStrategies.length) return null;
  return (
    <section>
      <SectionHeader
        icon={Activity}
        title="Стратегии в реальном времени"
        kicker="08 · Демонстрация"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {liveStrategies.map((s) => (
          <LiveStrategyCard key={s.id} s={s} />
        ))}
      </div>
      <div className="mt-3 text-[11px] text-white/40 leading-relaxed">
        Это не инвестиционная рекомендация. Прошлые результаты не гарантируют будущих.
        Цифры подтягиваются с публичных API площадок; задержка обновления — до 10 минут.
      </div>
    </section>
  );
}
