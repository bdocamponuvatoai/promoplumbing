import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/deployment";
import { allRoutes } from "@/content/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((path) => ({ url: `${siteUrl}${path}` }));
}
