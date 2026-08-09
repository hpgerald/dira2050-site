import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle.js'

/*
  Reusable open-data + methodology page for a document section (Framework, FYDP,
  LTPP). English-only. Lists the section's CSVs for download, cites the source
  document, and states the aspirations-not-achievements honesty note.

  props:
    label, title, lead
    basePath  e.g. 'data/fydp/'
    files     array of [filename, description, rows]
    pdfUrl, pdfLabel
    note      the honesty / methodology paragraph
    backTo    path back to the section overview
*/
export default function DataTab({ label, title, lead, basePath, files, pdfUrl, pdfLabel, note, backTo }) {
  usePageTitle(title, lead)
  const base = import.meta.env.BASE_URL + basePath

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">{label}</div>
        <div>
          <h1>{title}</h1>
          <p className="measure">{lead}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <section className="cols">
        <div className="cols__label">Download the data</div>
        <div>
          <ul className="dllist">
            {files.map(([file, desc, rows]) => (
              <li key={file} className="dlrow">
                <a className="dlrow__file" href={`${base}${file}`} download>{file}</a>
                <span className="dlrow__desc">{desc}</span>
                <span className="dlrow__n">{rows != null ? `${rows} rows` : ''}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule" />

      <section className="cols">
        <div className="cols__label">Methodology and source</div>
        <div className="stack">
          <p className="measure">{note}</p>
          {pdfUrl && (
            <p><a className="btn btn--ghost" href={pdfUrl} target="_blank" rel="noopener noreferrer">{pdfLabel} ↗</a></p>
          )}
        </div>
      </section>

      <hr className="rule rule--strong" />
      <section className="pager">
        <Link className="pager__link" to={backTo}>← Overview</Link>
      </section>
    </div>
  )
}
