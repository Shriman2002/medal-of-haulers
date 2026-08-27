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
