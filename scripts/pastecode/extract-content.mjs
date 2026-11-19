import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const rawDir = "docs/research/paste-co.de/raw/pages";
const outDir = "src/content";
mkdirSync(outDir, { recursive: true });

function clean(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<svg[\s\S]*?<\/svg>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sdata-radix-[a-z-]+="[^"]*"/g, "")
    .replace(/\sid="radix-[^"]*"/g, "")
    .replace(/\sstyle="[^"]*"/g, "")
    .replace(/\saria-controls="radix-[^"]*"/g, "")
    .replace(/https:\/\/paste-co\.de/g, "")
    .replace(/\sdata-nextjs-[a-z-]+="[^"]*"/g, "")
    .replace(/\sdecoding="async"/g, "")
    .replace(/<img /g, '<img loading="lazy" ')
    .replace(/<iframe[\s\S]*?<\/iframe>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractElements(html, tag) {
  const out = [];
  const open = new RegExp(`<${tag}\\b`, "g");
  const close = new RegExp(`</${tag}>`, "g");
  let match;
  while ((match = open.exec(html))) {
    close.lastIndex = open.lastIndex;
    const end = close.exec(html);
    if (!end) break;
    out.push(html.slice(match.index, end.index + end[0].length));
    open.lastIndex = end.index + end[0].length;
  }
  return out.join("\n");
}

function extractBalancedDiv(html, marker) {
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`marker not found: ${marker}`);
  const tagRe = /<div\b|<\/div>/g;
  tagRe.lastIndex = start;
  let depth = 0;
  let m;
  while ((m = tagRe.exec(html))) {
    if (m[0] === "<div") depth += 1;
    else {
      depth -= 1;
      if (depth === 0) return html.slice(start, m.index + m[0].length);
    }
  }
  throw new Error(`unbalanced div: ${marker}`);
}

function textOf(s) {
  return s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').trim();
}

// Legal pages
const legalFiles = {
  privacy: "privacy.html",
  terms: "terms.html",
  cookies: "cookies.html",
  safety: "safety.html",
};
const legal = {};
for (const [slug, file] of Object.entries(legalFiles)) {
  const html = readFileSync(join(rawDir, file), "utf8");
  const content = extractBalancedDiv(html, '<div class="glass space-y-10');
  legal[slug] = clean(content);
}

// Guides
const guideFiles = {
  compile: "guides_compile.html",
  "driver-compile": "guides_driver-compile.html",
  "map-driver": "guides_map-driver.html",
  troubleshooting: "guides_troubleshooting.html",
  "updating-offsets": "guides_updating-offsets.html",
};
const fetched = JSON.parse(readFileSync("docs/research/paste-co.de/raw/api/guides.json", "utf8"));
for (const [slug, entry] of Object.entries(fetched)) {
  if (!entry.html) continue;
  const path = join(rawDir, `guide-${slug}.html`);
  writeFileSync(path, entry.html, "utf8");
  guideFiles[slug] = `guide-${slug}.html`;
}

const guides = {};
const guideMeta = {};
for (const [slug, file] of Object.entries(guideFiles)) {
  const html = readFileSync(join(rawDir, file), "utf8");
  const content = extractElements(html, "section");
  guides[slug] = clean(content);
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const eyebrow = html.match(/<p class="font-display text-3xs uppercase tracking-widest text-muted-foreground">([\s\S]*?)<\/p>/);
  guideMeta[slug] = {
    title: textOf(h1?.[1] || slug),
    eyebrow: textOf(eyebrow?.[1] || "Guides"),
  };
}

writeFileSync(join(outDir, "legal.json"), JSON.stringify(legal));
writeFileSync(join(outDir, "guides.json"), JSON.stringify(guides));
writeFileSync(join(outDir, "guide-pages.json"), JSON.stringify(guideMeta, null, 2));
console.log("legal", Object.keys(legal).map((k) => `${k}:${legal[k].length}`));
console.log("guides", Object.keys(guides).length, Object.keys(guides).map((k) => `${k}:${guides[k].length}`));
console.log("guideMeta", Object.values(guideMeta).map((g) => `${g.eyebrow} | ${g.title}`).join("\n"));
