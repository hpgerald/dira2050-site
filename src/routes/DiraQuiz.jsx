import { usePageTitle } from '../usePageTitle.js'
import Reveal from '../components/Reveal.jsx'
import { useLang } from '../i18n.jsx'
import Quiz from '../components/Quiz.jsx'
import { QUIZ } from '../data/diraQuiz.js'

export default function DiraQuiz() {
  const { lang, t } = useLang()
  usePageTitle(t('quiz.title'), t('quiz.lead'))
  const set = QUIZ[lang] || QUIZ.en

  return (
    <div className="container section stack">
      <Reveal as="section" className="cols">
        <div className="cols__label">{t('quiz.label')}</div>
        <div>
          <h1>{t('quiz.title')}</h1>
          <p className="lede measure">{t('quiz.lead')}</p>
        </div>
      </Reveal>

      <hr className="rule rule--strong" />

      <Quiz questions={set.questions} ratings={set.ratings} ui={set.ui} backTo="/dira" backLabel={t('quiz.back')} />
    </div>
  )
}
