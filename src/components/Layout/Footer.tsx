export default function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-text-muted">
        <p>DXM Zone &copy; 2026 — Real-Time Boost Monitor</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-text-secondary transition-colors">Terms</a>
          <a href="#" className="hover:text-text-secondary transition-colors">Privacy</a>
          <a href="#" className="hover:text-text-secondary transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
