import SubNav from '../components/SubNav.jsx'

const LINKS = [
  ['/comms', 'Overview', true],
  ['/comms/framework', 'Framework', false],
  ['/comms/messages', 'Messages', false],
  ['/comms/channels', 'Channels', false],
  ['/comms/data', 'Data', false],
]

export default function CommsNav() {
  return <SubNav label="Communication Strategy sections" links={LINKS} quiz={['/comms/quiz', 'Knowledge check']} />
}
