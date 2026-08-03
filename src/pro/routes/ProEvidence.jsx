import { Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection, BigStat } from '../components/primitives.jsx'
import Basis from '../../components/Basis.jsx'

const PDF_URL = {
  en: 'https://www.planning.go.tz/uploads/documents/en-1752762713-THE%20TANZANIA%20DEVELOPMENT%20VISION%202050.pdf',
  sw: 'https://www.planning.go.tz/uploads/documents/sw-1756311249-DIRA%20YA%20TAIFA%20YA%20MAENDELEO%202050.pdf',
}

export default function ProEvidence() {
  const { lang, t } = useLang()
  usePageTitle(t('pro.evidence.title'), t('pro.evidence.lead'))
  const { data, loading } = useData()
  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>

  const datasetCount = Object.keys(data).length
  const targetCount = data.targets.length
  const sectionCount = data.sources.length

  return (
    <>
      <ProSection h1 title={t('pro.evidence.title')} lead={t('pro.evidence.lead')}>
        <div className="pro-stats" style={{ marginTop: '2rem' }}>
          <BigStat value={datasetCount} label={t('pro.evidence.statDatasets')} />
          <BigStat value={targetCount} label={t('pro.evidence.statFigures')} />
          <BigStat value={sectionCount} label={t('pro.evidence.statSections')} />
        </div>
      </ProSection>

      <ProSection variant="alt" eyebrow={t('pro.evidence.methodTitle')}>
        <div className="pro__narrow">
          <p className="pro-section__lead" style={{ color: 'var(--pro-soft)' }}>{t('pro.evidence.methodBody')}</p>
          <p className="pro-legend" style={{ marginTop: '1rem', display: 'flex', gap: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span><Basis value="Documented" /></span>
            <span><Basis value="Inferred" /></span>
          </p>
        </div>
      </ProSection>

      <ProSection eyebrow={t('pro.evidence.sourcesTitle')} lead={t('pro.evidence.sourcesLead')}>
        <table className="pro-evtable" style={{ marginTop: '1.5rem' }}>
          <thead>
            <tr><th>{t('pro.evidence.colSection')}</th><th>{t('pro.evidence.colPages')}</th></tr>
          </thead>
          <tbody>
            {data.sources.map((s) => (
              <tr key={s.ref_id}><td>{s.section_title}</td><td>{s.page_range}</td></tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: '2rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <a className="pro-btn" href={PDF_URL[lang] || PDF_URL.en} target="_blank" rel="noopener noreferrer">{t('pro.evidence.pdf')} ↗</a>
          <Link className="pro-btn pro-btn--ghost" to="/data">{t('pro.evidence.downloads')} →</Link>
        </p>
      </ProSection>
    </>
  )
}
