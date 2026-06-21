import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Scan } from 'lucide-react'

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'dexscan', label: 'DexScan' },
  { id: 'v17', label: 'V17 Engine' },
  { id: 'smart-money', label: 'Smart Money' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'lookup', label: 'Lookup' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentTab = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-bg/90 backdrop-blur-lg border-b border-border' : 'bg-bg'
      }`}
    >
      <div className="flex items-center justify-between px-4 lg:px-6 h-14 lg:h-16 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 shrink-0">
            <Scan size={20} className="text-accent" />
            <span className="font-bold text-base tracking-tight text-white">DXM Zone</span>
          </button>

          <div className="hidden lg:flex items-center gap-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { navigate(tab.id === 'dashboard' ? '/' : `/${tab.id}`); setMobileOpen(false) }}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  currentTab === tab.id
                    ? 'text-white bg-accent/10'
                    : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button className="px-3.5 py-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors">
            API
          </button>
          <button className="px-3.5 py-1.5 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors">
            Connect Wallet
          </button>
        </div>

        <button
          className="lg:hidden text-text-muted hover:text-white p-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border px-4 py-3 bg-bg/95 backdrop-blur-lg">
          <div className="flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { navigate(tab.id === 'dashboard' ? '/' : `/${tab.id}`); setMobileOpen(false) }}
                className={`px-3 py-2.5 text-sm font-medium rounded-lg text-left transition-colors ${
                  currentTab === tab.id ? 'text-white bg-accent/10' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <hr className="border-border my-2" />
            <button className="px-3 py-2.5 text-sm text-text-muted hover:text-text-secondary text-left">API</button>
            <button className="px-3 py-2.5 text-sm font-medium text-white bg-accent rounded-lg text-center mt-1">Connect Wallet</button>
          </div>
        </div>
      )}
    </header>
  )
}
