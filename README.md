# Dira 2050 Explained — project

A static React + Vite site that makes the Tanzania Development Vision 2050 understandable to the general public. Built incrementally per `MASTER_PROMPT_Dira2050_Site.md`.

## Status
- **Phase 1 — Data extraction: DONE.** Full 76-page PDF parsed. 12 datasets in `public/data/`. Caveats in `public/data/DATA_NOTES.md`.
- **Phase 2 — Scaffold + data layer: DONE.** Vite + React + Router app boots; `src/lib/data.js` loads all CSVs; `/#/debug` shows live row counts. Verified passing.
- **Phase 3 — Design system: DONE.** Editorial system inspired by the Pentagram design agency — **monochrome (black / white / grey only)**, neo-grotesque type, strict grid, thin rules, hover-invert. `src/design/tokens.css` + `components.css`; components: `DriverIndex` (numbered hub, in `Pentagram.jsx`), `StatCard`, `Nav`, `Footer`, `StarMark` (square bullet); `/#/design` preview page. Build verified: 46 modules, CSS 8.3 kB, JS ~64 kB gzipped.
- **Phase 4 — Home page: DONE.** Type-led hero ("The Tanzania we want by 2050"), three headline 2050 figures pulled from `targets.csv`, the three Pillars and five Drivers as numbered indexes (keyboard/screen-reader navigable, linking to `/pillars/:id` and `/enablers/:id`), and a closing CTA. Responsive to 360px. `Home.jsx` is now `/`; design system moved to `/design`. Build verified: exit 0.
- **Phase 5 — Pillars & Drivers pages: DONE.** `/pillars` framework index (foundation + 3 pillars + 5 drivers), `/pillars/:id` (3 pages: summary + its targets), `/enablers/:id` (5 pages: summary + targets + numbered aspirations), all data-driven with prev/next paging and a shared `TargetList` component. Added `NotFound`. Build verified: exit 0.
- **Phase 6 — Targets dashboard: DONE.** `/targets`: every target as a card with an Information-is-Beautiful "now → 2050" proportional bar comparison (monochrome — grey baseline, black target), a change tag (Grow ×N / Reduce / Eliminate), plain-language line and source page. Filter by All / Economy / People / Environment / Drivers with live counts. All numbers in text (bars aria-hidden) for screen-reader completeness. Build verified: exit 0.
- **Phase 7 — Timeline + For You: DONE.** `/timeline` (milestone scroller from `milestones.csv`, editorial vertical layout 2000→2050) and `/what-it-means` (six everyday-life sections translating targets into personal impact, with inline `GlossaryTerm` tooltips from `glossary.csv` — hover / keyboard-focus / tap accessible). Build verified: exit 0.
- **Phase 8 — Data, About, polish: DONE.** `/vision` (four goals + framework), `/data` (downloadable CSVs + methodology + source PDF link), `/about` (aspirations-not-achievements disclaimer + citation). Polish: SVG favicon, meta + Open Graph tags, per-route page titles, skip-to-content link, scroll-to-top on navigation, proper 404. Verified: production build serves all routes, 12 datasets and favicon at HTTP 200. See `DEPLOY.md`.

**The site is complete — all 8 phases done.**

### Post-launch additions
- **SEO.** Switched to real crawlable URLs (`BrowserRouter` + GitHub Pages `404.html` redirect), `base:'/dira2050-site/'`; added canonical, rich meta, Open Graph + Twitter cards, JSON-LD (WebSite/creator), per-route titles + descriptions, `robots.txt`, `sitemap.xml`, and a generated `og.png` social image.
- **Opportunities & Strategic Intelligence layer** (deep dive at the bottom of `/what-it-means`). Analytical "second heart": audience-specific intelligence (12 roles), sector-attention outlook, opportunity map, skills-in-demand, and a strategic briefing (priorities/dependencies/gaps/bottlenecks/leverage/risks). Driven by five `intel_*.csv` datasets; every item tagged **Documented** vs **Inferred**.
- **Founder section** on `/about` — the Information Visualization Institute vision, Gerald Tesha bio, and contact details.

## Design (locked)
Editorial / **Pentagram-agency** aesthetic: monochrome — black, white and grey ONLY, no accent colours. Meaning comes from typography, scale and layout. The five Drivers are the navigation hub, presented as a large numbered index that inverts to black on hover/focus (not a star or pentagon). React + Vite static · English · general-public audience. Type: Inter (neo-grotesque), large and tightly tracked.

## Run it
```
npm install
npm run dev      # open the printed localhost URL
npm run build    # static output in dist/
```
Key routes while building: `/#/design` (design system), `/#/debug` (data check).
Note: any `dist/` in the folder may be a stale earlier build — always regenerate with `npm run build`.

## Architecture
- `public/data/*.csv` — single source of truth (Phase 1).
- `src/design/` — `tokens.css` (CSS variables) + `components.css`.
- `src/components/` — `Pentagram.jsx`, `StarMark.jsx`, `StatCard.jsx`, `Nav.jsx`, `Footer.jsx`.
- `src/lib/data.js` — CSV loader (papaparse), cached, typed accessors (`getPillars`, `getEnablers`, `targetsForPillar`, `aspirationsForEnabler`, …).
- `src/lib/format.js` — number/unit formatting.
- `src/useData.js` — hook exposing `{ data, loading, error }`.
- `src/routes/` — `DesignSystem.jsx`, `Debug.jsx` (content pages arrive Phase 4+).

## Next
Phase 4 — the pentagram hub as live navigation on the Home page: hero, the star wired to `/enablers/:id`, three headline stats, and a "start here" flow.
