import { useLang } from '../i18n.jsx'

// A small tag distinguishing what the document states from what we infer.
export default function Basis({ value }) {
  const { t } = useLang()
  const inferred = String(value).toLowerCase() === 'inferred'
  return (
    <span className={`basis ${inferred ? 'basis--inferred' : 'basis--doc'}`}
      title={inferred ? t('common.inferredTip') : t('common.documentedTip')}>
      {inferred ? t('common.inferred') : t('common.documented')}
    </span>
  )
}
