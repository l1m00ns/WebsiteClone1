import { readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("docs/research/paste-co.de/raw/pages/guides.html", "utf8");
const cards = [];
const re = /<a class="glass group[^"]*" href="\/guides\/([^"]+)">([\s\S]*?)<\/a>/g;
let m;
while ((m = re.exec(html))) {
  const slug = m[1];
  const body = m[2];
  const title = (body.match(/<p class="text-sm font-medium[^"]*">([\s\S]*?)<\/p>/) || [])[1] || "";
  const tag = (body.match(/<span class="shrink-0 font-mono[^"]*">([\s\S]*?)<\/span>/) || [])[1] || "";
  const desc = (body.match(/<p class="mt-1\.5[^"]*">([\s\S]*?)<\/p>/) || [])[1] || "";
  const text = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').trim();
  cards.push({ slug, title: text(title), tag: text(tag), description: text(desc) });
}
console.log(cards.length);
writeFileSync("src/data/guide-meta.json", JSON.stringify(cards, null, 2));
console.log(cards.map((c) => `${c.slug} | ${c.tag} | ${c.title}`).join("\n"));
