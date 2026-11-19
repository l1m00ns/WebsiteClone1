import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = "docs/research/paste-co.de";
const data = JSON.parse(readFileSync(join(root, "raw/pages.json"), "utf8"));

const slug = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_"));
mkdirSync(join(root, "raw/pages"), { recursive: true });
for (const [route, page] of Object.entries(data.pages)) {
  if (page.html) writeFileSync(join(root, "raw/pages", `${slug(route)}.html`), page.html);
}
let i = 0;
for (const [url, css] of Object.entries(data.styles)) {
  writeFileSync(join(root, "raw", `style-${i++}.css`), css);
  console.log(url, css.length);
}
console.log("pages:", Object.keys(data.pages).length);
