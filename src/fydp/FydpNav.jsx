import SubNav from '../components/SubNav.jsx'

const LINKS = [
  ['/fydp', 'Overview', true],
  ['/fydp/economy', 'Economy', false],
  ['/fydp/sectors', 'Pathways', false],
  ['/fydp/financing', 'Financing', false],
  ['/fydp/flagships', 'Flagships', false],
  ['/fydp/risks', 'Risks', false],
  ['/fydp/data', 'Data', false],
]

export default function FydpNav() {
  return <SubNav label="FYDP IV sections" links={LINKS} quiz={['/fydp/quiz', 'Knowledge check']} />
}
