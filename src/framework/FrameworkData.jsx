import DataTab from '../components/DataTab.jsx'

const FILES = [
  ['plans.csv', 'The plans the framework governs', 7],
  ['alignment.csv', 'How the plans align', 5],
  ['cycle.csv', 'The delivery cycle steps', 3],
  ['priority_areas.csv', 'The national priority areas', 4],
  ['pa_components.csv', 'Priority-area components', 3],
  ['institutions.csv', 'The delivery institutions', 7],
  ['scoring.csv', 'The delivery scoring bands', 4],
  ['methods.csv', 'Monitoring and evaluation methods', 5],
  ['signals.csv', 'Digital intelligence signals', 5],
  ['escalation.csv', 'The escalation ladder', 3],
  ['principles.csv', 'Guiding delivery principles', 5],
  ['shift.csv', 'The old way vs the new way', 5],
]

export default function FrameworkData() {
  return (
    <DataTab
      label="Data and methodology"
      title="The framework data, open"
      lead="The datasets behind the National Delivery Framework section, drawn from the official document and downloadable as plain CSVs."
      basePath="data/framework/"
      files={FILES}
      pdfUrl={`${import.meta.env.BASE_URL}docs/national-framework.pdf`}
      pdfLabel="The National Framework document (PDF)"
      note="These datasets were extracted from the official National Delivery Framework (United Republic of Tanzania, National Planning Commission). Content is a plain-language rendering of the document; where analysis was inferred rather than stated, it is labelled as such elsewhere on the site."
      backTo="/framework"
    />
  )
}
