# DATA_NOTES — Phase 1 extraction

Source: *The Tanzania Development Vision 2050 (Dira 2050)*, National Planning Commission, 2025.
Official PDF: https://www.planning.go.tz/uploads/documents/en-1752762713-THE%20TANZANIA%20DEVELOPMENT%20VISION%202050.pdf

`source_page` values refer to the document's **printed page numbers** (the roman/arabic numbers inside the report), not PDF sheet order.

## Document structure (as found — corrects the seed)
- The Vision has a **Foundation** (Governance, Peace, Security & Stability) + **3 Pillars** + **5 Drivers** + **Transformative Sectors**.
- The document calls the five enablers **"Drivers"** (Section 5 / "catalytic drivers"), not "enablers." UI copy should probably say "Drivers" to match the official term. Kept file name `enablers.csv` for the build contract; `id`s are stable.
- The four headline **Goals** (Section 2.2) map to pillars/drivers as:
  - Goal 1 → Economy pillar
  - Goal 2 → People pillar (+ Energy driver for the electricity target)
  - Goal 3 → Environment pillar
  - Goal 4 → Digital Transformation driver

## Second pass — COMPLETE (full 76-page PDF parsed)
The whole document has now been extracted directly from the PDF (76 sheets). PDF font-glyph corruption (`(cid:NN)` codes) was decoded with a `chr(N+29)` mapping, recovering the Drivers, Sectors and Implementation sections that were missing from the first web-fetched pass. All datasets below are now populated from the source:
- **Drivers (Section 5):** energy per-capita electricity 170 kWh (2024) to 3,000 kWh (2050); transmission losses 16% to below 10%; Julius Nyerere Hydropower 2,115 MW; logistics = 35-45% of import costs; R&D financing at least 1% of GDP. Each driver's official "Aspirations" captured in `aspirations.csv`.
- **Transformative sectors (Section 6):** nine sectors with real baselines in `sectors.csv` + `sector_kpis.csv` (Agriculture 26.5% GDP / 65% jobs / 30% exports; Tourism 25% exports; Manufacturing 8.1% GDP growing 8%/yr; Mining 9% GDP). The five official selection criteria are in `sector_criteria.csv`.
- **Foundation (Section 3):** four governance attributes in `foundation.csv`.
- **Implementation (Section 7):** the Vision is delivered through a **25-year Long-Term Perspective Plan (LTPP)** broken into rolling five-year and annual plans. The document does **not** define named year-band phases with numeric boundaries, so `milestones.csv` keeps documented dated facts (2000/2020/2024 baselines, 2024 hydropower, 2025 launch, 2050 targets) rather than inventing phase boundaries.

## Full dataset file list
`pillars.csv`, `enablers.csv` (the 5 "Drivers"), `foundation.csv`, `targets.csv` (28 rows), `sectors.csv`, `sector_kpis.csv`, `sector_criteria.csv`, `aspirations.csv`, `milestones.csv`, `glossary.csv`, `sources.csv`.

## Value-level notes
- **Life expectancy (t7):** target 75 is explicit. The recent baseline was garbled in the text layer (doc cites 51 years in 2000 rising); baseline left **blank** rather than guessed.
- **Child-development-on-track (t8):** target percentage was garbled in source; left blank.
- **GDP baseline (t1):** total GDP baseline not captured as a clean single figure; target = US$1 trillion.
- **t20–t23** are context/baseline indicators (recent values, no explicit 2050 number) included to give charts a "where we are" anchor; their `target_value` is intentionally blank.
- PDF has font-encoding corruption on some words/headings (e.g. ligatures, shifted characters). All values above were taken only from **clearly legible** passages.

## Spot-check recommended (Phase 1 DoD)
Please verify ~10 rows against the PDF, especially: t2 (per-capita 1,277→7,000, p.9), t4 (poverty 26%, p.9/4), t9 (maternal mortality 104 in 2022, p.4/9), t12 (3,000 kWh, p.10), t18 (70% digital literacy, p.10), t19 (80% e-gov, p.10).
