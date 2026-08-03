import { Component } from 'react'
import { Link } from 'react-router-dom'

/*
  Class error boundary for the PRO edition. If any PRO route throws while
  rendering, we catch it here instead of blanking the whole app, and show a
  bilingual recovery panel. Labels are passed in as props (from strings.js via
  the wrapper below) so the fallback stays translated.
*/
class Boundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Surface in the console for diagnostics; no external reporting.
    // eslint-disable-next-line no-console
    console.error('PRO route error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      const { labels } = this.props
      return (
        <div className="pro-error" role="alert">
          <div className="pro__wrap">
            <p className="pro-section__eyebrow">{labels.badge}</p>
            <h1 className="pro-section__title">{labels.title}</h1>
            <p className="pro-section__lead">{labels.body}</p>
            <p style={{ marginTop: '1.5rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <button className="pro-btn" type="button" onClick={() => this.setState({ hasError: false })}>
                {labels.retry}
              </button>
              <Link className="pro-btn pro-btn--ghost" to="/pro">{labels.home} →</Link>
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default Boundary
