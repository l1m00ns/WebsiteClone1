import { readFileSync, writeFileSync } from "node:fs";

const css = readFileSync("docs/research/paste-co.de/raw/style-1.css", "utf8");

// Split top-level rules/at-rules.
function splitRules(source) {
  const rules = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        rules.push(source.slice(start, i + 1));
        start = i + 1;
      }
    }
  }
  return rules;
}

const rules = splitRules(css);
const wanted = [
  "ambient", "glass", "btn-liquid", "btn-icon-liquid", "page-offset", "sticky-below-status",
  "scrollbar-none", "invert-on-", "mascot", "bezel-", "status-bar", "noise", "liquid",
];
const keep = [];
for (const rule of rules) {
  const sel = rule.slice(0, rule.indexOf("{"));
  if (sel.startsWith("@keyframes")) { keep.push(rule); continue; }
  if (sel.startsWith("@media")) {
    // Keep media blocks that contain wanted classes.
    if (wanted.some((w) => rule.includes(w))) keep.push(rule);
    continue;
  }
  if (sel.startsWith("@supports") || sel.startsWith("@layer") || sel.startsWith("@font-face")) continue;
  if (/\\/.test(sel)) continue; // escaped utility classes
  const classes = [...sel.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)].map((m) => m[1]);
  if (classes.some((c) => wanted.some((w) => c.startsWith(w)))) keep.push(rule);
}
writeFileSync("docs/research/paste-co.de/custom-rules.css", keep.join("\n"));
console.log("rules", rules.length, "kept", keep.length, "bytes", keep.join("\n").length);
for (const r of keep) console.log(r.slice(0, r.indexOf("{")).slice(0, 140));
