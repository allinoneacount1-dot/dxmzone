import { useState } from 'react'
import { Globe, ExternalLink } from 'lucide-react'

const chains = ['Solana', 'Ethereum', 'Base', 'BSC']
const activeChains = ['Solana', 'Ethereum', 'Base', 'BSC']

export default function DexScanPage() {
  const [selectedChain, setSelectedChain] = useState('Solana')
  const [address, setAddress] = useState('')

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
      <div className="mb-6">
        <h1 className="text-lg lg:text-xl font-semibold text-white">DexScan Live</h1>
        <p className="text-sm text-text-muted mt-0.5">Embed live DexScreener charts and search markers in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-xl p-4 lg:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {chains.map((chain) => (
                <button
                  key={chain}
                  onClick={() => setSelectedChain(chain)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedChain === chain
                      ? 'bg-accent/10 text-accent border border-accent/30'
                      : 'text-text-muted hover:text-text-secondary border border-transparent'
                  }`}
                >
                  {chain}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Pair / Token Address"
                className="flex-1 bg-bg border border-border rounded-lg px-3.5 py-2 text-sm text-white placeholder-text-muted outline-none focus:border-accent/50 transition-colors"
              />
              <button className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors">
                Load Chart
              </button>
            </div>

            <div className="bg-bg rounded-lg border border-border h-[400px] lg:h-[500px] flex items-center justify-center">
              <div className="text-center">
                <Globe size={32} className="text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-muted">Ready to Scan</p>
                <p className="text-xs text-text-muted mt-1">Select a chain and paste a token address</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4 lg:p-6">
          <h3 className="text-sm font-medium text-white mb-3">Active Chains</h3>
          <div className="space-y-2">
            {activeChains.map((chain) => (
              <div key={chain} className="flex items-center justify-between py-2 px-3 rounded-lg bg-bg/50">
                <span className="text-sm text-text-secondary">{chain}</span>
                <span className="w-2 h-2 rounded-full bg-green" />
              </div>
            ))}
          </div>
          <hr className="border-border my-4" />
          <h3 className="text-sm font-medium text-white mb-3">Quick Links</h3>
          <div className="space-y-2">
            {['Trending', 'New Pairs', 'Recent Trades'].map((link) => (
              <button key={link} className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bg-bg/50 transition-colors text-sm text-text-secondary">
                {link}
                <ExternalLink size={13} className="text-text-muted" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
