import { usePageTitle } from '../usePageTitle.js'
import { useLang } from '../i18n.jsx'

export default function About() {
  const { t } = useLang()
  usePageTitle(t('about.label'), t('about.lead'))
  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">{t('about.label')}</div>
        <div>
          <h1>{t('about.title')}</h1>
          <p className="lede measure">{t('about.lead')}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">{t('about.noteLabel')}</div>
        <div><p className="measure">{t('about.noteBody')}</p></div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">{t('about.sourceLabel')}</div>
        <div><p className="measure">{t('about.sourceBody')}</p></div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">{t('about.independentLabel')}</div>
        <div><p className="measure">{t('about.independentBody')}</p></div>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">{t('about.founderLabel')}</div>
        <div className="stack">
          <p className="measure">{t('about.founderP1')}</p>
          <p className="measure">{t('about.founderP2')}</p>
          <p className="measure">{t('about.founderP3')}</p>
          <dl className="contact">
            <div><dt>Email</dt><dd><a href="mailto:hpgerald@gmail.com">hpgerald@gmail.com</a></dd></div>
            <div><dt>Phone</dt><dd><a href="tel:+255763453400">+255 763 453 400</a></dd></div>
            <div><dt>LinkedIn</dt><dd><a href="https://www.linkedin.com/in/gtesha/" target="_blank" rel="noopener noreferrer">linkedin.com/in/gtesha</a></dd></div>
          </dl>
        </div>
      </section>
    </div>
  )
}
