import DataTab from '../components/DataTab.jsx'

const FILES = [
  ['pillars.csv', 'The five strategic pillars', 5],
  ['objectives.csv', 'The communication objectives', 6],
  ['themes.csv', 'The communication themes', 10],
  ['principles.csv', 'The guiding principles', 10],
  ['messages.csv', 'The core key messages', 6],
  ['audiences.csv', 'Audience segments and goals', 6],
  ['channels.csv', 'Communication channels and their uses', 8],
]

export default function CommsData() {
  return (
    <DataTab
      label="Data and methodology"
      title="The Communication Strategy data, open"
      lead="The datasets behind the Communication Strategy section, drawn from the official document and downloadable as plain CSVs, each tied to its source page."
      basePath="data/comms/"
      files={FILES}
      pdfUrl={`${import.meta.env.BASE_URL}docs/comms-strategy.pdf`}
      pdfLabel="The Communication Strategy document (PDF)"
      note="These datasets were extracted from the official Dira 2050 Communication Strategy 2026/27 to 2030/31 (United Republic of Tanzania, National Planning Commission). Content is a plain-language rendering of the document; it describes intentions and approaches, not outcomes already achieved."
      backTo="/comms"
    />
  )
}
