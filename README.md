# ahmetcanyesildag-site

The personal authority site of **Ahmet Can Yeşildağ** — senior hospitality executive, Cornell General Managers Program alumnus, Past President of Skål International Baku.

[![Live](https://img.shields.io/badge/Live-ahmetcanyesildag.com-22C55E?logo=safari&logoColor=white)](https://ahmetcanyesildag.com) [![Eleventy](https://img.shields.io/badge/Eleventy-3.x-1A1A1A?logo=eleventy&logoColor=white)](https://www.11ty.dev) [![Netlify](https://img.shields.io/badge/Netlify-deployed-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com) [![License](https://img.shields.io/badge/License-All_rights_reserved-blue)](#license)

---

## What this is

The canonical authority surface for the practice operated under **Greenmountains Trade Ltd.** (CBCA #1373422-6, Oakville, Ontario). The site carries the cause manifesto, the *Signals and Noise* long-form thesis, blog essays, and the entity graph that anchors every other surface in the program (LinkedIn, Instagram, Google Business Profile, etc.).

- **Live:** https://ahmetcanyesildag.com
- **Hosting:** Netlify (DNS via Netlify NS1; registrar Squarespace Domains II LLC)
- **Source-of-truth:** the Eleventy build at eleventy-source/

## Stack

| Layer | Technology |
|---|---|
| Static site generator | [Eleventy 3.x](https://www.11ty.dev) |
| Templating | Nunjucks .njk templates + _includes/ partials + _data/ data files |
| Structured data | Hand-curated JSON-LD @graph — Person + Organization + 5× ProfessionalService + WebSite + WebPage entities |
| Analytics & consent | Cookiebot (consent gating) + GA4 + Meta Pixel + Ahrefs Web Analytics + HubSpot + SearchAtlas OTTO SEO |
| Deploy | Path A (Git push to main → Netlify auto-deploy) or Path B (Netlify drag-drop of _site/) |

## Brand architecture

This site represents a single Canadian federal corporation (**Greenmountains Trade Ltd.**, CBCA #1373422-6, federally incorporated 1 February 2022) operating five public-facing trading styles — Greenmountains Trade Ltd. is the legal umbrella and roof company:

- **Greenmountains · Executive Consultancy** — board-level advisory for hotel groups and hospitality AI.
- **Orophile** (Wellness Journeys) — longevity-focused advisory using landscape as method. Day-rate engagements, Discovery Consultations, Strategic Reviews. The Dolomites program is the embodied expression.
- **owj.life** — the Validated-Learning Engine; conversational concierge for the wellness-landscape practice.
- **Orophile** (Edit) — the editorial publication. Twelve editions per year. Edition I publishes 15 July 2026.
- **Build Life Puzzle** (5th trading style) — coaching and mentoring built on the *Missing Pieces of Life Puzzle* book series.

The JSON-LD entity graph in eleventy-source/src/_data/structuredData.js encodes the architecture as a single Person + a single Organization (Greenmountains Trade Ltd. — the legal umbrella and roof company) + five ProfessionalService nodes — one per trading style — linked via parentOrganization.

## Build + deploy

```bash
cd eleventy-source
npm install          # @11ty/eleventy ^3.0.0
npm run build        # output to _site/
```

**Path A (preferred):** push to main on this repo; Netlify auto-deploys in ~30 seconds.

**Path B (fallback):** drag-drop the eleventy-source/_site/ folder onto the Netlify dashboard. Faster for emergencies; no Git history.

## License

© Greenmountains Trade Ltd. All rights reserved. This repository is public for transparency on the technical stack and for verifiability of the authority claims it carries; the source code, copy, and brand assets are not open-licensed for reuse.

Maintained by Greenmountains Trade Ltd. (CBCA #1373422-6) · Oakville, Ontario, Canada.
