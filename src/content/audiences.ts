import type { PhotoKey } from "@/assets/images";

export interface Audience {
  path: string;
  metaTitle: string;
  /** Value passed to the inquiry planner as `?property=`. */
  property: "Home" | "Business";
  eyebrow: string;
  /** Headline: first line, then the emphasised second line. */
  title: readonly [string, string];
  intro: string;
  cta: string;
  image: PhotoKey;
  imageAlt: string;
  /** Word used in the figure caption ("Illustrative … environment"). */
  captionKind: string;
  detailsEyebrow: string;
  detailsTitle: string;
  detailsText: string;
  highlights: readonly (readonly [string, string])[];
  prepare: readonly string[];
}

export const audiences: Record<"residential" | "commercial", Audience> = {
  residential: {
    path: "/residential/",
    metaTitle: "Residential plumbing",
    property: "Home",
    eyebrow: "FOR THE PLACE YOU CALL HOME",
    title: ["A home that flows.", "A day that works."],
    intro:
      "Plumbing is part of almost every daily routine. When a problem interrupts yours, start with a local team and a straightforward conversation.",
    cta: "Tell us about your home",
    image: "home",
    imageAlt: "Illustrative contemporary residential bathroom",
    captionKind: "residential",
    detailsEyebrow: "FROM SMALL REPAIRS TO PLANNED UPGRADES",
    detailsTitle: "Everyday comfort. Thoughtful care.",
    detailsText:
      "Describe what you’re noticing or what you’d like to change. From there, discuss the work and decide how you’d like to move forward.",
    highlights: [
      [
        "The things that need fixing",
        "Leaking fixtures, slow drains and unexpected plumbing concerns.",
      ],
      [
        "The upgrades you’ve imagined",
        "A new faucet, replacement toilet or improved hot water setup.",
      ],
      [
        "The systems behind the scenes",
        "Pipe repairs, repiping and maintenance that support your home.",
      ],
    ],
    prepare: [
      "Your city & property type",
      "What you’ve noticed",
      "When the issue started",
      "Photos or fixture details",
    ],
  },
  commercial: {
    path: "/commercial/",
    metaTitle: "Commercial plumbing",
    property: "Business",
    eyebrow: "FOR BUSINESSES & COMMERCIAL PROPERTIES",
    title: ["Keep your focus.", "We’ll talk plumbing."],
    intro:
      "Your business has its own rhythm. Plan repairs, installations and maintenance around the needs of your building and the people who use it.",
    cta: "Discuss your property",
    image: "business",
    imageAlt: "Illustrative bright cafe with a commercial preparation sink",
    captionKind: "commercial",
    detailsEyebrow: "PRACTICAL SUPPORT FOR YOUR PROPERTY",
    detailsTitle: "Make plumbing part of the plan.",
    detailsText:
      "Tell us about access requirements, operating hours and the impact of the issue. The team can discuss the scope and scheduling with you.",
    highlights: [
      [
        "Repairs that need attention",
        "Leaks, drainage concerns and fixture issues in your commercial space.",
      ],
      [
        "Installation & upgrades",
        "Discuss pipework, water heaters, fixtures and changes to your property.",
      ],
      [
        "Ongoing maintenance",
        "Keep recurring concerns and future plumbing needs in the conversation.",
      ],
    ],
    prepare: [
      "Property type & location",
      "Access & operating hours",
      "The issue or project scope",
      "Preferred timing",
    ],
  },
};
