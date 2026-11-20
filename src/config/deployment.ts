import "server-only";

// Environment-driven deployment settings, resolved at build time.
// See .env.example for the variables.

function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url =
    explicit ||
    (vercelProduction
      ? `https://${vercelProduction}`
      : "http://localhost:3000");
  return url.replace(/\/+$/, "");
}

/** Absolute origin used for canonical URLs, Open Graph and the sitemap. */
export const siteUrl = resolveSiteUrl();

/** Search engines may index the site only when this is explicitly enabled. */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

const { hostname } = new URL(siteUrl);
if (isIndexable && (hostname === "localhost" || hostname === "127.0.0.1")) {
  throw new Error(
    "SITE_INDEXABLE=true but the site URL is still localhost. Set SITE_URL to the production domain.",
  );
}
