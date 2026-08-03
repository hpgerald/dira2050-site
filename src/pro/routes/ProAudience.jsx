import { useParams, Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { pipes } from '../../lib/data.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import StoryTemplate from '../components/StoryTemplate.jsx'
import { ProSection } from '../components/primitives.jsx'
import NotFound from '../../routes/NotFound.jsx'

function Chips({ items }) {
  return <p className="pro-chips">{items.map((it, i) => <span key={i} className="pro-chip">{it}</span>)}</p>
}
function Steps({ items }) {
  return <ol className="pro-steps">{items.map((it, i) => <li key={i}>{it}</li>)}</ol>
}

export default function ProAudience() {
  const { id } = useParams()
  const { t } = useLang()
  const { data, loading } = useData()
  const a = data ? data.intelAudiences.find((x) => x.id === id) : null
  usePageTitle(a ? a.audience : t('pro.audience.title'))

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>
  if (!a) return <NotFound />

  const others = data.intelAudiences.filter((x) => x.id !== id)
  const blocks = [
    { label: t('si.opportunities'), node: <Chips items={pipes(a.opportunities)} /> },
    { label: t('si.actions'), variant: 'alt', node: <Steps items={pipes(a.actions)} /> },
    { label: t('si.skills'), node: <><Chips items={pipes(a.skills)} /><p style={{ marginTop: '1rem' }}><Link className="pro-btn pro-btn--ghost" to="/pro/skills">{t('pro.audience.ctaSkills')} →</Link></p></> },
    { label: t('si.sectors'), variant: 'alt', node: <Chips items={pipes(a.sectors)} /> },
    { label: t('si.engage'), node: <Chips items={pipes(a.engage)} /> },
    { label: t('pro.storyt.connections'), variant: 'alt', node: <p className="pro-chips">{others.map((o) => <Link key={o.id} className="pro-chip" to={`/pro/for/${o.id}`}>{o.audience}</Link>)}</p> },
  ]

  return (
    <StoryTemplate
      badge={t('pro.subnav.audiences')}
      title={a.audience}
      summary={a.why}
      fullPageTo="/pro/opportunities"
      fullPageLabel={t('pro.audience.ctaOpps')}
      blocks={blocks}
    />
  )
}
