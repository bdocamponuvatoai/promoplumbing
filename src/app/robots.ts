import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/config/deployment";

export const dynamic = "force-static";

/** Blocks all crawlers until indexing is explicitly enabled (SITE_INDEXABLE). */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
