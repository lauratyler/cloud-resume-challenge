import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { getVisitorCount, updateVisitorCount } from './services/api'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
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
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/about" element={<AboutPage />}/>
            </Routes>
        </Router>
    }
  </MantineProvider>

}

export default App
