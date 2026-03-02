# DA Ops Hub — Developer Advocate Command Center

A production-ready TypeScript + React application for managing developer advocacy operations at scale. Built for Web/JS/TS Developer Advocates to orchestrate communities, content, competitive positioning, and strategic programs.

**Think of it as a command center for developer advocacy:** track champions, manage content pipelines, monitor community signals, execute your 30-60-90 strategy, and stay aligned with product.

## What This Does

- **Champions CRM**: Identify, track, and nurture influential developers and community voices
- **Content Pipeline**: Manage blog posts, videos, tutorials, and content across 4 strategic pillars
- **Community Signals**: Capture and analyze what developers are saying on Reddit, Twitter, Discord, YouTrack, GitHub
- **30·60·90 Tracker**: Track phase-based milestones and weekly execution tasks with progress visualization
- **Competitive Intel**: Build battlecards and track competitive positioning (VS Code, Cursor, Zed, etc.)
- **OKRs Dashboard**: Define and track quarterly objectives with progress visibility
- **Strategic Framework**: 3 core pillars (Authenticity, Data-Informed, Bridge Builder) + 4 content pillars
- **Weekly Tasks**: 36 structured tasks across 12 weeks, organized by phase and track
- **Dev News Aggregator**: Monitor Hacker News, Dev.to, r/programming, r/webdev for relevant discussions
- **Daily Challenge Runner**: Keep sharp with coding challenges and track your streak
- **Real-time Sync**: Cross-device Firebase sync so your ops stay current everywhere

## Built For

Web/JS/TS Developer Advocates who need to:
- Prove impact with data, not vibes ("47 Reddit comments + 12 YouTrack upvotes > 1 intuition")
- Manage multiple initiatives without drowning in spreadsheets
- Build authentic community relationships at scale through existing community programs (JBCC)
- Bridge the gap between product and community with structured feedback
- Execute strategic plans while staying responsive to community needs

## Tech Stack

- **React 19** – Modern component model with hooks
- **TypeScript 5.9** – Type-safe development
- **Vite 7** – Lightning-fast dev server and builds
- **Zustand 5** – Lightweight, scalable state management with localStorage persistence
- **Tailwind CSS 4** – Utility-first styling
- **Firebase 12** – Real-time cross-device sync (optional, fallback to localStorage)
- **Zod 4.3** – Runtime type validation

## Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — HMR enabled, changes reflect instantly.

### Production Build

```bash
npm run build      # Build for production
npm run preview    # Preview the production build locally
```

## Project Structure

```
src/
├── components/
│   ├── common/        # Reusable UI components (Button, Card, Modal, etc.)
│   ├── layout/        # Page structure (Sidebar, MainLayout)
│   └── views/         # 14 full-page feature views
│
├── stores/            # Zustand state management
│   ├── appStore.ts    # UI state (modals, filters, sidebar)
│   ├── dataStore.ts   # Core data (champions, content, signals, etc.)
│   ├── challengeStore.ts  # Challenge state
│   └── newsStore.ts   # News articles
│
├── types/             # TypeScript domain models
├── utils/             # Helpers, constants, seed data
├── config/            # Firebase configuration
└── services/          # Firebase sync service
```

## Core Views (14 Dashboard Screens)

| Icon | View | Purpose |
|------|------|---------|
| 📊 | **Overview** | High-level snapshot of all activities |
| 🏆 | **Champions CRM** | Manage champion relationships and outreach |
| 📝 | **Content Pipeline** | Track content from idea → published |
| 📡 | **Community Signals** | Monitor developer sentiment and discussions |
| 🎯 | **30·60·90 Tracker** | Phase-based milestone & weekly task tracking |
| ⚔️ | **Competitive Intel** | Battlecards for VS Code, Cursor, Zed, Windsurf |
| 📰 | **Dev News** | Aggregated news from HN, Dev.to, Reddit |
| 💡 | **Daily Challenge** | Code challenges with streak tracking |
| 🎯 | **Strategic Framework** | 3 core pillars + execution framework |
| 📚 | **Content Strategy** | 4 content pillars with phased ideas |
| 📋 | **Weekly Tasks** | All 36 tasks across 30/60/90 phases |
| 🎪 | **OKRs** | Quarterly objectives and key results |
| 📄 | **Documents** | Strategic documents and playbooks |
| 📈 | **Progress Dashboard** | Milestone completion and phase progress |
| 🔗 | **Tools & Resources** | Links to useful tools and research docs |

## Data Persistence

- **Default**: All data stored in browser localStorage (zero-config)
- **Optional**: Firebase Realtime Database for cross-device sync
  - See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for setup instructions
  - See [QUICK_START_FIREBASE.md](./QUICK_START_FIREBASE.md) for quick reference

## Seed Data

The app ships with realistic sample data:
- 2 sample champions (Sarah Chen, Alex Rodriguez)
- 2 sample content pieces
- 1 sample community signal
- 6 sample milestones
- 4 competitive battlecards (VS Code, Cursor, Zed, JetBrains)
- 36 weekly tasks across 3 phases
- 8 OKRs
- 3 strategic documents
- 4 content strategy pillars

Edit `src/utils/seedData.ts` to customize for your situation.

## Customization

### Update Your Role

Edit `src/utils/constants.ts` to reflect your technology focus:
```ts
// Currently: Web/JS/TS DA
// But could be: Mobile DA, Backend/Go DA, Enterprise DA, etc.
```

### Customize Champion Status

Modify the champion status values in `src/types/domain.ts`:
```ts
type ChampionStatus = 'Identified' | 'Contacted' | 'Engaged' | 'Champion'
```

### Adjust Strategic Pillars

Update `SEED_STRATEGIC_PILLARS` in `src/utils/seedData.ts` to match your advocacy strategy.

### Change Content Pillars

Modify `SEED_CONTENT_PILLARS` to reflect your content narrative strategy.

## Deployment

Deploy as a static site to Vercel, Netlify, or any static host:

```bash
npm run build
# Upload the dist/ folder
```

**With Firebase**: Add your Firebase config to `.env` before building (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)).

## Next Steps

1. **Run it locally**: `npm run dev` and explore the views
2. **Understand the strategy**: Read the Strategic Framework view
3. **Customize the data**: Edit seed data to match your situation
4. **Set up Firebase** (optional): Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
5. **Start executing**: Use the 30·60·90 Tracker as your execution playbook

## Philosophy

This tool is built on three core principles:

1. **Authenticity Over Polish** — Show up as a developer first. Let data guide decisions, not vanity metrics.
2. **Data-Informed Advocacy** — Every piece of content and product feedback backed by evidence from real community conversations.
3. **Bridge Builder** — Translate product to developers and developers to product. Make the feedback loop work.

The tool is designed to remove friction from execution and let you focus on what matters: building authentic relationships with developers and helping your product team ship better.

---

Built with ❤️ for Developer Advocates who believe in genuine community and data-driven strategy.
