import DataTab from '../components/DataTab.jsx'

const FILES = [
  ['targets.csv', 'Headline 2030/31 targets', 4],
  ['macro.csv', 'Macroeconomic trajectory', 4],
  ['pathways.csv', 'All 48 strategic pathways', 48],
  ['pathway_kpis.csv', 'Baseline and target KPIs for every pathway', 234],
  ['reforms.csv', 'The reform tracks', 6],
  ['flagships.csv', 'The seven flagship programmes', 7],
  ['financing.csv', 'The financing envelope by source', 3],
  ['allocation.csv', 'Investment demand by sector cluster', 11],
  ['instruments.csv', 'Innovative financing instruments', 12],
  ['private_strategy.csv', 'How private capital is drawn in', 9],
  ['psc_reforms.csv', 'Public-corporation reform targets', 5],
  ['risks.csv', 'The risk register and mitigations', 8],
]

export default function FydpData() {
  return (
    <DataTab
      label="Data and methodology"
      title="The FYDP IV data, open"
      lead="Every figure on this site is drawn from the Fourth Five-Year Development Plan and carries its source page. The datasets are plain CSVs you can download and reuse."
      basePath="data/fydp/"
      files={FILES}
      pdfUrl={`${import.meta.env.BASE_URL}docs/fydp-iv.pdf`}
      pdfLabel="The FYDP IV document (PDF)"
      note="These datasets were extracted from the official Fourth Five-Year Development Plan 2026/27 to 2030/31 (United Republic of Tanzania, National Planning Commission). Where a target was not set in the document, it is shown as such rather than estimated. Targets are the plan's intentions, not achievements."
      backTo="/fydp"
    />
  )
}
