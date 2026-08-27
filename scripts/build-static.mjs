/**
 * Builds the fully static site. Two flavours:
 *
 *   npm run build:static      GitHub Pages client-review site.
 *                             noindex + demo form, served under a base path.
 *
 *   npm run build:production  Cloudflare Pages, on the real domain.
 *                             Indexable, served from the root, and the form is
 *                             OFFLINE — it points to the phone and email rather
 *                             than pretending to submit. Never ship `demo` to a
 *                             public domain: it tells real customers their
 *                             request was received when nothing was sent.
 *
 * `output: "export"` cannot include a POST route handler, so /api/estimate is
 * moved aside for the duration of the build and restored afterwards. Neither
 * flavour needs the endpoint.
 */
import { execSync } from "node:child_process";
import { existsSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const apiDir = resolve(root, "src/app/api");
const stashedApiDir = resolve(root, ".api-stash");

if (existsSync(stashedApiDir)) {
  throw new Error(
    `${stashedApiDir} already exists — a previous build may have been interrupted. ` +
      "Move it back to src/app/api before rebuilding.",
  );
}

const isProduction = process.argv.includes("--production");

if (isProduction && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set for a production build — it drives " +
      "canonical URLs, OpenGraph, and the sitemap. Example: " +
      "NEXT_PUBLIC_SITE_URL=https://example.com npm run build:production",
  );
}

const movedApi = existsSync(apiDir);
if (movedApi) renameSync(apiDir, stashedApiDir);

// Next generates route-type validators into .next that import every route by
// path. Moving the API route aside leaves those stale imports pointing at a
// file that no longer exists, and the build's type check fails. They are
// regenerated on each build, so clearing them is safe.
for (const dir of ["dev/types", "types"]) {
  rmSync(resolve(root, ".next", dir), { recursive: true, force: true });
}

try {
  execSync("npx next build", {
    stdio: "inherit",
    cwd: root,
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      ...(isProduction
        ? {
            // Real domain: served from the root, indexable, form offline.
            NEXT_PUBLIC_BASE_PATH: "",
            NEXT_PUBLIC_PREVIEW: "",
            NEXT_PUBLIC_FORM_MODE: "offline",
          }
        : {
            NEXT_PUBLIC_FORM_MODE: "demo",
            NEXT_PUBLIC_PREVIEW: "1",
          }),
    },
  });

  // GitHub Pages runs Jekyll, which silently drops directories starting with an
  // underscore — including Next's _next/. This file turns Jekyll off.
  writeFileSync(resolve(root, "out/.nojekyll"), "");
  console.log(
    `\nStatic export written to out/ — ${
      isProduction
        ? `production, indexable, form offline, ${process.env.NEXT_PUBLIC_SITE_URL}`
        : "review site, noindex, form in demo mode"
    }`,
  );
} finally {
  if (movedApi) {
    rmSync(apiDir, { recursive: true, force: true });
    renameSync(stashedApiDir, apiDir);
  }
}
