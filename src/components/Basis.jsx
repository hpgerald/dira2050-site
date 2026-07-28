// A small tag distinguishing what the document states from what we infer.
export default function Basis({ value }) {
  const inferred = String(value).toLowerCase() === 'inferred'
  return (
    <span className={`basis ${inferred ? 'basis--inferred' : 'basis--doc'}`}
      title={inferred ? 'Analytical inference drawn from the document' : 'Stated explicitly in the document'}>
      {inferred ? 'Inferred' : 'Documented'}
    </span>
  )
}
