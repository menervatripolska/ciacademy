import { useEffect, useState } from "react";
import type { LiveStrategy, LiveStrategyMetrics } from "@/components/dashboard/dashboardData";

/**
 * Тянет живые метрики стратегии из нашего Cloudflare Worker.
 * Если URL воркера не задан или запрос упал — возвращает mock из данных
 * (s.metrics) без лишнего шума: дашборд не должен ломаться от отсутствия
 * бэкенда. ETag кеш — раз в 10 минут worker сам отдаст cached=true.
 */
export function useLiveStrategyMetrics(s: LiveStrategy): {
  metrics: LiveStrategyMetrics;
  live: boolean;
  updatedAt: string;
} {
  const [metrics, setMetrics] = useState<LiveStrategyMetrics>(s.metrics);
  const [live, setLive] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(s.updatedAt);

  useEffect(() => {
    const base = (import.meta.env.VITE_STRATEGIES_URL ?? "").trim();
    if (\!base || \!s.leaderMark || s.platform \!== "bybit") return;

    let canceled = false;
    const url =
      base.replace(/\/$/, "") +
      "?leaderMark=" +
      encodeURIComponent(s.leaderMark);

    (async () => {
      try {
        const r = await fetch(url, { method: "GET" });
        if (\!r.ok) return;
        const data = (await r.json()) as {
          ok?: boolean;
          metrics?: LiveStrategyMetrics & { updatedAt?: string };
        };
        if (canceled || \!data?.ok || \!data.metrics) return;
        setMetrics({
          roi30d: data.metrics.roi30d,
          winrate: data.metrics.winrate,
          maxDrawdown: data.metrics.maxDrawdown,
          activeTrades: data.metrics.activeTrades,
          copiers: data.metrics.copiers,
          aum: data.metrics.aum,
        });
        setLive(true);
        if (data.metrics.updatedAt) setUpdatedAt(data.metrics.updatedAt);
      } catch {
        // тихо остаёмся на моке — это демо, не критичный путь
      }
    })();

    return () => {
      canceled = true;
    };
  }, [s.leaderMark, s.platform]);

  return { metrics, live, updatedAt };
}
