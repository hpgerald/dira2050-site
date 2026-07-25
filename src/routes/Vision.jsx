import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'

const GOALS = [
  ['01', 'A strong economy', 'A diversified, resilient, inclusive and competitive upper-middle-income economy — a one-trillion-dollar economy with US$7,000 income per person.'],
  ['02', 'A good life for all', 'High quality of life and well-being for everyone: long, healthy lives, quality education and skills, clean water, decent housing and social protection.'],
  ['03', 'A cared-for environment', 'A nation that conserves and sustainably uses its natural resources, maintains environmental integrity, and is resilient to climate change.'],
  ['04', 'A digital society', 'A digitally empowered society that embraces innovation and drives the country’s productivity and competitiveness.'],
]

export default function Vision() {
  usePageTitle('The Vision')
  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">The Vision</div>
        <div>
          <h1>The Tanzania we want.</h1>
          <p className="lede measure">By 2050, Tanzania aims to be an industrialised, knowledge-based, upper-middle-income
          country — with a one-trillion-dollar economy, an average income of US$7,000 per person, and a high quality of
          life for all its people.</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Four goals</div>
        <div>
          <p className="measure">Dira 2050 sets out four national goals for the next 25 years.</p>
          <ol className="goals">
            {GOALS.map(([num, title, desc]) => (
              <li key={num} className="goal">
                <span className="goal__num">{num}</span>
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
        <div className="cols__label">How it works</div>
        <div className="stack">
          <p className="measure">The Vision rests on a <strong>foundation</strong> of good governance, peace and
          stability. On that base stand <strong>three pillars</strong> — a strong economy, capable people, and a healthy
          environment. Powering them are <strong>five drivers</strong>: logistics, energy, science &amp; technology,
          research &amp; development, and digital transformation. And it is delivered through prioritised
          <strong> transformative sectors</strong> like agriculture, tourism, manufacturing and mining.</p>
          <p>
            <Link className="btn" to="/pillars">Explore the framework</Link>{' '}
            <Link className="btn btn--ghost" to="/targets">See the targets</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
