# ai-chat — прокси к Gemini для Новы

Нова (AI-гид в дашборде) не должна иметь ключ Gemini в браузере — ключ улетит в утечку. Этот Cloudflare Worker прячет ключ у себя и отдаёт дашборду только ответ.

## Один раз: регистрация в Cloudflare

1. Заходишь на https://dash.cloudflare.com/sign-up — регистрация бесплатная.
2. Ставишь wrangler локально:
```
npm install -g wrangler
```
3. Логин:
```
wrangler login
```
Откроется браузер, подтверждаешь доступ.

## Первый деплой Новы

Из папки репо:
```
cd workers
wrangler secret put AI_API_KEY
```
Вставляешь туда ключ из https://aistudio.google.com/app/apikey. Дальше:
```
wrangler deploy
```
В конце выведется URL вида `https://ciacademy-ai-chat.<твоё-имя>.workers.dev` — это URL Новы.

## Прокидываем URL в сайт

Идёшь в GitHub → репо `ciacademy` → **Settings** → **Secrets and variables** → **Actions** → вкладка **Variables** (не Secrets, именно Variables!) → **New repository variable**.

- Name: `VITE_AI_CHAT_URL`
- Value: URL воркера, который получил выше

Пушишь любой коммит в main — GitHub Actions пересобирает сайт с этой переменной, и Нова на проде начинает отвечать через Gemini.

## Проверка Worker напрямую

```
curl -X POST https://ciacademy-ai-chat.<твоё-имя>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"привет"}],"system":"ответь коротко"}'
```
Если вернулось `{"reply":"..."}` — работает.

## Ротация ключа

Если ключ утёк:
1. https://aistudio.google.com/app/apikey → удалить старый, создать новый.
2. `cd workers && wrangler secret put AI_API_KEY` — вставить новый.
3. `wrangler deploy` — применить.

## Квоты (бесплатный тариф Gemini)

15 RPM на Flash, 1.5M TPM — для Новы с огромным запасом.
