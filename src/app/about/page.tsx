import type { Metadata } from "next";
import { AboutStory, AboutValues } from "@/components/about/AboutSections";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Meet Promo Plumbing",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="GET TO KNOW PROMO"
        title="Local roots. People first."
        text="Promo Plumbing Inc. is a San Mateo plumbing business serving residential and commercial customers across the Bay Area."
      />
      <AboutStory />
      <AboutValues />
      <CtaSection />
    </>
  );
}
