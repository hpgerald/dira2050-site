import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'

export default function About() {
  usePageTitle('About')
  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">About</div>
        <div>
          <h1>Dira 2050, made clear.</h1>
          <p className="lede measure">A plain-language, citizen's guide to the Tanzania Development Vision 2050 — so
          every Tanzanian can understand where the country is headed.</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Please note</div>
        <div>
          <p className="measure"><strong>These are goals, not achievements.</strong> Every target on this site is a
          national <em>aspiration</em> for 2050 as set out in the Vision document. They describe what Tanzania is
          reaching for — not what has already been accomplished. Where a target has a starting point, we show today's
          figure next to the 2050 goal so the distance is clear.</p>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Source</div>
        <div>
          <p className="measure">United Republic of Tanzania. (2025). <em>Tanzania Development Vision 2050 (Dira 2050)</em>.
          Dodoma: National Planning Commission. All content on this site is drawn from that document; see the
          {' '}<Link to="/data">data &amp; sources</Link> page to download the figures and check the pages.</p>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Independent</div>
        <div>
          <p className="measure">This is an independent explainer to aid public understanding. It is not an official
          government publication.</p>
        </div>
      </section>
    </div>
  )
}
