/**
 * Prefixes a public/ asset path with the deployment's base path.
 *
 * Next applies `basePath` to its own bundles and to next/link and next/image,
 * but NOT to hand-written <img src="/...">. The GitHub Pages review site is
 * served from /medal-of-haulers, so plain asset URLs must be prefixed by hand
 * or they 404. Returns the path unchanged when there is no base path.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  if (!BASE_PATH) return path;
  // Leave absolute URLs and data: URIs alone.
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}
