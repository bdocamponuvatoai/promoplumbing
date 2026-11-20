import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { FilterableServiceGrid } from "@/components/services/FilterableServiceGrid";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Plumbing services",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="PLUMBING FOR REAL LIFE"
        title="The right help, right here."
        text="Explore plumbing services for your home, your business and whatever needs attention next."
      />
      <section className="section service-directory">
        <FilterableServiceGrid />
      </section>
      <FaqSection />
      <CtaSection />
    </>
  );
}
