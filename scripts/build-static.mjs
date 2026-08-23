/**
 * Builds the fully static site for the GitHub Pages client-review deployment.
 *
 * `output: "export"` cannot include a POST route handler, so /api/estimate is
 * moved aside for the duration of the build and restored afterwards. The form
 * runs in demo mode in this build (see IS_DEMO), so nothing needs the endpoint.
 *
 * Run: npm run build:static
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

const movedApi = existsSync(apiDir);
if (movedApi) renameSync(apiDir, stashedApiDir);

try {
  execSync("npx next build", {
    stdio: "inherit",
    cwd: root,
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_DEMO_MODE: "1",
      NEXT_PUBLIC_PREVIEW: "1",
    },
  });

  // GitHub Pages runs Jekyll, which silently drops directories starting with an
  // underscore — including Next's _next/. This file turns Jekyll off.
  writeFileSync(resolve(root, "out/.nojekyll"), "");
  console.log("\nStatic export written to out/ (with .nojekyll)");
} finally {
  if (movedApi) {
    rmSync(apiDir, { recursive: true, force: true });
    renameSync(stashedApiDir, apiDir);
  }
}
