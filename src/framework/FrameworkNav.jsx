import SubNav from '../components/SubNav.jsx'

const LINKS = [
  ['/framework', 'Overview', true],
  ['/framework/cycle', 'Delivery cycle', false],
  ['/framework/priority-areas', 'Priority areas', false],
  ['/framework/system', 'Delivery system', false],
  ['/framework/data', 'Data', false],
]

export default function FrameworkNav() {
  return <SubNav label="Framework sections" links={LINKS} quiz={['/framework/quiz', 'Knowledge check']} />
}
