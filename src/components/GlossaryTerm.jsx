import { useState } from 'react'

/*
  GlossaryTerm — an inline term that reveals a plain-language definition on
  hover, keyboard focus, or tap. Implemented as a real <button> so it is
  keyboard-operable and screen-reader friendly; the tooltip is also shown via
  :hover / :focus-within in CSS for pointer and keyboard users.
*/
export default function GlossaryTerm({ term, definition }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="gterm">
      <button
        type="button"
        className="gterm__btn"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {term}
      </button>
      <span className="gterm__tip" role="tooltip">{definition || '—'}</span>
    </span>
  )
}
