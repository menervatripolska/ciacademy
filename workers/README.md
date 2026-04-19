# AI-чат прокси

Cloudflare Worker между дашбордом Crypto OS и LLM-провайдером.
Держит API-ключ в секрете (фронт его не видит).

## Первый деплой

```bash
cd workers
npm i -g wrangler
wrangler login
wrangler secret put AI_API_KEY     # вставить ключ провайдера (Qwen / Anthropic / Gemini)
wrangler deploy
```

На выходе получим URL вида `https://ciacademy-ai-chat.<acc>.workers.dev`.

## Подключение к дашборду

1. В GitHub: Settings → Secrets and variables → Actions → Variables
   добавить `VITE_AI_CHAT_URL = https://ciacademy-ai-chat.<acc>.workers.dev`.
2. В `.github/workflows/deploy.yml` в шаг Build передать переменную:
   ```yaml
   - name: Build
     env:
       VITE_AI_CHAT_URL: ${{ vars.VITE_AI_CHAT_URL }}
     run: pnpm build
   ```
3. После пуша — чат начинает отвечать через воркер.

## Переключить провайдера

В `wrangler.toml` → `[vars] PROVIDER` → `anthropic | qwen | gemini`,
затем `wrangler deploy`.
