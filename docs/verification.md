# Verification

How the Next.js rebuild was proven to look and behave like the original
ChatGPT-generated site, and the quality checks run on it. Measured on
2026-11-20, Windows 11, Node.js 24.15, Google Chrome (system install, headless,
driven by `playwright-core` 1.65).

**Baseline.** The original project (Next.js 16.3.4, everything in one client
component file, one 2,728-line stylesheet) was copied untouched to a scratch
folder and built as-is to produce the reference `out/`. Every comparison below
is "original build" vs "new build", both served by the same small static server
(directory index files, real 404 page).

## Summary

| Check                                   | Result                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------ |
| `npm run build`, `npm run check`        | Pass (typecheck, ESLint 10, Prettier)                                    |
| Full-page pixel diff (before cleanup)   | **102 / 102 identical**, 0 px tolerance                                  |
| Open-state screenshots (before cleanup) | **13 / 13 identical**                                                    |
| Behaviour parity                        | **55 identical**, 2 intentional fixes, 0 unexpected                      |
| Visible text, every route               | **15 / 15 identical**                                                    |
| CSS split cascade proof                 | **0 conflicts** across 73,163 reordered rule pairs                       |
| Navigation                              | 15 client-side steps, 0 HTTP 4xx, 0 console errors, 0 hydration warnings |
| Unused CSS selectors                    | 0 of 297                                                                 |
| `npm audit` (production and dev)        | 0 vulnerabilities                                                        |
| After cleanup (footer notice removed)   | See [After cleanup](#after-cleanup)                                      |

## 1. Pixel parity

- **Routes:** all 14 pages, the 404 page, plus `/contact/?service=water-heaters`
  and `/contact/?property=Business&city=Foster%20City` (presets applied after
  hydration).
- **Widths:** 1600, 1280, 1024, 768, 390, 320 px. Full page.
- **Comparison:** `pixelmatch` with `threshold: 0` and anti-aliased pixels
  counted. Any single differing pixel fails.
- **Result:** 102 / 102 captures identical. No sub-pixel exceptions needed.

### Capture method (and why)

Every capture uses a fresh browser, reduced motion, all images forced eager and
awaited with `img.decode()`, `document.fonts.ready`, a scroll pass, then a
viewport resized to the full document height (the CSS has no `vh` units and
every media query is width-based, so this is layout-neutral).

Early runs showed rare differences inside photos only (max channel delta 7–23,
never text or layout). Repeating the same page proved this was Chrome's GPU
rasteriser on Windows choosing photo filtering at random, **on both the
original and the new site**. Chrome now runs with software raster
(`--disable-gpu`, `--disable-gpu-rasterization`, `--disable-gpu-compositing`),
which produced 24 / 24 identical captures across both sites before the final
run. Gradient dithering also differed between the first and later screenshots
inside one long-lived browser, which is why each capture gets its own browser.

### Open states

Menu open (390 and 900 px), FAQ item open, service filter "Install" (1280) and
"Maintain" (390), city search with no match (1280) and "san" (390), planner
validation error, step 2 and review step (1280 and 390): **13 / 13 identical**.

## 2. Behaviour parity

The same scripted interactions ran on both builds; the JSON outcomes were
compared field by field.

| Area           | What was checked                                                                                                                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mobile menu    | `aria-expanded`/label, open class, Escape closes and refocuses the button, closes after navigating, tablet (900 px) and desktop visibility                                                                                                                       |
| Service filter | All four filters by click, Enter and Space; `aria-pressed`; card titles and links                                                                                                                                                                                |
| Quick finder   | Every option's link; choosing "Water heaters" opens the contact page with it preselected                                                                                                                                                                         |
| City search    | Counts and messages for "san", " FOSTER " (trim/case), "zzz" (no match + call button), empty; town link prefills the city                                                                                                                                        |
| FAQ            | Click and keyboard toggle                                                                                                                                                                                                                                        |
| Planner        | Required city, required name/email, invalid email (focus moves to the invalid field); Back keeps every value; review text; the exact `mailto:` href; clipboard text; downloaded file name and content; edit links keep values; arrow keys on the property radios |
| Presets        | `?service=`, `?property=Business`, `?city=`, invalid values ignored, `?city=` truncated to 100 characters, combined presets                                                                                                                                      |
| Skip / top     | First Tab focuses "Skip to content"; `#main`; "Back to top" scrolls to 0                                                                                                                                                                                         |

**Intentional differences (fixes):**

1. **Escape with the menu closed.** The original moved focus to the (often
   hidden) menu button on any Escape press anywhere on the page. The new menu
   only handles Escape while it is open.
2. **Resize to desktop.** The original kept the menu open after resizing to
   desktop and back. The new menu closes when the desktop layout appears.

**Harness notes.** Two early "differences" were measurement artefacts, fixed in
the harness and not the site: (a) the new planner keeps hidden steps mounted
(so values survive Back), so the harness now reads only visible fields; (b) the
original moves focus inside `requestAnimationFrame`, so the harness waits two
frames before reading focus.

## 3. Navigation, network and console

Scripted click-through in one tab: header nav, service card, breadcrumb, footer
link, CTA with preset, browser Back ×2, Forward, header nav, footer
"Back to top" (`#top`), logo, "Find your community", a town link (prefills
"Burlingame"), skip link (`#main`); every link scrolled into view to trigger
prefetching. Then a direct load of every route.

| Metric                                                     | Original build | New build |
| ---------------------------------------------------------- | -------------- | --------- |
| Client-side navigation kept JS state                       | Yes            | Yes       |
| Titles and `aria-current` update                           | Yes            | Yes       |
| HTTP 4xx while navigating                                  | 13             | **0**     |
| HTTP 4xx on direct loads (excluding the intended 404 page) | 86             | **0**     |
| Console errors while navigating                            | 13             | **0**     |
| Hydration warnings                                         | 0              | **0**     |

The original's 4xx were link-prefetch files: on Windows, Next.js writes them
into nested folders instead of dotted file names.
`scripts/fix-export-segments.mjs` (run as `postbuild`) fixes this; it is a no-op
on Linux builds such as Vercel and CI. Every route returns 200; unknown URLs
return the styled 404 page with status 404.

## 4. Head tags

| Tag                         | Original                                 | New                                                                                                               |
| --------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Title, description, robots  | As designed                              | Unchanged (404 now titled "Page not found \| Promo Plumbing")                                                     |
| Canonical                   | Subpages only, old `chatgpt.site` domain | Every page, from `SITE_URL`                                                                                       |
| Open Graph / Twitter        | Home page values repeated on every page  | Per-page title, description and URL; hero image with alt text                                                     |
| `theme-color`               | None                                     | `#152335` (the dark top bar)                                                                                      |
| Structured data             | None                                     | schema.org `Plumber` on the home page (name, phone, email, city, listed communities; no hours, prices or ratings) |
| `robots.txt`, `sitemap.xml` | None                                     | Generated; robots disallows all until `SITE_INDEXABLE=true`                                                       |
| Font                        | `@font-face` in CSS, not preloaded       | `next/font/local`, preloaded                                                                                      |
| Image preloads              | Hero, logo and the decorative CTA mark   | Hero and logo only                                                                                                |

## 5. CSS split

The original single stylesheet was split into 23 partials by a script. Each
partial keeps its own rules in original source order. A separate checker then
looked at every pair of rules whose relative order changed (73,163 pairs): a
pair only matters if both set an overlapping property with the same
`!important`, can apply at the same viewport width, have equal specificity
and the same pseudo-element, **and** match a common element in the original
site's real DOM (41 page states, including menu open, FAQ open, filters, city
no-match and all planner steps).

- A naive "base rules then media queries per partial" split had **31 real
  conflicts**: the responsive `.section` padding stopped overriding each
  section's own padding. All section padding therefore lives together, in
  source order, in `sections/section-spacing.css`, imported last.
- Final split: **0 conflicts**.
- The multiset of 1,519 (media query, selector, property, value, importance)
  tuples is identical to the original. Raw declarations went from 1,414 to
  1,426: +1 for the new `--font` token, +11 because five selector lists that
  spanned several partials were split. The 5-declaration `@font-face` was
  replaced by `next/font`.

## 6. Bundle

JavaScript per page is essentially unchanged (home: 180 KB gzipped before,
184 KB after); it is dominated by the React and Next.js runtime. Most
components are now Server Components; only the menu, service filter, quick
finder, city search and inquiry planner ship JavaScript.

## After cleanup

The owner-facing footer notice ("Private design preview. Proposed branding and
AI-generated illustrative photography…") was removed on request, together with
its three CSS rules. It was the last element in the footer and provided no
spacing that other content relied on. Photo captions and the privacy page are
unchanged.

The full matrix was re-run (same 17 URLs × 6 widths) to prove that **only that
region changed**. For every capture:

1. every pixel above the notice's top margin is identical to the original;
2. the page is shorter by exactly the notice's footprint (margin + height);
3. the new page's remaining tail (footer bottom padding) is plain white.

Result: **102 / 102 captures pass all three**: 0 differing pixels above the
notice, 0 non-white pixels in the tail, pages shorter by 58–59 px (768 px and
wider), 96–97 px (390 px) and 116 px (320 px).

Also re-checked after cleanup: `npm run build` and `npm run check` pass, 0 of
297 CSS selectors unused, `npm audit` 0 vulnerabilities.
