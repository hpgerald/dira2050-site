import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection, Reveal } from '../components/primitives.jsx'
import Basis from '../../components/Basis.jsx'

const TIMELINES = ['Near-term', 'Medium-term', 'Long-term']

export default function ProOpportunities() {
  const { t } = useLang()
  usePageTitle(t('pro.opps.title'), t('pro.opps.lead'))
  const { data, loading } = useData()
  const [type, setType] = useState('all')
  const [time, setTime] = useState('all')

  const opps = data?.intelOpportunities || []
  const types = useMemo(() => ['all', ...Array.from(new Set(opps.map((o) => o.type)))], [opps])

  const results = useMemo(
    () => opps.filter((o) => (type === 'all' || o.type === type) && (time === 'all' || o.timeline === time)),
    [opps, type, time],
  )

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>

  return (
    <ProSection h1 title={t('pro.opps.title')} lead={t('pro.opps.lead')}>
      <div style={{ marginTop: '1.6rem' }}>
        <div className="pro-facets" role="group" aria-label={t('pro.opps.allTypes')}>
          {types.map((ty) => (
            <button key={ty} type="button" aria-pressed={type === ty}
              className={`pro-facet ${type === ty ? 'is-active' : ''}`} onClick={() => setType(ty)}>
              {ty === 'all' ? t('pro.opps.allTypes') : t(`maps.oppType.${ty}`)}
            </button>
          ))}
        </div>
        <div className="pro-facets" role="group" aria-label={t('pro.opps.allTimes')}>
          <button type="button" aria-pressed={time === 'all'} className={`pro-facet ${time === 'all' ? 'is-active' : ''}`} onClick={() => setTime('all')}>{t('pro.opps.allTimes')}</button>
          {TIMELINES.map((tl) => (
            <button key={tl} type="button" aria-pressed={time === tl}
              className={`pro-facet ${time === tl ? 'is-active' : ''}`} onClick={() => setTime(tl)}>
              {t(`pro.opps.timelines.${tl}`)}
            </button>
          ))}
        </div>

        <p className="pro-explore__count" aria-live="polite">{t('pro.opps.count')(results.length)}</p>

        <div className="pro-results">
          {results.map((o, i) => (
            <Reveal key={o.id} delay={Math.min(i, 8) * 0.03}>
              <article className="pro-oppcard">
                <div className="pro-oppcard__top">
                  <span className="pro-oppcard__type">{t(`maps.oppType.${o.type}`)}</span>
                  <Basis value={o.basis} />
                </div>
                <h3 className="pro-oppcard__title">{o.title}</h3>
                <p className="pro-oppcard__desc">{o.description}</p>
                <dl className="pro-oppcard__meta">
                  <div><dt>{t('pro.opps.stakeholders')}</dt><dd>{o.who}</dd></div>
                  {o.impact && <div><dt>{t('pro.opps.impact')}</dt><dd>{o.impact}</dd></div>}
                  {o.timeline && <div><dt>{t('pro.opps.priority')}</dt><dd>{t(`pro.opps.timelines.${o.timeline}`)}</dd></div>}
                </dl>
                <p className="pro-oppcard__ev">
                  <span className="pro-oppcard__evlabel">{t('pro.opps.evidence')}:</span>
                  <Link className="pro-chip" to="/pro/explore">{o.linked_area} · {t('common.pageAbbr')}{o.source_page}</Link>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </ProSection>
  )
}
