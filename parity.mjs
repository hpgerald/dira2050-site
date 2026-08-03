import S from './src/strings.js'
const { en, sw } = S
function keys(o, p='') {
  const out = []
  for (const k of Object.keys(o)) {
    const v = o[k]; const kp = p ? p+'.'+k : k
    if (v && typeof v === 'object' && !Array.isArray(v)) out.push(...keys(v, kp))
    else out.push(kp)
  }
  return out
}
const ke = new Set(keys(en)), ks = new Set(keys(sw))
const missSw = [...ke].filter(k => !ks.has(k))
const missEn = [...ks].filter(k => !ke.has(k))
console.log('EN keys:', ke.size, 'SW keys:', ks.size)
console.log('Missing in SW:', missSw.length ? missSw : 'none')
console.log('Missing in EN:', missEn.length ? missEn : 'none')
