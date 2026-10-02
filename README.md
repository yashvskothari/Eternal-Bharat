# 🇮🇳 Eternal Bharat

> **An interactive website exploring the lives, kingdoms, battles, forts, and legacies of notable warriors from Bharatiya history.**

[![Live Website](https://img.shields.io/badge/🌐_Live_Website-Eternal_Bharat-gold?style=for-the-badge)](https://eternal-bharat.vercel.app/)

![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📸 Website Preview

###  Home Page

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yashvskothari/Eternal-Bharat-assets@main/readme-Images/home.png" width="100%">
</p>

---

###  Warriors

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yashvskothari/Eternal-Bharat-assets@main/readme-Images/warriors.png" width="100%">
</p>

---

###  Kingdom Maps

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yashvskothari/Eternal-Bharat-assets@main/readme-Images/maps.png" width="100%">
</p>

---

###  Battles

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yashvskothari/Eternal-Bharat-assets@main/readme-Images/battle.png" width="100%">
</p>

---

###  Timeline

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yashvskothari/Eternal-Bharat-assets@main/readme-Images/timeline.png" width="100%">
</p>

---

###  About

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yashvskothari/Eternal-Bharat-assets@main/readme-Images/about.png" width="100%">
</p>

---

#  Live Demo

**Website:** https://eternal-bharat.vercel.app/

---

#  About

**Eternal Bharat** is an educational web project dedicated to showcasing the lives, kingdoms, battles, and legacies of some of the most renowned warriors in Bharatiya history.

The website combines historical information with an elegant user interface, interactive timelines, detailed warrior pages, and visual assets to provide an engaging learning experience for history enthusiasts.

---

#  Features

##  Home

- Cinematic Hero Section
- Smooth Scrolling
- Responsive Design
- Royal Dark Theme
- Interactive Navigation

---

##  Warriors

Explore dedicated profiles of renowned warriors including:

- Maharana Pratap
- Bappa Rawal
- Rawal Ratan Singh
- Rana Sanga
- Maharana Kumbha
- Maharana Udai Singh II
- Rani Lakshmibai
- Chhatrapati Shivaji Maharaj
- Chhatrapati Sambhaji Maharaj
- Maharaja Ranjit Singh
- Ahilyabai Holkar
- Lachit Borphukan
- Raja Raja Chola I
- and more...

Each warrior page includes:

- Biography
- Kingdom
- Dynasty
- Timeline
- Battles
- Campaigns
- Forts
- Achievements
- Legacy
- Historical References

---

##  Kingdoms

Every kingdom includes:

- Historical Overview
- Capital
- Dynasty
- Region
- Historical Map
- Important Forts
- Major Battles
- Timeline
- Legacy

---

## ⚔️ Battles

Learn about important battles through:

- Historical Background
- Year & Location
- Commanders
- Outcomes
- Historical Significance
- Related Warriors

---

##  Timeline

Chronological historical events featuring:

- Births
- Coronations
- Battles
- Kingdom Events
- Military Campaigns
- Historical Milestones

---

##  User Experience

- Responsive Layout
- Animated Cards
- Hero Sections
- Scroll Progress Indicator
- Back-to-Top Button
- Hover Animations
- Mobile Friendly Design

---

<<<<<<< HEAD
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

=======
>>>>>>> 97b9a4095a0f92e8d4be5ab9b6f41260b34255b9
#  Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS 4
- Self-hosted fonts (Cinzel, Poppins)
- Vitest

---

#  Project Structure

```text
Eternal-Bharat/

│
├── index.html
├── warriors.html
├── warrior.html
├── kingdoms.html
├── kingdom.html
├── battles.html
├── battle.html
├── timeline.html
├── about.html
│
├── css/
├── js/
├── data/
└── README.md
```

---

#  Project Goals

- Present Bharatiya history in an engaging format.
- Highlight the lives and contributions of notable historical figures.
- Encourage interest in historical learning.
- Combine historical content with modern web design.

---

#  Future Improvements

- More Warriors
- Additional Kingdoms
- Expanded Battle Database
- More Historical Timelines
- Dedicated Fort Pages
- Search Improvements
- Historical Image Gallery
- Interactive Maps

---

#  Contributing

Historical corrections, suggestions, and improvements are always welcome.

Feel free to fork the repository, improve it, and submit a pull request.

---

#  Support

If you found this project interesting, consider giving it a ⭐ on GitHub.

---

<div align="center">

### **"Preserving the past. Inspiring the future."**

Made with ❤️ for Bharat 🇮🇳

**🌐 https://eternal-bharat.vercel.app/**

</div>
