import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__word">Dira&nbsp;2050<br /><span>Explained</span></p>
          <p className="footer__tag">A citizen's guide to the Tanzania Development Vision 2050.</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/vision">The Vision</Link>
          <Link to="/pillars">Pillars &amp; Drivers</Link>
          <Link to="/targets">Targets</Link>
          <Link to="/timeline">Timeline</Link>
          <Link to="/data">Data &amp; sources</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
      <p className="footer__fine">
        Targets are national aspirations for 2050, not current achievements. Source: United Republic of Tanzania,
        {' '}<em>Tanzania Development Vision 2050</em> (National Planning Commission, 2025).
      </p>
    </footer>
  )
}
