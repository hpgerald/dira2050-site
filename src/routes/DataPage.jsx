import { useData } from '../useData.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n.jsx'

const PDF_URL = {
  en: import.meta.env.BASE_URL + 'docs/vision-2050-en.pdf',
  sw: import.meta.env.BASE_URL + 'docs/vision-2050-sw.pdf',
}

const FILES = [
  'pillars.csv', 'enablers.csv', 'foundation.csv', 'targets.csv', 'sectors.csv',
  'sector_kpis.csv', 'sector_criteria.csv', 'aspirations.csv', 'milestones.csv',
  'glossary.csv', 'sources.csv',
]
const KEY = {
  'pillars.csv': 'pillars', 'enablers.csv': 'enablers', 'foundation.csv': 'foundation',
  'targets.csv': 'targets', 'sectors.csv': 'sectors', 'sector_kpis.csv': 'sectorKpis',
  'sector_criteria.csv': 'sectorCriteria', 'aspirations.csv': 'aspirations',
  'milestones.csv': 'milestones', 'glossary.csv': 'glossary', 'sources.csv': 'sources',
}

export default function DataPage() {
  const { lang, t } = useLang()
  usePageTitle(t('data.label'), t('data.lead'))
  const { data } = useData()
  const base = import.meta.env.BASE_URL + (lang === 'sw' ? 'data/sw/' : 'data/')
  const rows = (file) => (data && data[KEY[file]] ? data[KEY[file]].length : null)

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">{t('data.label')}</div>
        <div>
          <h1>{t('data.title')}</h1>
          <p className="measure">{t('data.lead')}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <Reveal as="section" className="cols">
        <div className="cols__label">{t('data.downloadLabel')}</div>
        <div>
          <ul className="dllist">
            {FILES.map((file) => {
              const nRows = rows(file)
              return (
                <li key={file} className="dlrow">
                  <a className="dlrow__file" href={`${base}${file}`} download>{file}</a>
                  <span className="dlrow__desc">{t(`data.files.${file}`)}</span>
                  <span className="dlrow__n">{nRows != null ? `${nRows} ${t('data.rows')}` : ''}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">{t('data.methodologyLabel')}</div>
        <div className="stack">
          <p className="measure">{t('data.methodologyBody')}</p>
          <p>
            <a className="btn btn--ghost" href={PDF_URL[lang] || PDF_URL.en} target="_blank" rel="noopener noreferrer">{t('data.btnPdf')} ↗</a>{' '}
            <a className="btn btn--ghost" href={`${base}DATA_NOTES.md`} target="_blank" rel="noopener noreferrer">{t('data.btnNotes')} ↗</a>
          </p>
        </div>
      </Reveal>
    </div>
  )
}
