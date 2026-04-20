/**
 * Cloudflare Worker — прокси для публичных метрик мастер-аккаунта Bybit
 * (раздел «Копитрейдинг»). Фронту нужен только leaderMark — остальное
 * делает воркер. Кешируем в KV 10 минут, чтобы не долбить Bybit.
 *
 * GET /?leaderMark=<base64>
 *   → { ok: true, metrics: { roi30d, winrate, maxDrawdown, activeTrades, copiers, aum, updatedAt } }
 *
 * Деплой:
 *   cd workers
 *   wrangler kv:namespace create BYBIT_CACHE
 *   # вписать id в wrangler.strategies.toml
 *   wrangler deploy --config wrangler.strategies.toml
 *
 * ВАЖНО: Bybit пока не имеет стабильного REST-endpoint-а «leader-info»
 * в их публичной документации v5 — мы используем тот же внутренний
 * api2.bybit.com/fapi/*, которым пользуется их веб-клиент. Если Bybit
 * сменит URL — правим TRY_ENDPOINTS. Воркер пробует каждый и
 * останавливается на первом, который вернул осмысленные данные.
 */

export interface Env {
  BYBIT_CACHE?: KVNamespace;
  ALLOWED_ORIGIN?: string;
}

const CACHE_TTL_SECONDS = 600;

const TRY_ENDPOINTS = [
  "https://api2.bybit.com/fapi/beta/public/position/leader-detail?leaderMark={M}",
  "https://api2.bybit.com/fapi/beta/public/position/leader-info?leaderMark={M}",
  "https://api2.bybit.com/contract/v5/public/copytrading/leader-info?leaderMark={M}",
];

interface NormalizedMetrics {
  roi30d: number;
  winrate: number;
  maxDrawdown: number;
  activeTrades: number;
  copiers?: number;
  aum?: number;
  updatedAt: string;
}

function CORS(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400",
  };
}

function num(x: unknown, fallback = 0): number {
  const n = typeof x === "string" ? parseFloat(x) : typeof x === "number" ? x : NaN;
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Достаём метрики из произвольного JSON-ответа Bybit. Раз в пару лет
 * меняются имена полей — подстраховка через алиасы.
 */
function normalize(raw: unknown): NormalizedMetrics | null {
  if (!raw || typeof raw !== "object") return null;
  const anyr = raw as Record<string, unknown>;
  const r = (anyr.result as Record<string, unknown>) ?? (anyr.data as Record<string, unknown>) ?? anyr;
  if (!r || typeof r !== "object") return null;

  const roi30d = num(r.roi30d ?? r.roi_30d ?? r.yieldRatio ?? r.roi);
  const winrate = num(r.winRate ?? r.win_rate ?? r.winrate);
  const maxDrawdown = -Math.abs(num(r.maxDrawdown ?? r.max_drawdown ?? r.mdd));
  const activeTrades = Math.floor(
    num(r.activePositions ?? r.active_positions ?? r.currentPositions)
  );
  const copiers = Math.floor(
    num(r.followerCount ?? r.follower_count ?? r.copiers ?? r.followers)
  );
  const aum = num(r.aum ?? r.totalAum ?? r.total_aum);

  if (!roi30d && !winrate && !maxDrawdown && !activeTrades && !copiers && !aum) return null;

  return {
    roi30d,
    winrate,
    maxDrawdown,
    activeTrades,
    copiers: copiers || undefined,
    aum: aum || undefined,
    updatedAt: new Date().toISOString(),
  };
}

async function fetchLiveMetrics(leaderMark: string): Promise<NormalizedMetrics | null> {
  const m = encodeURIComponent(leaderMark);
  for (const tpl of TRY_ENDPOINTS) {
    const url = tpl.replace("{M}", m);
    try {
      const r = await fetch(url, {
        headers: {
          accept: "application/json",
          "user-agent": "ciacademy-strategies-worker/1.0",
        },
      });
      if (!r.ok) continue;
      const data = await r.json();
      const metrics = normalize(data);
      if (metrics) return metrics;
    } catch {
      // пробуем следующий endpoint
    }
  }
  return null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN ?? "*";
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS(origin) });
    }
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405, headers: CORS(origin) });
    }

    const u = new URL(request.url);
    const leaderMark = u.searchParams.get("leaderMark");
    if (!leaderMark) {
      return new Response(JSON.stringify({ ok: false, error: "leaderMark is required" }), {
        status: 400,
        headers: { "content-type": "application/json", ...CORS(origin) },
      });
    }

    const cacheKey = "bybit:" + leaderMark;

    if (env.BYBIT_CACHE) {
      const cached = await env.BYBIT_CACHE.get(cacheKey, { type: "json" });
      if (cached) {
        return new Response(JSON.stringify({ ok: true, metrics: cached, cached: true }), {
          headers: { "content-type": "application/json", ...CORS(origin) },
        });
      }
    }

    const metrics = await fetchLiveMetrics(leaderMark);
    if (!metrics) {
      return new Response(
        JSON.stringify({ ok: false, error: "upstream failed or no data" }),
        { status: 502, headers: { "content-type": "application/json", ...CORS(origin) } }
      );
    }

    if (env.BYBIT_CACHE) {
      await env.BYBIT_CACHE.put(cacheKey, JSON.stringify(metrics), {
        expirationTtl: CACHE_TTL_SECONDS,
      });
    }

    return new Response(JSON.stringify({ ok: true, metrics, cached: false }), {
      headers: { "content-type": "application/json", ...CORS(origin) },
    });
  },
};
