export default function Footer() {
  return (
    <footer className="border-t border-border mt-12 lg:mt-16 bg-surface/30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
              <span className="text-accent font-display font-bold text-sm">D</span>
            </div>
            <div>
              <p className="text-sm font-label font-semibold text-white">DXM Zone</p>
              <p className="text-[11px] text-text-muted">Real-Time Market Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-text-muted">
            <a href="#" className="hover:text-text-secondary transition-colors">Terms</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-secondary transition-colors">GitHub</a>
            <span className="text-text-muted/50">&copy; 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
