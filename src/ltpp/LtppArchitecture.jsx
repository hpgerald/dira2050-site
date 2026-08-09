import { Link } from 'react-router-dom'
import { useLtpp, pipes } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

const PRINCIPLES = ['Democracy, rights and freedoms', 'Dignity', 'Peace and unity', 'Sovereignty over natural wealth', 'Culture and national ethos']

// Where each architecture component is explained in detail elsewhere on the platform.
const LINKS = {
  'Strong and competitive economy': '/dira/pillars/economy',
  'Human capabilities and social development': '/dira/pillars/people',
  'Environmental integrity and climate resilience': '/dira/pillars/environment',
  'Integrated logistics': '/dira/enablers/logistics',
  'Energy': '/dira/enablers/energy',
  'Science and technology': '/dira/enablers/science-tech',
  'Research and development': '/dira/enablers/rnd',
  'Digital transformation': '/dira/enablers/digital',
  'Agriculture': '/fydp/sectors/agriculture',
  'Manufacturing': '/fydp/sectors/manufacturing',
  'Mining': '/fydp/sectors/mining',
  'Tourism': '/fydp/sectors/tourism',
  'Blue economy': '/fydp/sectors/blue-economy',
  'Construction and real estate': '/fydp/sectors/construction',
  'Financial services': '/fydp/sectors/financial',
  'Sports and creative industries': '/fydp/sectors/sports-creative',
}

export default function LtppArchitecture() {
  usePageTitle('The architecture · LTPP 2050', 'Four mutually reinforcing levels, and the 3i strategy that drives them.')
  const { data, loading } = useLtpp()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { levels, threei } = data

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">The architecture</div>
        <div>
          <h1>Four levels, one system</h1>
          <p className="lede measure">The plan organises national effort around four mutually reinforcing levels. They are not a ladder: each supports and depends on the others, and progress in one relies on progress in the rest.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      {levels.map((l, i) => (
        <Reveal as="section" key={l.id} className="cols" delay={i ? 30 : 0}>
          <div className="cols__label">Level {l.num}</div>
          <div>
            <h2 className="pa__name">{l.name}</h2>
            <p className="measure">{l.summary}</p>
            <ul className="chiplist">
              {pipes(l.components).map((c) => (LINKS[c]
                ? <li key={c}><Link className="chip chip--soft chip--link" to={LINKS[c]}>{c} →</Link></li>
                : <li key={c} className="chip chip--soft">{c}</li>))}
            </ul>
          </div>
        </Reveal>
      ))}

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">The 3i strategy</div>
        <div className="stack">
          <p className="measure">Across all four levels, delivery runs through three moves that reinforce one another, and none can succeed alone.</p>
          <ul className="deflist">
            {threei.map((t) => <li key={t.num}><strong>{t.name}.</strong> {t.summary}</li>)}
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Guiding principles</div>
        <div className="stack">
          <p className="measure">The same five principles that anchor Vision 2050 provide the plan's normative foundation for governance, investment, service delivery and citizen participation.</p>
          <ul className="chiplist">
            {PRINCIPLES.map((p) => <li key={p} className="chip chip--soft">{p}</li>)}
          </ul>
          <p className="viz__note">The plan's development philosophy is self-reliance: the strategic use of Tanzania's people, institutions, resources, enterprises and innovation, not isolation, with balanced roles for the state, the private sector, public corporations and cooperatives.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/ltpp/roadmap">← The roadmap</Link>
        <Link className="pager__link pager__link--next" to="/ltpp/financing">Financing →</Link>
      </section>
    </div>
  )
}
