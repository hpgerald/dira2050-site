import { Link } from 'react-router-dom'
import { ProSection, Reveal } from './primitives.jsx'

/*
  StoryTemplate - the reusable interactive-story engine (Phase 4).
  Given a header and an ordered list of blocks, it renders a cinematic,
  scroll-revealed story. Any PRO module can feed it different blocks.

  props:
    badge, title, summary       - header
    fullPageTo, fullPageLabel    - optional link to a canonical page
    blocks = [{ label, node, variant }]  - ordered story sections
*/
export default function StoryTemplate({ badge, title, summary, fullPageTo, fullPageLabel, blocks = [] }) {
  return (
    <>
      <ProSection variant="night">
        <Reveal>
          {badge && <p className="pro-section__eyebrow">{badge}</p>}
          <h1 className="pro-section__title" style={{ maxWidth: '20ch' }}>{title}</h1>
          {summary && <p className="pro-section__lead">{summary}</p>}
          {fullPageTo && (
            <p style={{ marginTop: '1.4rem' }}>
              <Link className="pro-btn" to={fullPageTo}>{fullPageLabel} →</Link>
            </p>
          )}
        </Reveal>
      </ProSection>

      {blocks.map((b, i) => (
        <ProSection key={i} variant={b.variant} eyebrow={b.label}>
          <div className="pro__narrow" style={{ marginTop: '1.5rem' }}>
            <Reveal>{b.node}</Reveal>
          </div>
        </ProSection>
      ))}
    </>
  )
}
