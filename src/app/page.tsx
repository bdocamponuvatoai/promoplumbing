import type { Metadata } from "next";
import { ApproachSection } from "@/components/home/ApproachSection";
import { AreaTeaser } from "@/components/home/AreaTeaser";
import { BusinessFeature } from "@/components/home/BusinessFeature";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeStory } from "@/components/home/HomeStory";
import { QuickFinder } from "@/components/home/QuickFinder";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BusinessJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: site.homeTitle,
  path: "/",
  description: site.description,
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="finder-shell">
        <QuickFinder />
      </div>
      <ServicesSection />
      <HomeStory />
      <BusinessFeature />
      <ApproachSection />
      <AreaTeaser />
      <FaqSection />
      <CtaSection />
      <BusinessJsonLd />
    </>
  );
}
