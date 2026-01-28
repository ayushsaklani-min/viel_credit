import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import BorrowerDashboard from './pages/BorrowerDashboard'
import LenderDashboard from './pages/LenderDashboard'
import FeaturesPage from './pages/FeaturesPage'
import FrequentlyAskedQuestions from './pages/FrequentlyAskedQuestions'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/borrower" replace />} />
          <Route path="/borrower" element={<BorrowerDashboard />} />
          <Route path="/lender" element={<LenderDashboard />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/faq" element={<FrequentlyAskedQuestions />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
