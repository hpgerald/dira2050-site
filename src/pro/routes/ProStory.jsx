import { useParams, Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import {
  getPillar, getEnabler, getPillars, getEnablers,
  targetsForPillar, targetsForEnabler, aspirationsForEnabler,
} from '../../lib/data.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import TargetList from '../../components/TargetList.jsx'
import StoryTemplate from '../components/StoryTemplate.jsx'
import { ProTimeline, ProSection } from '../components/primitives.jsx'
import NotFound from '../../routes/NotFound.jsx'

export default function ProStory() {
  const { kind, id } = useParams()
  const { t } = useLang()
  const { data, loading } = useData()
  const isPillar = kind === 'pillar'
  const entity = data ? (isPillar ? getPillar(data, id) : getEnabler(data, id)) : null
  usePageTitle(entity ? entity.name : t('pro.nav'))

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>
  if (!entity || (kind !== 'pillar' && kind !== 'driver')) return <NotFound />

  const targets = isPillar ? targetsForPillar(data, id) : targetsForEnabler(data, id)
  const aspirations = isPillar ? [] : aspirationsForEnabler(data, id)
  const milestones = [...data.milestones].sort((a, b) => a.year - b.year)
  const siblings = (isPillar ? getPillars(data) : getEnablers(data)).filter((x) => x.id !== id)

  const blocks = []
  const why = t(`pro.stories.why.${id}`)
  if (why && !why.startsWith('pro.')) blocks.push({ label: t('pro.storyt.why'), node: <p className="pro-section__lead" style={{ color: 'var(--pro-soft)' }}>{why}</p> })
  if (targets.length) blocks.push({ label: t('pro.storyt.aims'), variant: 'alt', node: <TargetList targets={targets} /> })
  if (aspirations.length) blocks.push({
    label: t('pro.storyt.aspirations'),
    node: (
      <ol className="asp">
        {aspirations.map((a) => (
          <li key={a.letter} className="asp__item"><span className="asp__mark">{a.letter}</span><span>{a.text}</span></li>
        ))}
      </ol>
    ),
  })
  blocks.push({ label: t('pro.storyt.timeline'), variant: aspirations.length ? 'alt' : undefined, node: <ProTimeline items={milestones.map((m) => ({ year: m.year, title: m.title, desc: m.description }))} /> })
  blocks.push({
    label: t('pro.storyt.connections'),
    node: (
      <p className="pro-result__rel">
        {siblings.map((s) => (
          <Link key={s.id} className="pro-chip" to={`/pro/story/${kind}/${s.id}`}>{isPillar ? s.short_name : s.name}</Link>
        ))}
      </p>
    ),
  })

  return (
    <StoryTemplate
      badge={isPillar ? t('pro.explore.badge.pillar') : t('pro.explore.badge.driver')}
      title={entity.name}
      summary={entity.summary}
      fullPageTo={isPillar ? `/pillars/${id}` : `/enablers/${id}`}
      fullPageLabel={t('pro.storyt.fullPage')}
      blocks={blocks}
    />
  )
}
