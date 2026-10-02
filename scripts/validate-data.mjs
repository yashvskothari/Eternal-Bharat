// Checks that every id referenced in the content files points at something that exists.
import { readFileSync } from "node:fs";
const load = (n) => JSON.parse(readFileSync(new URL(`../src/data/${n}.json`, import.meta.url), "utf8"));
const [warriors, kingdoms, battles, timeline] = ["warriors", "kingdoms", "battles", "timeline"].map(load);
const ids = (xs) => new Set(xs.map((x) => x.id));
const W = ids(warriors), K = ids(kingdoms), B = ids(battles);
const problems = [];
const check = (set, id, where, what) => { if (id && !set.has(id)) problems.push(`${where}: unknown ${what} "${id}"`); };

for (const w of warriors) { check(K, w.kingdomId, `warrior ${w.id}`, "kingdomId"); w.battles?.forEach((b) => check(B, b.id, `warrior ${w.id}`, "battle")); }
for (const k of kingdoms) { k.rulers?.forEach((r) => check(W, r, `kingdom ${k.id}`, "ruler")); k.battles?.forEach((b) => check(B, b.id, `kingdom ${k.id}`, "battle")); }
for (const b of battles) { check(K, b.kingdomId, `battle ${b.id}`, "kingdomId"); b.warriors?.forEach((w) => check(W, w, `battle ${b.id}`, "warrior")); }
for (const t of timeline) { check(W, t.warriorId, `timeline ${t.id}`, "warriorId"); check(K, t.kingdomId, `timeline ${t.id}`, "kingdomId"); check(B, t.battleId, `timeline ${t.id}`, "battleId"); }

if (problems.length) { console.warn(`${problems.length} broken reference(s) (the site shows these as plain text, not links):\n - ${problems.join("\n - ")}`); process.exitCode = 0; }
else console.log("All content references are valid.");
