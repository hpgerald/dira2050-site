import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'
import { useLang } from '../i18n.jsx'

export default function Vision() {
  const { t } = useLang()
  usePageTitle(t('vision.label'), t('vision.lead'))
  const goals = t('vision.goals')

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">{t('vision.label')}</div>
        <div>
          <h1>{t('vision.title')}</h1>
          <p className="lede measure">{t('vision.lead')}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">{t('vision.goalsLabel')}</div>
        <div>
          <p className="measure">{t('vision.goalsIntro')}</p>
          <ol className="goals">
            {goals.map(([title, desc], i) => (
              <li key={i} className="goal">
                <span className="goal__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="goal__title">{title}</h3>
                  <p className="goal__desc">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">{t('vision.howLabel')}</div>
        <div className="stack">
          <p className="measure">{t('vision.howBody')}</p>
          <p>
            <Link className="btn" to="/pillars">{t('vision.btnFramework')}</Link>{' '}
            <Link className="btn btn--ghost" to="/targets">{t('vision.btnTargets')}</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
