import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {useEffect, useState} from 'react'
import { getVisitorCount, updateVisitorCount } from './services/api'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ResumePage from './pages/ResumePage'
import Menu from './components/ui/Menu'
import {VisitorCountContext} from './components/contexts/VisitorCountContext.tsx'
import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'

function App() {
  const [visitorCount, setVisitorCount] = useState(0)
  useEffect(() => {
      const fetchCount = async () => {
          const updatedVisitCount = sessionStorage.getItem('visit-count')
          if (!updatedVisitCount) {
              await updateVisitorCount()
              sessionStorage.setItem('visit-count', 'true')
          }
          const currentCount = await getVisitorCount()
          setVisitorCount(currentCount)
      }

      fetchCount()

      const interval = setInterval(async () => {
          const count = await getVisitorCount()
          setVisitorCount(count)
      }, 30000)

      return () => clearInterval(interval)
  }, [])

  return <MantineProvider>
    {
        <VisitorCountContext.Provider value={visitorCount}>
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
        </VisitorCountContext.Provider>
    }
  </MantineProvider>

}

export default App
