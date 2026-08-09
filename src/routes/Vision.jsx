import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n.jsx'

export default function Vision() {
  const { t } = useLang()
  usePageTitle(t('vision.label'), t('vision.lead'))
  const goals = t('vision.goals')
  const principles = t('vision.principles')
  const delivery = t('vision.delivery')

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

      <Reveal as="section" className="cols">
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
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">{t('vision.principlesLabel')}</div>
        <div>
          <p className="measure">{t('vision.principlesIntro')}</p>
          <ol className="goals">
            {principles.map(([title, desc], i) => (
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
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">{t('vision.howLabel')}</div>
        <div className="stack">
          <p className="measure">{t('vision.howBody')}</p>
          <p>
            <Link className="btn" to="/dira/pillars">{t('vision.btnFramework')}</Link>{' '}
            <Link className="btn btn--ghost" to="/dira/targets">{t('vision.btnTargets')}</Link>
          </p>
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">{t('vision.deliveryLabel')}</div>
        <div>
          <p className="measure">{t('vision.deliveryIntro')}</p>
          <ul className="deflist">
            {delivery.map(([title, desc], i) => (
              <li key={i}><strong>{title}.</strong> {desc}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  )
}
