import { services } from "./services";

/** Every public route, used by the sitemap. Trailing slashes match the export. */
const staticRoutes = [
  "/",
  "/services/",
  "/residential/",
  "/commercial/",
  "/about/",
  "/service-area/",
  "/contact/",
  "/privacy/",
] as const;

export const allRoutes: readonly string[] = [
  ...staticRoutes,
  ...services.map((s) => `/services/${s.slug}/`),
];
