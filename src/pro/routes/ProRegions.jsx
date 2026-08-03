import { useState } from 'react'
import { useData } from '../../useData.js'
import { pipes } from '../../lib/data.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection, Callout } from '../components/primitives.jsx'
import Basis from '../../components/Basis.jsx'

function Chips({ items }) {
  return <p className="pro-chips">{items.map((it, i) => <span key={i} className="pro-chip">{it}</span>)}</p>
}

export default function ProRegions() {
  const { t } = useLang()
  usePageTitle(t('pro.regions.title'), t('pro.regions.lead'))
  const { data, loading } = useData()
  const regions = data?.regions || []
  const [sel, setSel] = useState(null)

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>
  const active = regions.find((r) => r.id === sel) || regions[0]

  return (
    <ProSection h1 title={t('pro.regions.title')} lead={t('pro.regions.lead')}>
      <div style={{ marginTop: '1.5rem' }}>
        <Callout>{t('pro.regions.disclaimer')}</Callout>

        <div className="pro-regions" style={{ marginTop: '1.5rem' }}>
          {/* Schematic, interactive zone map */}
          <div className="pro-map" role="group" aria-label={t('pro.regions.selectLabel')}>
            {regions.map((r) => (
              <button key={r.id} type="button"
                className={`pro-mapdot ${active.id === r.id ? 'is-active' : ''}`}
                style={{ top: `${r.top}%`, left: `${r.left}%` }}
                aria-pressed={active.id === r.id} onClick={() => setSel(r.id)}>
                <span className="pro-mapdot__ring" aria-hidden="true" />
                <span className="pro-mapdot__label">{r.zone}</span>
              </button>
            ))}
            <span className="pro-map__note">{t('pro.regions.mapNote')}</span>
          </div>

          {/* Selected region detail */}
          <div className="pro-region">
            <div className="pro-region__head">
              <h3 className="pro-region__name">{active.name}</h3>
              <Basis value={active.basis} />
            </div>
            <p className="pro-region__sum">{active.summary}</p>
            <dl className="pro-region__lists">
              <div><dt>{t('pro.regions.priorities')}</dt><dd><Chips items={pipes(active.priorities)} /></dd></div>
              <div><dt>{t('pro.regions.industries')}</dt><dd><Chips items={pipes(active.industries)} /></dd></div>
              <div><dt>{t('pro.regions.resources')}</dt><dd><Chips items={pipes(active.resources)} /></dd></div>
              <div><dt>{t('pro.regions.opportunities')}</dt><dd><Chips items={pipes(active.opportunities)} /></dd></div>
            </dl>
          </div>
        </div>
      </div>
    </ProSection>
  )
}
