# Promo Plumbing

Marketing website for **Promo Plumbing Inc.**, a residential and commercial
plumbing business in San Mateo, California.

Built with Next.js 16 (App Router), React 19 and TypeScript, and exported as a
fully static site (`out/`). No server, database or form backend: the inquiry
planner builds an email draft in the visitor's own mail app.

## Getting started

Requires Node.js 20.9 or newer (CI uses the version in `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:3000
```

To build and preview the production export:

```bash
npm run build      # writes the static site to out/
npm run preview    # serves out/ at http://localhost:3000
```

## Scripts

| Script                 | What it does                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `npm run dev`          | Development server with hot reload.                                                        |
| `npm run build`        | Static export to `out/`. Runs `postbuild` automatically.                                   |
| `postbuild`            | `scripts/fix-export-segments.mjs`: fixes prefetch file names on Windows (no-op elsewhere). |
| `npm run preview`      | Serves `out/` with `npx serve@14` (not a project dependency).                              |
| `npm run lint`         | ESLint (`eslint-config-next`: Core Web Vitals + TypeScript rules).                         |
| `npm run typecheck`    | Generates route types (`next typegen`), then `tsc --noEmit`.                               |
| `npm run format`       | Formats everything with Prettier.                                                          |
| `npm run format:check` | Fails if any file is not Prettier-formatted.                                               |
| `npm run check`        | `typecheck` + `lint` + `format:check`. Run before every commit; CI runs it too.            |

## Project structure

```
src/
  app/                    Routes (one folder per page), root layout, 404,
                          icon.svg, robots.ts, sitemap.ts
    services/[slug]/      Six service pages (generateStaticParams, dynamicParams = false)
  components/
    layout/               SiteHeader, HeaderBar (client: mobile menu), SiteFooter
    sections/             Shared sections: CTA band, FAQ, page intro, service grid
    home/ services/ audience/ about/ service-area/ contact/
                          Page-specific sections. Client components: QuickFinder,
                          FilterableServiceGrid, AreaFinder, InquiryPlanner
    ui/                   SmartLink, ButtonLink, TextLink, Eyebrow, Brand, ServiceIcon
    seo/                  JSON-LD (schema.org Plumber)
  config/
    site.ts               Business details and navigation (safe for client code)
    deployment.ts         SITE_URL / SITE_INDEXABLE (server only)
  content/                Typed copy: services, FAQs, towns, audiences, inquiry options, routes
  lib/                    Framework-free helpers: page metadata, inquiry summary + mailto
  styles/                 globals.css imports ordered partials (see "CSS" below)
  assets/                 images/ (static imports) and fonts/ (DM Sans + OFL licence)
scripts/
  fix-export-segments.mjs
docs/
  content-sources.md      Where every business fact came from
  verification.md         Parity and quality checks from the migration
```

## Conventions

- **Server Components by default.** Only real interactivity is a client
  component: the mobile menu, the service filter, the quick finder, the city
  search and the inquiry planner.
- **Content is data.** Copy lives in `src/content/`, business details in
  `src/config/site.ts`. Never add hours, prices, reviews, ratings, licences,
  warranties or years in business unless the owner has confirmed them.
- **Links.** Use `SmartLink`/`ButtonLink`/`TextLink`: paths starting with `/`
  use `next/link`; `tel:`, `mailto:`, `#hash` and external links stay plain
  anchors. Internal links keep the trailing slash (`/about/`).
- **Images** are static imports rendered with `next/image` (dimensions come from
  the file). The above-the-fold hero image on each page uses
  `loading="eager"` and `fetchPriority="high"`; everything else lazy-loads.
- **Fonts.** DM Sans is self-hosted with `next/font/local` (`--font-dm`). CSS
  uses the `--font` token from `styles/base/tokens.css`, never a literal family.
- **CSS.** Plain global CSS, split into partials that `styles/globals.css`
  imports in a fixed order. Order matters (equal-specificity rules: later
  wins). Each partial lists its base rules, then its media queries; some end
  with a "readability floor" block that must stay last. All section padding
  lives in `sections/section-spacing.css`, imported last, because it is
  order-coupled to the responsive `.section` padding.
- **Metadata.** Every page exports `pageMetadata({ title, path })`, which sets
  the title, description, canonical URL and Open Graph tags.

## Routes

| Route                         | Page                                                                              |
| ----------------------------- | --------------------------------------------------------------------------------- |
| `/`                           | Home                                                                              |
| `/services/`                  | Service directory with category filter                                            |
| `/services/<slug>/`           | Six service pages (`src/content/services.ts`)                                     |
| `/residential/`               | Homeowners                                                                        |
| `/commercial/`                | Businesses and properties                                                         |
| `/about/`                     | About the company                                                                 |
| `/service-area/`              | Listed communities with search                                                    |
| `/contact/`                   | Inquiry planner. Presets: `?service=<slug>`, `?property=Business`, `?city=<name>` |
| `/privacy/`                   | Privacy notice                                                                    |
| `/robots.txt`, `/sitemap.xml` | Generated from `src/app/robots.ts` and `src/app/sitemap.ts`                       |

## Configuration

All variables are read at build time. See `.env.example`.

| Variable         | Default                                                                | Purpose                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Absolute origin for canonical URLs, Open Graph, JSON-LD and the sitemap. No trailing slash.                                |
| `SITE_INDEXABLE` | `false`                                                                | `true` allows search engines (robots meta and `robots.txt`). The build fails if this is `true` while the URL is localhost. |

## Before launch

- [ ] Business owner has reviewed and approved every page, the branding and the photography.
- [ ] Replace the AI-generated illustrative photos with approved photos of real work (or keep them clearly labelled).
- [ ] Confirm phone, email, service list and service area are current.
- [ ] Update the privacy page if any analytics, form service or booking tool is added.
- [ ] Set `SITE_URL` to the production domain.
- [ ] Set `SITE_INDEXABLE=true` in production only, after owner approval.
- [ ] Re-run Lighthouse on the live URL and submit `sitemap.xml` in Google Search Console.

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main` and every pull request:
`npm ci`, `npm run check`, `npm run build`, then uploads `out/` as an artifact.
Dependabot (`.github/dependabot.yml`) opens weekly npm updates (Next.js, React
and type packages grouped) and monthly GitHub Actions updates.

## Hosting

Any static host can serve `out/`. The project is set up for Vercel: the static
export is detected automatically and `vercel.json` adds security headers
(`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Permissions-Policy`, `Strict-Transport-Security` without `preload`). No
Content-Security-Policy yet: Next.js inlines scripts, so a CSP needs hashes or
nonces and its own testing.

**Preview URL:** _pending first deployment_

### Deploying on Vercel (dashboard)

1. Go to <https://vercel.com/new> and choose **Import Git Repository**. Pick
   `bdocamponuvatoai/promoplumbing` (install the Vercel GitHub app for that
   account if asked).
2. Leave the defaults: Framework Preset **Next.js**, Root Directory `./`,
   build and output settings untouched. Vercel detects `output: "export"` and
   serves `out/`.
3. Under **Environment Variables** add `SITE_INDEXABLE` = `false` for
   Production and Preview. Leave `SITE_URL` unset for now: canonical URLs then
   use the project's production domain (`https://<project>.vercel.app`).
4. Click **Deploy**. Every push to `main` redeploys production; every pull
   request gets its own preview deployment.
5. Share the **production** domain (`<project>.vercel.app`). With Vercel's
   default Deployment Protection, per-commit preview URLs ask visitors to log
   in to Vercel; the production domain does not.
6. At launch: add the owner's domain under **Settings → Domains**, set
   `SITE_URL` to it, and only after the owner approves set
   `SITE_INDEXABLE=true` for Production, then redeploy.
