import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container section">
      <span className="eyebrow">404</span>
      <h1>Page not found.</h1>
      <p>The page you're looking for doesn't exist. <Link to="/">Return home</Link>.</p>
    </div>
  )
}
