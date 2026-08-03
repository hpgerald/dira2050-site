import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import ProHome from './routes/ProHome.jsx'
import ProExplore from './routes/ProExplore.jsx'
import ProStory from './routes/ProStory.jsx'
import ProGraph from './routes/ProGraph.jsx'
import ProOpportunities from './routes/ProOpportunities.jsx'
import ProSkills from './routes/ProSkills.jsx'
import ProAudiences from './routes/ProAudiences.jsx'
import ProAudience from './routes/ProAudience.jsx'
import ProRegions from './routes/ProRegions.jsx'
import ProSectors from './routes/ProSectors.jsx'
import ProSector from './routes/ProSector.jsx'
import ProCharts from './routes/ProCharts.jsx'
import ProEvidence from './routes/ProEvidence.jsx'
import ProAsk from './routes/ProAsk.jsx'
import ProProgress from './routes/ProProgress.jsx'
import ProNav from './components/ProNav.jsx'
import { ScrollProgress } from './components/primitives.jsx'

/*
  PRO edition mount point. App.jsx routes /pro/* here; ProApp owns all PRO
  sub-routes so the existing site is untouched. The `.pro` wrapper scopes the
  editorial palette (see design/pro.css).
*/
export default function ProApp() {
  const { t } = useLang()
  const location = useLocation()
  const errorLabels = {
    badge: t('pro.error.badge'),
    title: t('pro.error.title'),
    body: t('pro.error.body'),
    retry: t('pro.error.retry'),
    home: t('pro.error.home'),
  }

  return (
    // MotionConfig honours the OS "reduce motion" setting for all framer-motion
    // animations in the PRO edition (reveals, scroll progress, transitions).
    <MotionConfig reducedMotion="user">
      <div className="pro">
        <ScrollProgress />
        <ProNav />
        {/* Keyed by path so a thrown route recovers on the next navigation. */}
        <ErrorBoundary key={location.pathname} labels={errorLabels}>
          <Routes>
            <Route index element={<ProHome />} />
            <Route path="explore" element={<ProExplore />} />
            <Route path="story/:kind/:id" element={<ProStory />} />
            <Route path="graph" element={<ProGraph />} />
            <Route path="opportunities" element={<ProOpportunities />} />
            <Route path="skills" element={<ProSkills />} />
            <Route path="for" element={<ProAudiences />} />
            <Route path="for/:id" element={<ProAudience />} />
            <Route path="regions" element={<ProRegions />} />
            <Route path="sectors" element={<ProSectors />} />
            <Route path="sectors/:id" element={<ProSector />} />
            <Route path="charts" element={<ProCharts />} />
            <Route path="evidence" element={<ProEvidence />} />
            <Route path="ask" element={<ProAsk />} />
            <Route path="progress" element={<ProProgress />} />
            <Route path="*" element={<ProHome />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </MotionConfig>
  )
}
