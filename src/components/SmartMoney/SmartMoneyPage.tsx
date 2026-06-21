import { Users } from 'lucide-react'

const mockSmartMoney = [
  { address: '0x8a4f...2b1c', label: 'Whale', profit: '+$1.2M', trades: 847, winRate: '78%', active: true },
  { address: '0x3e7d...9f4a', label: 'Insider', profit: '+$892K', trades: 412, winRate: '72%', active: true },
  { address: '0x1b9c...4e7d', label: 'Fund', profit: '+$2.1M', trades: 1247, winRate: '81%', active: true },
]

export default function SmartMoneyPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
      <div className="mb-6">
        <h1 className="text-lg lg:text-xl font-semibold text-white">Smart Money</h1>
        <p className="text-sm text-text-muted mt-0.5">Track profitable wallets and insider activity in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockSmartMoney.map((sm) => (
          <div key={sm.address} className="bg-surface border border-border rounded-xl p-4 lg:p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users size={16} className="text-accent" />
                  <span className="text-sm text-white font-medium">{sm.label}</span>
                </div>
                <span className="text-xs text-text-muted">{sm.address}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${sm.active ? 'bg-green/10 text-green' : 'bg-text-muted/10 text-text-muted'}`}>
                {sm.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className={`text-lg font-bold ${sm.profit.startsWith('+') ? 'text-green' : 'text-red'}`}>{sm.profit}</div>
                <div className="text-[10px] text-text-muted uppercase mt-0.5">Profit</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{sm.trades}</div>
                <div className="text-[10px] text-text-muted uppercase mt-0.5">Trades</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{sm.winRate}</div>
                <div className="text-[10px] text-text-muted uppercase mt-0.5">Win Rate</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
