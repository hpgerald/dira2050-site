// Central data layer. Every page reads the Vision 2050 datasets through here so
// content and presentation stay decoupled. CSVs live in /public/data and are the
// single source of truth (see public/data/DATA_NOTES.md).
import Papa from 'papaparse'

const BASE = import.meta.env.BASE_URL // respects Vite `base` on any host/sub-path

// Files we ship. Keyed name -> filename.
const FILES = {
  pillars: 'pillars.csv',
  enablers: 'enablers.csv', // the five "Drivers"
  foundation: 'foundation.csv',
  targets: 'targets.csv',
  sectors: 'sectors.csv',
  sectorKpis: 'sector_kpis.csv',
  sectorCriteria: 'sector_criteria.csv',
  aspirations: 'aspirations.csv',
  milestones: 'milestones.csv',
  glossary: 'glossary.csv',
  sources: 'sources.csv',
  intelAudiences: 'intel_audiences.csv',
  intelOpportunities: 'intel_opportunities.csv',
  intelSkills: 'intel_skills.csv',
  intelSectors: 'intel_sectors_outlook.csv',
  intelStrategic: 'intel_strategic.csv',
}

// Split a pipe-delimited cell into a clean array.
export const pipes = (v) => (v ? String(v).split('|').map((s) => s.trim()).filter(Boolean) : [])

function parseCsv(text) {
  const { data, errors } = Papa.parse(text.trim(), {
    header: true,
    dynamicTyping: true, // numbers become numbers; blank cells become null
    skipEmptyLines: true,
  })
  if (errors.length) console.warn('CSV parse warnings:', errors)
  return data
}

// Swahili datasets live in /public/data/sw/; English at /public/data/. IDs are
// identical across languages, so routing and cross-references are unaffected;
// only the display text differs.
function folderFor(lang) {
  return lang === 'sw' ? `${BASE}data/sw/` : `${BASE}data/`
}

async function fetchCsv(file, lang) {
  const res = await fetch(`${folderFor(lang)}${file}`)
  if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`)
  return parseCsv(await res.text())
}

// Cache one promise per language.
const _cache = {}
export function loadData(lang = 'en') {
  if (_cache[lang]) return _cache[lang]
  _cache[lang] = (async () => {
    const entries = await Promise.all(
      Object.entries(FILES).map(async ([key, file]) => [key, await fetchCsv(file, lang)]),
    )
    return Object.fromEntries(entries)
  })()
  return _cache[lang]
}

// ---- Typed accessors (built on the loaded bundle) ----
export const getPillars = (d) => [...d.pillars].sort((a, b) => a.order - b.order)
export const getEnablers = (d) =>
  [...d.enablers].sort((a, b) => a.pentagon_position - b.pentagon_position)
export const getPillar = (d, id) => d.pillars.find((p) => p.id === id)
export const getEnabler = (d, id) => d.enablers.find((e) => e.id === id)
export const getSector = (d, id) => d.sectors.find((s) => s.id === id)

export const targetsForPillar = (d, pillarId) =>
  d.targets.filter((t) => t.pillar_id === pillarId)
export const targetsForEnabler = (d, enablerId) =>
  d.targets.filter((t) => t.enabler_id === enablerId)
export const nationalTargets = (d) => d.targets.filter((t) => t.scope === 'national')
export const aspirationsForEnabler = (d, enablerId) =>
  d.aspirations.filter((a) => a.enabler_id === enablerId)
export const kpisForSector = (d, sectorId) =>
  d.sectorKpis.filter((k) => k.sector === sectorId)
