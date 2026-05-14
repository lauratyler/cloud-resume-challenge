import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { getVisitorCount, updateVisitorCount } from './services/api'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

function App() {
  useEffect(() => {
      const fetchCount = async () => {
          const updatedVisitCount = sessionStorage.getItem('visit-count')
          if (!updatedVisitCount) {
              await updateVisitorCount()
              sessionStorage.setItem('visit-count', 'true')
          }
          await getVisitorCount()
      }

      fetchCount()
  }, [])

  return (
      <>
          <Router>
              <Routes>
                  <Route path="/" element={<HomePage />}/>
                  <Route path="/about" element={<AboutPage />}/>
              </Routes>
          </Router>
      </>
  )
}

export default App
