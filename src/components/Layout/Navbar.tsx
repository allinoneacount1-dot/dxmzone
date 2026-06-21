import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

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

  const currentTab = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className="sticky top-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border"
    >
      <div className="flex items-center justify-between px-4 lg:px-8 h-14 lg:h-16 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
              <span className="text-accent font-display font-bold text-sm">D</span>
            </div>
            <span className="font-label font-semibold text-sm tracking-tight text-white">DXM</span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { navigate(tab.id === 'dashboard' ? '/' : `/${tab.id}`); setMobileOpen(false) }}
                className="relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200"
              >
                <span className={currentTab === tab.id ? 'text-accent' : 'text-text-muted hover:text-text-secondary'}>
                  {tab.label}
                </span>
                {currentTab === tab.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button className="px-3 py-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors font-label">
            API
          </button>
          <button className="px-4 py-1.5 text-xs font-semibold text-bg bg-accent rounded-lg hover:bg-accent-hover transition-all duration-200 active:scale-[0.97] font-label">
            Connect
          </button>
        </div>

        <button
          className="lg:hidden text-text-muted hover:text-white p-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:hidden border-t border-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { navigate(tab.id === 'dashboard' ? '/' : `/${tab.id}`); setMobileOpen(false) }}
                  className={`w-full px-3 py-2.5 text-sm font-medium rounded-lg text-left transition-colors ${
                    currentTab === tab.id ? 'text-accent bg-accent-dim' : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <hr className="border-border my-2" />
              <button className="w-full px-3 py-2.5 text-sm text-text-muted hover:text-text-secondary text-left">API</button>
              <button className="w-full px-3 py-2.5 text-sm font-semibold text-bg bg-accent rounded-lg text-center mt-1">Connect</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
