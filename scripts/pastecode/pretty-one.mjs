import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const file = process.argv[2];
const out = process.argv[3];
const html = readFileSync(file, "utf8");
const body = html.slice(html.indexOf("<body"), html.lastIndexOf("</body>"));
const pretty = body
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<style[\s\S]*?<\/style>/g, "")
  .replace(/<svg[\s\S]*?<\/svg>/g, "<svg/>")
  .replace(/></g, ">\n<")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean)
  .join("\n");
mkdirSync(join(out, ".."), { recursive: true });
writeFileSync(out, pretty);
console.log(out, pretty.length);
