/**
 * Pre-sizes the client's logo for the web.
 *
 * The handoff ships a 2000x2000 / 1.6 MB PNG, which appears in the header of
 * every page. Rather than rely on next/image — whose behaviour differs across
 * Amplify, OpenNext, and static export — we emit fixed widths at build-prep
 * time and let plain <img srcset> pick. Keeps the hosting decision open.
 *
 * Run: npm run prepare:logo
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(here, "../assets/moh-logo.png");
const OUT_DIR = resolve(here, "../public");

const WIDTHS = [54, 108, 120, 170, 220, 240, 340, 400, 800];

mkdirSync(OUT_DIR, { recursive: true });

for (const width of WIDTHS) {
  const out = resolve(OUT_DIR, `logo-${width}.png`);
  const info = await sharp(SOURCE)
    .resize(width, width, { fit: "contain" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);
  console.log(`logo-${width}.png  ${(info.size / 1024).toFixed(1)} KB`);
}
