import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import EkathonPage from './pages/EkathonPage'
import AchievementsPage from './pages/AchievementsPage'
import FeedbackPage from './pages/FeedbackPage'
import AboutPage from './pages/AboutPage'
import ResourcesPage from './pages/ResourcesPage'
import ContributorsPage from './pages/ContributorsPage'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (minimum 2 seconds for nice animation)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <div className="min-h-screen bg-slate-950">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/ekathon" element={<EkathonPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/contributors" element={<ContributorsPage />} />
            </Routes>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </Router>
  )
}

export default App
