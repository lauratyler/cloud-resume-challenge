import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { getVisitorCount, updateVisitorCount } from './services/api'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ResumePage from './pages/ResumePage'
import Menu from './components/ui/Menu'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

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

  return <MantineProvider>
    {
        <div className="app-layout">
            <Router>
                <Menu/>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/about" element={<AboutPage />}/>
                        <Route path="/resume" element={<ResumePage />}/>
                    </Routes>
                </div>
            </Router>
        </div>
    }
  </MantineProvider>

}

export default App
