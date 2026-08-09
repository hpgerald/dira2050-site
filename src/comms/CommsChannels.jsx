import { Link } from 'react-router-dom'
import { useComms, pipes } from './data.js'
import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'

export default function CommsChannels() {
  usePageTitle('Channels · Communication Strategy', 'From radio and barazas to social media: how the Vision reaches people.')
  const { data, loading } = useComms()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { channels } = data

  const groups = []
  const seen = {}
  channels.forEach((c) => {
    if (!seen[c.group]) { seen[c.group] = []; groups.push([c.group, seen[c.group]]) }
    seen[c.group].push(c)
  })

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">Channels</div>
        <div>
          <h1>Meeting people where they are</h1>
          <p className="lede measure">No single channel reaches everyone. The strategy blends traditional media, digital platforms and face-to-face community channels so the message finds every audience, in the language they use.</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      {groups.map(([group, rows], gi) => (
        <Reveal as="section" key={group} className="cols" delay={gi ? 30 : 0}>
          <div className="cols__label">{group}</div>
          <div>
            <ul className="meth">
              {rows.map((c) => (
                <li key={c.name} className="meth__row">
                  <div className="meth__head"><span className="meth__name">{c.name}</span></div>
                  <p className="meth__purpose">{c.reach}.</p>
                  <ul className="chiplist">
                    {pipes(c.uses).map((u) => <li key={u} className="chip chip--soft">{u}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Kiswahili first</div>
        <div className="stack">
          <p className="measure">The strategy makes Kiswahili the primary language of national communication, so that Dira 2050 speaks to citizens in the language they live in, complemented by local languages on community radio.</p>
          <p className="viz__note">A consistent brand and visual identity keeps Dira 2050 recognisable across every channel, from a national broadcast to a village noticeboard.</p>
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to="/comms/messages">← Messages &amp; audiences</Link>
        <Link className="pager__link pager__link--next" to="/comms/quiz">Knowledge check →</Link>
      </section>
    </div>
  )
}
