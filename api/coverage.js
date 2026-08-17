// Keyless news proxy: Google News RSS → JSON (same-origin, so no CORS pain).
// GET /api/news?q=Cyclone+Hernan  →  { articles: [{title, link, pubDate, source}] }
export default async function handler(req, res) {
  const q = (req.query.q || '').toString().slice(0, 120);
  if (!q) return res.status(400).json({ error: 'missing q' });
  try {
    const r = await fetch(
      `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (TerraPulse hackathon project)' } });
    const xml = await r.text();
    const strip = s => s.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
    const articles = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 5).map(m => {
      const g = t => { const x = m[1].match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)); return x ? strip(x[1]) : ''; };
      const src = m[1].match(/<source[^>]*>([\s\S]*?)<\/source>/);
      return { title: g('title'), link: g('link'), pubDate: g('pubDate'), source: src ? strip(src[1]) : '' };
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ articles });
  } catch (e) {
    res.status(502).json({ error: 'news fetch failed', articles: [] });
  }
}
