import DataTab from '../components/DataTab.jsx'

const FILES = [
  ['targets.csv', 'The headline 2050 aims', 4],
  ['levels.csv', 'The four architecture levels', 4],
  ['threei.csv', 'The 3i strategy', 3],
  ['roadmap.csv', 'The five five-year plans', 5],
  ['toc.csv', 'The theory of change', 5],
  ['financing.csv', 'The financing sources', 3],
  ['structural.csv', 'Projected 2050 GDP composition', 3],
]

export default function LtppData() {
  return (
    <DataTab
      label="Data and methodology"
      title="The LTPP data, open"
      lead="The datasets behind the Long-Term Perspective Plan section, downloadable as plain CSVs, each figure tied to its source page."
      basePath="data/ltpp/"
      files={FILES}
      pdfUrl={`${import.meta.env.BASE_URL}docs/ltpp-2050.pdf`}
      pdfLabel="The LTPP 2050 document (PDF)"
      note="These datasets were extracted from the official Long-Term Perspective Plan 2026/27 to 2050/51 (United Republic of Tanzania, National Planning Commission). The document's text is presented as a scanned, custom-font PDF, so the content here was read using optical character recognition and checked against the figures; targets are the plan's intentions, not achievements."
      backTo="/ltpp"
    />
  )
}
