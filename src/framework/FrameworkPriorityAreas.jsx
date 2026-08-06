import { Link } from 'react-router-dom'
import { useFramework, pipes } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import { ResultsChain, ThreeI, FlagshipPipeline } from './frameworkViz.jsx'

export default function FrameworkPriorityAreas() {
  usePageTitle('Priority areas · National Framework', 'The national result areas the Framework tracks, and how each is assessed.')
  const { data, loading } = useFramework()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { priorityAreas, paComponents } = data
  const areas = priorityAreas.filter((p) => p.id !== 'flagship')
  const flagship = priorityAreas.find((p) => p.id === 'flagship')

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Priority areas</div>
        <div>
          <h1>What gets tracked</h1>
          <p className="lede measure">Performance is organised into national result areas that build on each other: fix the foundations, turn reform into growth, and deliver for people.</p>
        </div>
      </Reveal>

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">The results chain</div>
        <div className="stack">
          <ResultsChain />
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      {areas.map((p, i) => (
        <Reveal as="section" key={p.id} className="cols" delay={i ? 40 : 0}>
          <div className="cols__label">Area {p.code}</div>
          <div className="stack">
            <h2 className="pa__name">{p.name}</h2>
            <p className="measure">{p.focus}</p>
            <div>
              <p className="cols__label" style={{ padding: 0, marginBottom: '.6rem' }}>What it tracks</p>
              <ul className="chiplist">
                {pipes(p.tracks).map((tk) => <li key={tk} className="chip chip--soft">{tk}</li>)}
              </ul>
            </div>
            {p.principle ? <p className="pa__principle">Guiding principle: “{p.principle}”</p> : null}
            {p.id === 'transformation' ? (
              <div>
                <p className="cols__label" style={{ padding: 0, margin: '.4rem 0 .6rem' }}>Delivered through the 3i pathway</p>
                <ThreeI />
              </div>
            ) : null}
            {p.id === 'outcomes' ? (
              <p className="measure">These outcomes are the three pillars of the national vision.{' '}
                <Link className="inlink" to="/dira/pillars">See the Vision 2050 pillars →</Link></p>
            ) : null}
          </div>
        </Reveal>
      ))}

      <hr className="rule" />

      {flagship && (
        <Reveal as="section" className="cols">
          <div className="cols__label">Area {flagship.code}</div>
          <div className="stack">
            <h2 className="pa__name">{flagship.name}</h2>
            <p className="measure">{flagship.focus} Progress is tracked as a milestone pipeline, from preparation to operation.</p>
            <FlagshipPipeline stages={pipes(flagship.tracks)} />
          </div>
        </Reveal>
      )}

      <hr className="rule" />

      <Reveal as="section" className="cols">
        <div className="cols__label">How each area is assessed</div>
        <div className="stack">
          <p className="measure">Each area is run through a results matrix with three parts, so tracking is consistent across every institution.</p>
          <ol className="goals">
            {paComponents.map((c, i) => (
              <Reveal as="li" key={c.id} className="goal" delay={i * 70}>
                <span className="goal__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="goal__title">{c.name}</h3>
                  <p className="goal__desc">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <section className="pager">
        <Link className="pager__link" to="/framework/cycle">← Delivery cycle</Link>
        <Link className="pager__link pager__link--next" to="/framework/system">Delivery system →</Link>
      </section>
    </div>
  )
}
