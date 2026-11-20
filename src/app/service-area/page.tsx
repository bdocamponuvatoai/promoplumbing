import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { AreaFinder } from "@/components/service-area/AreaFinder";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our service area",
  path: "/service-area/",
});

export default function ServiceAreaPage() {
  return (
    <>
      <PageIntro
        eyebrow="SAN MATEO ROOTS. BAY AREA SERVICE."
        title="Closer to home."
        text="Promo Plumbing is based in San Mateo and lists service across these Bay Area communities. Find your city, then confirm coverage and scheduling with the team."
      />
      <section className="area-page section">
        <div className="area-location">
          <MapPin size={40} />
          <h2>
            San Mateo,
            <br />
            California.
          </h2>
          <p>Residential & commercial plumbing.</p>
          <TextLink href={site.phone.href}>Call {site.phone.display}</TextLink>
          <p className="small">
            Don’t see your community? Ask us about your location.
          </p>
        </div>
        <AreaFinder />
      </section>
      <CtaSection />
    </>
  );
}
