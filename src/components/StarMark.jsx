// Brand mark - a simple solid square. In a monochrome editorial system the
// wordmark carries the identity; the mark is just a typographic bullet.
export default function StarMark({ size = 12, className = '', color = 'currentColor' }) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-block', width: size, height: size, background: color, verticalAlign: 'baseline' }}
    />
  )
}
