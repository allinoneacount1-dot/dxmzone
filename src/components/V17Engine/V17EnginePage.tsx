import { useState } from 'react'
import { TrendingUp, BarChart3, RefreshCw } from 'lucide-react'

const intervals = ['15m', '1h', '4h', '1d']
const htfFilters = ['4H', '1D', '1W']
const exchanges = ['Bybit', 'OKX', 'MEXC', 'CryptoCompare']

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
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
      <div className="mb-6">
        <h1 className="text-lg lg:text-xl font-semibold text-white">V17 Chart Confirmation Engine</h1>
        <p className="text-sm text-text-muted mt-0.5">CEX market analysis — Bybit, OKX, MEXC, CryptoCompare with Pivot, Fibonacci, EMA, RSI, ADX, ATR, Volume, Candle Triggers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-xl p-4 lg:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="bg-bg border border-border rounded-lg px-3.5 py-2 text-sm text-white placeholder-text-muted outline-none focus:border-accent/50 transition-colors w-32"
              />
              <div className="flex items-center gap-1">
                {intervals.map((i) => (
                  <button
                    key={i}
                    onClick={() => setInterval(i)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      interval === i ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <span className="text-text-muted text-xs mx-1">|</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-text-muted mr-1">HTF:</span>
                {htfFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setHtf(f)}
                    className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
                      htf === f ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                onClick={runAnalysis}
                disabled={analyzing}
                className="ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-hover disabled:opacity-50 transition-colors"
              >
                {analyzing ? <RefreshCw size={13} className="animate-spin" /> : <BarChart3 size={13} />}
                {analyzing ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>

            <div className="bg-bg rounded-lg border border-border h-[350px] lg:h-[450px] flex items-center justify-center">
              {analyzed ? (
                <div className="text-center px-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">78</div>
                      <div className="text-[10px] text-text-muted uppercase tracking-wider mt-1">Combined Score</div>
                      <div className="text-xs text-green mt-1">BULLISH</div>
                    </div>
                    <div className="h-16 w-px bg-border" />
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between gap-8 text-xs"><span className="text-text-muted">Chart:</span><span className="text-white font-medium">68</span></div>
                      <div className="flex justify-between gap-8 text-xs"><span className="text-text-muted">Flow:</span><span className="text-white font-medium">72</span></div>
                      <div className="flex justify-between gap-8 text-xs"><span className="text-text-muted">Final:</span><span className="text-white font-medium">78</span></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { label: 'HTF Trend', value: 'Bullish' },
                      { label: 'Local Trend', value: 'Bullish' },
                      { label: 'Fib Zone', value: '0.618' },
                      { label: 'EMA Reclaim', value: 'YES' },
                      { label: 'RSI (14)', value: '62' },
                      { label: 'Volume', value: '+34%' },
                    ].map((ind) => (
                      <div key={ind.label} className="bg-surface rounded-lg p-2.5">
                        <div className="text-[10px] text-text-muted uppercase">{ind.label}</div>
                        <div className="text-sm font-bold text-green mt-0.5">{ind.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <TrendingUp size={32} className="text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">{symbol || 'BTCUSDT'}</p>
                  <p className="text-xs text-text-muted mt-1">Click Analyze to load chart</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-surface border border-border rounded-xl p-4 lg:p-6">
            <h3 className="text-sm font-medium text-white mb-3">Exchange Status</h3>
            <div className="space-y-2">
              {exchanges.map((ex) => (
                <div key={ex} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-text-secondary">{ex}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green" />
                    <span className="text-xs text-text-muted">idle</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 lg:p-6">
            <h3 className="text-sm font-medium text-white mb-3">Overview</h3>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-text-muted uppercase mb-1">HTF Trend</div>
                <div className="text-sm text-white">—</div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase mb-1">Local Trend</div>
                <div className="text-sm text-white">—</div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase mb-1">Combined Score</div>
                <div className="text-lg font-bold text-white">0/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
