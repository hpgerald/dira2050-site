import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../useData.js'
import { useLang } from '../../i18n.jsx'
import { usePageTitle } from '../../usePageTitle.js'
import { ProSection } from '../components/primitives.jsx'
import Basis from '../../components/Basis.jsx'
import { buildIndex, assistant } from '../lib/assistant.js'

export default function ProAsk() {
  const { t } = useLang()
  usePageTitle(t('pro.ask.title'), t('pro.ask.lead'))
  const { data, loading } = useData()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([]) // [{ q, results }]

  const index = useMemo(() => (data ? buildIndex(data) : []), [data])

  function run(q) {
    const query = (q ?? input).trim()
    if (!query) return
    const { results } = assistant.answer(query, index)
    setHistory((h) => [{ q: query, results }, ...h])
    setInput('')
  }

  if (loading) return <ProSection><p>{t('common.loading')}</p></ProSection>
  const suggestions = t('pro.ask.suggestions')

  return (
    <ProSection h1 title={t('pro.ask.title')} lead={t('pro.ask.lead')}>
      <div className="pro-ask" style={{ marginTop: '1.5rem' }}>
        <form className="pro-ask__form" onSubmit={(e) => { e.preventDefault(); run() }}>
          <input className="pro-search" type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={t('pro.ask.placeholder')} aria-label={t('pro.ask.placeholder')} />
          <button className="pro-btn" type="submit">{t('pro.ask.ask')}</button>
        </form>
        <p className="pro-ask__privacy">{t('pro.ask.privacy')}</p>

        {history.length === 0 && (
          <div className="pro-ask__suggest">
            {suggestions.map((s) => (
              <button key={s} type="button" className="pro-facet" onClick={() => run(s)}>{s}</button>
            ))}
          </div>
        )}

        <div className="pro-ask__thread">
          {history.map((turn, i) => (
            <div key={i} className="pro-qa">
              <p className="pro-qa__q">{turn.q}</p>
              {turn.results.length === 0 ? (
                <p className="pro-qa__none">{t('pro.ask.noAnswer')}</p>
              ) : (
                <>
                  <p className="pro-qa__lead">{t('pro.ask.answerLead')}</p>
                  <div className="pro-qa__results">
                    {turn.results.map((r, j) => (
                      <article key={j} className="pro-qa__card">
                        <div className="pro-qa__top">
                          <span className="pro-qa__type">{t(`pro.ask.types.${r.type}`)}</span>
                          {r.basis && <Basis value={r.basis} />}
                        </div>
                        <p className="pro-qa__title">{r.title}</p>
                        {r.meta && <p className="pro-qa__meta">{r.meta}</p>}
                        {r.to && <Link className="pro-qa__open" to={r.to}>{t('pro.explore.open')} →</Link>}
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProSection>
  )
}
