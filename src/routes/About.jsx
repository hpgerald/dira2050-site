import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'

export default function About() {
  usePageTitle('About', 'About Dira 2050 Explained — an independent, plain-language guide to the Tanzania Development Vision 2050, and the initiative behind it.')
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

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">About the founder</div>
        <div className="stack">
          <p className="measure">This project is part of a broader effort to build an independent <strong>Information
          Visualization Institute</strong> — dedicated to making complex public information easier to understand
          through clear, accessible, evidence-based visual communication. The long-term vision is to turn government
          strategies, policies, research, statistics, budgets and development reports into interactive experiences that
          help citizens, researchers, policymakers, educators and development partners understand the issues shaping
          society.</p>

          <p className="measure">The initiative was founded by <strong>Gerald Tesha</strong>, an Information Systems and
          Network Engineer (St. Joseph College of Engineering and Technology) with a specialisation in Information
          Visualization from the NYU Tandon School of Engineering. Based in Dodoma, Tanzania, Gerald has more than nine
          years' experience in data, monitoring and evaluation, information management and visualization across health
          and international-development programs in Sub-Saharan Africa.</p>

          <p className="measure">Collaborators, researchers, designers, software engineers, institutions and
          organisations interested in advancing this work are warmly welcome to get in touch.</p>

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
