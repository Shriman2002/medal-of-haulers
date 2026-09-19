import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CONTACT, HERO } from "@/content/site";

/**
 * The preview card shown when the site is shared — texts, Facebook, Nextdoor,
 * Slack. Local movers get a lot of word-of-mouth through exactly those
 * channels, and without this a shared link is a bare URL.
 *
 * Rendered once at build time. Every line of copy is the hero's approved text;
 * the phone number is added because it's the one thing a local share card
 * should carry.
 */

// Required for `output: export`; the card has no per-request inputs anyway.
export const dynamic = "force-static";

export const alt = `${CONTACT.business} — veteran-owned moving, junk removal, and donation pickup in the DMV, Northern Virginia, and Richmond`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#05101f";
const GOLD = "#e2a927";
const CREAM = "#f7f4ee";
const SLATE = "#c3c9d3";

export default async function Image() {
  const [extraBold, semiBold, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Archivo-800.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Archivo-600.ttf")),
    // Already composited onto the brand navy by scripts/prepare-icons.mjs,
    // so it sits seamlessly on the card's ground.
    readFile(join(process.cwd(), "src/app/icon.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: NAVY,
          borderBottom: `10px solid ${GOLD}`,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0 0 72px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                border: `3px solid ${GOLD}`,
                color: GOLD,
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 3.6,
                textTransform: "uppercase",
                padding: "10px 16px",
              }}
            >
              {HERO.tag}
            </div>
          </div>
          <div
            style={{
              marginTop: 28,
              color: CREAM,
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -1.8,
            }}
          >
            {HERO.title}
          </div>
          <div style={{ marginTop: 28, width: 220, height: 4, background: GOLD }} />
          <div
            style={{
              marginTop: 26,
              color: GOLD,
              fontSize: 23,
              fontWeight: 800,
              letterSpacing: 1.8,
              textTransform: "uppercase",
            }}
          >
            {HERO.services}
          </div>
          <div
            style={{
              marginTop: 16,
              color: SLATE,
              fontSize: 25,
              fontWeight: 600,
              lineHeight: 1.4,
              maxWidth: 560,
            }}
          >
            {HERO.subline}
          </div>
          <div
            style={{
              marginTop: 30,
              color: CREAM,
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: 0.5,
            }}
          >
            {CONTACT.phone}
          </div>
        </div>
        <div
          style={{
            width: 440,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 48,
          }}
        >
          <img src={logoSrc} width={380} height={380} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: extraBold, weight: 800, style: "normal" },
        { name: "Archivo", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
