import { Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { getPillars } from '../../lib/data.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import {
  ProSection, Reveal, BigStat, Statement, Leap, ProTimeline, ProCard,
} from '../components/primitives.jsx'

const fmt = (v) => (v == null || v === '' ? '–' : Number(v).toLocaleString('en-US'))
const byId = (data) => Object.fromEntries((data?.targets || []).map((t) => [t.id, t]))
const PILLAR_COLOR = { economy: 'var(--c-economy)', people: 'var(--c-people)', environment: 'var(--c-environment)' }

export default function ProHome() {
  const { t } = useLang()
  usePageTitle(t('pro.nav'))
  const { data, loading } = useData()

  const T = byId(data)
  const stats = ['t1', 't2', 't4', 't7'].map((id) => T[id]).filter(Boolean)
  const transforms = ['t2', 't12', 't4'].map((id) => T[id]).filter((x) => x && x.baseline_value != null && x.target_value != null)
  const pillars = loading ? [] : getPillars(data)
  const ambitions = t('vision.goals')

  return (
    <>
      {/* 1 · Cinematic hero */}
      <ProSection variant="night">
        <Reveal>
          <h1 className="pro-section__title" style={{ maxWidth: '18ch' }}>{t('pro.home.title')}</h1>
          <p className="pro-section__lead">{t('pro.home.lead')}</p>
          <p style={{ marginTop: '1.6rem' }}>
            <Link className="pro-btn" to="/pro/explore">{t('pro.home.ctaExplore')}</Link>
          </p>
          <p className="pro-cue">{t('pro.story.scrollCue')}</p>
        </Reveal>
      </ProSection>

      {/* 2 · The vision statement, full-bleed */}
      <Statement cite={t('pro.demo.quoteCite')}>{t('pro.demo.quote')}</Statement>

      {/* 3 · The journey (timeline from data) */}
      {!loading && (
        <ProSection variant="alt" eyebrow={t('pro.story.journeyEyebrow')} title={t('pro.story.journeyTitle')} lead={t('pro.story.journeyLead')}>
          <div className="pro__narrow" style={{ marginTop: '2.5rem' }}>
            <Reveal>
              <ProTimeline items={[...data.milestones].sort((a, b) => a.year - b.year).map((m) => ({ year: m.year, title: m.title, desc: m.description }))} />
            </Reveal>
          </div>
        </ProSection>
      )}

      {/* 4 · The transformation (now → 2050 comparisons) */}
      {transforms.length > 0 && (
        <ProSection eyebrow={t('pro.story.transformEyebrow')} title={t('pro.story.transformTitle')} lead={t('pro.story.transformLead')}>
          <div className="pro__narrow" style={{ marginTop: '2.5rem', display: 'grid', gap: '2.5rem' }}>
            {transforms.map((x, i) => (
              <Reveal key={x.id} delay={i * 0.06}>
                <Leap
                  label={x.indicator}
                  unit={x.unit}
                  nowLabel={`${t('targets.now')} ${x.baseline_year || ''}`.trim()}
                  thenLabel="2050"
                  now={x.baseline_value}
                  then={x.target_value}
                  growthWord={t('pro.story.leapGrowth')}
                  cutWord={t('pro.story.leapCut')}
                />
              </Reveal>
            ))}
          </div>
        </ProSection>
      )}

      {/* 5 · Key numbers */}
      {stats.length > 0 && (
        <ProSection variant="night" eyebrow={t('pro.story.numbersEyebrow')}>
          <div className="pro-stats" style={{ marginTop: '1rem' }}>
            {stats.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.07}>
                <BigStat value={fmt(s.target_value)} unit={s.unit} label={s.indicator}
                  sub={s.baseline_value != null ? `${fmt(s.baseline_value)} (${s.baseline_year || ''})` : undefined} />
              </Reveal>
            ))}
          </div>
        </ProSection>
      )}

      {/* 6 · Three pillars (flag identity) */}
      {pillars.length > 0 && (
        <ProSection variant="alt" eyebrow={t('pro.story.pillarsEyebrow')} title={t('pro.story.pillarsTitle')} lead={t('pro.story.pillarsLead')}>
          <div className="pro-pillars">
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <Link className="pro-pillar" to={`/pro/story/pillar/${p.id}`}>
                  <div className="pro-pillar__bar" style={{ background: PILLAR_COLOR[p.id] || 'var(--pro-accent)' }} />
                  <p className="pro-pillar__name">{p.name}</p>
                  <p className="pro-pillar__sum">{p.summary}</p>
                  <span className="pro-pillar__more">{t('vision.btnFramework')} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </ProSection>
      )}

      {/* 7 · National ambitions (the four goals) */}
      <ProSection eyebrow={t('pro.story.ambitionsEyebrow')} title={t('pro.story.ambitionsTitle')}>
        <div className="pro-cards" style={{ marginTop: '2rem' }}>
          {ambitions.map(([title, desc], i) => (
            <Reveal key={i} delay={i * 0.05}>
              <ProCard title={title} body={desc} />
            </Reveal>
          ))}
        </div>
      </ProSection>

      {/* 8 · Call to explore */}
      <ProSection variant="night" eyebrow={t('pro.story.ctaEyebrow')} title={t('pro.story.ctaTitle')} lead={t('pro.story.ctaLead')}>
        <p style={{ marginTop: '1.6rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <Link className="pro-btn" to="/pillars">{t('pro.story.ctaVision')}</Link>
          <Link className="pro-btn pro-btn--ghost" to="/targets">{t('pro.story.ctaTargets')}</Link>
          <Link className="pro-btn pro-btn--ghost" to="/what-it-means">{t('pro.story.ctaForYou')}</Link>
        </p>
      </ProSection>
    </>
  )
}
