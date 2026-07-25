import { useData } from '../useData.js'
import { usePageTitle } from '../usePageTitle.js'

const BASE = import.meta.env.BASE_URL
const PDF_URL = 'https://www.planning.go.tz/uploads/documents/en-1752762713-THE%20TANZANIA%20DEVELOPMENT%20VISION%202050.pdf'

const FILES = [
  ['pillars.csv', 'The three pillars'],
  ['enablers.csv', 'The five drivers'],
  ['foundation.csv', 'Governance foundation'],
  ['targets.csv', 'National, pillar, driver & sector targets'],
  ['sectors.csv', 'Transformative sectors'],
  ['sector_kpis.csv', 'Sector baseline figures'],
  ['sector_criteria.csv', 'Sector selection criteria'],
  ['aspirations.csv', 'Driver aspirations'],
  ['milestones.csv', 'Timeline milestones'],
  ['glossary.csv', 'Plain-language definitions'],
  ['sources.csv', 'Document section map'],
]

export default function DataPage() {
  usePageTitle('Data & sources')
  const { data } = useData()
  const rows = (key) => (data && data[key] ? data[key].length : null)
  const keyFor = (file) => ({
    'pillars.csv': 'pillars', 'enablers.csv': 'enablers', 'foundation.csv': 'foundation',
    'targets.csv': 'targets', 'sectors.csv': 'sectors', 'sector_kpis.csv': 'sectorKpis',
    'sector_criteria.csv': 'sectorCriteria', 'aspirations.csv': 'aspirations',
    'milestones.csv': 'milestones', 'glossary.csv': 'glossary', 'sources.csv': 'sources',
  })[file]

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">Data &amp; sources</div>
        <div>
          <h1>Open data. Every figure sourced.</h1>
          <p className="measure">This site is built entirely from the official Vision 2050 document. Every dataset is
          downloadable as a plain CSV, and every figure carries the page it came from. Use them freely.</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Download</div>
        <div>
          <ul className="dllist">
            {FILES.map(([file, desc]) => {
              const n = rows(keyFor(file))
              return (
                <li key={file} className="dlrow">
                  <a className="dlrow__file" href={`${BASE}data/${file}`} download>{file}</a>
                  <span className="dlrow__desc">{desc}</span>
                  <span className="dlrow__n">{n != null ? `${n} rows` : ''}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Methodology</div>
        <div className="stack">
          <p className="measure">Figures were extracted from the full 76-page PDF. Where the document gives a baseline
          and a 2050 target, both are shown. Blank cells mean the document gives no value — never a guess. Some
          per-sector indicators and phase details remain to be deepened; these are logged in the data notes.</p>
          <p>
            <a className="btn btn--ghost" href={PDF_URL} target="_blank" rel="noopener noreferrer">Source PDF ↗</a>{' '}
            <a className="btn btn--ghost" href={`${BASE}data/DATA_NOTES.md`} target="_blank" rel="noopener noreferrer">Data notes ↗</a>
          </p>
        </div>
      </section>
    </div>
  )
}
