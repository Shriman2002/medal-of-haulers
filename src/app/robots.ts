import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE_URL } from "@/lib/metadata";

// Required for `output: export` (the static review build).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // The client-review deployment must never be indexed — a public staging copy
  // would compete with the real site in search once it launches.
  if (IS_PREVIEW) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
