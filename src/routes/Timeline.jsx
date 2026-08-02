import { useData } from '../useData.js'
import { usePageTitle } from '../usePageTitle.js'
import { useLang } from '../i18n.jsx'

export default function Timeline() {
  const { t } = useLang()
  usePageTitle(t('timeline.label'), t('timeline.intro'))
  const { data, loading, error } = useData()
  if (loading) return <p className="container section">{t('common.loading')}</p>
  if (error) return <p className="container section" role="alert">{t('common.error')}</p>

  const items = [...data.milestones].sort((a, b) => a.year - b.year)

  return (
    <div className="container section stack">
      <div className="cols">
        <div className="cols__label">{t('timeline.label')}</div>
        <div>
          <h1>{t('timeline.title')}</h1>
          <p className="measure">{t('timeline.intro')}</p>
        </div>
      </div>

      <hr className="rule rule--strong" />

      <ol className="timeline">
        {items.map((m) => (
          <li key={`${m.year}-${m.title}`} className="tline">
            <div className="tline__year">{m.year}</div>
            <div className="tline__body">
              <span className="tline__phase">{m.phase}</span>
              <h3 className="tline__title">{m.title}</h3>
              <p className="tline__desc">{m.description}</p>
              {m.source_page && <p className="tline__src">{t('common.sourceCite')}{m.source_page}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
