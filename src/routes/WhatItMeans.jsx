import { useData } from '../useData.js'
import GlossaryTerm from '../components/GlossaryTerm.jsx'
import StrategicIntelligence from '../components/StrategicIntelligence.jsx'
import { usePageTitle } from '../usePageTitle.js'

export default function WhatItMeans() {
  usePageTitle('What it means for you', 'What Tanzania Development Vision 2050 means for your everyday life — and the opportunities, skills and strategic intelligence it holds for citizens, students, businesses, investors and more.')
  const { data, loading, error } = useData()
  if (loading) return <p className="container section">Loading…</p>
  if (error) return <p className="container section" role="alert">Could not load data.</p>

  const gloss = Object.fromEntries(data.glossary.map((g) => [g.term, g.plain_definition]))
  const G = (term, label) => <GlossaryTerm term={label || term} definition={gloss[term]} />

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">For you</div>
        <div>
          <h1>What does Dira 2050 mean for your life?</h1>
          <p className="measure">Big national targets are really promises about everyday things — your income, your
          lights, your water, your children's school. Here's what the Vision is reaching for, in plain terms.
          Tap any <em>underlined word</em> for a quick explanation.</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="fy">
        <div className="fy__num">01</div>
        <div className="fy__body">
          <h2>More money in your pocket</h2>
          <p>The plan aims to lift {G('GDP per capita', 'average income per person')} to about US$7,000 a year —
          more than five times what it was in 2023. It wants at least half of all Tanzanians in decent, formal jobs,
          and {G('Extreme poverty', 'extreme poverty')} gone for good.</p>
        </div>
      </section>

      <hr className="rule" />

      <section className="fy">
        <div className="fy__num">02</div>
        <div className="fy__body">
          <h2>Power you can count on</h2>
          <p>Today the average person uses only about 170 {G('kWh')} of electricity a year. By 2050 the goal is at
          least 3,000 — enough for reliable light, appliances and small businesses — with fewer outages as
          transmission losses are cut below 10%.</p>
        </div>
      </section>

      <hr className="rule" />

      <section className="fy">
        <div className="fy__num">03</div>
        <div className="fy__body">
          <h2>Clean water and better health</h2>
          <p>The Vision promises safe, clean water for everyone, {G('Universal health coverage', 'health coverage for all')},
          and a longer life — an average of 75 years. It aims to end deaths of mothers and babies during childbirth
          (today {G('Maternal mortality', 'maternal deaths')} stand at 104 per 100,000 births, down from 750 in 2000).</p>
        </div>
      </section>

      <hr className="rule" />

      <section className="fy">
        <div className="fy__num">04</div>
        <div className="fy__body">
          <h2>School and skills for your children</h2>
          <p>Every child should get quality education from early childhood upward, with a strong push on
          {' '}{G('STEM')} skills. At least one in four young people should reach higher education with skills the job
          market actually needs.</p>
        </div>
      </section>

      <hr className="rule" />

      <section className="fy">
        <div className="fy__num">05</div>
        <div className="fy__body">
          <h2>Getting online</h2>
          <p>The plan wants at least 70% of citizens to have {G('Digital literacy', 'digital skills')} and more than
          80% of government services available online — so paying, applying and registering means fewer queues and
          less travel.</p>
        </div>
      </section>

      <hr className="rule" />

      <section className="fy">
        <div className="fy__num">06</div>
        <div className="fy__body">
          <h2>A fair shot for everyone</h2>
          <p>Growth is meant to be inclusive. The Vision singles out women, youth and persons with disabilities, aims
          to cut the gender gap by at least 85%, and wants Tanzania to reach {G('Upper-middle-income country', 'upper-middle-income status')}
          {' '}without leaving anyone behind.</p>
        </div>
      </section>

      <StrategicIntelligence data={data} />
    </div>
  )
}
