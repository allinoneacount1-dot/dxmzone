import { useState } from 'react'
import { BarChart3, Coins, Activity, Zap, Play, Square, Clock, Filter } from 'lucide-react'

const initialStats = [
  { label: 'Active Boosts', value: '0', change: '+0%', icon: BarChart3, color: 'text-accent' },
  { label: 'New Tokens', value: '0', change: '+0%', icon: Coins, color: 'text-green' },
  { label: 'Scans', value: '0', change: '', icon: Activity, color: 'text-purple' },
  { label: 'Status (3s)', value: 'Idle', change: '', icon: Zap, color: 'text-amber' },
]

type TokenRow = {
  id: number
  name: string
  symbol: string
  price: string
  h1: string
  h24: string
  mcap: string
  volume: string
  security: string
  h1Up: boolean
  h24Up: boolean
}

const mockTokens: TokenRow[] = [
  { id: 1, name: 'Boost Token', symbol: 'BOOST', price: '$0.00001234', h1: '+12.4%', h24: '+45.2%', mcap: '$123K', volume: '$45K', security: 'SAFE', h1Up: true, h24Up: true },
  { id: 2, name: 'Moon Shot', symbol: 'MOON', price: '$0.00005678', h1: '-3.2%', h24: '+22.1%', mcap: '$567K', volume: '$89K', security: 'WARN', h1Up: false, h24Up: true },
  { id: 3, name: 'Diamond Hand', symbol: 'DIAMOND', price: '$0.00000901', h1: '+5.7%', h24: '+12.3%', mcap: '$90K', volume: '$12K', security: 'SAFE', h1Up: true, h24Up: true },
]

export default function DashboardPage() {
  const [scanning, setScanning] = useState(false)
  const [stats, setStats] = useState(initialStats)
  const [activeTab, setActiveTab] = useState<'all' | 'boosted' | 'new' | 'trusted'>('all')

  const toggleScan = () => {
    setScanning(!scanning)
    if (!scanning) {
      setStats([
        { label: 'Active Boosts', value: '0', change: '+0%', icon: BarChart3, color: 'text-accent' },
        { label: 'New Tokens', value: '0', change: '+0%', icon: Coins, color: 'text-green' },
        { label: 'Scans', value: '1', change: '', icon: Activity, color: 'text-purple' },
        { label: 'Status (3s)', value: 'Scanning', change: '', icon: Zap, color: 'text-green' },
      ])
    } else {
      setStats(initialStats)
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-lg lg:text-xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-text-muted mt-0.5">Monitor boosted tokens, new profiles, and trust-filtered opportunities.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs text-text-muted border border-border rounded-lg hover:bg-surface transition-colors">
            Clear
          </button>
          <button
            onClick={toggleScan}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
              scanning
                ? 'bg-red/10 text-red border border-red/30 hover:bg-red/20'
                : 'bg-accent text-white hover:bg-accent-hover'
            }`}
          >
            {scanning ? <Square size={14} /> : <Play size={14} />}
            {scanning ? 'Stop' : 'Start Scan'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-surface border border-border rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <Icon size={18} className={s.color} />
                <span className={`text-xs font-medium ${s.change && s.value !== 'Idle' && s.value !== 'Scanning' ? 'text-green' : 'text-text-muted'}`}>
                  {s.change}
                </span>
              </div>
              <div className={`text-xl lg:text-2xl font-bold ${s.value === 'Idle' ? 'text-text-muted' : s.value === 'Scanning' ? 'text-green' : 'text-white'}`}>
                {s.value}
              </div>
              <div className="text-[11px] text-text-muted mt-0.5">{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Tabs + Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          {(['all', 'boosted', 'new', 'trusted'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                activeTab === tab ? 'bg-surface text-white border border-border' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'boosted' ? 'Boosted' : tab === 'new' ? 'New' : 'Trusted'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors">
            <Filter size={13} /> Filters
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors">
            <Clock size={13} /> 24h
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-xs text-text-muted font-medium uppercase tracking-wider w-8">#</th>
              <th className="text-left px-4 py-3 text-xs text-text-muted font-medium uppercase tracking-wider">Name</th>
              <th className="text-right px-4 py-3 text-xs text-text-muted font-medium uppercase tracking-wider">Price</th>
              <th className="text-right px-4 py-3 text-xs text-text-muted font-medium uppercase tracking-wider">1h %</th>
              <th className="text-right px-4 py-3 text-xs text-text-muted font-medium uppercase tracking-wider">24h %</th>
              <th className="text-right px-4 py-3 text-xs text-text-muted font-medium uppercase tracking-wider">Market Cap</th>
              <th className="text-right px-4 py-3 text-xs text-text-muted font-medium uppercase tracking-wider">Volume (24h)</th>
              <th className="text-center px-4 py-3 text-xs text-text-muted font-medium uppercase tracking-wider">Security</th>
              <th className="text-center px-4 py-3 text-xs text-text-muted font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockTokens.map((token) => (
              <tr key={token.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3.5 text-text-muted">☆</td>
                <td className="px-4 py-3.5">
                  <span className="text-white font-medium">{token.name}</span>
                  <span className="text-text-muted ml-1.5 text-xs">{token.symbol}</span>
                </td>
                <td className="px-4 py-3.5 text-right text-white font-mono text-xs">{token.price}</td>
                <td className={`px-4 py-3.5 text-right font-mono text-xs font-medium ${token.h1Up ? 'text-green' : 'text-red'}`}>{token.h1}</td>
                <td className={`px-4 py-3.5 text-right font-mono text-xs font-medium ${token.h24Up ? 'text-green' : 'text-red'}`}>{token.h24}</td>
                <td className="px-4 py-3.5 text-right text-text-secondary font-mono text-xs">{token.mcap}</td>
                <td className="px-4 py-3.5 text-right text-text-secondary font-mono text-xs">{token.volume}</td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    token.security === 'SAFE' ? 'bg-green/10 text-green' :
                    token.security === 'WARN' ? 'bg-amber/10 text-amber' : 'bg-red/10 text-red'
                  }`}>
                    {token.security}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <button className="text-xs text-accent hover:text-accent-hover transition-colors">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mockTokens.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            {scanning ? (
              <p>Scanning for new tokens...</p>
            ) : (
              <div>
                <p className="mb-1 text-sm font-medium text-white">Ready to scan</p>
                <p className="text-xs">Press <kbd className="px-1.5 py-0.5 bg-surface-2 rounded text-text-secondary">Start</kbd> or <kbd className="px-1.5 py-0.5 bg-surface-2 rounded text-text-secondary">Spacebar</kbd> to begin monitoring boosted tokens in real-time.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
