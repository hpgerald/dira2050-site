# Dira 2050 PRO — Implementation Plan

The PRO edition is an **additive extension** of the existing platform: a new `/pro` section reached from a new nav item after DATA. Nothing existing is replaced. Built in 15 phases, each fully integrated, bilingual, and regression-free before the next begins.

## Locked decisions
- **Palette:** PRO gets its **own full editorial palette** (cinematic dark hero, categorical data-viz hues). The base site stays strict monochrome. PRO styles are scoped under a `.pro` root so they never leak.
- **Libraries:** add **framer-motion** (motion) now; add tree-shakeable **d3 modules** (d3-shape, d3-hierarchy, d3-force, d3-scale) when Phases 5/11 need Sankey / treemap / network. Everything else hand-rolled SVG/CSS.
- **AI assistant (Phase 13):** **client-side retrieval** over the Vision datasets (search + curated explanations). Fully static, private, bilingual. Clean adapter so a real LLM API can be added later.
- **New data:** authored from the document + analysis, every row tagged **Documented** vs **Inferred** (same honesty model as the intel layer).

## Current architecture (audit)
- React 18 + Vite 5, `BrowserRouter` basename `/dira2050-site`, static on GitHub Pages (gh-pages branch).
- Routing: flat routes in `src/App.jsx`.
- i18n: `src/i18n.jsx` (`LanguageProvider`, `useLang`, `t()` with dotted paths + function values), strings in `src/strings.js` (`en`/`sw`); persisted in localStorage; drives `useData(lang)`.
- Data: `src/lib/data.js` (papaparse, cached per language, typed accessors, `pipes()`), CSVs in `/public/data` (en) and `/public/data/sw`.
- Design: `src/design/tokens.css` (monochrome tokens) + `components.css`. No viz/animation library today.

## Integration strategy (extend, not replace)
- One mount point in `App.jsx`: `<Route path="/pro/*" element={<ProApp/>} />`. `ProApp` owns all PRO sub-routes → existing routes untouched.
- New tree `src/pro/` (routes, components, `viz/`), styles in `src/design/pro.css` (scoped `.pro`, imports the same base tokens).
- Reuse `useLang`/`t()` with a new `pro.*` string namespace; reuse `useData` + data layer with new datasets under `/public/data(/sw)/pro/`.
- Nav: insert `PRO` after `DATA` in the existing `LINKS` array + strings.

## Phase → architecture map
1. **Foundation & framework** — nav item, `/pro/*` routing, `ProApp`, PRO palette, framer-motion, `pro` string namespace, primitive library (Reveal, ProSection, BigStat, Quote, Comparison, Callout, InfoPanel, Expandable, ProCard, ProTimeline).
2. **Executive Story** — cinematic scrollytelling landing at `/pro` (hero → vision → 2050 narrative → key numbers → pillars → CTA).
3. **Vision Explorer** — `/pro/explore` faceted, interconnected exploration (goals, targets, pillars, drivers, sectors, foundation, principles, themes, SDGs, Agenda 2063).
4. **Interactive Storytelling** — per-section story template (What/Why/How/Who/Impact/Timeline/Deps) reused across modules.
5. **Knowledge Graph** — `/pro/graph`, d3-force network of Vision→…→Citizens; clickable nodes. New `pro/graph_nodes.csv`, `graph_edges.csv`.
6. **Opportunity Intelligence** — `/pro/opportunities`, structured generator over sections (extends existing intel_opportunities).
7. **Skills Intelligence** — `/pro/skills` with learning paths, certifications, programs, outlook (extends intel_skills).
8. **Audience Intelligence** — `/pro/for/:audience` tailored experiences (extends intel_audiences).
9. **Regional Intelligence** — `/pro/regions`, interactive map + regional profiles. New `pro/regions.csv`.
10. **Sector Intelligence** — `/pro/sectors/:id` mini-portals (extends sectors + sector_kpis).
11. **Advanced Data Storytelling** — viz library: Sankey, treemap, sunburst, heatmap, network, story maps, small multiples.
12. **Evidence Layer** — provenance component linking every claim to document sections/datasets/pages.
13. **AI Knowledge Assistant** — `/pro/ask`, client-side retrieval + curated answers, adapter for future LLM.
14. **Progress Monitoring Architecture** — reusable indicator/milestone/status schema + API-ready adapter (no live data yet).
15. **Performance, a11y, hardening** — lazy-load PRO routes, code splitting, a11y + i18n audit, SEO, error boundaries, docs, QA.

## Per-phase Definition of Done
Compiles (`npm run build`) · existing routes/features intact (no regressions) · new code follows current architecture · English + Kiswahili parity · components reusable · docs updated · production quality. Pause for review after each phase.
