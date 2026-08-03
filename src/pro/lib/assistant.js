/*
  Client-side retrieval assistant. Builds a lightweight index over every dataset
  and ranks records by term overlap - no external calls, fully private. The
  `assistant` object is an adapter: swap `answer()` for a real LLM backend later
  without changing the UI (keep the { results } shape, add { text } if generating).
*/

export function buildIndex(data) {
  const rec = []
  const add = (o) => rec.push(o)
  ;(data.pillars || []).forEach((p) => add({ type: 'pillar', title: p.name, text: `${p.name} ${p.summary}`, meta: p.summary, to: `/pro/story/pillar/${p.id}` }))
  ;(data.enablers || []).forEach((d) => add({ type: 'driver', title: d.name, text: `${d.name} ${d.summary}`, meta: d.summary, to: `/pro/story/driver/${d.id}` }))
  ;(data.foundation || []).forEach((f) => add({ type: 'foundation', title: f.name, text: `${f.name} ${f.description}`, meta: f.description, to: '/pro/explore' }))
  ;(data.targets || []).forEach((t) => add({ type: 'target', title: t.indicator, text: `${t.indicator} ${t.plain_language || ''} ${t.unit || ''}`, meta: t.plain_language, to: '/targets' }))
  ;(data.sectors || []).forEach((s) => add({ type: 'sector', title: s.name, text: `${s.name} ${s.current_contribution} ${s.vision_2050}`, meta: s.vision_2050, to: `/pro/sectors/${s.id}` }))
  ;(data.aspirations || []).forEach((a) => add({ type: 'driver', title: a.text.slice(0, 64), text: a.text, meta: a.text, to: `/pro/story/driver/${a.enabler_id}` }))
  ;(data.glossary || []).forEach((g) => add({ type: 'glossary', title: g.term, text: `${g.term} ${g.plain_definition}`, meta: g.plain_definition, to: null }))
  ;(data.intelOpportunities || []).forEach((o) => add({ type: 'opportunity', title: o.title, text: `${o.title} ${o.description} ${o.who}`, meta: o.description, basis: o.basis, to: '/pro/opportunities' }))
  ;(data.intelSkills || []).forEach((s) => add({ type: 'skill', title: s.skill, text: `${s.skill} ${s.why_matters} ${s.where_in_strategy}`, meta: s.why_matters, basis: s.basis, to: '/pro/skills' }))
  ;(data.intelStrategic || []).forEach((s) => add({ type: 'strategic', title: s.insight.slice(0, 64), text: s.insight, meta: s.insight, basis: s.basis, to: '/pro/explore' }))
  ;(data.intelAudiences || []).forEach((a) => add({ type: 'audience', title: a.audience, text: `${a.audience} ${a.why}`, meta: a.why, to: `/pro/for/${a.id}` }))
  ;(data.regions || []).forEach((r) => add({ type: 'region', title: r.name, text: `${r.name} ${r.summary}`, meta: r.summary, to: '/pro/regions' }))
  return rec
}

const STOP = new Set(['the', 'a', 'an', 'of', 'to', 'in', 'for', 'and', 'is', 'are', 'what', 'which', 'how', 'on', 'by', 'with', 'does', 'do',
  'ya', 'na', 'wa', 'za', 'ni', 'katika', 'kwa', 'la', 'kwenye', 'ipi', 'zipi', 'nini', 'gani'])
const toks = (s) => String(s).toLowerCase().split(/[^a-z0-9À-ɏ]+/).filter((w) => w.length > 2 && !STOP.has(w))

export function search(index, query, n = 6) {
  const q = toks(query)
  if (!q.length) return []
  return index
    .map((r) => {
      const body = r._t || (r._t = toks(r.text))
      const title = r._ti || (r._ti = new Set(toks(r.title)))
      let score = 0
      q.forEach((w) => {
        score += body.filter((x) => x === w).length
        if (title.has(w)) score += 3
      })
      return { r, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.r)
}

// Adapter - default local backend. A future LLM backend would implement answer().
export const assistant = {
  name: 'local',
  answer(query, index) {
    return { results: search(index, query) }
  },
}
