/**
 * Guards the handoff's client-approved copy.
 *
 * Walks every prose string in the design prototype and asserts it still appears
 * verbatim in src/content/site.ts. Run after touching content: `npm run check:copy`.
 */
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const PROTOTYPE = resolve(here, "../../design_handoff_medal_of_haulers/Medal of Haulers Site.dc.html");
const CONTENT = resolve(here, "../src/content/site.ts");

if (!existsSync(PROTOTYPE)) {
  console.log("design handoff bundle not present — skipping copy check");
  process.exit(0);
}

const proto = readFileSync(PROTOTYPE, "utf8");
const mine = readFileSync(CONTENT, "utf8");
const decode = (s) => s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"'").replace(/&quot;/g,'"');

// Prose only: reject CSS declarations, SVG path data, and prototype template code.
const isProse = (t) =>
  !/[{}<>]/.test(t) &&
  !/^[\w-]+\s*:/.test(t) &&
  !/;\s*[\w-]+\s*:/.test(t) &&
  !/^[Mm][\d.\-]/.test(t) &&
  !/https?:\/\/(fonts|www\.w3)/.test(t) &&
  !/=>|this\.|const |\.map\(/.test(t) &&
  !/data-dc-script/.test(t) &&
  /[a-z]{3}\s+[a-z]{3}/i.test(t);

const strings = new Set();
for (const m of proto.matchAll(/"([^"\\]{25,})"/g)) if (isProse(m[1])) strings.add(m[1]);
for (const m of proto.matchAll(/>([^<>{}]{25,})</g)) {
  const t = decode(m[1]).trim();
  if (isProse(t)) strings.add(t);
}
// placeholder= and aria attributes carry prose too
for (const m of proto.matchAll(/placeholder="([^"]{15,})"/g)) strings.add(decode(m[1]));

const missing = [...strings].filter((s) => !mine.includes(s.replace(/\\'/g, "'")));
console.log(`prose strings checked: ${strings.size}`);
console.log(`missing from site.ts:  ${missing.length}`);
for (const m of missing) console.log("  MISSING: " + m.slice(0, 120));
if (missing.length) process.exit(1);
