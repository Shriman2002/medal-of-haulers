import type { MetadataRoute } from "next";
import { PAGES } from "@/content/site";
import { SITE_URL } from "@/lib/metadata";

// Required for `output: export` (the static review build).
export const dynamic = "force-static";

// The static export uses trailingSlash, so canonicals resolve to /services/.
// The sitemap must agree with them or the two disagree about the same page.
const TRAILING_SLASH = process.env.STATIC_EXPORT === "1";

function pageUrl(href: string): string {
  if (href === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${href}${TRAILING_SLASH ? "/" : ""}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: pageUrl(page.href),
    lastModified: new Date(),
    changeFrequency: "monthly",
    // Home and the estimate form are the pages that matter for conversion.
    priority: page.href === "/" ? 1 : page.href === "/estimate" ? 0.9 : 0.7,
  }));
}
