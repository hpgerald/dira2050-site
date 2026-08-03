import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useData } from '../../useData.js'
import { getPillars, getEnablers } from '../../lib/data.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection } from '../components/primitives.jsx'
import ForceGraph from '../components/ForceGraph.jsx'
import StrategyMap from '../components/StrategyMap.jsx'

const PILLAR_COLOR = { economy: 'var(--c-economy)', people: 'var(--c-people)', environment: 'var(--c-environment)' }
// Authored driver → sector connections (analytical; the doc names both sets).
const DRIVER_SECTORS = {
  energy: ['manufacturing', 'mining', 'agriculture'],
  logistics: ['manufacturing', 'mining', 'agriculture', 'tourism'],
  'science-tech': ['agriculture', 'manufacturing'],
  rnd: ['manufacturing'],
  digital: ['financial', 'services'],
}

// Strip a trailing parenthetical so radial labels stay short ("Agriculture
// (crops, livestock…)" -> "Agriculture"). The full name shows in the tiered map.
const shortName = (s) => (s || '').replace(/\s*\(.*$/, '').trim()

function buildGraph(data, t) {
  const P = getPillars(data), D = getEnablers(data), S = data.sectors
  const nodes = [{ id: 'vision', label: t('pro.graph.visionNode'), type: 'vision', r: 26, to: '/pro' }]
  const links = []
  P.forEach((p) => { nodes.push({ id: `p-${p.id}`, label: p.short_name, type: 'pillar', color: PILLAR_COLOR[p.id], r: 16, to: `/pro/story/pillar/${p.id}` }); links.push({ source: 'vision', target: `p-${p.id}`, dist: 120 }) })
  D.forEach((d) => { nodes.push({ id: `d-${d.id}`, label: shortName(d.name), type: 'driver', r: 13, to: `/pro/story/driver/${d.id}` }); links.push({ source: 'vision', target: `d-${d.id}`, dist: 120 }) })
  S.forEach((s) => { nodes.push({ id: `s-${s.id}`, label: shortName(s.name), type: 'sector', r: 8, to: `/pro/sectors/${s.id}` }); links.push({ source: 'p-economy', target: `s-${s.id}`, dist: 70 }) })
  Object.entries(DRIVER_SECTORS).forEach(([d, secs]) => secs.forEach((s) => links.push({ source: `d-${d}`, target: `s-${s}`, dist: 90 })))
  return { nodes, links }
}

export default function ProGraph() {
  const { t } = useLang()
  usePageTitle(t('pro.graph.title'), t('pro.graph.lead'))
  const { data, loading } = useData()
  const graph = useMemo(() => (data ? buildGraph(data, t) : { nodes: [], links: [] }), [data, t])

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>

  const legend = ['vision', 'pillar', 'driver', 'sector']
  const grouped = { pillar: graph.nodes.filter((n) => n.type === 'pillar'), driver: graph.nodes.filter((n) => n.type === 'driver'), sector: graph.nodes.filter((n) => n.type === 'sector') }

  return (
    <>
      <ProSection h1 title={t('pro.graph.title')} lead={t('pro.graph.lead')} />

      {/* View 1 - the canonical hierarchy, read top to bottom */}
      <ProSection variant="alt" eyebrow={t('pro.graph.structureTitle')} lead={t('pro.graph.structureLead')}>
        <div style={{ marginTop: '1.5rem' }}>
          <StrategyMap />
        </div>
      </ProSection>

      {/* View 2 - the same Vision as an interactive network */}
      <ProSection eyebrow={t('pro.graph.connectionsTitle')} lead={t('pro.graph.connectionsLead')}>
        <div className="pro-graph" style={{ marginTop: '1.5rem' }}>
          <ul className="pro-graph__legend" aria-hidden="true">
            {legend.map((k) => (
              <li key={k} className="pro-graph__legenditem"><span className={`pro-graph__dot pro-graph__dot--${k}`} />{t(`pro.graph.legend.${k}`)}</li>
            ))}
          </ul>

          <div className="pro-graph__canvas">
            <ForceGraph nodes={graph.nodes} links={graph.links} ariaLabel={t('pro.graph.title')} />
          </div>

          {/* Accessible fallback: every node as a link */}
          <details className="pro-graph__list">
            <summary>{t('pro.graph.listLabel')}</summary>
            {['pillar', 'driver', 'sector'].map((type) => (
              <div key={type} className="pro-graph__listgroup">
                <p className="pro-graph__listlabel">{t(`pro.graph.legend.${type}`)}</p>
                <ul>
                  {grouped[type].map((n) => (
                    <li key={n.id}>{n.to ? <Link to={n.to}>{n.label}</Link> : n.label}</li>
                  ))}
                </ul>
              </div>
            ))}
          </details>
        </div>
      </ProSection>
    </>
  )
}
