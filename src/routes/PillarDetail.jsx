import { useParams, Link } from 'react-router-dom'
import { useData } from '../useData.js'
import { getPillars, getPillar, targetsForPillar } from '../lib/data.js'
import TargetList from '../components/TargetList.jsx'
import NotFound from './NotFound.jsx'
import { usePageTitle } from '../usePageTitle.js'
import { useLang } from '../i18n.jsx'

export default function PillarDetail() {
  const { id } = useParams()
  const { t } = useLang()
  const { data, loading, error } = useData()
  const pillar = data ? getPillar(data, id) : null
  usePageTitle(pillar ? pillar.short_name : t('pillar.word'))
  if (loading) return <p className="container section">{t('common.loading')}</p>
  if (error) return <p className="container section" role="alert">{t('common.error')}</p>
  if (!pillar) return <NotFound />

  const all = getPillars(data)
  const idx = all.findIndex((p) => p.id === id)
  const prev = all[idx - 1]
  const next = all[idx + 1]

  return (
    <article className="container section stack">
      <p className="eyebrow"><Link to="/dira/pillars">{t('pillar.crumb')}</Link> · {t('pillar.word')} {idx + 1} {t('pillar.of')} {all.length}</p>
      <div className="cols">
        <div className="cols__label">{t('pillar.word')} {String(idx + 1).padStart(2, '0')}</div>
        <div>
          <h1>{pillar.name}</h1>
          <p className="lede measure">{pillar.summary}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">{t('pillar.aims')}</div>
        <div><TargetList targets={targetsForPillar(data, id)} /></div>
      </section>

      <hr className="rule" />

      <nav className="pager">
        {prev ? <Link className="pager__link" to={`/dira/pillars/${prev.id}`}>← {prev.short_name}</Link> : <span />}
        {next ? <Link className="pager__link pager__link--next" to={`/dira/pillars/${next.id}`}>{next.short_name} →</Link> : <span />}
      </nav>
    </article>
  )
}
