import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Search, ChevronRight } from 'lucide-react'

const chains = ['Solana', 'Ethereum', 'Base', 'BSC', 'Arbitrum', 'Polygon']
const quickLinks = ['Trending', 'New Pairs', 'Recent Trades', 'Top Gainers']

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function DexScanPage() {
  const [selectedChain, setSelectedChain] = useState('Solana')
  const [address, setAddress] = useState('')

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 lg:py-8"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="text-xl lg:text-2xl font-display font-bold text-white tracking-tight">DexScan Live</h1>
        <p className="text-sm text-text-muted mt-1">Embed live charts and scan token pairs in real-time.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <motion.div variants={item} className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-border">
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              {chains.map((chain) => (
                <button
                  key={chain}
                  onClick={() => setSelectedChain(chain)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all duration-200 font-label ${
                    selectedChain === chain
                      ? 'bg-accent-dim text-accent border border-accent/20'
                      : 'text-text-muted hover:text-text-secondary border border-transparent'
                  }`}
                >
                  {chain}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Token address or pair..."
                  className="w-full bg-bg border border-border rounded-lg pl-9 pr-3.5 py-2 text-sm text-white placeholder-text-muted outline-none focus:border-accent/40 transition-colors"
                />
              </div>
              <button className="px-4 py-2 bg-accent text-bg text-xs font-semibold rounded-lg hover:bg-accent-hover transition-all duration-200 active:scale-[0.97] font-label">
                Load
              </button>
            </div>
          </div>

          <div className="bg-bg/50 h-[400px] lg:h-[500px] flex items-center justify-center">
            <div className="text-center px-6">
              <div className="w-12 h-12 rounded-xl bg-accent-dim flex items-center justify-center mx-auto mb-4">
                <Globe size={20} className="text-accent" />
              </div>
              <p className="text-sm font-medium text-white mb-1">Chart Ready</p>
              <p className="text-xs text-text-muted max-w-xs mx-auto">Select a chain and paste a token address to load live chart data.</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="space-y-3">
          <div className="bg-surface border border-border rounded-xl p-4 lg:p-5">
            <h3 className="text-xs font-label font-semibold text-white mb-3 uppercase tracking-wider">Active Chains</h3>
            <div className="space-y-1">
              {chains.slice(0, 4).map((chain) => (
                <div key={chain} className="flex items-center justify-between py-2 px-3 rounded-lg bg-bg/40">
                  <span className="text-xs text-text-secondary">{chain}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 lg:p-5">
            <h3 className="text-xs font-label font-semibold text-white mb-3 uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-1">
              {quickLinks.map((link) => (
                <button key={link} className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bg-bg/40 transition-colors group">
                  <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">{link}</span>
                  <ChevronRight size={12} className="text-text-muted group-hover:text-text-secondary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
