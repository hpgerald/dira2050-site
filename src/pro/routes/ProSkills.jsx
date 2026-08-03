import { useMemo, useState } from 'react'
import { useData } from '../../useData.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection, Reveal } from '../components/primitives.jsx'
import Basis from '../../components/Basis.jsx'

const list = (s) => (s ? String(s).split(',').map((x) => x.trim()).filter(Boolean) : [])

export default function ProSkills() {
  const { t } = useLang()
  usePageTitle(t('pro.skills.title'), t('pro.skills.lead'))
  const { data, loading } = useData()
  const [cat, setCat] = useState('all')
  const [dem, setDem] = useState('all')

  const skills = data?.intelSkills || []
  const cats = useMemo(() => ['all', ...Array.from(new Set(skills.map((s) => s.category)))], [skills])
  const results = useMemo(
    () => skills.filter((s) => (cat === 'all' || s.category === cat) && (dem === 'all' || s.demand === dem)),
    [skills, cat, dem],
  )

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>

  return (
    <ProSection h1 title={t('pro.skills.title')} lead={t('pro.skills.lead')}>
      <div style={{ marginTop: '1.6rem' }}>
        <div className="pro-facets" role="group" aria-label={t('pro.skills.allCats')}>
          {cats.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c}
              className={`pro-facet ${cat === c ? 'is-active' : ''}`} onClick={() => setCat(c)}>
              {c === 'all' ? t('pro.skills.allCats') : t(`pro.skills.cats.${c}`)}
            </button>
          ))}
        </div>
        <div className="pro-facets" role="group" aria-label={t('pro.skills.allDemand')}>
          {['all', 'High', 'Medium'].map((d) => (
            <button key={d} type="button" aria-pressed={dem === d}
              className={`pro-facet ${dem === d ? 'is-active' : ''}`} onClick={() => setDem(d)}>
              {d === 'all' ? t('pro.skills.allDemand') : t(`maps.demand.${d}`)}
            </button>
          ))}
        </div>

        <p className="pro-explore__count" aria-live="polite">{t('pro.skills.count')(results.length)}</p>

        <div className="pro-results">
          {results.map((s, i) => (
            <Reveal key={s.skill} delay={Math.min(i, 8) * 0.03}>
              <article className="pro-skillcard">
                <div className="pro-oppcard__top">
                  <span className="pro-skillcard__cat">{t(`pro.skills.cats.${s.category}`)}</span>
                  <span className={`pro-skillcard__demand pro-skillcard__demand--${String(s.demand).toLowerCase()}`}>{t(`maps.demand.${s.demand}`)}</span>
                </div>
                <h3 className="pro-oppcard__title">{s.skill}</h3>
                <p className="pro-oppcard__desc">{s.why_matters}</p>
                <dl className="pro-oppcard__meta">
                  {s.learning_path && <div><dt>{t('pro.skills.learningLabel')}</dt><dd>{s.learning_path}</dd></div>}
                  {s.outlook && <div><dt>{t('pro.skills.outlookLabel')}</dt><dd>{s.outlook}</dd></div>}
                  <div><dt>{t('pro.skills.whereLabel')}</dt><dd>{s.where_in_strategy} <Basis value={s.basis} /></dd></div>
                </dl>
                {(s.certifications || s.programs) && (
                  <div className="pro-skillcard__tags">
                    {list(s.certifications).length > 0 && (
                      <p className="pro-skillcard__taggroup"><span className="pro-oppcard__evlabel">{t('pro.skills.certsLabel')}:</span>
                        {list(s.certifications).map((c) => <span key={c} className="pro-chip">{c}</span>)}</p>
                    )}
                    {list(s.programs).length > 0 && (
                      <p className="pro-skillcard__taggroup"><span className="pro-oppcard__evlabel">{t('pro.skills.programsLabel')}:</span>
                        {list(s.programs).map((p) => <span key={p} className="pro-chip">{p}</span>)}</p>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </ProSection>
  )
}
