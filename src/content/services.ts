import type { PhotoKey } from "@/assets/images";

export type ServiceIconName =
  "drop" | "waves" | "heat" | "tap" | "pipe" | "wrench";

type ServiceCategory = "Repair" | "Install" | "Maintain";

export interface Service {
  slug: string;
  title: string;
  short: string;
  icon: ServiceIconName;
  category: ServiceCategory;
  description: string;
  items: readonly string[];
  note: string;
  image: PhotoKey;
}

export const services: readonly Service[] = [
  {
    slug: "leaks-and-repairs",
    title: "Leaks & repairs",
    short: "Get to the source. Get back to your day.",
    icon: "drop",
    category: "Repair",
    description:
      "A drip, a damp patch, a change in water pressure. Start with a closer look at the cause, then discuss a repair that fits your plumbing.",
    items: [
      "Water leak detection and repair",
      "Pipe repairs and copper repiping",
      "Faucet and toilet repairs",
    ],
    note: "Tell us where you noticed the issue, when it started and whether more than one fixture is affected.",
    image: "hero",
  },
  {
    slug: "drains-and-sewers",
    title: "Drains & sewers",
    short: "A clear path for everything that flows.",
    icon: "waves",
    category: "Repair",
    description:
      "Slow sinks and recurring backups deserve attention. Talk with Promo Plumbing about drain cleaning and sewer repair options for your property.",
    items: [
      "Drain cleaning",
      "Sewer line repairs and replacement",
      "Recurring drainage problems",
    ],
    note: "Let us know which drains are affected and whether this has happened before.",
    image: "home",
  },
  {
    slug: "water-heaters",
    title: "Water heaters",
    short: "Bring comfort back to your routine.",
    icon: "heat",
    category: "Install",
    description:
      "From an unreliable hot shower to a planned replacement, get help with water heater repairs and installation. The right next step starts with your current system and household needs.",
    items: [
      "Water heater troubleshooting",
      "Water heater repairs",
      "Replacement and installation",
    ],
    note: "A photo of the unit’s label and a description of the problem can help the initial conversation.",
    image: "home",
  },
  {
    slug: "fixtures-and-installation",
    title: "Fixtures & installation",
    short: "The everyday details, properly considered.",
    icon: "tap",
    category: "Install",
    description:
      "A kitchen upgrade. A new bathroom fixture. Plumbing work that helps a room work better. Discuss your fixtures, layout and installation requirements with the team.",
    items: [
      "Faucet installation and replacement",
      "Toilet repair and installation",
      "Garbage disposal installation and repair",
    ],
    note: "If you have already chosen a fixture, have its model number and installation details ready.",
    image: "home",
  },
  {
    slug: "repiping-and-systems",
    title: "Pipes & plumbing systems",
    short: "Plan for what happens behind the walls.",
    icon: "pipe",
    category: "Install",
    description:
      "For aging pipework, renovation plans and more involved plumbing needs, start a conversation about the scope, access and work required.",
    items: [
      "Copper repiping",
      "Gas line installation and repairs",
      "Backflow installation",
    ],
    note: "Share the property type, project stage and any drawings or inspection notes you have.",
    image: "business",
  },
  {
    slug: "maintenance",
    title: "Plumbing maintenance",
    short: "Give the small things some attention.",
    icon: "wrench",
    category: "Maintain",
    description:
      "Keep plumbing on the agenda before a small concern interrupts a busy day. Discuss routine attention for your home, business or managed property.",
    items: [
      "Residential plumbing maintenance",
      "Commercial plumbing maintenance",
      "Sump pump repairs",
    ],
    note: "Bring a list of recurring concerns and any previous plumbing work you know about.",
    image: "hero",
  },
];

export const serviceCategories = [
  "All services",
  "Repair",
  "Install",
  "Maintain",
] as const;

export type ServiceFilter = (typeof serviceCategories)[number];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
