import { Link } from 'react-router-dom'
import { useLang } from '../../i18n.jsx'

// Reusable provenance chip - links any figure to the Evidence & Method page.
export default function Evidence({ page, dataset }) {
  const { t } = useLang()
  return (
    <Link className="pro-evchip" to="/pro/evidence">
      {t('common.sourceCite')}{page}{dataset ? ` · ${dataset}` : ''}
    </Link>
  )
}
