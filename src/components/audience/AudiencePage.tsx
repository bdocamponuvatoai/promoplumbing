import { Check } from "lucide-react";
import Image from "next/image";
import { photos } from "@/assets/images";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextLink } from "@/components/ui/TextLink";
import type { Audience } from "@/content/audiences";

/** Shared layout of the residential and commercial pages. */
export function AudiencePage({ audience }: { audience: Audience }) {
  const inquiryHref = `/contact/?property=${audience.property}`;
  return (
    <>
      <section className="audience-hero section">
        <div>
          <p className="eyebrow">{audience.eyebrow}</p>
          <h1>
            {audience.title[0]}
            <br />
            <em>{audience.title[1]}</em>
          </h1>
          <p>{audience.intro}</p>
          <ButtonLink href={inquiryHref}>{audience.cta}</ButtonLink>
        </div>
        <figure>
          <Image
            src={photos[audience.image]}
            alt={audience.imageAlt}
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>
            Illustrative {audience.captionKind} environment
          </figcaption>
        </figure>
      </section>
      <section className="audience-details section">
        <div>
          <p className="eyebrow">{audience.detailsEyebrow}</p>
          <h2>{audience.detailsTitle}</h2>
          <p>{audience.detailsText}</p>
        </div>
        <div className="editorial-list">
          {audience.highlights.map(([heading, text]) => (
            <article key={heading}>
              <h3>{heading}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="prepare section">
        <p className="eyebrow">MAKE THE FIRST CONVERSATION COUNT</p>
        <h2>
          A few details help us
          <br />
          understand the job.
        </h2>
        <div className="prepare-grid">
          {audience.prepare.map((item) => (
            <div key={item}>
              <Check size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <TextLink href={inquiryHref}>Prepare a service inquiry</TextLink>
      </section>
      <FaqSection />
      <CtaSection />
    </>
  );
}
