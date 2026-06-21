import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ExternalLink } from 'lucide-react'

const mockResults = [
  { name: 'Boost Token', symbol: 'BOOST', chain: 'Solana', price: '$0.00001234', mcap: '$123K', volume: '$45K', security: 'SAFE' },
  { name: 'Moon Shot', symbol: 'MOON', chain: 'Ethereum', price: '$0.00005678', mcap: '$567K', volume: '$89K', security: 'WARN' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function TokensPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof mockResults>([])

  const handleSearch = () => {
    if (query.length > 2) {
      setResults(mockResults)
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 lg:py-8"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="text-xl lg:text-2xl font-display font-bold text-white tracking-tight">Tokens</h1>
        <p className="text-sm text-text-muted mt-1">Search and explore token information across chains.</p>
      </motion.div>

      <motion.div variants={item} className="flex gap-2 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Name, symbol, or address..."
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-text-muted outline-none focus:border-accent/40 transition-colors"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-5 py-2.5 bg-accent text-bg text-xs font-semibold rounded-lg hover:bg-accent-hover transition-all duration-200 active:scale-[0.97] font-label"
        >
          Search
        </button>
      </motion.div>

      {results.length > 0 ? (
        <motion.div variants={item} className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2/50">
                {['Name', 'Chain', 'Price', 'Market Cap', 'Volume (24h)', 'Security', ''].map((h, i) => (
                  <th key={h} className={`px-4 py-3.5 text-[11px] text-text-muted font-label font-medium uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-right'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((token, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors duration-150">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-accent-dim text-accent flex items-center justify-center text-[10px] font-bold">{token.symbol[0]}</span>
                      <div>
                        <span className="text-white text-sm font-medium">{token.name}</span>
                        <span className="text-text-muted ml-1.5 text-xs">{token.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-text-secondary text-xs">{token.chain}</td>
                  <td className="px-4 py-4 text-right text-white font-mono text-xs">{token.price}</td>
                  <td className="px-4 py-4 text-right text-text-secondary font-mono text-xs">{token.mcap}</td>
                  <td className="px-4 py-4 text-right text-text-secondary font-mono text-xs">{token.volume}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium font-label ${
                      token.security === 'SAFE' ? 'bg-accent-dim text-accent border border-accent/20' : 'bg-amber/10 text-amber border border-amber/20'
                    }`}>
                      {token.security}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="text-[11px] font-label font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1">
                      Details <ExternalLink size={10} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <motion.div variants={item} className="bg-surface border border-border rounded-xl p-10 text-center">
          <div className="w-14 h-14 rounded-xl bg-accent-dim flex items-center justify-center mx-auto mb-4">
            <Search size={22} className="text-accent" />
          </div>
          <p className="text-sm font-medium text-white mb-1">Search tokens</p>
          <p className="text-xs text-text-muted max-w-xs mx-auto">Enter a token name, symbol, or contract address to find detailed information.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
