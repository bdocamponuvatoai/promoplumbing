import Image from "next/image";
import { photos } from "@/assets/images";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/config/site";

export function AboutStory() {
  return (
    <section className="about-story section">
      <figure>
        <Image
          src={photos.hero}
          alt="Illustrative plumbing professional at work in a home kitchen"
          loading="eager"
        />
        <figcaption>
          Illustrative service photography; not a portrait of Moe or the team.
        </figcaption>
      </figure>
      <div>
        <p className="eyebrow">LED BY MOE VEIMAU</p>
        <h2>
          A real conversation.
          <br />A practical next step.
        </h2>
        <p>
          Filimone “Moe” Veimau leads Promo Plumbing. The company’s work spans
          the plumbing people use every day—from repairs and drain cleaning to
          water heaters, fixtures and pipework.
        </p>
        <p>
          Whether you’re looking after a home or a business, the starting point
          is the same: understand what you need and talk through the work.
        </p>
        <ButtonLink href={site.phone.href}>Talk with the team</ButtonLink>
      </div>
    </section>
  );
}

const values = [
  [
    "What needs attention?",
    "The small details can make a useful starting point. Tell us what you’ve seen, heard or noticed.",
  ],
  [
    "What does the job involve?",
    "Discuss the options, scope and estimate directly with the team before making a decision.",
  ],
  [
    "What works for your space?",
    "Share access needs, property requirements and timing so the next step is clear.",
  ],
] as const;

export function AboutValues() {
  return (
    <section className="about-values section">
      <p className="eyebrow">YOUR PROPERTY. YOUR PRIORITIES.</p>
      <h2>
        Good work starts
        <br />
        with understanding.
      </h2>
      <div className="approach-grid">
        {values.map(([heading, text]) => (
          <div key={heading}>
            <h3>{heading}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
