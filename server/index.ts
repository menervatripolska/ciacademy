import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Valid access codes (in production, move to DB)
const VALID_CODES = new Set([
  "CRYPTO-2026-001",
  "CRYPTO-2026-002",
  "CRYPTO-2026-003",
  "TEST-ACCESS",
]);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // API: validate access code
  app.use(express.json());
  app.post("/api/validate-code", (req, res) => {
    const { code } = req.body;
    if (code && VALID_CODES.has(code.trim().toUpperCase())) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  });

  // API: health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Serve static files
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Client-side routing
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
