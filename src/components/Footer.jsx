import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__word">Dira&nbsp;2050<br /><span>{t('footer.sub')}</span></p>
          <p className="footer__tag">{t('footer.tag')}</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/dira/vision">{t('footer.vision')}</Link>
          <Link to="/dira/pillars">{t('footer.pillars')}</Link>
          <Link to="/dira/targets">{t('footer.targets')}</Link>
          <Link to="/dira/timeline">{t('footer.timeline')}</Link>
          <Link to="/dira/data">{t('footer.data')}</Link>
          <Link to="/dira/about">{t('footer.about')}</Link>
        </nav>
      </div>
      <p className="footer__fine">{t('footer.fine')}</p>
    </footer>
  )
}
