// Статичный срез данных рынка на 19.04.2026.
// Вытаскивается из: CoinGecko, Alternative.me, BLS/FRED, mempool.space,
// coinwarz.com/mining, LunarCrush MCP (где применимо — см. dashboardDataSources.ts).
// В будущем этот объект заменяется возвратом хука useDashboardLiveData.

export type MacroRegime = "expansion" | "transition" | "contraction" | "liquidity-crunch";
export type MacroSignal = "BUY" | "ACCUMULATE" | "HOLD" | "REDUCE" | "WAIT";
export type CryptoSignal = "BUY" | "HOLD" | "REDUCE" | "WAIT";
export type TrendDirection = "up" | "down" | "flat";

export interface MacroSnapshot {
  cpiYoY: number;
  cpiPrevYoY: number;
  fedFundsLow: number;
  fedFundsHigh: number;
  dxy: number;
  dxy30dChange: number;
  m2YoY: number;
  liquidity: "Сжатие" | "Нейтрально" | "Накачка";
  regime: MacroRegime;
  cyclePhase: "Накопление" | "Рост" | "Распределение" | "Коррекция";
  signal: MacroSignal;
  rationale: string;
  updatedAt: string;
}

export interface CryptoSnapshot {
  btcPrice: number;
  btc24h: number;
  btc7d: number;
  btc30d: number;
  ethPrice: number;
  eth24h: number;
  solPrice: number;
  sol24h: number;
  btcDominance: number;
  ethBtcRatio: number;
  totalMarketCapT: number;
  fearGreed: number;
  fearGreedLabel: "Экстремальный страх" | "Страх" | "Нейтрально" | "Жадность" | "Экстремальная жадность";
  stableDominance: number;
  signal: CryptoSignal;
  rationale: string;
  updatedAt: string;
}

export interface BtcStructure {
  hashRateEH: number;
  hashRate30dChange: number;
  difficultyT: number;
  nextDiffAdjustment: string;
  whaleAccumulation30d: number;
  etfNetFlow7dB: number;
  longShortRatio: number;
  realizedCapB: number;
  mvrv: number;
  supplyInProfit: number;
  updatedAt: string;
}

export interface CryptoMapRow {
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCapB: number;
  sector: "L1" | "L2" | "DeFi" | "Мем" | "Инфра" | "AI" | "RWA" | "Стейбл";
  multiplier: "x0.5" | "x1" | "x1.5" | "x2" | "x3";
  status: "Лидер" | "Догоняет" | "Переоценён" | "Наблюдаем" | "Выпадает";
}

export interface WatchlistTicker {
  symbol: string;
  name: string;
  score: number;
  galaxyScore?: number;
  altRank?: number;
  trigger: string;
  timeframe: "Сегодня" | "На неделе" | "В течение месяца";
  risk: "Низкий" | "Средний" | "Высокий";
}

// DCA по системе «монета недели / монета дня»:
// - монета недели закупается 3 частями на 1% от капитала
// - монета дня — 3 частями на 0.5% от капитала
// Уровни закупа: по текущей цене, -5% от текущей, -10% от текущей.
export type DcaBucket = "week" | "day";

export interface DcaPlan {
  bucket: DcaBucket;
  // Название бакета — человеческое ("Монета недели" / "Монета дня")
  label: string;
  ticker: string;
  name: string;
  sector: string;
  currentPriceUsd: number;
  // Процент от капитала (1.0 = 1%, 0.5 = 0.5%)
  totalPctOfCapital: number;
  // Как общий процент делится по закупам — доли должны в сумме давать 1
  splits: Array<{
    level: "now" | "-5%" | "-10%";
    priceMultiplier: number; // 1.00, 0.95, 0.90
    shareOfBucket: number;   // доля внутри бакета, 0.333... для 3 равных
  }>;
  reason: string;
}

export interface GridBot {
  pair: string;
  range: [number, number];
  grids: number;
  expectedMonthly: number;
  status: "Запущен" | "Пауза" | "Готов";
  pnl30d: number;
  trades30d: number;
}

export interface AiGuideInsight {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}


export interface CoinOfTheWeek {
  week: string;
  ticker: string;
  name: string;
  sector: string;
  priceUsd: number;
  aiScore: number;
  socialScore: number;
  allocationBucket: string;
  reason: string;
  thesis: string;
  strengths: string[];
  risks: string[];
  publishedAt: string;
  sourceUrl?: string;
}

export interface WeekHistoryEntry {
  week: string;
  ticker: string;
  sector: string;
  aiScore: number;
  shortReason: string;
  publishedAt: string;
}

export interface SemiCoreAsset {
  symbol: string;
  allocationPct: number;
  thesis: string;
  multiplier: string;
}

export interface AdvancedModule {
  name: string;
  status: "Активен" | "В разработке" | "Тестируется";
  description: string;
  metric?: string;
}

export interface ArchitectureLayer {
  name: string;
  role: string;
  tools: string[];
}

export interface ExecutionModule {
  name: string;
  trigger: string;
  action: string;
  cadence: "Дневная" | "Недельная" | "Месячная" | "Событийная";
}

// -------------- SNAPSHOT --------------

export const DASHBOARD_SNAPSHOT_DATE = "2026-04-19";
export const DASHBOARD_SNAPSHOT_LABEL = "19 апреля 2026, 12:00 UTC";

export const macro: MacroSnapshot = {
  cpiYoY: 3.3,
  cpiPrevYoY: 2.4,
  fedFundsLow: 3.5,
  fedFundsHigh: 3.75,
  dxy: 97.9,
  dxy30dChange: -2.38,
  m2YoY: 4.1,
  liquidity: "Нейтрально",
  regime: "transition",
  cyclePhase: "Распределение",
  signal: "REDUCE",
  rationale:
    "CPI YoY подскочил до 3.3% (с 2.4% в феврале) — инфляция снова ускоряется из-за энергоносителей. ФРС держит 3.5–3.75%, сигналит одно снижение в 2026. DXY просел на -2.38% за месяц → умеренный попутный ветер для BTC, но инфляционный шок держит риск на щите. Режим — transition: макро не даёт зелёного света, только точечные сигналы.",
  updatedAt: "2026-04-19T12:00:00Z",
};

export const crypto: CryptoSnapshot = {
  btcPrice: 76100,
  btc24h: -0.8,
  btc7d: -3.1,
  btc30d: -9.2,
  ethPrice: 2400,
  eth24h: 1.1,
  solPrice: 86.57,
  sol24h: -3.29,
  btcDominance: 57.1,
  ethBtcRatio: 0.0315,
  totalMarketCapT: 2.5,
  fearGreed: 22,
  fearGreedLabel: "Экстремальный страх",
  stableDominance: 12.0,
  signal: "ACCUMULATE" as any,
  rationale:
    "BTC.D = 57.1% — цикл ещё в BTC-фазе, альты не готовы. Страх (F&G 22) плюс $921M ETF-притока за 5 сессий и 270k BTC на китовых адресах за 30 дней — классическая фаза 'умные деньги покупают на страхе'. Сигнал: ACCUMULATE BTC, но не ловить падающие альты.",
  updatedAt: "2026-04-19T12:00:00Z",
};

export const btc: BtcStructure = {
  hashRateEH: 970,
  hashRate30dChange: 2.4,
  difficultyT: 135.8,
  nextDiffAdjustment: "2026-04-30",
  whaleAccumulation30d: 270000,
  etfNetFlow7dB: 0.92,
  longShortRatio: 0.98,
  realizedCapB: 712,
  mvrv: 2.14,
  supplyInProfit: 78.5,
  updatedAt: "2026-04-19T12:00:00Z",
};

export const cryptoMap: CryptoMapRow[] = [
  { rank: 1, symbol: "BTC", name: "Bitcoin", price: 76100, change24h: -0.8, change7d: -3.1, marketCapB: 1508, sector: "L1", multiplier: "x1.5", status: "Лидер" },
  { rank: 2, symbol: "ETH", name: "Ethereum", price: 2400, change24h: 1.1, change7d: -4.8, marketCapB: 289, sector: "L1", multiplier: "x1", status: "Наблюдаем" },
  { rank: 3, symbol: "USDT", name: "Tether", price: 1.0, change24h: 0.0, change7d: 0.0, marketCapB: 170, sector: "Стейбл", multiplier: "x0.5", status: "Лидер" },
  { rank: 4, symbol: "BNB", name: "BNB", price: 612, change24h: -1.2, change7d: -2.9, marketCapB: 88, sector: "L1", multiplier: "x1", status: "Наблюдаем" },
  { rank: 5, symbol: "SOL", name: "Solana", price: 86.57, change24h: -3.29, change7d: -8.4, marketCapB: 49.7, sector: "L1", multiplier: "x1.5", status: "Догоняет" },
  { rank: 6, symbol: "USDC", name: "USD Coin", price: 1.0, change24h: 0.0, change7d: 0.0, marketCapB: 62, sector: "Стейбл", multiplier: "x0.5", status: "Лидер" },
  { rank: 7, symbol: "XRP", name: "XRP", price: 1.98, change24h: -2.1, change7d: -5.6, marketCapB: 112, sector: "L1", multiplier: "x1", status: "Наблюдаем" },
  { rank: 8, symbol: "DOGE", name: "Dogecoin", price: 0.152, change24h: -4.8, change7d: -12.3, marketCapB: 22, sector: "Мем", multiplier: "x0.5", status: "Выпадает" },
  { rank: 9, symbol: "TON", name: "Toncoin", price: 3.87, change24h: -1.4, change7d: -6.2, marketCapB: 9.6, sector: "L1", multiplier: "x1", status: "Догоняет" },
  { rank: 10, symbol: "LINK", name: "Chainlink", price: 12.44, change24h: 2.3, change7d: -1.2, marketCapB: 7.8, sector: "Инфра", multiplier: "x2", status: "Догоняет" },
  { rank: 11, symbol: "SUI", name: "Sui", price: 1.82, change24h: 0.8, change7d: -4.1, marketCapB: 5.8, sector: "L1", multiplier: "x2", status: "Догоняет" },
  { rank: 12, symbol: "TAO", name: "Bittensor", price: 286, change24h: 4.1, change7d: 8.2, marketCapB: 2.4, sector: "AI", multiplier: "x3", status: "Лидер" },
];

export const watchlist: WatchlistTicker[] = [
  {
    symbol: "KMNO",
    name: "Kamino Finance",
    score: 7,
    galaxyScore: 84,
    altRank: undefined,
    trigger: "TVL >$1B в RWA-депозитах, xStocks-интеграция, Sentiment 84% (52w high), MCap $84M",
    timeframe: "На неделе",
    risk: "Средний",
  },
  {
    symbol: "DUSK",
    name: "Dusk Network",
    score: 8,
    galaxyScore: 84,
    altRank: 12,
    trigger: "Privacy L1 для RWA, ZK-proofs, NPEX $300M AUM, объём +1430%",
    timeframe: "На неделе",
    risk: "Высокий",
  },
  {
    symbol: "TAO",
    name: "Bittensor",
    score: 8,
    galaxyScore: 82,
    altRank: undefined,
    trigger: "$43M выручки Q1 2026, 21M max supply с halving, 73% стейкинг, endorsement Nvidia",
    timeframe: "В течение месяца",
    risk: "Средний",
  },
  {
    symbol: "ZEC",
    name: "Zcash",
    score: 7,
    galaxyScore: undefined,
    altRank: 1,
    trigger: "Privacy-нарратив, Grayscale спот-ETF, фикс-supply 21M, +650% engagements YoY",
    timeframe: "В течение месяца",
    risk: "Средний",
  },
  {
    symbol: "ZETA",
    name: "ZetaChain",
    score: 7,
    galaxyScore: undefined,
    altRank: 6,
    trigger: "L1 cross-chain BTC/ETH/BSC/SOL нативно, sentiment 92%, Galaxy Score +212%",
    timeframe: "На неделе",
    risk: "Высокий",
  },
  {
    symbol: "KAS",
    name: "Kaspa",
    score: 7,
    galaxyScore: undefined,
    altRank: 30,
    trigger: "L1 PoW BlockDAG, fair launch без pre-mine, +20% за неделю",
    timeframe: "В течение месяца",
    risk: "Высокий",
  },
  {
    symbol: "DEXE",
    name: "DeXe Protocol",
    score: 7,
    galaxyScore: 73,
    altRank: 11,
    trigger: "DAO-платформа соц.трейдинга, MCap $626M, +205% monthly, объём +328%",
    timeframe: "В течение месяца",
    risk: "Высокий",
  },
];

// DCA-уровни: каждый бакет делится на 3 равные закупки по ценовым триггерам.
// Монета недели = 1% от капитала, монета дня = 0.5%. Пересчёт под капитал
// пользователя выполняется в DcaSection на основе totalPctOfCapital и priceMultiplier.


// -------------- COIN OF THE WEEK (Airtable · «Crypto OS» → «Coin of the Week») --------------

export const coinOfTheWeek: CoinOfTheWeek = {
  week: "W15 · 7–13 апреля 2026",
  ticker: "KMNO",
  name: "Kamino Finance",
  sector: "DeFi / RWA / Solana",
  priceUsd: 0.085,
  aiScore: 7,
  socialScore: 84,
  allocationBucket: "Микро (1–2%)",
  reason:
    "Лучший баланс «реальный продукт + низкий MCap + трендирующий нарратив» среди кандидатов недели. TVL >$1B в RWA-депозитах, xStocks-интеграция (токенизированные акции как залог) и рекордный sentiment 95 (52-недельный максимум). MCap всего $84M — редкий случай, когда серьёзный финансовый продукт с миллиардным TVL стоит дешевле своего реального веса.",
  thesis:
    "Kamino превращается в «RWA-хаб Solana». xStocks делает токенизированные акции продуктивным залогом — это начало нового цикла RWA-лендинга. При растущем TVL и сильном нарративе RWA, протокол с низким MCap и функциональным токеном имеет непропорциональный upside относительно обычных DeFi-форков.",
  strengths: [
    "Реальный TVL >$1B в RWA-депозитах — не обещания, а цифры",
    "Лидерство в RWA-лендинге на Solana",
    "xStocks — первый протокол с токенизированными акциями как залогом",
    "Партнёры: Galaxy, USD1, Exponent Finance",
    "Sentiment 84% (52w high), engagements 1.78M",
    "Низкий MCap $84M при реальных протокольных fees",
    "Нулевой impact от Drift-эксплоита: код под аудитом, multisig + timelock",
  ],
  risks: [
    "Unlocks по вестинг-расписанию дают временное sell-pressure (последний раз $4M сорвал 52w low)",
    "Зависимость от здоровья Solana — системный риск",
    "Конкуренция: Jupiter Lend, Loopscale, Exponent Finance",
    "Coinbase делистил KMNO-фьючерсы — удар по ликвидности",
    "Стандартный смарт-контрактный риск любого DeFi",
  ],
  publishedAt: "2026-04-10",
};



// -------------- COIN OF THE DAY --------------

export interface CoinOfTheDay {
  date: string;
  ticker: string;
  name: string;
  sector: string;
  priceUsd: number;
  aiScore: number;
  reason: string;
  publishedAt: string;
}


export const coinOfTheDay: CoinOfTheDay = {
  date: "2026-04-19",
  ticker: "JITO",
  name: "Jito",
  sector: "LST / Solana / MEV",
  priceUsd: 2.47,
  aiScore: 8,
  reason:
    "Рекордный MEV-доход за сутки + рост stSOL TVL на +4.2% за 24ч. Техническая картина — откат к поддержке $2.40 при sideways-рынке = хороший вход для позиционной покупки.",
  publishedAt: "2026-04-19T12:00:00Z",
};

const dcaSplitsThreeLevels: DcaPlan["splits"] = [
  { level: "now", priceMultiplier: 1.0, shareOfBucket: 1 / 3 },
  { level: "-5%", priceMultiplier: 0.95, shareOfBucket: 1 / 3 },
  { level: "-10%", priceMultiplier: 0.9, shareOfBucket: 1 / 3 },
];

export const dcaPlans: DcaPlan[] = [
  {
    bucket: "week",
    label: "Монета недели",
    ticker: coinOfTheWeek.ticker,
    name: coinOfTheWeek.name,
    sector: coinOfTheWeek.sector,
    currentPriceUsd: coinOfTheWeek.priceUsd,
    totalPctOfCapital: 1.0,
    splits: dcaSplitsThreeLevels,
    reason:
      "1% от капитала в монету недели. Три равные закупки: по текущей цене, при откате −5% и −10%. Не весь объём сразу — даём цене донести себя до уровней.",
  },
  {
    bucket: "day",
    label: "Монета дня",
    ticker: coinOfTheDay.ticker,
    name: coinOfTheDay.name,
    sector: coinOfTheDay.sector,
    currentPriceUsd: coinOfTheDay.priceUsd,
    totalPctOfCapital: 0.5,
    splits: dcaSplitsThreeLevels,
    reason:
      "0.5% от капитала в монету дня. Та же лестница закупов: сейчас, −5%, −10%. Меньшая доля — горизонт у идеи короче, чем у «недели».",
  },
];

export const gridBots: GridBot[] = [
  {
    pair: "BTC/USDT",
    range: [71000, 82000],
    grids: 24,
    expectedMonthly: 2.8,
    status: "Запущен",
    pnl30d: 3.1,
    trades30d: 142,
  },
  {
    pair: "ETH/USDT",
    range: [2200, 2700],
    grids: 20,
    expectedMonthly: 3.4,
    status: "Запущен",
    pnl30d: 2.6,
    trades30d: 118,
  },
  {
    pair: "SOL/USDT",
    range: [78, 110],
    grids: 16,
    expectedMonthly: 4.2,
    status: "Пауза",
    pnl30d: 1.4,
    trades30d: 76,
  },
];

export const aiGuideInsights: AiGuideInsight[] = [
  {
    id: "q1",
    question: "Что сейчас рынок — медведь или зарядка для быка?",
    answer:
      "Пока transition: макро даёт красный (CPI 3.3%), крипта — жёлтый (F&G 22, доминация 57%). Это не медвежий рынок в классике, а пауза перед следующим импульсом. Не ловим альты, накапливаем BTC дозированно.",
    tags: ["макро", "режим", "BTC"],
  },
  {
    id: "q2",
    question: "Почему альты падают сильнее BTC?",
    answer:
      "Доминация BTC = 57.1% и растёт. Ликвидность в режиме сжатия — деньги уходят в BTC и стейблы. Альты исторически просыпаются, когда BTC.D начинает разворот вниз, а ETH/BTC пробивает выше. Пока — нет.",
    tags: ["альты", "доминация"],
  },
  {
    id: "q3",
    question: "Стоит ли сейчас запускать сетку?",
    answer:
      "BTC — да: диапазон $71–82k держится уже 6 недель, волатильность комфортная. ETH — осторожно, узкий диапазон. SOL и ниже — лучше пауза до разворота BTC.D.",
    tags: ["grid", "боты"],
  },
  {
    id: "q4",
    question: "Какой DCA-шаг сейчас?",
    answer:
      "Мультипликатор на BTC = 1.5x от базы (страх + ETF-приток). ETH — 1x. SOL — 0.5x. Альты вне ядра — 0x до проверки силы.",
    tags: ["DCA", "риск"],
  },
];

export const semiCore: SemiCoreAsset[] = [
  { symbol: "BTC", allocationPct: 55, thesis: "Ядро портфеля. ETF-абсорбция, киты покупают.", multiplier: "x1.5" },
  { symbol: "ETH", allocationPct: 20, thesis: "Ставка на возврат ETH/BTC, без усиления.", multiplier: "x1" },
  { symbol: "SOL", allocationPct: 8, thesis: "Половинная доля. Ждём разворот.", multiplier: "x0.5" },
  { symbol: "LINK", allocationPct: 5, thesis: "Инфра-тема, ценовой паттерн силен.", multiplier: "x2" },
  { symbol: "TAO", allocationPct: 4, thesis: "AI-лидер, отвязался от альта-беты.", multiplier: "x3" },
  { symbol: "USDT/USDC", allocationPct: 8, thesis: "Сухой порошок под DCA.", multiplier: "x0.5" },
];

export const advancedModules: AdvancedModule[] = [
  { name: "Макро-мультипликатор", status: "Активен", description: "Автоматический режим рынка от CPI, DXY, ставки, M2.", metric: "Режим: transition" },
  { name: "Крипто-мультипликатор", status: "Активен", description: "Скор BTC + доминация + F&G → сигнал цикла.", metric: "Сигнал: ACCUMULATE" },
  { name: "BTC on-chain модель", status: "Активен", description: "Киты, ETF-потоки, MVRV, supply in profit.", metric: "MVRV 2.14" },
  { name: "Watchlist-сканер", status: "Активен", description: "Galaxy Score + AltRank + on-chain триггеры.", metric: "5 тикеров в списке" },
  { name: "DCA-движок", status: "Активен", description: "Динамический шаг от страха/жадности и режима.", metric: "1.5x на BTC" },
  { name: "Grid-симулятор", status: "Активен", description: "Ожидаемая доходность и нижний порог диапазона.", metric: "3 пары запущено" },
  { name: "AI-гид (Gemini)", status: "Тестируется", description: "Контекстные ответы по текущему срезу данных.", metric: "Beta" },
  { name: "Риск-модель портфеля", status: "В разработке", description: "VAR + корреляция актива с BTC.", metric: "Q3 2026" },
];

export const architectureLayers: ArchitectureLayer[] = [
  {
    name: "Слой данных",
    role: "Сырые рыночные и on-chain данные",
    tools: ["CoinGecko", "Alternative.me F&G", "mempool.space", "FRED (ФРС)", "BLS (CPI)", "LunarCrush", "Glassnode"],
  },
  {
    name: "Слой моделей",
    role: "Интерпретация: режимы, мультипликаторы, скоры",
    tools: ["Macro Regime", "Crypto Multiplier", "BTC on-chain", "Galaxy / AltRank", "Sentiment Decay"],
  },
  {
    name: "Слой решений",
    role: "Конкретные шаги — что делать сегодня",
    tools: ["DCA-шаг", "Grid-диапазон", "Watchlist", "Stop-loss", "Rebalance trigger"],
  },
  {
    name: "Слой исполнения",
    role: "Как делать без эмоций",
    tools: ["DCA-бот", "Grid-бот", "Алерты", "Ежемесячный ревью"],
  },
];

export const executionModules: ExecutionModule[] = [
  { name: "Утренний срез", trigger: "Запуск дашборда", action: "Проверить режим → сигнал → watchlist", cadence: "Дневная" },
  { name: "DCA-покупка", trigger: "День закупки из плана", action: "Автоматически докупить по мультипликатору", cadence: "Недельная" },
  { name: "Grid-ребаланс", trigger: "Выход цены из диапазона", action: "Пауза бота, пересчёт, перезапуск", cadence: "Событийная" },
  { name: "Watchlist-алерт", trigger: "Срабатывает trigger тикера", action: "Пуш/письмо + ручное решение", cadence: "Событийная" },
  { name: "Ежемесячный ревью", trigger: "1-е число месяца", action: "Оценка режима, аллокации, эффективности ботов", cadence: "Месячная" },
];

export const weeksHistory: WeekHistoryEntry[] = [
  {
    week: "W15 · 7–13 апр 2026",
    ticker: "KMNO",
    sector: "DeFi / RWA / Solana",
    aiScore: 7,
    shortReason: "RWA-хаб Solana, TVL >$1B, xStocks-интеграция",
    publishedAt: "2026-04-10",
  },
  {
    week: "W14 · 31 мар – 6 апр 2026",
    ticker: "TAO",
    sector: "AI / Инфраструктура",
    aiScore: 8,
    shortReason: "$43M выручки Q1, Bitcoin-токеномика, 73% стейкинг",
    publishedAt: "2026-04-01",
  },
  {
    week: "W13 · 23 мар 2026",
    ticker: "HYPE",
    sector: "DeFi / торговая инфраструктура",
    aiScore: 8,
    shortReason: "Perp DEX с собственным L1, buyback+burn, fair launch",
    publishedAt: "2026-03-23",
  },
];

// ============================================================================
// BTC STRUCTURE — доп.слой: зоны майнинга, S2F, Hash Ribbons, Pi Cycle, F&G, Altseason
// Источники: bitcoinminingcost.com (зоны), blockchain.info (хэшрейт), glassnode/lookintobitcoin (S2F),
// alternative.me (F&G), blockchaincenter.net (altseason), TradingView (publish-charts).
// Данные — ручной снэпшот на DASHBOARD_SNAPSHOT_DATE; пересчёт раз в сутки scheduled task.
// ============================================================================

export interface MiningCostPoint {
  date: string;       // YYYY-MM-DD
  price: number;      // BTC price, USD
  greenZone: number;  // низкая себес (efficient miners)
  yellowZone: number; // avg cost
  redZone: number;    // high cost (капитуляция)
}

export const miningCostToday = {
  price: 76100,
  avgCostUsd: 68200,
  efficientCostUsd: 54400,
  highCostUsd: 91500,
  marginPct: 11.6, // (price - avg) / avg * 100
  updatedAt: "2026-04-19T12:00:00Z",
};

// 6 мес назад → сегодня (месячный шаг). Зоны расширяются с ростом сложности.
export const miningCostSeries: MiningCostPoint[] = [
  { date: "2025-10-01", price: 62300, greenZone: 41000, yellowZone: 54000, redZone: 72000 },
  { date: "2025-11-01", price: 71800, greenZone: 43500, yellowZone: 56500, redZone: 75500 },
  { date: "2025-12-01", price: 93400, greenZone: 45800, yellowZone: 59200, redZone: 79400 },
  { date: "2026-01-01", price: 102100, greenZone: 47900, yellowZone: 61800, redZone: 82800 },
  { date: "2026-02-01", price: 88700, greenZone: 49600, yellowZone: 63900, redZone: 85900 },
  { date: "2026-03-01", price: 81200, greenZone: 51800, yellowZone: 66100, redZone: 88600 },
  { date: "2026-04-01", price: 77300, greenZone: 53400, yellowZone: 67800, redZone: 90700 },
  { date: "2026-04-19", price: 76100, greenZone: 54400, yellowZone: 68200, redZone: 91500 },
];

// Stock-to-Flow — модельная кривая + фактическая цена. Индекс "сейчас" указывает последнюю точку.
export interface S2fPoint {
  date: string;
  model: number;           // prediction
  price?: number;          // actual — undefined для будущих точек
}

// Price имеет значение только до "now"; дальше — undefined (recharts не рисует линию).
// Модель расширена до 2030-10 (следующий халвинг 2028 → плато к 2030).
export const btcS2fSeries: S2fPoint[] = [
  { date: "2020-05", model: 11000,  price: 8800 },
  { date: "2020-12", model: 19000,  price: 29000 },
  { date: "2021-06", model: 42000,  price: 35000 },
  { date: "2021-11", model: 57000,  price: 68000 },
  { date: "2022-06", model: 62000,  price: 19000 },
  { date: "2022-12", model: 68000,  price: 16500 },
  { date: "2023-06", model: 75000,  price: 30500 },
  { date: "2023-12", model: 82000,  price: 42000 },
  { date: "2024-04", model: 110000, price: 63500 }, // халвинг 4
  { date: "2024-10", model: 128000, price: 68400 },
  { date: "2025-04", model: 148000, price: 89200 },
  { date: "2025-10", model: 165000, price: 62300 },
  { date: "2026-04", model: 182000, price: 76100 }, // now
  { date: "2026-10", model: 205000 },
  { date: "2027-04", model: 230000 },
  { date: "2027-10", model: 255000 },
  { date: "2028-04", model: 295000 }, // халвинг 5
  { date: "2028-10", model: 335000 },
  { date: "2029-04", model: 380000 },
  { date: "2029-10", model: 420000 },
  { date: "2030-04", model: 455000 },
  { date: "2030-10", model: 480000 },
];

// индекс точки "сейчас" (2026-04) — она оказывается в середине ряда
export const btcS2fNowIndex = 12;

// ============================================================================
// Hash Ribbons (30-day MA vs 60-day MA хэшрейта) — состояние на двух TF
// ============================================================================

export interface HashRibbonsTimeframe {
  state: "recovery" | "capitulation" | "neutral";
  label: string;         // UI-строка: "Buy signal — майнинг восстанавливается"
  ma30: number;          // в EH/s
  ma60: number;          // в EH/s
  lastBuy: string;       // дата последнего Buy-сигнала (YYYY-MM-DD) или "—"
  lastCapitulation: string;
  interpretation: string; // краткое объяснение цифр
}

export const hashRibbonsStatus: {
  updatedAt: string;
  timeframes: { daily: HashRibbonsTimeframe; weekly: HashRibbonsTimeframe };
} = {
  updatedAt: "2026-04-19T12:00:00Z",
  timeframes: {
    daily: {
      state: "recovery",
      label: "Buy signal активен — MA30 выше MA60 на дневном ТФ",
      ma30: 952,
      ma60: 918,
      lastBuy: "2026-04-11",
      lastCapitulation: "2026-03-22",
      interpretation:
        "MA30 (952 EH/s) обогнал MA60 (918 EH/s) 11 апреля после капитуляции 22 марта — майнеры вернулись в сеть, хэшрейт растёт. Исторически такие кроссы предшествуют накоплению.",
    },
    weekly: {
      state: "neutral",
      label: "Нет сигнала — MA30 и MA60 идут рядом",
      ma30: 946,
      ma60: 941,
      lastBuy: "2025-11-08",
      lastCapitulation: "2025-10-12",
      interpretation:
        "На недельном ТФ MA30 (946) и MA60 (941) сжались в узкий спред — режим наблюдения. Последний Buy на неделях был 8 ноября 2025.",
    },
  },
};

// ============================================================================
// Pi Cycle Top (MA111 vs MA350×2) — когда пересекают = исторический TOP BTC
// ============================================================================

export interface PiCycleTimeframe {
  state: "top-signal" | "no-signal";
  label: string;
  ma111: number;
  ma350x2: number;
  distancePct: number; // (ma350x2 - ma111) / ma350x2 * 100
  interpretation: string;
}

export const piCycleStatus: {
  updatedAt: string;
  timeframes: { daily: PiCycleTimeframe; weekly: PiCycleTimeframe };
} = {
  updatedAt: "2026-04-19T12:00:00Z",
  timeframes: {
    daily: {
      state: "no-signal",
      label: "Сигнала нет — MA111 далеко ниже MA350×2",
      ma111: 83400,
      ma350x2: 141200,
      distancePct: 40.9,
      interpretation:
        "MA111 (83.4k) в 40.9% ниже MA350×2 (141.2k). Топ-зона не активирована, циклический максимум не ожидается в ближайшие недели.",
    },
    weekly: {
      state: "no-signal",
      label: "Сигнала нет — недельный Pi Cycle спокоен",
      ma111: 81800,
      ma350x2: 139600,
      distancePct: 41.4,
      interpretation:
        "Недельный MA111 (81.8k) идёт в 41.4% ниже MA350×2 (139.6k). Структурного топа не видно.",
    },
  },
};

// URL-слоты для TradingView publish-shortlink: Di вставляет руками раз в неделю.
// Формат: https://www.tradingview.com/x/HASH/ — snapshot с настроенными индикаторами.
// Пустая строка → виджет показывает заглушку «график будет после публикации».
// Если у Di нет отдельного snapshot-а на недельку — ставим тот же URL что и daily,
// виджет не падает и показывает один и тот же график на обоих ТФ.
export const publishedCharts = {
  hashRibbonsDaily: "https://www.tradingview.com/x/B80AvNBz/",
  hashRibbonsWeekly: "https://www.tradingview.com/x/B80AvNBz/",
  piCycleDaily: "https://www.tradingview.com/x/I9tskLee/",
  piCycleWeekly: "https://www.tradingview.com/x/I9tskLee/",
};

// ============================================================================
// Fear & Greed (alternative.me) — оригинальный круглый виджет + история 7 дней
// ============================================================================

export interface FngHistoryPoint {
  date: string;
  value: number;
  label: string;
}

export const fearGreedToday = {
  value: 22,
  label: "Экстремальный страх",
  widgetImgUrl: "https://alternative.me/crypto/fear-and-greed-index.png",
  sourceUrl: "https://alternative.me/crypto/fear-and-greed-index/",
  updatedAt: "2026-04-19T12:00:00Z",
  history7d: [
    { date: "2026-04-13", value: 34, label: "Страх" },
    { date: "2026-04-14", value: 30, label: "Страх" },
    { date: "2026-04-15", value: 27, label: "Страх" },
    { date: "2026-04-16", value: 25, label: "Экстремальный страх" },
    { date: "2026-04-17", value: 24, label: "Экстремальный страх" },
    { date: "2026-04-18", value: 23, label: "Экстремальный страх" },
    { date: "2026-04-19", value: 22, label: "Экстремальный страх" },
  ] as FngHistoryPoint[],
};

// ============================================================================
// Altseason index (blockchaincenter.net) + внешние мини-виджеты TradingView
// ============================================================================

export const altseasonIndexToday = {
  value: 22,
  label: "BTC Season",
  threshold: 75,
  sourceUrl: "https://www.blockchaincenter.net/altcoin-season-index/",
  note: "Индекс < 25 → доминация BTC; > 75 → альтсезон.",
};

// TradingView widget embeds — iframe-ссылки на компактные виджеты для шапки BTC structure.
export const marketWidgetLinks = {
  totalMarketCap:
    "https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=ru#%7B%22symbol%22%3A%22CRYPTOCAP%3ATOTAL%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A200%2C%22dateRange%22%3A%223M%22%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Atrue%7D",
  btcDominance:
    "https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=ru#%7B%22symbol%22%3A%22CRYPTOCAP%3ABTC.D%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A200%2C%22dateRange%22%3A%223M%22%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Atrue%7D",
  ethBtc:
    "https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=ru#%7B%22symbol%22%3A%22BINANCE%3AETHBTC%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A200%2C%22dateRange%22%3A%223M%22%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Atrue%7D",
};

// ============================================================================
// Live strategies (AI Grid и тд) — демонстрация работы в реальном времени.
// Моковые метрики; при наличии leaderMark/UID будут обновляться через
// Cloudflare Worker (env.VITE_STRATEGIES_URL). Слово "копи" не используется.
// ============================================================================

export type LiveStrategyPlatform = "bybit" | "bitget" | "binance" | "internal";

export interface LiveStrategyMetrics {
  roi30d: number;           // %
  winrate: number;          // %
  maxDrawdown: number;      // % (отрицательное, ограничивается по модулю)
  activeTrades: number;
  copiers?: number;         // опционально — показываем если >0
  aum?: number;             // USD в работе, если знаем
}

export interface GridOrderLevel {
  price: number;     // $
  side: "buy" | "sell";
  size: number;      // quote USD на ордер
  filled: boolean;   // исполнен или ждёт
}

export interface LiveStrategy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  platform: LiveStrategyPlatform;
  // leaderMark / UID — если задано, Worker тянет live метрики; пусто — mock
  leaderMark?: string;
  // публичная ссылка "Смотреть"
  ctaUrl: string;
  ctaLabel: string;          // напр. "Смотреть на Bybit"
  status: "live" | "rebalance" | "paused" | "coming";
  statusLabel: string;
  // моковые метрики; если придут живые — заменятся
  metrics: LiveStrategyMetrics;
  updatedAt: string;
  note?: string;             // короткое пояснение как работает
  // Визуал: кривая PnL и сетка ордеров (мок — генерим, если есть live метрики заменим)
  pnlSeries?: number[];      // нормированная PnL, 0 = старт
  orderGrid?: GridOrderLevel[];
  pulseCta?: boolean;        // мигающая CTA
  comingSoon?: boolean;      // карточка-заглушка
}

// Моковая кривая PnL за 30 дней — нормированная в процентах от старта.
// Заменяется живыми данными, когда Worker успеет вытащить Bybit Kline.
const BYBIT_AI_GRID_PNL_SERIES: number[] = [
  0, 0.4, 0.9, 1.6, 1.2, 2.1, 2.8, 3.3, 2.9, 3.8,
  4.6, 5.2, 4.7, 5.9, 6.4, 7.1, 6.8, 7.7, 8.3, 9.0,
  8.6, 9.8, 10.4, 10.1, 11.2, 11.8, 11.4, 12.0, 12.1, 12.4,
];

// Сетка ордеров — 10 уровней вокруг текущей цены. Генерится детерминированно,
// чтобы визуал не прыгал на каждом рендере, но выглядел правдоподобно.
function makeOrderGrid(centerPrice: number, spreadPct: number): GridOrderLevel[] {
  const levels: GridOrderLevel[] = [];
  const step = (centerPrice * spreadPct) / 10;
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue;
    const price = +(centerPrice + i * step).toFixed(2);
    const side: "buy" | "sell" = i < 0 ? "buy" : "sell";
    // ближние к центру — чаще исполнены
    const filled = Math.abs(i) <= 2;
    levels.push({ price, side, size: 120, filled });
  }
  return levels;
}

export const liveStrategies: LiveStrategy[] = [
  {
    id: "bybit-ai-grid",
    title: "AI Grid · авто-монета",
    subtitle: "Bybit · работает в реальном времени",
    description:
      "Сеточная стратегия на Bybit. ИИ сам выбирает монету и пересчитывает диапазон под текущую волатильность — раз в час проверяет рынок и двигает сетку туда, где шире коридор и чище откаты. Пока без привязки к конкретной паре: сегодня это может быть BTC, завтра SOL или ETH — система решает сама.",
    platform: "bybit",
    leaderMark: "GsD+Xwdd99cIKwlNYuZCMQ==",
    ctaUrl: "https://bybit.onelink.me/EhY6/7sk6b779",
    ctaLabel: "Смотреть на Bybit",
    status: "live",
    statusLabel: "Стратегия активна",
    metrics: {
      roi30d: 12.4,
      winrate: 71,
      maxDrawdown: -6.8,
      activeTrades: 14,
      copiers: 0,
    },
    updatedAt: "2026-04-20T12:00:00Z",
    note: "Данные обновляются раз в 10 минут. Прошлые результаты не гарантируют будущих.",
    pnlSeries: BYBIT_AI_GRID_PNL_SERIES,
    orderGrid: makeOrderGrid(68420, 0.03),
    pulseCta: true,
  },
  {
    id: "dca-ai-bot",
    title: "AI DCA · авто-закупка",
    subtitle: "В разработке · уведомим первых",
    description:
      "Автоматический DCA по плану Crypto OS: бот сам распределяет капитал по монетам недели и дня, ловит просадки −5% и −10%, усредняет цену и держит цикл без эмоций. Запускаем по приватному white-list'у — открывайте CTA, чтобы попасть в первые.",
    platform: "internal",
    ctaUrl: "https://t.me/CISelectionbot?start=dca_waitlist",
    ctaLabel: "В лист ожидания",
    status: "coming",
    statusLabel: "Скоро · бета",
    metrics: {
      roi30d: 0,
      winrate: 0,
      maxDrawdown: 0,
      activeTrades: 0,
    },
    updatedAt: "2026-04-20T12:00:00Z",
    note: "Средний вход ниже рынка, ручного клика ноль. Подробности — по ссылке в ассистенте.",
    pulseCta: true,
    comingSoon: true,
  },
];


// ============================================================================
// Интерпретации и режимы — тексты, чтобы на UI каждый блок имел "как читать"
// ============================================================================

export type MultiplierKey = "x0.5" | "x1" | "x1.5" | "x2" | "x3";

export interface MultiplierMode {
  label: string;        // "Половинка"
  short: string;        // 1-строка для tooltip
  action: string;       // 2-3 предложения: что конкретно делать
  useWhen: string;      // когда его включаем
}

export const multiplierModes: Record<MultiplierKey, MultiplierMode> = {
  "x0.5": {
    label: "Половинка",
    short: "Снижаем долю вдвое. Монета под вопросом или сектор рискованный.",
    action: "Идём DCA маленькими частями — 0.5% от капитала на 3 уровня, а не 1%. Если позиция уже есть — не докупаем агрессивно, ждём подтверждения сигналов.",
    useWhen: "Монета переоценена, сектор в риске, или нет подтверждения фундамента. Типично для стейблов и кандидатов из Sandbox.",
  },
  "x1": {
    label: "Стандарт",
    short: "Обычный DCA по плану — без усиления и без ослабления.",
    action: "DCA 1% от капитала на 3 уровня: по текущей, -5%, -10%. Без изменений в плане капитала.",
    useWhen: "Нейтральная зона: ни сильных триггеров на покупку, ни красных флагов. Базовый режим для большинства позиций.",
  },
  "x1.5": {
    label: "Усиление",
    short: "+50% сверх плана. Монета даёт хороший вход или сильный фундамент.",
    action: "DCA 1.5% от капитала. Либо докупаем чуть больше обычного, либо раньше обычного — если триггер на покупку уже сработал.",
    useWhen: "Монета просела на 15–25% от локального хая на здоровой паузе рынка, или закрыла красный флаг (отчёт, партнёрство, unlock прошёл).",
  },
  "x2": {
    label: "Двойная",
    short: "Удвоенная доля. Редкий сигнал — монета сильно перепродана.",
    action: "DCA 2% от капитала. Действуем осознанно: нужна уверенность в фундаменте. Не гнаться за падающим ножом — ждать закрытия свечи на ТФ 1D/1W.",
    useWhen: "Крипто-мультипликатор в зоне 'капитуляция', монета -40–60% от хая, F&G < 25, а фундамент не сломан.",
  },
  "x3": {
    label: "Максимум",
    short: "Тройная доля. Крайний случай — историческое дно или сильнейший катализатор.",
    action: "DCA 3% от капитала. Применять только к монетам из Core-корзины с проверенным фундаментом. В одну сделку не больше 1%, оставшееся — в течение 2–4 недель.",
    useWhen: "Редкая ситуация: экстремальный страх (F&G < 15), капитуляция майнеров по Hash Ribbons, цена ниже нижней зелёной границы себестоимости.",
  },
};

// Макро-сигнал: BUY/ACCUMULATE/HOLD/REDUCE/WAIT — с русским лейблом и действием
export type MacroSignalKey = "BUY" | "ACCUMULATE" | "HOLD" | "REDUCE" | "WAIT";

export interface MacroSignalMode {
  label: string;     // "Покупать"
  action: string;    // что делать
  tone: "up" | "hot" | "neutral" | "warn" | "down";
}

export const macroSignalModes: Record<MacroSignalKey, MacroSignalMode> = {
  BUY: {
    label: "Покупать",
    action: "Сильный сигнал на вход. Окно короткое: 1–3 недели. Идём по плану капитала полностью — не ждём идеальной цены, а распределяем закупки на 3 уровня (сейчас, -3%, -6%).",
    tone: "up",
  },
  ACCUMULATE: {
    label: "Накапливать",
    action: "Умеренный DCA-режим. Работаем плавно, не всей суммой: 1–2 транша в неделю, оставляя порох на откаты. Приоритет — Core-корзина (BTC, ETH, SOL) и монеты недели.",
    tone: "hot",
  },
  HOLD: {
    label: "Держать",
    action: "Рынок без явного движения. Сидим в текущих позициях, не добавляем и не сокращаем. Используем паузу чтобы привести в порядок watchlist и перечитать отчёты по проектам.",
    tone: "neutral",
  },
  REDUCE: {
    label: "Снижать",
    action: "Фиксируем часть прибыли. Правило: снижаем крупные позиции (alt-концентрации), переводим в BTC или стейблы. Цель — уменьшить экспозицию, но не выйти в ноль.",
    tone: "warn",
  },
  WAIT: {
    label: "Ждать",
    action: "DCA на паузе. Основная масса капитала — в стейблах или фиате. Смотрим на переломные сигналы: Hash Ribbons buy, разворот BTC.D вниз, пробой ETH/BTC вверх. До триггера — не торопимся.",
    tone: "down",
  },
};

// Интерпретация доминации BTC (BTC.D) — какие зоны что означают
export interface DominanceZone {
  min: number;         // нижняя граница в %
  max: number;         // верхняя (до)
  label: string;       // "Альтсезон"
  action: string;      // что это значит
  tone: "up" | "hot" | "neutral" | "warn" | "down";
}

export const btcDominanceZones: DominanceZone[] = [
  { min: 0, max: 50, label: "Альтсезон: сильный", action: "Деньги перетекают из BTC в альты массово. ETH и топ-L1 обновляют локальные хаи. Риски ротации: частые +30–50% пампы, но и быстрые откаты.", tone: "up" },
  { min: 50, max: 55, label: "Альтсезон: умеренный", action: "Альты идут, но избирательно. Лучше работает качественный L1/DeFi, а не мемы. Время отбирать монеты недели — ротация заметна.", tone: "hot" },
  { min: 55, max: 60, label: "Переходная фаза", action: "BTC держит лидерство, альты проседают на падениях сильнее, но догоняют на росте. Портфель: больше ядра (BTC/ETH), меньше мелких позиций.", tone: "neutral" },
  { min: 60, max: 65, label: "BTC-лидерство", action: "Сильная BTC-фаза. Альты в риске: беты > 1 означают двойной удар на коррекциях. Работаем по Core, альты — только на кэше и только x0.5.", tone: "warn" },
  { min: 65, max: 100, label: "Глубокая BTC-доминация", action: "Альты в пыли. BTC — единственный надёжный актив в рынке. DCA только в BTC, альты — пауза до разворота BTC.D вниз.", tone: "down" },
];

// пояснение для себестоимости майнинга — где зелёная зона и почему она = дно
export const miningCostExplain = {
  title: "Себестоимость майнинга — зелёная зона = где закупаемся",
  summary: "График показывает диапазон стоимости добычи BTC у разных майнеров. Между «коммерческой» (средней) и «промышленной» (эффективной) себестоимостью лежит зелёная зона закупа.",
  greenZoneRule: "Нижняя зелёная граница — себестоимость промышленных майнеров. Исторически BTC почти не бывал ниже этой линии: если цена падает туда, майнеры отключают оборудование, давление продавца иссякает, и цена разворачивается вверх. Это дно рынка.",
  howToAct: [
    "Цена выше зелёной зоны — ждём, работаем по стандартному DCA (x1).",
    "Цена вошла в зелёную зону сверху — начинаем плавный набор позиции, x1.5.",
    "Цена пробила нижнюю зелёную границу — это историческое дно, включаем x2–x3 на BTC только, осознанно.",
  ],
};

// вдохновляющая интерпретация S2F: куда стремится биткоин
export const s2fExplain = {
  title: "Stock-to-Flow — куда цена BTC стремится на горизонте цикла",
  lead: "S2F — не «прогноз на завтра». Это карта долгосрочного рельефа: на ней видно, куда цена отрастает после каждого халвинга, когда у BTC поднимается дефицит относительно потока эмиссии.",
  waypoints: [
    { phase: "Сейчас (2026)", hint: "Мы внутри цикла после 4-го халвинга (апрель 2024). Модель тянет к $180–210k — это не обязательно значит там будем, но это центр тяжести цикла." },
    { phase: "2027–2028", hint: "Плавное плато и подготовка к 5-му халвингу. Модельная цена уходит к $250–300k. Тут начинают брать в расчёт ETF-приток и госрезервы." },
    { phase: "2029–2030", hint: "После 5-го халвинга модель выходит на $380–480k. Именно в этот диапазон исторически упирались пики прошлых циклов." },
  ],
  closing: "S2F не предсказывает дату. Он напоминает направление и масштаб: BTC — самый дефицитный актив в мире, и каждый халвинг это подчёркивает. Мы закупаем по системе, а не ловим отдельные цифры.",
};

