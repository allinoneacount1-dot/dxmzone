import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, RefreshCw, Activity, TrendingDown } from 'lucide-react'

const intervals = ['15m', '1h', '4h', '1d']
const htfFilters = ['4H', '1D', '1W']
const exchanges = [
  { name: 'Bybit', status: 'idle' as const },
  { name: 'OKX', status: 'idle' as const },
  { name: 'MEXC', status: 'idle' as const },
  { name: 'CryptoCompare', status: 'idle' as const },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function V17EnginePage() {
  const [symbol, setSymbol] = useState('BTCUSDT')
  const [interval, setInterval] = useState('1h')
  const [htf, setHtf] = useState('1D')
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)

  const runAnalysis = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalyzed(true)
    }, 1500)
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 lg:py-8"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="text-xl lg:text-2xl font-display font-bold text-white tracking-tight">V17 Engine</h1>
        <p className="text-sm text-text-muted mt-1">CEX market analysis with pivot, fibonacci, EMA, RSI, ADX, and candle triggers.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <motion.div variants={item} className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-4 lg:p-5 border-b border-border">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-bg rounded-lg px-2.5 py-1.5 border border-border">
                <Activity size={12} className="text-accent" />
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="bg-transparent text-sm text-white outline-none w-20 font-mono"
                />
              </div>
              <div className="flex items-center gap-1">
                {intervals.map((i) => (
                  <button
                    key={i}
                    onClick={() => setInterval(i)}
                    className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-all duration-200 font-label ${
                      interval === i ? 'bg-accent-dim text-accent' : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <span className="text-border mx-0.5 text-xs">|</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-text-muted font-label mr-0.5">HTF:</span>
                {htfFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setHtf(f)}
                    className={`px-1.5 py-1 text-[11px] font-medium rounded-lg transition-all duration-200 font-label ${
                      htf === f ? 'bg-accent-dim text-accent' : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                onClick={runAnalysis}
                disabled={analyzing}
                className="ml-auto flex items-center gap-1.5 px-3.5 py-1.5 bg-accent text-bg text-xs font-semibold rounded-lg hover:bg-accent-hover disabled:opacity-50 transition-all duration-200 active:scale-[0.97] font-label"
              >
                {analyzing ? <RefreshCw size={12} className="animate-spin" /> : <BarChart3 size={12} />}
                {analyzing ? 'Running...' : 'Analyze'}
              </button>
            </div>
          </div>

          <div className="bg-bg/50 min-h-[400px] lg:min-h-[480px] flex items-center justify-center p-6">
            {analyzed ? (
              <div className="w-full max-w-lg">
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-display font-bold text-accent">78</div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mt-1 font-label">Score</div>
                    <div className="flex items-center justify-center gap-1 mt-1.5 text-xs text-accent font-medium">
                      <TrendingUp size={12} /> BULLISH
                    </div>
                  </div>
                  <div className="h-14 w-px bg-border" />
                  <div className="space-y-2">
                    {[
                      { label: 'Chart', value: '68' },
                      { label: 'Flow', value: '72' },
                      { label: 'Final', value: '78' },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center justify-between gap-6">
                        <span className="text-[11px] text-text-muted font-label">{r.label}</span>
                        <span className="text-xs text-white font-mono font-medium">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'HTF Trend', value: 'Bullish', up: true },
                    { label: 'Local Trend', value: 'Bullish', up: true },
                    { label: 'Fib Zone', value: '0.618', up: true },
                    { label: 'EMA Reclaim', value: 'Yes', up: true },
                    { label: 'RSI (14)', value: '62', up: true },
                    { label: 'Volume', value: '+34%', up: true },
                  ].map((ind) => (
                    <div key={ind.label} className="bg-surface rounded-lg p-3 border border-border/50">
                      <div className="text-[10px] text-text-muted font-label uppercase tracking-wider">{ind.label}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {ind.up ? <TrendingUp size={10} className="text-accent" /> : <TrendingDown size={10} className="text-red" />}
                        <span className="text-sm font-mono font-bold text-white">{ind.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-accent-dim flex items-center justify-center mx-auto mb-4">
                  <TrendingUp size={20} className="text-accent" />
                </div>
                <p className="text-sm font-medium text-white mb-1">{symbol}</p>
                <p className="text-xs text-text-muted">Click Analyze to run technical analysis</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div variants={item} className="space-y-3">
          <div className="bg-surface border border-border rounded-xl p-4 lg:p-5">
            <h3 className="text-xs font-label font-semibold text-white mb-3 uppercase tracking-wider">Exchange Status</h3>
            <div className="space-y-2">
              {exchanges.map((ex) => (
                <div key={ex.name} className="flex items-center justify-between py-1.5">
                  <span className="text-xs text-text-secondary">{ex.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-[10px] text-text-muted font-label">{ex.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 lg:p-5">
            <h3 className="text-xs font-label font-semibold text-white mb-3 uppercase tracking-wider">Overview</h3>
            <div className="space-y-4">
              {[
                { label: 'HTF Trend', value: '—' },
                { label: 'Local Trend', value: '—' },
                { label: 'Score', value: '0/100', highlight: true },
              ].map((r) => (
                <div key={r.label}>
                  <div className="text-[10px] text-text-muted font-label uppercase tracking-wider mb-1">{r.label}</div>
                  <div className={`text-sm ${r.highlight ? 'font-display font-bold text-white' : 'text-text-secondary'}`}>{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
