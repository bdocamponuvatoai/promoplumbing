// Business details and navigation. Safe to import from client components:
// nothing here depends on the environment.

export const site = {
  name: "Promo Plumbing",
  legalName: "Promo Plumbing Inc.",
  homeTitle: "Promo Plumbing | Good plumbing. Better days.",
  description:
    "Residential and commercial plumbing in San Mateo and the Bay Area. Explore repairs, drains, water heaters and installations with Promo Plumbing Inc.",
  phone: {
    display: "(650) 642-6380",
    href: "tel:+16506426380",
    international: "+1-650-642-6380",
  },
  email: "promoplumbing@gmail.com",
  location: {
    city: "San Mateo",
    region: "CA",
    country: "US",
  },
  /** Brand colour used for the browser UI (matches the dark top bar). */
  themeColor: "#152335",
} as const;

export const mailtoHref = `mailto:${site.email}`;

interface NavItem {
  label: string;
  href: string;
}

export const mainNav: readonly NavItem[] = [
  { label: "Services", href: "/services/" },
  { label: "For your home", href: "/residential/" },
  { label: "For your business", href: "/commercial/" },
  { label: "About us", href: "/about/" },
];

export const footerNav: {
  whatWeDo: readonly NavItem[];
  whoWeHelp: readonly NavItem[];
} = {
  whatWeDo: [
    { label: "Repairs & leaks", href: "/services/leaks-and-repairs/" },
    { label: "Drains & sewers", href: "/services/drains-and-sewers/" },
    { label: "Water heaters", href: "/services/water-heaters/" },
    { label: "All plumbing services", href: "/services/" },
  ],
  whoWeHelp: [
    { label: "Homeowners", href: "/residential/" },
    { label: "Businesses & properties", href: "/commercial/" },
    { label: "Meet Promo Plumbing", href: "/about/" },
    { label: "Start an inquiry", href: "/contact/" },
  ],
};
