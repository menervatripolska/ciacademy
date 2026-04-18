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

export interface DcaPlan {
  asset: string;
  baseMonthlyUsd: number;
  multiplier: number;
  recommendedMonthlyUsd: number;
  frequency: "Еженедельно" | "Двухнедельно" | "Ежемесячно";
  nextBuyDate: string;
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
    symbol: "BTC",
    name: "Bitcoin",
    score: 78,
    galaxyScore: 72,
    altRank: 1,
    trigger: "F&G ≤25 + ETF нетто-приток 5 сессий подряд + киты +270k за 30 дней",
    timeframe: "Сегодня",
    risk: "Низкий",
  },
  {
    symbol: "TAO",
    name: "Bittensor",
    score: 71,
    galaxyScore: 68,
    altRank: 18,
    trigger: "Galaxy Score растёт 4 дня, AI-сектор отвязался от альта-беты",
    timeframe: "На неделе",
    risk: "Средний",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    score: 65,
    galaxyScore: 61,
    altRank: 22,
    trigger: "Закрытие ≥ $12.8 недельной свечой + рост OI",
    timeframe: "На неделе",
    risk: "Средний",
  },
  {
    symbol: "SOL",
    name: "Solana",
    score: 54,
    galaxyScore: 58,
    altRank: 12,
    trigger: "Держит $82 на недельке, иначе — выпадает из ядра",
    timeframe: "В течение месяца",
    risk: "Высокий",
  },
  {
    symbol: "SUI",
    name: "Sui",
    score: 49,
    galaxyScore: 55,
    altRank: 35,
    trigger: "Ретест $1.65, отскок — сигнал накопления",
    timeframe: "В течение месяца",
    risk: "Высокий",
  },
];

export const dcaPlans: DcaPlan[] = [
  {
    asset: "BTC",
    baseMonthlyUsd: 500,
    multiplier: 1.5,
    recommendedMonthlyUsd: 750,
    frequency: "Еженедельно",
    nextBuyDate: "2026-04-22",
    reason: "Экстремальный страх + приток ETF — усиленная закупка BTC",
  },
  {
    asset: "ETH",
    baseMonthlyUsd: 200,
    multiplier: 1.0,
    recommendedMonthlyUsd: 200,
    frequency: "Двухнедельно",
    nextBuyDate: "2026-04-28",
    reason: "ETH/BTC на минимумах цикла — базовый ритм без усиления",
  },
  {
    asset: "SOL",
    baseMonthlyUsd: 100,
    multiplier: 0.5,
    recommendedMonthlyUsd: 50,
    frequency: "Ежемесячно",
    nextBuyDate: "2026-05-05",
    reason: "SOL слабее BTC — половинная доля, до возвращения силы",
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
