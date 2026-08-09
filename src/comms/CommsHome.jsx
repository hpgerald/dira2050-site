import { Link } from 'react-router-dom'
import { useComms } from './data.js'
import Reveal from '../components/Reveal.jsx'

const EXPLORE = [
  { to: '/comms/framework', n: '01', name: 'The framework', desc: 'Five strategic pillars, the objectives, themes and guiding principles behind them.' },
  { to: '/comms/messages', n: '02', name: 'Messages & audiences', desc: 'The core messages, and the audiences they are tailored for.' },
  { to: '/comms/channels', n: '03', name: 'Channels', desc: 'From radio and barazas to social media: how the Vision reaches people.' },
]

export default function CommsHome() {
  const { data, loading } = useComms()
  if (loading) return <div className="container section"><p>Loading…</p></div>
  const { pillars } = data

  return (
    <div className="container section stack">
      <section className="hero hero--flush">
        <Reveal as="p" className="cols__label">President’s Office · Planning and Investment · National Planning Commission</Reveal>
        <Reveal as="h1" className="hero__title" delay={80}>Reaching every citizen</Reveal>
        <Reveal as="p" className="hero__lead" delay={160}>A plan is only as strong as the people behind it. The Communication Strategy sets out how Dira 2050 is explained, shared and owned, from the national broadcast to the village baraza.</Reveal>
        <Reveal className="hero__cta" delay={240}>
          <Link className="btn" to="/comms/framework">See the framework</Link>
          <Link className="btn btn--ghost" to="/dira">Explore Vision 2050</Link>
        </Reveal>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Communication vision</div>
        <div className="stack">
          <Reveal as="p" className="lede measure">To establish an informed, engaged, inclusive and participatory society that actively contributes to the realisation of Tanzania Development Vision 2050.</Reveal>
          <Reveal as="p" className="viz__note">Its mission: to provide coordinated, inclusive, innovative and effective communication that promotes awareness, participation, transparency and national ownership of Dira 2050.</Reveal>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">The five pillars</div>
        <div>
          <p className="measure">The strategy stands on five pillars, each tied to a behavioural outcome.</p>
          <ul className="deflist">
            {pillars.map((p) => (
              <li key={p.id}><strong>{p.name}.</strong> {p.outcome}.</li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Explore</div>
        <div>
          <ul className="index">
            {EXPLORE.map((e, i) => (
              <Reveal as="li" key={e.to} className="index__row" delay={i * 60}>
                <Link className="index__link" to={e.to}>
                  <span className="index__num">{e.n}</span>
                  <span>
                    <span className="index__name">{e.name}</span>
                    <span className="index__desc">{e.desc}</span>
                  </span>
                  <span className="index__arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">This platform is part of it</div>
        <div className="stack">
          <p className="lede measure">This site is itself a small piece of the strategy in action.</p>
          <p className="measure">It is an independent, citizen-facing effort that does what the strategy asks: it simplifies complex national plans into clear, relatable language (the first pillar), it is digital-first and mobile-friendly (the sixth objective, on digital engagement and online visibility), it is bilingual in Kiswahili and English, and it publishes every figure openly with its source page, in the spirit of accessibility, transparency and accuracy. It is not an official government channel, but it shares the strategy's goal: an informed, engaged and participatory public that owns Dira 2050.</p>
          <ul className="chiplist">
            <li className="chip chip--soft">Public awareness and education</li>
            <li className="chip chip--soft">Digital communication</li>
            <li className="chip chip--soft">Plain language</li>
            <li className="chip chip--soft">Kiswahili and English</li>
            <li className="chip chip--soft">Open data</li>
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">How it connects</div>
        <div className="stack">
          <p className="measure">The Communication Strategy is the companion to the plans: it carries Vision 2050 and its five-year plans to the public, and brings citizens' voices back into implementation.</p>
          <p>
            <Link className="btn" to="/dira">Vision 2050</Link>{' '}
            <Link className="btn btn--ghost" to="/fydp">FYDP IV</Link>{' '}
            <Link className="btn btn--ghost" to="/ltpp">The 25-year plan</Link>
          </p>
          <p className="viz__note" style={{ marginTop: '1rem' }}>Source: Dira 2050 Communication Strategy 2026/27 to 2030/31. United Republic of Tanzania, National Planning Commission.</p>
        </div>
      </section>
    </div>
  )
}
