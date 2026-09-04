/**
 * Generates the site icons from the client's logo.
 *
 * Replaces the default favicon that create-next-app ships — the reason a
 * generic triangle was showing next to the domain in Google results.
 *
 * The source logo sits on a black ground and the site renders it with
 * mix-blend-mode: screen over navy. We reproduce that here so the icon matches
 * the live header instead of showing a black square.
 *
 * Run: npm run prepare:icons
 */
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(root, "assets/moh-logo.png");
const APP = resolve(root, "src/app");

const NAVY = { r: 5, g: 16, b: 31, alpha: 1 };
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };

// The source has a wide black margin; trimming it lets the seal fill the tile,
// which matters a great deal at 16px.
const trimmed = await sharp(SOURCE).trim({ threshold: 18 }).toBuffer();
const { width = 0, height = 0 } = await sharp(trimmed).metadata();
const side = Math.max(width, height);

const squared = await sharp({
  create: { width: side, height: side, channels: 4, background: BLACK },
})
  .composite([{ input: trimmed, gravity: "center" }])
  .png()
  .toBuffer();

/** One square icon at `size`: the gold seal composited onto the brand navy. */
async function tile(size) {
  const pad = Math.max(1, Math.round(size * 0.04));
  const inner = await sharp(squared)
    .resize(size - pad * 2, size - pad * 2, {
      fit: "contain",
      background: BLACK,
    })
    .png()
    .toBuffer();
  const padded = await sharp(inner)
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: BLACK,
    })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: NAVY },
  })
    .composite([{ input: padded, blend: "screen" }])
    // Palette encoding keeps these small; the artwork is a limited gold/navy
    // range, so quantising is not visible at icon sizes.
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
}

// Google requires a favicon that is square and a multiple of 48px, and
// downscales from there. 48 is the largest size worth embedding in an .ico.
const ico = await pngToIco([await tile(16), await tile(32), await tile(48)]);
await writeFile(resolve(APP, "favicon.ico"), ico);

await writeFile(resolve(APP, "icon.png"), await tile(512));
await writeFile(resolve(APP, "apple-icon.png"), await tile(180));

console.log("favicon.ico (16/32/48) · icon.png (512) · apple-icon.png (180)");
