import { useState } from 'react'
import { Search } from 'lucide-react'

export default function TokensPage() {
  const [query, setQuery] = useState('')

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
      <div className="mb-6">
        <h1 className="text-lg lg:text-xl font-semibold text-white">Tokens</h1>
        <p className="text-sm text-text-muted mt-0.5">Search and explore token information across chains.</p>
      </div>

      <div className="flex gap-2 mb-6 max-w-xl">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search token by name, symbol, or address..."
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-text-muted outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <button className="px-4 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors">
          Search
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <Search size={36} className="text-text-muted mx-auto mb-3" />
        <p className="text-sm text-text-muted">Enter a token name or address to search</p>
      </div>
    </div>
  )
}
