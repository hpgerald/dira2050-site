import { Link } from 'react-router-dom'

/*
  DriverIndex - the navigation "hub", styled after editorial index tables
  (Pentagram-style): a numbered list where each row is a large type target
  that inverts to black-on-white on hover/focus. Replaces the earlier star.

  Reused for Drivers and (with `basePath`) any indexed collection.
  `items` = [{ id, name, summary }]. Renders as links when `basePath` given,
  otherwise as buttons calling `onSelect`.
*/
export default function DriverIndex({ items = [], basePath, onSelect, ariaLabel = 'Index' }) {
  return (
    <ol className="index" aria-label={ariaLabel}>
      {items.map((it, i) => {
        const num = String(i + 1).padStart(2, '0')
        const inner = (
          <>
            <span className="index__num">{num}</span>
            <span className="index__body">
              <span className="index__name">{it.name}</span>
              {it.summary && <span className="index__desc">{it.summary}</span>}
            </span>
            <span className="index__arrow" aria-hidden="true">→</span>
          </>
        )
        return (
          <li key={it.id} className="index__row">
            {basePath ? (
              <Link className="index__link" to={`${basePath}/${it.id}`}>{inner}</Link>
            ) : (
              <button className="index__link" type="button" onClick={() => onSelect?.(it.id)}>{inner}</button>
            )}
          </li>
        )
      })}
    </ol>
  )
}
