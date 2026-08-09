# Tanzania Vision 2050 Explained

A plain-language, data-driven web platform that makes Tanzania's national plan understandable to the general public. It brings together the country's core planning documents, explains them in accessible language, and visualises their goals, targets, sectors, financing and delivery, with every figure traceable to its source page.

**Live site:** https://hpgerald.github.io/dira2050-site/

## What's inside

The landing page is a hub linking the planning documents. All five are fully built:

- **Vision 2050 (Dira 2050)** — `/dira`. The 25-year national vision: its four goals, five guiding principles, the three pillars and five drivers, the 2050 targets dashboard, a timeline, "what it means for you" with an Opportunities & Strategic Intelligence layer (opportunities, sector outlook, opportunity map, skills in demand, strategic briefing) split across its own pages, the delivery approach, downloadable data, and a knowledge-check quiz. **Bilingual, English and Swahili.**
- **Long-Term Perspective Plan (LTPP 2050)** — `/ltpp`. The 25-year roadmap that implements the Vision: the five-plan roadmap and theory of change, the four-level architecture and 3i strategy, financing (~US$3.6tn) and structural transformation, data, and a quiz. English.
- **Fourth Five-Year Development Plan (FYDP IV) 2026/27–2030/31** — `/fydp`. The first five years: the macro economy and reforms, all 48 strategic pathways (each with its own target tables), financing (sources, allocation, innovative instruments, private capital, public corporations) across its own pages, the seven flagship programmes, risks, data, and a quiz. English.
- **National Delivery Framework** — `/framework`. How delivery is governed: the delivery cycle, priority areas, the delivery system, data, and a quiz. English.
- **Communication Strategy** — `/comms`. How the Vision reaches citizens: the five communication pillars, objectives, themes and principles, the key messages and audiences, the channels (traditional, digital, community), data, and a quiz. English.

A single, uniform **About** page (`/about`, bilingual) is reached from the hub. Every section carries scroll-reveal motion and a collapsible mobile menu.

## Data and the honesty model

All content is built from the official documents. Datasets live as plain CSVs, downloadable from each section's Data page, every figure carrying its source page:

- `public/data/*.csv` — Vision 2050 (English); `public/data/sw/*.csv` — the Swahili mirror.
- `public/data/ltpp/*.csv`, `public/data/fydp/*.csv`, `public/data/framework/*.csv`, `public/data/comms/*.csv` — the four other sections.
- `public/docs/*.pdf` — the original source documents, hosted and linked from the Data pages.

The Opportunities & Strategic Intelligence layer distinguishes what a document **states** from **inferred** analysis: every item is tagged **Documented** or **Inferred**. Targets are the plans' aspirations, not achievements. (The LTPP text is a custom-font scanned PDF, so its data was read via OCR and checked against the figures.)

## Tech

React 18 + Vite 5, single-page app with `react-router-dom` (`BrowserRouter`, basename `/dira2050-site`). Each document section is lazy-loaded (code-split). No UI framework: a hand-built, monochrome editorial design system in `src/design/tokens.css` + `components.css` (black / white / grey only; meaning comes from typography, scale and layout), with a dependency-free scroll-reveal that honours reduce-motion. CSVs are parsed with PapaParse and cached. Static output on GitHub Pages, with a `public/404.html` redirect for deep links.

## Local development

```
npm install
npm run dev        # open the printed localhost URL
npm run build      # static output in dist/
npm run preview    # serve the production build locally
```

Check English/Swahili string parity for the bilingual Vision 2050 site:

```
node parity.mjs    # reports any keys missing in either language
```

## Deployment (GitHub Pages via GitHub Actions)

Deployment is automated by `.github/workflows/deploy.yml`: every push to `main` builds the site and publishes it to Pages. One-time setup in the repo: **Settings → Pages → Build and deployment → Source → "GitHub Actions"**.

```
git add -A
git commit -m "Update"
git push            # the workflow builds and deploys automatically
```

Watch the run under the repo's **Actions** tab; when it goes green the live site is updated. A `public/.nojekyll` marker keeps Pages from running the files through Jekyll. (A manual `npm run deploy` gh-pages fallback still exists, but Actions is the path to use.)

## Project structure

```
public/
  data/            Vision 2050 CSVs (en) + data/sw (Swahili)
  data/ltpp, data/fydp, data/framework, data/comms   the other sections
  docs/            source PDFs (hosted, linked from Data pages)
  404.html         SPA deep-link redirect for GitHub Pages
  .nojekyll        disables Jekyll on Pages
src/
  App.jsx          platform router (hub, /about, /dira, /ltpp, /fydp, /framework, /comms)
  DiraApp.jsx      the bilingual Vision 2050 site
  ltpp/ fydp/ framework/ comms/    the four English document sections
  routes/          Vision 2050 pages + hub + About
  components/      shared (Nav, Footer, SubNav, Quiz, DataTab, Reveal, StatCard, …)
  design/          tokens.css + components.css (the monochrome system)
  i18n.jsx         language context (English / Swahili)
  strings.js       UI strings (en / sw)
  lib/data.js      CSV loader and typed accessors
index.html         head, SEO meta, structured data, SPA restore script
sitemap.xml        in public/, covers every route
```

## Attribution

Created by Gerald Tesha. Built entirely from the official published documents of the United Republic of Tanzania (National Planning Commission). This is an independent explainer, not an official government product; the targets shown are the plans' aspirations, not achievements.
