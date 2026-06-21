import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Coins, Activity, Zap, Play, Square, Clock, Filter, TrendingUp } from 'lucide-react'

const initialStats = [
  { label: 'Active Boosts', value: '0', change: '+0%', icon: BarChart3 },
  { label: 'New Tokens', value: '0', change: '+0%', icon: Coins },
  { label: 'Total Scans', value: '0', change: '', icon: Activity },
  { label: 'Status', value: 'Idle', change: '', icon: Zap },
]

const mockTokens = [
  { id: 1, name: 'Boost Token', symbol: 'BOOST', price: '$0.00001234', h1: '+12.4%', h24: '+45.2%', mcap: '$123K', volume: '$45K', security: 'SAFE' as const, h1Up: true, h24Up: true },
  { id: 2, name: 'Moon Shot', symbol: 'MOON', price: '$0.00005678', h1: '-3.2%', h24: '+22.1%', mcap: '$567K', volume: '$89K', security: 'WARN' as const, h1Up: false, h24Up: true },
  { id: 3, name: 'Diamond Hand', symbol: 'DIAMOND', price: '$0.00000901', h1: '+5.7%', h24: '+12.3%', mcap: '$90K', volume: '$12K', security: 'SAFE' as const, h1Up: true, h24Up: true },
]

const securityStyles: Record<string, string> = {
  SAFE: 'bg-accent-dim text-accent border border-accent/20',
  WARN: 'bg-amber/10 text-amber border border-amber/20',
  RISK: 'bg-red/10 text-red border border-red/20',
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function DashboardPage() {
  const [scanning, setScanning] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'boosted' | 'new' | 'trusted'>('all')
  const [stats, setStats] = useState(initialStats)

  const toggleScan = () => {
    setScanning(!scanning)
    setStats(prev => prev.map(s => {
      if (s.label === 'Status') return { ...s, value: scanning ? 'Idle' : 'Scanning' }
      if (s.label === 'Total Scans') return { ...s, value: scanning ? '0' : '1' }
      return s
    }))
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 lg:py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <motion.div variants={item}>
          <h1 className="text-xl lg:text-2xl font-display font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-text-muted mt-1 max-w-md">
            Monitor boosted tokens, new profiles, and trust-filtered opportunities across chains.
          </p>
        </motion.div>
        <motion.div variants={item} className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs text-text-muted border border-border rounded-lg hover:bg-surface-2 transition-colors font-label">
            Clear
          </button>
          <button
            onClick={toggleScan}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] font-label ${
              scanning
                ? 'bg-red/10 text-red border border-red/20 hover:bg-red/20'
                : 'bg-accent text-bg hover:bg-accent-hover'
            }`}
          >
            {scanning ? <Square size={12} /> : <Play size={12} />}
            {scanning ? 'Stop' : 'Start Scan'}
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8"
      >
        {stats.map((s) => {
          const Icon = s.icon
          const isHighlight = s.label === 'Active Boosts' || s.label === 'New Tokens'
          return (
            <motion.div
              key={s.label}
              variants={item}
              className={`relative overflow-hidden rounded-xl p-4 lg:p-5 border transition-all duration-300 ${
                isHighlight
                  ? 'bg-gradient-to-br from-surface-2 via-surface to-surface border-accent/10'
                  : 'bg-surface border-border'
              }`}
            >
              {isHighlight && (
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />
              )}
              <div className="flex items-start justify-between mb-3">
                <Icon size={16} className="text-accent" />
                {s.change && s.value !== 'Idle' && s.value !== 'Scanning' && (
                  <span className="text-[11px] font-medium text-accent">{s.change}</span>
                )}
              </div>
              <div className={`text-2xl lg:text-3xl font-display font-bold tracking-tight ${
                s.value === 'Idle' ? 'text-text-muted' : s.value === 'Scanning' ? 'text-accent' : 'text-white'
              }`}>
                {s.value}
              </div>
              <div className="text-[11px] text-text-muted mt-1 font-label">{s.label}</div>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex items-center justify-between mb-5"
      >
        <motion.div variants={item} className="flex items-center gap-1">
          {(['all', 'boosted', 'new', 'trusted'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors duration-200 font-label ${
                activeTab === tab
                  ? 'bg-accent-dim text-accent border border-accent/20'
                  : 'text-text-muted hover:text-text-secondary border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>
        <motion.div variants={item} className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors">
            <Filter size={12} /> Filters
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors">
            <Clock size={12} /> 24h
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-surface border border-border rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2/50">
                {['#', 'Name', 'Price', '1h', '24h', 'Market Cap', 'Volume (24h)', 'Security', ''].map((h, i) => (
                  <th key={h} className={`px-4 py-3.5 text-[11px] text-text-muted font-label font-medium uppercase tracking-wider ${
                    i === 0 ? 'text-left w-8' : i === 1 ? 'text-left' : 'text-right'
                  }`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTokens.map((token, i) => (
                <motion.tr
                  key={token.id}
                  variants={item}
                  className="border-b border-border/50 hover:bg-white/[0.02] transition-colors duration-150"
                >
                  <td className="px-4 py-4 text-text-muted text-xs">{i + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-accent-dim text-accent flex items-center justify-center text-[10px] font-bold">
                        {token.symbol[0]}
                      </span>
                      <div>
                        <span className="text-white text-sm font-medium">{token.name}</span>
                        <span className="text-text-muted ml-1.5 text-xs">{token.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-white font-mono text-xs">{token.price}</td>
                  <td className={`px-4 py-4 text-right font-mono text-xs font-medium ${token.h1Up ? 'text-accent' : 'text-red'}`}>{token.h1}</td>
                  <td className={`px-4 py-4 text-right font-mono text-xs font-medium ${token.h24Up ? 'text-accent' : 'text-red'}`}>{token.h24}</td>
                  <td className="px-4 py-4 text-right text-text-secondary font-mono text-xs">{token.mcap}</td>
                  <td className="px-4 py-4 text-right text-text-secondary font-mono text-xs">{token.volume}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium font-label ${securityStyles[token.security]}`}>
                      {token.security}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="text-[11px] font-label font-medium text-accent hover:text-accent-hover transition-colors">
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {mockTokens.length === 0 && (
          <div className="text-center py-20">
            <TrendingUp size={36} className="text-text-muted mx-auto mb-3" />
            <p className="text-sm font-medium text-white mb-1">Ready to scan</p>
            <p className="text-xs text-text-muted">Press <kbd className="px-1.5 py-0.5 bg-surface-2 rounded text-text-secondary font-mono text-[10px]">Spacebar</kbd> to begin monitoring</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
