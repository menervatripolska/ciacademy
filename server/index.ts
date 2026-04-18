import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Коды доступа должны зеркалировать client/src/config/accessCodes.ts.
// Пока нет БД — держим плоский список в сервере.
const VALID_CODES = new Set([
  "OS-ALPHA-2026",
  "SATS-READY",
  "NOIR-ACCESS",
  "BTC-REGIME",
  "CRYPTO-OS-MVP",
  // Обратная совместимость со старыми кодами
  "CRYPTO-2026-001",
  "CRYPTO-2026-002",
  "CRYPTO-2026-003",
  "TEST-ACCESS",
]);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());
  app.post("/api/validate-code", (req, res) => {
    const { code } = req.body;
    if (code && VALID_CODES.has(String(code).trim().toUpperCase())) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
