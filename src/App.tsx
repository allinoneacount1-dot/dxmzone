import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import DashboardPage from './components/Dashboard/DashboardPage'
import DexScanPage from './components/DexScan/DexScanPage'
import V17EnginePage from './components/V17Engine/V17EnginePage'
import SmartMoneyPage from './components/SmartMoney/SmartMoneyPage'
import TokensPage from './components/Tokens/TokensPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-text-primary flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dexscan" element={<DexScanPage />} />
            <Route path="/v17" element={<V17EnginePage />} />
            <Route path="/smart-money" element={<SmartMoneyPage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/lookup" element={<TokensPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
