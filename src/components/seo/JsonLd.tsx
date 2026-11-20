import { logo } from "@/assets/images";
import { siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { towns } from "@/content/towns";

/** Renders structured data. `<` is escaped so the payload cannot close the tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * The business as a schema.org Plumber. Only facts shown on the site: no
 * hours, prices, ratings or licences.
 */
export function BusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Plumber",
        "@id": `${siteUrl}/#business`,
        name: site.legalName,
        url: `${siteUrl}/`,
        logo: `${siteUrl}${logo.src}`,
        telephone: site.phone.international,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.country,
        },
        areaServed: towns.map((name) => ({ "@type": "City", name })),
      }}
    />
  );
}
