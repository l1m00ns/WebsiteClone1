import http from "node:http";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";

const ROOT = process.argv[2] ?? process.cwd();
const PORT = Number(process.argv[3] ?? 3999);

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.url === "/ping") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("pong");
    return;
  }
  if (req.method !== "POST") {
    res.writeHead(405);
    res.end("POST only");
    return;
  }
  const url = new URL(req.url, "http://localhost");
  const rel = url.searchParams.get("path") || "misc.bin";
  const target = normalize(join(ROOT, rel));
  if (!target.startsWith(normalize(ROOT))) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }
  const chunks = [];
  req.on("data", (c) => chunks.push(c));
  req.on("end", () => {
    try {
      const buf = Buffer.concat(chunks);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, buf);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, path: rel, bytes: buf.length }));
    } catch (e) {
      res.writeHead(500);
      res.end(String(e));
    }
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`save-server listening on http://127.0.0.1:${PORT}, root=${ROOT}`);
});
