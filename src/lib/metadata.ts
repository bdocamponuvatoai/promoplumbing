import type { Metadata } from "next";
import { photos } from "@/assets/images";
import { site } from "@/config/site";

interface PageMetadataInput {
  /** Page name. Rendered as "<title> | Promo Plumbing" except on the home page. */
  title: string;
  /** Route path with trailing slash, e.g. "/about/". */
  path: string;
  description?: string;
}

const HERO_ALT =
  "Illustrative scene of a plumbing professional checking a kitchen faucet";

/**
 * Per-page metadata: absolute title, description, canonical URL and Open Graph.
 * Relative URLs are resolved against `metadataBase` (set in the root layout).
 */
export function pageMetadata({
  title,
  path,
  description,
}: PageMetadataInput): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  const desc =
    description ??
    `${title} with ${site.legalName} in San Mateo and the Bay Area. Talk with the team about your plumbing needs.`;
  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description: desc,
      images: [
        {
          url: photos.hero.src,
          width: photos.hero.width,
          height: photos.hero.height,
          alt: HERO_ALT,
        },
      ],
    },
  };
}
