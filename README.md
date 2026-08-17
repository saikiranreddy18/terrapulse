# TerraPulse 🌍 — Earth's Live Vital Signs

**OregonHacks 2026 · Theme: Nature + Tech**

An interactive 3D globe that treats the planet as a living patient. Animated wildfires burn, cyclones spin, and volcanoes glow exactly where they are happening on Earth **right now** — every earthquake of the last 24 hours pulses on the surface, and the air you personally are breathing sits in the corner. Click anything and TerraPulse pulls the **latest real news coverage** of that exact event.

## Live data — zero mock data
| Signal | Source | Refresh |
|---|---|---|
| Earthquakes (24h / 7d, magnitude, depth, tsunami flag) | [USGS GeoJSON feed](https://earthquake.usgs.gov/earthquakes/feed/) | 5 min |
| Wildfires, storms, volcanoes, icebergs | [NASA EONET v3](https://eonet.gsfc.nasa.gov/) (sourced from IRWIN, NOAA NHC, Navy JTWC) | 10 min |
| Your AQI, PM2.5, UV, temperature | [Open-Meteo Air Quality API](https://open-meteo.com/) | 5 min |
| Live news per event | Google News RSS via own serverless proxy (GDELT fallback) | on click |
| Your location | Browser geolocation → geojs.io fallback | — |
| World geometry | world-atlas (Natural Earth) | static |

All APIs are free and keyless. Every event in the panel shows its last-update time and its official source domain (irwin.doi.gov, nhc.noaa.gov, metoc.navy.mil…) — verify anything with one click.

## Features
- **Animated event graphics** — CSS-drawn flickering flames, rotating cyclone spirals, glowing volcano vents, and shimmering icebergs, positioned on the globe and occlusion-culled behind the horizon.
- **Click → live coverage** — a detail drawer with the event's facts (magnitude, depth, distance from you, official source) plus the latest news articles and a one-click YouTube coverage search.
- **City search + air comparison** — type any city ("Delhi") to fly there and compare its live AQI with yours.
- **Seismic explorer** — 24H/7D toggle, minimum-magnitude slider, and an activity sparkline.
- **Mission-control HUD** — KPI strip (quakes, M5+, fires, storms, volcanoes), UTC clock, per-source freshness stamps, filter chips, news ticker.
- **Network controls** — arc glow, pulse speed, rotation speed, layer toggles.

## Run locally
```bash
python -m http.server 8792 --directory .
```
Then open http://localhost:8792. (The `/api/news` proxy only runs on Vercel; locally the news box falls back to GDELT.)

## Deploy
Push to GitHub and import into [Vercel](https://vercel.com) — static file + one serverless function, zero config.

## Stack
One HTML file + one serverless function. globe.gl (three.js) via CDN, no build step, no keys, no database.

## Why it matters
Nature isn't something far away. TerraPulse puts the global (a cyclone born last night in the Pacific) and the personal (the PM2.5 in your next breath) on one screen — and lets you jump from a glowing dot on the globe to the real reporting about it in one click.
