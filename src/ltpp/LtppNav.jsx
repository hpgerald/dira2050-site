import SubNav from '../components/SubNav.jsx'

const LINKS = [
  ['/ltpp', 'Overview', true],
  ['/ltpp/roadmap', 'Roadmap', false],
  ['/ltpp/architecture', 'Architecture', false],
  ['/ltpp/financing', 'Financing', false],
  ['/ltpp/data', 'Data', false],
]

export default function LtppNav() {
  return <SubNav label="LTPP 2050 sections" links={LINKS} quiz={['/ltpp/quiz', 'Knowledge check']} />
}
