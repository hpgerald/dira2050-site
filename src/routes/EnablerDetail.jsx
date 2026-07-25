import { useParams, Link } from 'react-router-dom'
import { useData } from '../useData.js'
import { getEnablers, getEnabler, targetsForEnabler, aspirationsForEnabler } from '../lib/data.js'
import TargetList from '../components/TargetList.jsx'
import NotFound from './NotFound.jsx'
import { usePageTitle } from '../usePageTitle.js'

export default function EnablerDetail() {
  const { id } = useParams()
  const { data, loading, error } = useData()
  const enabler = data ? getEnabler(data, id) : null
  usePageTitle(enabler ? enabler.name : 'Driver')
  if (loading) return <p className="container section">Loading…</p>
  if (error) return <p className="container section" role="alert">Could not load data.</p>
  if (!enabler) return <NotFound />

  const all = getEnablers(data)
  const idx = all.findIndex((e) => e.id === id)
  const prev = all[idx - 1]
  const next = all[idx + 1]
  const targets = targetsForEnabler(data, id)
  const aspirations = aspirationsForEnabler(data, id)

  return (
    <article className="container section stack">
      <p className="eyebrow"><Link to="/pillars">Drivers</Link> · Driver {idx + 1} of {all.length}</p>
      <div className="cols">
        <div className="cols__label">Driver {String(idx + 1).padStart(2, '0')}</div>
        <div>
          <h1>{enabler.name}</h1>
          <p className="lede measure">{enabler.summary}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      {targets.length > 0 && (
        <>
          <section className="cols">
            <div className="cols__label">Targets · by 2050</div>
            <div><TargetList targets={targets} /></div>
          </section>
          <hr className="rule" />
        </>
      )}

      <section className="cols">
        <div className="cols__label">Aspirations</div>
        <div>
          <p className="measure">What Tanzania wants this driver to look like by 2050.</p>
          <ol className="asp">
            {aspirations.map((a) => (
              <li key={a.letter} className="asp__item"><span className="asp__mark">{a.letter}</span><span>{a.text}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <hr className="rule" />

      <nav className="pager">
        {prev ? <Link className="pager__link" to={`/enablers/${prev.id}`}>← {prev.name}</Link> : <span />}
        {next ? <Link className="pager__link pager__link--next" to={`/enablers/${next.id}`}>{next.name} →</Link> : <span />}
      </nav>
    </article>
  )
}
