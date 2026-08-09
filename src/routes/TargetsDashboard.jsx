import { useMemo, useState } from 'react'
import { useData } from '../useData.js'
import TargetCard from '../components/TargetCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { isNumber } from '../lib/format.js'
import { usePageTitle } from '../usePageTitle.js'
import { useLang } from '../i18n.jsx'

const FILTERS = [
  { key: 'all', match: () => true },
  { key: 'economy', match: (t) => t.pillar_id === 'economy' },
  { key: 'people', match: (t) => t.pillar_id === 'people' },
  { key: 'environment', match: (t) => t.pillar_id === 'environment' },
  { key: 'drivers', match: (t) => !!t.enabler_id },
]

export default function TargetsDashboard() {
  const { t } = useLang()
  const { data, loading, error } = useData()
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (!data) return []
    const f = FILTERS.find((x) => x.key === active) || FILTERS[0]
    return data.targets.filter(f.match)
  }, [data, active])

  usePageTitle(t('targets.label'))
  if (loading) return <p className="container section">{t('common.loading')}</p>
  if (error) return <p className="container section" role="alert">{t('common.error')}</p>

  const measurable = data.targets.filter((x) => isNumber(x.target_value)).length

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">{t('targets.label')}</div>
        <div>
          <h1>{t('targets.title')(data.targets.length)}</h1>
          <p className="measure">{t('targets.intro')(measurable)}</p>
        </div>
      </div>

      <div className="filterbar" role="group" aria-label={t('targets.label')}>
        {FILTERS.map((f) => {
          const count = data.targets.filter(f.match).length
          return (
            <button key={f.key} type="button"
              className={`filterbar__btn ${active === f.key ? 'is-active' : ''}`}
              aria-pressed={active === f.key} onClick={() => setActive(f.key)}>
              {t(`targets.filters.${f.key}`)} <span className="filterbar__n">{count}</span>
            </button>
          )
        })}
      </div>

      <hr className="rule rule--strong" />

      <p className="resultcount" aria-live="polite">{t('targets.count')(filtered.length)}</p>

      <Reveal className="tgrid">
        {filtered.map((tg) => <TargetCard key={tg.id} t={tg} />)}
      </Reveal>
    </div>
  )
}
