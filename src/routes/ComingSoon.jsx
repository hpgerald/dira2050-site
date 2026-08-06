import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { usePageTitle } from '../usePageTitle.js'

/*
  Placeholder for the document sections not yet built (LTPP, FYDP IV, National
  Framework, Communication Strategy). Reads its title from the hub strings so it
  stays consistent, and links back to the landing page.
*/
export default function ComingSoon({ docKey }) {
  const { t } = useLang()
  const title = t(`hub.cards.${docKey}.title`)
  const tag = t(`hub.cards.${docKey}.tag`)
  usePageTitle(title, tag)

  return (
    <div className="coming">
      <div className="container coming__inner">
        <span className="coming__badge">{t('coming.badge')}</span>
        <h1 className="coming__title">{title}</h1>
        <p className="coming__tag">{tag}</p>
        <p className="coming__body">{t('coming.body')}</p>
        <Link to="/" className="coming__back">← {t('coming.back')}</Link>
      </div>
    </div>
  )
}
