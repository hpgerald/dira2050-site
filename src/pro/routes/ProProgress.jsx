import { useEffect, useMemo, useState } from 'react'
import { useData } from '../../useData.js'
import { isNumber } from '../../lib/format.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection, Callout } from '../components/primitives.jsx'
import { progressProvider, pct, statusKey } from '../lib/progress.js'

const fmt = (v) => Number(v).toLocaleString('en-US')

export default function ProProgress() {
  const { t } = useLang()
  usePageTitle(t('pro.progress.title'), t('pro.progress.lead'))
  const { data, loading } = useData()
  const [live, setLive] = useState({})

  const items = useMemo(
    () => (data ? data.targets.filter((x) => isNumber(x.baseline_value) && isNumber(x.target_value)) : []),
    [data],
  )

  // Fetch current values through the adapter (default returns none).
  useEffect(() => {
    let alive = true
    progressProvider.fetch(items.map((i) => i.id)).then((m) => alive && setLive(m || {}))
    return () => { alive = false }
  }, [items])

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>

  return (
    <ProSection h1 title={t('pro.progress.title')} lead={t('pro.progress.lead')}>
      <div style={{ marginTop: '1.5rem' }}>
        <Callout>{t('pro.progress.note')}</Callout>

        <div className="pro-prog" style={{ marginTop: '1.5rem' }}>
          {items.map((tg) => {
            const current = live[tg.id]?.current
            const p = pct(tg.baseline_value, tg.target_value, current)
            const sk = statusKey(tg.baseline_value, tg.target_value, current)
            return (
              <div key={tg.id} className="pro-prog__row">
                <div className="pro-prog__head">
                  <p className="pro-prog__label">{tg.indicator}</p>
                  <span className={`pro-prog__pill pro-prog__pill--${sk.toLowerCase()}`}>{t(`pro.progress.status${sk}`)}</span>
                </div>
                <div className={`pro-prog__track ${p == null ? 'is-empty' : ''}`}>
                  {p != null && <span className="pro-prog__fill" style={{ width: `${p}%` }} />}
                  {p != null && <span className="pro-prog__cur" style={{ left: `${p}%` }} aria-hidden="true" />}
                </div>
                <div className="pro-prog__vals">
                  <span>{t('pro.progress.baseline')}: <strong>{fmt(tg.baseline_value)}</strong>{tg.baseline_year ? ` (${tg.baseline_year})` : ''}</span>
                  <span>{t('pro.progress.current')}: <strong>{current != null ? fmt(current) : t('pro.progress.awaiting')}</strong></span>
                  <span>{t('pro.progress.goal')}: <strong>{fmt(tg.target_value)}</strong> {tg.unit}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ProSection>
  )
}
