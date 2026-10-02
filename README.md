# 🇮🇳 Eternal Bharat

> **A digital museum dedicated to preserving the legacy of India's greatest warriors, kingdoms, and civilizations through an immersive historical experience.**

![Status](https://img.shields.io/badge/Status-In%20Development-gold?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

##  About

**Eternal Bharat** is a modern historical website that celebrates the courage, sacrifice, leadership, and legacy of India's greatest rulers.

Instead of presenting history as plain text, the website combines **historical storytelling, interactive UI, maps, timelines, battle records, and visually rich layouts** to create an engaging learning experience for visitors.

Every warrior has a dedicated page that explores their kingdom, victories, military campaigns, timeline, and contribution to Indian history.

---

#  Features

##  Historical Landing Page

- Cinematic Hero Section
- Dark Royal Theme
- Historical Background Artwork
- Smooth Scroll Animations
- Responsive Layout
- Historical Typography
- Interactive Navigation

---

##  Warriors Gallery

Interactive cards featuring India's legendary rulers.

Each card includes:

- Portrait
- Name
- Lifespan
- Short Historical Description
- Dedicated Information Page

Featured warriors include:

- Maharana Pratap
- Rana Sanga
- Maharana Kumbha
- Bappa Rawal
- Rawal Ratan Singh
- Rani Lakshmibai
- Chhatrapati Sambhaji Maharaj
- and more...

---

##  Dedicated Warrior Pages

Each warrior has a fully dedicated page containing:

- Hero Banner
- Biography
- Early Life
- Rise to Power
- Kingdom Overview
- Dynasty Information
- Capital
- Historical Maps
- Major Battles
- Military Campaigns
- Important Victories
- Timeline
- Legacy
- References

---

##  Kingdom Exploration

Explore every kingdom through:

- Historical Territory
- Kingdom Maps
- Capitals
- Strategic Regions
- Expansion History
- Political Importance

---

##  Battles & Military Campaigns

Every warrior page documents:

- Major Battles
- Battle Outcomes
- Enemy Kingdoms
- Military Strategies
- Campaign Details
- Historical Impact

---

##  Interactive Historical Maps

Visual maps showcasing:

- Kingdom Boundaries
- Expansion of Empires
- Battle Locations
- Capitals
- Important Forts
- Strategic Regions

---

##  Historical Timeline

Chronological events including:

- Birth
- Coronation
- Important Campaigns
- Battles
- Victories
- Political Events
- Final Years
- Legacy

---

##  Historical References

Every page is designed to present structured historical information gathered from trusted historical sources.

Information includes:

- Historical Events
- Dynasties
- Kingdoms
- Battles
- Military Campaigns
- Historical Chronology
- Cultural Contributions

---

##  Interactive Experience

- Sticky Navigation
- Scroll Progress Bar
- Floating Home Button
- Back-to-Top Button
- Smooth Scrolling
- Hover Animations
- Responsive Cards
- Mobile Friendly Design

---

#  Getting Started

Requires **Node.js 20.19+** (or 22+).

```bash
npm install        # once, to install dependencies
npm run dev        # start the dev server at http://localhost:5173
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Type-checks and creates the production site in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm test` | Renders every page (all warriors, kingdoms, battles) to catch crashes |
| `npm run validate:data` | Checks that every id referenced in the content files exists |
| `npm run typecheck` | TypeScript check only |

## Deploying

`dist/` is a static site, so any static host works. Deep links (e.g. `/warriors/shivaji`) are handled for you on
**Netlify** (`public/_redirects`), **Vercel** (`vercel.json`) and **GitHub Pages** (`404.html` is generated on build).
For a GitHub Pages *project* site served from `/Eternal-Bharat/`, build with:

```bash
VITE_BASE=/Eternal-Bharat/ npm run build      # Windows PowerShell: $env:VITE_BASE="/Eternal-Bharat/"; npm run build
```

## Adding content

All content lives in `src/data/*.json` (warriors, kingdoms, battles, timeline). Add an entry, run
`npm run validate:data`, and the new page, cards, search results and timeline links appear automatically.

---

#  Project Structure

```text
Eternal-Bharat/
├── index.html
├── public/                  # static files copied as-is (_redirects)
├── scripts/                 # validate-data, postbuild
└── src/
    ├── main.tsx, App.tsx    # entry point and routes (one lazy-loaded chunk per page)
    ├── index.css            # design tokens (colours, fonts) + shared styles
    ├── types.ts             # Warrior / Kingdom / Battle / TimelineEvent types
    ├── data/                # content as JSON + typed access (index.ts)
    ├── components/          # Navbar, Footer, cards, Detail layout, Timeline, ...
    ├── pages/               # Home, Warriors, WarriorDetail, Kingdoms, ...
    └── lib/hooks.ts         # search/URL state, page meta, scroll-spy
```

---

#  Project Goals

- Preserve India's rich historical legacy.
- Present history in an engaging digital format.
- Promote authentic historical knowledge.
- Inspire curiosity about Indian civilizations.
- Build a visually immersive educational platform.

---

#  Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS 4
- Self-hosted fonts (Cinzel, Poppins)
- Vitest

---

#  Future Vision

**Eternal Bharat** is envisioned as a comprehensive digital museum featuring:

- Legendary Warriors
- Great Kingdoms
- Historical Battles
- Dynasties
- Ancient Forts
- Interactive Maps
- Timelines
- Historical Documents
- Royal Genealogy
- Cultural Heritage

---

##  Contributing

Suggestions, historical corrections, and improvements are always welcome.

If you'd like to contribute, feel free to fork the repository and open a pull request.

---

<div align="center">

### **"A nation that remembers its history builds its future with pride."**

**Made with ❤️ for Bharat 🇮🇳**

</div>