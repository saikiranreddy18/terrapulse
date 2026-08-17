# TerraPulse 🌍

> **The planet, live. From every wildfire on Earth to the air in your next breath.**

**Live demo:** https://terrapulse-azure.vercel.app
**GitHub:** https://github.com/saikiranreddy18/terrapulse
**Hackathon:** OregonHacks 2026 · Theme: Nature + Tech

---

## Inspiration

Nature usually shows up in our feeds as either a distant headline or a number on a weather app. We wanted to close that gap: what if you could see the whole planet breathing — every earthquake, wildfire, and cyclone happening *right now* — and then trace a line straight back to the air entering your own lungs? The theme "Nature + Tech" felt like an invitation to treat Earth as a single living patient and build its bedside monitor.

## What it does

TerraPulse is a live 3D globe of Earth's vital signs, with **zero mock data**:

- **Every earthquake of the last 24 hours** (or 7 days) pulses on the globe — magnitude, depth, and tsunami flags from the USGS live feed, with a magnitude filter and an activity sparkline.
- **Every wildfire, cyclone, volcano, and iceberg** NASA EONET is currently tracking is rendered as an animated marker — flickering flames, spinning cyclone spirals, glowing volcano vents — each stamped with its last-update time and official source (irwin.doi.gov, nhc.noaa.gov, metoc.navy.mil).
- **Click any event** and a detail drawer opens with its facts, distance from you, the official government record, the latest real news articles about that exact event, and one-click video coverage.
- **Your corner of the planet**: live AQI, PM2.5, UV, and temperature where you're sitting — plus a city search that flies the globe anywhere and compares that city's air with yours.

## How we built it

One HTML file and one serverless function. globe.gl (three.js) renders the planet; USGS, NASA EONET, and Open-Meteo provide the data — all free, all keyless. The animated event markers are pure CSS positioned on the globe with occlusion culling. For news, we wrote a tiny Vercel serverless proxy that turns Google News RSS into JSON on the same origin, with GDELT as a fallback. Deployed on Vercel; no build step, no database, no API keys anywhere.

## Challenges we ran into

- **"Is this data even real?"** We doubted our own app when a cyclone on the globe had no YouTube coverage. So we audited the feeds: Cyclone Hernan turned out to be Navy Joint Typhoon Warning Center storm EP-08-2026, updated a day ago. Small rural wildfires just don't make YouTube. We fixed the *trust* problem instead — every event now shows its update time and official source domain in the UI.
- **News APIs kept dying on us.** GDELT went down mid-build, and CORS proxies were blocked or flaky. The fix was owning the problem: our own same-origin serverless proxy.
- **Ad-blockers silently killed our news box** because the endpoint was called `/api/news`. Renamed to `/api/coverage`. Lesson learned the hard way.
- **3D quirks**: duplicate three.js instances, a missing API in an older globe.gl version that silently broke a whole layer, markers painting over the UI panels, and quake points rendering as giant pillars instead of glowing dots.
- **Vercel's SSO protection** shipped our "public" link locked — every visitor got a login wall until we found and disabled it.

## Accomplishments that we're proud of

- A genuinely **live** product — during testing, a fresh M5.8 earthquake appeared on the globe while we were verifying data. Nothing is faked or cached from a demo dataset.
- The click-to-news pipeline: clicking a small California fire surfaces *actual* Sacramento Bee articles about that exact fire, seconds old to days old.
- The whole thing is one HTML file + one function — no keys, no backend, nothing to break on stage.
- A UI we'd ship: mission-control hierarchy, animated markers, glassmorphism panels, and it all runs at 60fps in a browser tab.

## What we learned

- Free public APIs (USGS, NASA, Open-Meteo) are shockingly good — the hard part isn't getting data, it's **proving to users it's real**. Freshness stamps and source attribution turned skepticism into trust.
- Every external dependency will fail during a hackathon. Timeouts, fallbacks, and graceful degradation aren't polish — they're survival.
- CSS can carry an entire visual-effects layer (fire! cyclones!) that we assumed would need WebGL shaders.

## What's next for TerraPulse

- **Embedded video coverage** in the drawer (YouTube Data API) and richer per-event timelines.
- **Historical playback** — scrub through a week of the planet's pulse like a heart-rate strip.
- **Alerts**: "a storm system is within 500 km of you" push notifications, and shareable deep links to any event.
- **More vital signs**: floods and droughts from EONET, sea-surface temperature, CO₂ trends — and a public API so others can build on the same feed.
