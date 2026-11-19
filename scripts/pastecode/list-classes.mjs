import { readFileSync } from "node:fs";
const g = JSON.parse(readFileSync("src/content/guides.json", "utf8"));
const s = Object.values(g).join(" ");
const classes = new Set();
for (const m of s.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) classes.add(c);
const arr = [...classes].sort();
console.log(arr.length);
console.log(arr.join("\n"));
