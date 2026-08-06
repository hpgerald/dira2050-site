import { Link } from 'react-router-dom'
import { useData } from '../useData.js'
import GlossaryTerm from '../components/GlossaryTerm.jsx'
import Basis from '../components/Basis.jsx'
import { usePageTitle } from '../usePageTitle.js'
import { useLang } from '../i18n.jsx'

export default function WhatItMeans() {
  const { t } = useLang()
  usePageTitle(t('forYou.label'), t('forYou.lead'))
  const { data, loading, error } = useData()
  if (loading) return <p className="container section">{t('common.loading')}</p>
  if (error) return <p className="container section" role="alert">{t('common.error')}</p>

  const sections = t('forYou.sections')
  const explore = t('si.explore')

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">{t('forYou.label')}</div>
        <div>
          <h1>{t('forYou.title')}</h1>
          <p className="measure">{t('forYou.lead')}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      {sections.map((sec, i) => (
        <div key={i}>
          <section className="fy">
            <div className="fy__num">{String(i + 1).padStart(2, '0')}</div>
            <div className="fy__body">
              <h2>{sec.h2}</h2>
              <p>
                {sec.parts.map((part, j) =>
                  typeof part === 'string'
                    ? <span key={j}>{part}</span>
                    : <GlossaryTerm key={j} term={part.label} definition={part.def} />,
                )}
              </p>
            </div>
          </section>
          {i < sections.length - 1 && <hr className="rule" />}
        </div>
      ))}

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">{t('si.deepDive')}</div>
        <div>
          <span className="eyebrow">{t('si.eyebrow')}</span>
          <h2>{t('si.h2')}</h2>
          <p className="measure">{t('si.lead')}</p>
          <p className="si-legend">
            <Basis value="Documented" /> {t('si.legendDoc')}
            <Basis value="Inferred" /> {t('si.legendInf')}
          </p>
        </div>
      </section>

      <section className="cols">
        <div className="cols__label">{t('si.exploreLabel')}</div>
        <div>
          <ul className="index">
            {explore.map(([to, label, desc], i) => (
              <li key={to} className="index__row">
                <Link className="index__link" to={`/dira/what-it-means/${to}`}>
                  <span className="index__num">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="index__name">{label}</span>
                    <span className="index__desc">{desc}</span>
                  </span>
                  <span className="index__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
