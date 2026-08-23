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
 * True when the build has no server to post the estimate form to (the static
 * review site). The form then demonstrates its success state without sending.
 */
export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "1";

/** Per-page metadata with a canonical URL, sharing one title template. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Medal of Haulers`,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Medal of Haulers",
      type: "website",
    },
  };
}
