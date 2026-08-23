import type { MetadataRoute } from "next";
import { PAGES } from "@/content/site";
import { SITE_URL } from "@/lib/metadata";

// Required for `output: export` (the static review build).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: `${SITE_URL}${page.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    // Home and the estimate form are the pages that matter for conversion.
    priority: page.href === "/" ? 1 : page.href === "/estimate" ? 0.9 : 0.7,
  }));
}
