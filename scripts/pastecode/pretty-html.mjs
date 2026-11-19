import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = "docs/research/paste-co.de/raw/pages";
const outDir = "docs/research/paste-co.de/pretty";
import { mkdirSync } from "node:fs";
mkdirSync(outDir, { recursive: true });

for (const f of readdirSync(dir)) {
  const html = readFileSync(join(dir, f), "utf8");
  const body = html.slice(html.indexOf("<body"), html.lastIndexOf("</body>"));
  let pretty = body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/(<template[\s\S]*?<\/template>)/g, "")
    .replace(/></g, ">\n<")
    .replace(/<svg[\s\S]*?<\/svg>/g, "<svg/>")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
  writeFileSync(join(outDir, f.replace(/\.html$/, ".txt")), pretty);
}
console.log("done");
