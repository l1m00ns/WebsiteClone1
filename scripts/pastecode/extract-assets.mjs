import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";

const data = JSON.parse(readFileSync("docs/research/paste-co.de/raw/assets.json", "utf8"));
const outRoot = "public/sites/paste-co-de";
const fontMap = {
  "/_next/static/media/8800dfc60902df36-s.p.2sla2yow9-9p_.woff2": "fonts/onest-latin.woff2",
  "/_next/static/media/99e609270109b47d-s.p.30xqm3yldpj47.woff2": "fonts/ibm-plex-mono-400-latin.woff2",
  "/_next/static/media/b59689b1142d37ce-s.p.1bk8_xp319hr4.woff2": "fonts/unbounded-latin.woff2",
  "/_next/static/media/effe91970fc4db64-s.p.27korwsf9c79u.woff2": "fonts/ibm-plex-mono-500-latin.woff2",
};
for (const [url, entry] of Object.entries(data)) {
  if (!entry.b64) { console.log("skip", url, entry.status); continue; }
  let rel;
  if (url.startsWith("/game-icons/")) rel = "game-icons/" + basename(url);
  else if (url.startsWith("/brand/")) rel = "brand/" + basename(url);
  else if (url === "/icon.png") rel = "brand/icon.png";
  else if (url === "/embed.png") rel = "brand/embed.png";
  else if (url.startsWith("/sponsors/")) rel = "sponsors/" + basename(url);
  else if (fontMap[url]) rel = fontMap[url];
  else rel = "misc/" + basename(url);
  const buf = Buffer.from(entry.b64, "base64");
  const dest = join(outRoot, rel);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  console.log(rel, buf.length);
}
