import { motion } from 'framer-motion'
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react'

const wallets = [
  { address: '0x8a4f...2b1c', label: 'Whale', profit: '+$1.2M', trades: 847, winRate: '78%', active: true, color: 'text-accent' },
  { address: '0x3e7d...9f4a', label: 'Insider', profit: '+$892K', trades: 412, winRate: '72%', active: true, color: 'text-purple' },
  { address: '0x1b9c...4e7d', label: 'Fund', profit: '+$2.1M', trades: 1247, winRate: '81%', active: true, color: 'text-amber' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function SmartMoneyPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 lg:py-8"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="text-xl lg:text-2xl font-display font-bold text-white tracking-tight">Smart Money</h1>
        <p className="text-sm text-text-muted mt-1">Track profitable wallets and insider activity in real-time.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {wallets.map((w, i) => (
          <motion.div
            key={w.address}
            variants={item}
            className={`relative overflow-hidden bg-surface border border-border rounded-xl p-5 lg:p-6 transition-all duration-300 hover:border-accent/20`}
          >
            {i === 0 && (
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
            )}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-accent-dim flex items-center justify-center ${w.color}`}>
                  <Users size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{w.label}</div>
                  <span className="text-xs text-text-muted font-mono">{w.address}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium font-label ${
                w.active ? 'bg-accent-dim text-accent border border-accent/20' : 'bg-text-muted/10 text-text-muted'
              }`}>
                {w.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Profit', value: w.profit, icon: DollarSign, color: 'text-accent' },
                { label: 'Trades', value: w.trades.toLocaleString(), icon: Activity, color: 'text-text-secondary' },
                { label: 'Win Rate', value: w.winRate, icon: TrendingUp, color: 'text-text-secondary' },
              ].map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.label} className="bg-bg/50 rounded-lg p-3 text-center border border-border/50">
                    <Icon size={12} className={`${m.color} mx-auto mb-1.5`} />
                    <div className={`text-sm font-display font-bold ${m.label === 'Profit' ? 'text-accent' : 'text-white'}`}>
                      {m.value}
                    </div>
                    <div className="text-[10px] text-text-muted font-label uppercase tracking-wider mt-0.5">{m.label}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
