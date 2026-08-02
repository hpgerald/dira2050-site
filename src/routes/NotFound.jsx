import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="container section">
      <span className="eyebrow">{t('notFound.code')}</span>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.body')} <Link to="/">{t('notFound.home')}</Link>.</p>
    </div>
  )
}
