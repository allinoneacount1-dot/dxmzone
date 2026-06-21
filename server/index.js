import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/api/dex/screener/:chain/:address', async (req, res) => {
  try {
    const r = await fetch(`https://api.dexscreener.com/latest/dex/pairs/${req.params.chain}/${req.params.address}`)
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'DexScreener fetch failed' }) }
})

app.get('/api/dex/screener/search/:query', async (req, res) => {
  try {
    const r = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${req.params.query}`)
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'DexScreener search failed' }) }
})

app.get('/api/dex/screener/token/:address', async (req, res) => {
  try {
    const r = await fetch(`https://api.dexscreener.com/token/v1/${req.params.address}`)
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'DexScreener token fetch failed' }) }
})

app.get('/api/rugcheck/:mint', async (req, res) => {
  try {
    const r = await fetch(`https://rugcheck.xyz/api/tokens/${req.params.mint}/report`)
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'RugCheck fetch failed' }) }
})

app.get('/api/cex/bybit/tickers', async (_req, res) => {
  try {
    const r = await fetch('https://api.bybit.com/v5/market/tickers?category=spot')
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'Bybit fetch failed' }) }
})

app.get('/api/cex/bybit/kline', async (req, res) => {
  try {
    const { symbol, interval, limit } = req.query
    const r = await fetch(`https://api.bybit.com/v5/market/kline?category=spot&symbol=${symbol}&interval=${interval || '60'}&limit=${limit || '100'}`)
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'Bybit kline fetch failed' }) }
})

app.get('/api/cex/okx/tickers', async (_req, res) => {
  try {
    const r = await fetch('https://www.okx.com/api/v5/market/tickers?instType=SPOT')
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'OKX fetch failed' }) }
})

app.get('/api/cex/okx/kline', async (req, res) => {
  try {
    const { instId, bar, limit } = req.query
    const r = await fetch(`https://www.okx.com/api/v5/market/candles?instId=${instId}&bar=${bar || '1H'}&limit=${limit || '100'}`)
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'OKX kline fetch failed' }) }
})

app.get('/api/cex/mexc/tickers', async (_req, res) => {
  try {
    const r = await fetch('https://api.mexc.com/api/v3/ticker/24hr')
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'MEXC fetch failed' }) }
})

app.get('/api/cex/mexc/kline', async (req, res) => {
  try {
    const { symbol, interval, limit } = req.query
    const r = await fetch(`https://api.mexc.com/api/v3/klines?symbol=${symbol}&interval=${interval || '1h'}&limit=${limit || '100'}`)
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'MEXC kline fetch failed' }) }
})

app.get('/api/cex/cryptocompare/multiple', async (req, res) => {
  try {
    const { fsyms, tsyms } = req.query
    const r = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${fsyms || 'BTC'}&tsyms=${tsyms || 'USD'}`)
    const d = await r.json()
    res.json(d)
  } catch { res.status(500).json({ error: 'CryptoCompare fetch failed' }) }
})

app.listen(PORT, () => {
  console.log(`DXM Zone API running on port ${PORT}`)
})
