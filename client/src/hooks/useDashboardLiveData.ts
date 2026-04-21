import { useEffect, useState } from "react";
import {
  DASHBOARD_SNAPSHOT_DATE,
  DASHBOARD_SNAPSHOT_LABEL,
  macro,
  crypto,
  btc,
  cryptoMap,
  watchlist,
  dcaPlans,
  gridBots,
  aiGuideInsights,
  semiCore,
  advancedModules,
  architectureLayers,
  executionModules,
  coinOfTheWeek,
  weeksHistory,
  portfolioComposition,
} from "@/components/dashboard/dashboardData";

// Единая точка доступа к данным дашборда.
// Сейчас возвращает статичный срез 19.04.2026 из dashboardData.ts.
// В следующей итерации сюда будут врезаны live-подтяжки:
//   - CoinGecko /coins/markets       → crypto.btcPrice/ethPrice/solPrice, dominance
//   - alternative.me /fng             → crypto.fearGreed
//   - mempool.space /mining/hashrate → btc.hashRateEH
//   - FRED series CPIAUCSL, DFF       → macro.cpiYoY, macro.fedFundsLow/High
//   - LunarCrush (MCP в кавер-ворке) → watchlist.galaxyScore/altRank
// Контракт хука от этого не поменяется — страницы просто начнут видеть свежие цифры.

export interface DashboardLiveData {
  snapshotDate: string;
  snapshotLabel: string;
  loading: boolean;
  error: string | null;
  macro: typeof macro;
  crypto: typeof crypto;
  btc: typeof btc;
  cryptoMap: typeof cryptoMap;
  watchlist: typeof watchlist;
  dcaPlans: typeof dcaPlans;
  gridBots: typeof gridBots;
  aiGuideInsights: typeof aiGuideInsights;
  semiCore: typeof semiCore;
  advancedModules: typeof advancedModules;
  architectureLayers: typeof architectureLayers;
  executionModules: typeof executionModules;
  coinOfTheWeek: typeof coinOfTheWeek;
  weeksHistory: typeof weeksHistory;
  portfolioComposition: typeof portfolioComposition;
  refresh: () => void;
}

export function useDashboardLiveData(): DashboardLiveData {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // Имитация «пульса» дашборда — раз в 60 секунд обновляем метки времени.
    const t = setInterval(() => setTick((n) => n + 1), 60_000);
    return () => clearInterval(t);
  }, []);

  return {
    snapshotDate: DASHBOARD_SNAPSHOT_DATE,
    snapshotLabel: DASHBOARD_SNAPSHOT_LABEL,
    loading: false,
    error: null,
    macro,
    crypto,
    btc,
    cryptoMap,
    watchlist,
    dcaPlans,
    gridBots,
    aiGuideInsights,
    semiCore,
    advancedModules,
    architectureLayers,
    executionModules,
    coinOfTheWeek,
    weeksHistory,
    portfolioComposition,
    refresh: () => setTick((n) => n + 1),
  };
}
