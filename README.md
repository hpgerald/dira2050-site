# Tanzania Vision 2050 Explained

A plain-language, data-driven web platform that makes Tanzania's national plan understandable to the general public. It brings together the country's core planning documents, explains them in accessible language, and visualises their goals, targets, sectors and financing — with every figure traceable to its source page.

**Live site:** https://hpgerald.github.io/dira2050-site/

## What's inside

The landing page is a hub linking the planning documents. Three are fully built:

- **Vision 2050 (Dira 2050)** — `/dira`. The 25-year national vision: its four goals, five guiding principles, the three pillars and five drivers, the 2050 targets dashboard, a timeline, "what it means for you" with an Opportunities & Strategic Intelligence layer (opportunities, sector outlook, opportunity map, skills in demand, strategic briefing), the delivery approach, downloadable data, and a knowledge-check quiz. **Bilingual — English and Swahili.**
- **National Delivery Framework** — `/framework`. How delivery is governed: the delivery cycle, priority areas, the delivery system, and a knowledge check. English.
- **Fourth Five-Year Development Plan (FYDP IV) 2026/27–2030/31** — `/fydp`. The first five years of the Vision: the macro economy and reforms, all 48 strategic pathways (each with its own target tables), financing (sources, allocation, innovative instruments, private capital and public corporations), the seven flagship programmes, risks, and a knowledge check. English.

The Long-Term Perspective Plan (LTPP) and the Communication Strategy are placeholders pending build-out.

## Data and the honesty model

All content is built from the official documents. Datasets live as plain CSVs and are downloadable from the Data page, each figure carrying the source page it came from:

- `public/data/*.csv` — Vision 2050 datasets (English); `public/data/sw/*.csv` — the Swahili mirror, extracted from the official *Dira ya Taifa ya Maendeleo 2050*.
- `public/data/framework/*.csv` — National Delivery Framework.
- `public/data/fydp/*.csv` — FYDP IV (pathways, KPIs, financing, flagships, risks).

The Opportunities & Strategic Intelligence layer distinguishes what the document **states** from **inferred** analysis: every item is tagged **Documented** or **Inferred**, shown with a small provenance chip.

## Tech

React 18 + Vite 5, single-page app with `react-router-dom` (`BrowserRouter`, basename `/dira2050-site`). No UI framework — a hand-built, monochrome editorial design system in `src/design/tokens.css` + `components.css` (black / white / grey only; meaning comes from typography, scale and layout). CSVs are parsed with PapaParse and cached per language. Static output, hosted on GitHub Pages. A `public/404.html` redirect restores deep links on hard refresh.

## Local development

```
npm install
npm run dev        # open the printed localhost URL
npm run build      # static output in dist/
npm run preview    # serve the production build locally
```

Check English/Swahili string parity for the bilingual sections:

```
node parity.mjs    # reports any keys missing in either language
```

## Deployment (GitHub Pages)

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`): every push to `main` builds the site and publishes it to Pages. In the repo, set **Settings → Pages → Source → "GitHub Actions"** once.

```
git add -A
git commit -m "Update"
git push            # the workflow builds and deploys automatically
```

A `gh-pages` script (`npm run deploy`) remains as a manual fallback, but the Actions workflow is the primary path. A `public/.nojekyll` marker keeps Pages from running the files through Jekyll.

## Project structure

```
public/
  data/            Vision 2050 CSVs (en) + data/sw (Swahili) + data/framework + data/fydp
  404.html         SPA deep-link redirect for GitHub Pages
  .nojekyll        disables Jekyll on Pages
src/
  App.jsx          platform router (hub, /dira, /framework, /fydp, coming-soon)
  DiraApp.jsx      the bilingual Vision 2050 site
  framework/       National Delivery Framework section
  fydp/            FYDP IV section
  routes/          Vision 2050 pages
  components/      shared components (Nav, Footer, Quiz, StatCard, …)
  design/          tokens.css + components.css (the monochrome system)
  i18n.jsx         language context (English / Swahili)
  strings.js       UI strings (en / sw)
  lib/data.js      CSV loader and typed accessors
index.html         head, SEO meta, structured data, SPA restore script
```

## Attribution

Created by Gerald Tesha. Built entirely from the official published documents of the United Republic of Tanzania (National Planning Commission). This is an independent explainer, not an official government product; the targets shown are the plan's aspirations, not achievements.
