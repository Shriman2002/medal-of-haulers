import type { Metadata } from "next";

/**
 * Change this to the real domain once it's registered — it drives canonical
 * URLs, OpenGraph, the sitemap, and robots.txt.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://medalofhaulers.com";

/**
 * True for the GitHub Pages client-review build. Drives `noindex` and a
 * disallow-all robots.txt so the preview stays out of search results.
 */
export const IS_PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

/**
 * How the estimate form behaves in this build.
 *
 * - `live`    posts to /api/estimate. Requires a server (or a form endpoint).
 * - `demo`    skips the network call and shows the success state. For the
 *             client-review site only — safe because nobody real submits there.
 * - `offline` no submit at all; the form points to the phone and email instead.
 *
 * `offline` is the correct setting for a public static build with no backend.
 * `demo` on a live domain would tell real customers their request was received
 * when nothing was sent — a lost job every time.
 */
export type FormMode = "live" | "demo" | "offline";

export const FORM_MODE: FormMode =
  (process.env.NEXT_PUBLIC_FORM_MODE as FormMode | undefined) ??
  (process.env.NEXT_PUBLIC_DEMO_MODE === "1" ? "demo" : "live");

/**
 * Absolute URL for a route, matching how the page is actually served.
 *
 * The static export uses trailingSlash, so canonicals resolve to /services/.
 * og:url and the sitemap must agree with the canonical, or three signals give
 * search engines three slightly different addresses for the same page.
 */
export function canonicalUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  const trailing = process.env.STATIC_EXPORT === "1" ? "/" : "";
  return `${SITE_URL}${path}${trailing}`;
}

/**
 * The share card, generated at build time by src/app/opengraph-image.tsx.
 *
 * Referenced explicitly on every page rather than left to inheritance: Next
 * merges metadata shallowly, so a page that sets its own `openGraph` *replaces*
 * the parent's — image included. Relying on inheritance left every page except
 * home sharing as a bare link.
 */
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Medal of Haulers — veteran-owned moving, junk removal, and donation pickup in the DMV, Northern Virginia, and Richmond",
};

/**
 * Per-page metadata: canonical URL, Open Graph, and Twitter card.
 *
 * `title` goes through the root layout's "%s | Medal of Haulers" template. The
 * home page must pass `absoluteTitle` instead — a template never applies to
 * the segment that defines it, so without this the home page title would not
 * contain the business name at all.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | Medal of Haulers`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl(path),
      siteName: "Medal of Haulers",
      locale: "en_US",
      type: "website",
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
