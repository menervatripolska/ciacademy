// Каталог источников данных для Crypto OS Dashboard.
// Каждый источник имеет тип, публичность, частоту обновления и ссылку.
// Используется хуком useDashboardLiveData + README на dashboard для прозрачности.

export type DataSourceKind = "price" | "sentiment" | "macro" | "onchain" | "social" | "ai";

export interface DataSource {
  id: string;
  title: string;
  kind: DataSourceKind;
  url: string;
  publicApi: boolean;
  freeTier: boolean;
  updateCadence: "realtime" | "hourly" | "daily" | "monthly";
  notes: string;
}

export const DATA_SOURCES: DataSource[] = [
  {
    id: "coingecko",
    title: "CoinGecko",
    kind: "price",
    url: "https://api.coingecko.com/api/v3",
    publicApi: true,
    freeTier: true,
    updateCadence: "realtime",
    notes: "BTC/ETH/SOL цены, доминация, маркет-кап, топ-10, изменения 24h/7d/30d.",
  },
  {
    id: "alternative-fng",
    title: "Alternative.me — Fear & Greed",
    kind: "sentiment",
    url: "https://api.alternative.me/fng",
    publicApi: true,
    freeTier: true,
    updateCadence: "daily",
    notes: "Индекс F&G 0–100. Обновляется раз в сутки.",
  },
  {
    id: "mempool",
    title: "mempool.space",
    kind: "onchain",
    url: "https://mempool.space/api",
    publicApi: true,
    freeTier: true,
    updateCadence: "realtime",
    notes: "Хэшрейт, сложность, размер мемпула, комиссии, whale transactions.",
  },
  {
    id: "fred",
    title: "FRED — St. Louis Fed",
    kind: "macro",
    url: "https://fred.stlouisfed.org",
    publicApi: true,
    freeTier: true,
    updateCadence: "monthly",
    notes: "CPI, Fed Funds Rate, M2, Unemployment, DXY — макро-режим.",
  },
  {
    id: "bls-cpi",
    title: "BLS — CPI",
    kind: "macro",
    url: "https://www.bls.gov/cpi",
    publicApi: true,
    freeTier: true,
    updateCadence: "monthly",
    notes: "Первоисточник инфляции. Релиз — один раз в месяц.",
  },
  {
    id: "lunarcrush",
    title: "LunarCrush",
    kind: "social",
    url: "https://lunarcrush.com",
    publicApi: true,
    freeTier: true,
    updateCadence: "hourly",
    notes: "Galaxy Score, AltRank, топ-креаторы, тренды по тикерам.",
  },
  {
    id: "glassnode",
    title: "Glassnode",
    kind: "onchain",
    url: "https://glassnode.com",
    publicApi: true,
    freeTier: false,
    updateCadence: "daily",
    notes: "MVRV, supply in profit, realized cap, cohort-анализ. Платный тир.",
  },
  {
    id: "gemini-ai",
    title: "Google Gemini 2.5",
    kind: "ai",
    url: "https://ai.google.dev",
    publicApi: true,
    freeTier: true,
    updateCadence: "realtime",
    notes: "Контекстные ответы AI-гида на основе текущего среза.",
  },
];

export function sourcesByKind(kind: DataSourceKind): DataSource[] {
  return DATA_SOURCES.filter((s) => s.kind === kind);
}
