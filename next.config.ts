import type { NextConfig } from "next";

/**
 * Two build targets.
 *
 * Default: a server build, where /api/estimate runs as a real route handler.
 * `STATIC_EXPORT=1`: a fully static export for the GitHub Pages review site,
 * which has no server runtime. See scripts/build-static.mjs.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

// Project Pages are served from /<repo>, so assets need that prefix.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        // Directory-style URLs so /services resolves to /services/index.html.
        trailingSlash: true,
        basePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
