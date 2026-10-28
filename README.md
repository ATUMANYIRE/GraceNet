# 🌟 GraceNet — Women in Tech Career Sponsorship & Pay Equity Platform
> **Built for the Catalyst California Conference (C3) Hackathon**  
> *Empowering women in technology through executive career sponsorship, audited pay transparency, and peer safe spaces.*

---

## 💡 Overview & Problem Statement
The technology industry frequently provides early-career women with **mentorship** (advice), but systemic disparities persist because of a lack of **sponsorship** (active executive advocacy in closed-door promotion calibrations). Furthermore, opaque corporate compensation bands perpetuate an 8% to 14% tech gender wage gap, while women navigating microaggressions or workplace retaliation lack confidential resources.

**GraceNet** changes the paradigm by honoring **Rear Admiral Grace Hopper** and delivering four pillars of systemic empowerment:
1. **Executive Sponsorship Matcher**: Connecting engineers directly with leaders at Google, Meta, NASA, OpenAI, and Stripe who actively advocate in calibration rooms.
2. **Audited Wage Transparency Engine**: Interactive pay parity calculator comparing compensation against audited industry percentiles and California Equal Pay Act standards, with custom counter-offer scripts.
3. **Grace Hopper Career Roadmaps**: Dynamic skill trackers with live completion percentage, milestone checklists, and unlocked achievement badges.
4. **Community & Safe Space Forum**: Harassment-free forum supporting verified anonymous posting (`Incognito Technologist`) and an instant **Quick Safe Exit** panic button.

---

## 🎨 Design Tokens & Aesthetic
- **Primary Backgrounds**: `#FDFBF7` (Warm Porcelain) & `#0F172A` (Dark Slate Mode Toggle)
- **Brand Colors**:
  - Deep Violet: `#6D28D9`
  - Rose Quartz: `#F43F5E`
  - Emerald Accent: `#10B981`
  - Soft Amethyst: `#EDE9FE`
- **Typography**: Clean, accessible sans-serif typography (`Inter` / `Plus Jakarta Sans`) with high-contrast text and rounded cards (`rounded-2xl` / `rounded-3xl`).

---

## 🚀 Application Architecture & Screen Hierarchy

### 1. Navigation Bar & Global Utilities
- **Brand Logo**: GraceNet with a glowing purple Sparkle icon and C3 Hackathon badge.
- **Navigation Tabs**:
  - `Sponsorship Matcher`
  - `Wage Transparency`
  - `Career Roadmaps`
  - `Community Hub`
- **Action Buttons**:
  - **Join Network Modal**: Profile builder for Mentees, Mentors, and Executive Sponsors.
  - **Safety & Rights Hub**: One-click drawer with California Labor Code § 1197.5 guidance, EEOC procedures, Equal Rights Advocates hotline, and a **Quick Safe Exit** panic button.
  - **Theme Toggle**: Real-time switch between Warm Porcelain and Dark Slate modes.

### 2. Tab 1: Sponsorship & Mentorship Matcher (`/sponsors`)
- Search by name, company, technical skill, or title.
- Filter pills: `All`, `Software Engineering`, `AI/ML`, `Product`, `Leadership`.
- Sponsor cards showcasing:
  - Avatar, Title, Company (Google Cloud, OpenAI, NASA JPL, Stripe, Adobe, Cloudflare, Meta, Anthropic).
  - Availability pill (e.g. *Open (2 Sponsorship Slots)*).
  - Verified impact counter: *Mentees Promoted* count and rating.
  - Featured wisdom quote.
- **Interactive Request Sponsorship Drawer**:
  - Select engagement mode (Executive Sponsorship vs Technical Mentorship vs Salary Negotiation Coaching).
  - Multi-select priority focus deliverables (e.g., *Staff+ Promotion Dossier*, *Closed-Door Calibration Strategy*).
  - **AI Smart Pitch Generator**: Auto-generates customized pitch letters.
  - Live **My Active Requests** tracker displaying submission history and review status.

### 3. Tab 2: Wage Transparency & Pay Equity Tool (`/pay-equity`)
- **Interactive Calibration Inputs**:
  - Seniority Level (Junior, Mid-Level, Senior, Lead/Staff, Principal/Director).
  - Technical Discipline (Software Engineering, Machine Learning & AI, Product Management, UI/UX Design, Cloud/DevOps).
  - Metro Location & Cost-of-Living Tier (SF Bay Area, NYC, Seattle, Tier-2 Hubs, US Nationwide Remote).
  - Current Base Salary (numeric input + live slider).
- **Live Visual Benchmark Bar**:
  - Displays user salary alongside Female Tech Median, Full Market Parity Target, 75th Percentile, and 90th Percentile.
- **Pay Gap Analysis Badge**:
  - Calculates annual disparity (`-$31,000 / year (-16%)`) and 10-year compounding lost earnings.
- **Dynamic Negotiation Scripts**:
  - Auto-generated counter-offer scripts for *Annual Reviews*, *New Job Offers*, *Promotions*, and *Retention Refresh Grants*.
  - 1-click **Copy Script to Clipboard** with toast confirmation.
  - California Labor Code § 1197.5 statutory references.
- **Peer Wage Submissions**:
  - Real crowd-sourced community compensation data with an anonymous submission form.

### 4. Tab 3: Grace Hopper Skill Roadmaps (`/roadmaps`)
- **Interactive Progress Tracker**: Live progress percentage (0% to 100%) calculated dynamically across active milestones.
- **Four Specialized Technical Tracks**:
  1. *Full-Stack React & Cloud Architecture*
  2. *AI Systems & Applied Machine Learning*
  3. *Open Source Contributing & GHC Leadership*
  4. *Staff+ Technical Track & Executive Presence*
- **Milestone Checklists**:
  - Difficulty tags, estimated study hours, and actionable technical takeaways.
  - Recommended learning resources & documentation links.
- **Achievement Badges Showcase**: Dynamically unlocks badges (*First Step Forward*, *Momentum Builder*, *Grace Hopper Visionary*, *Staff+ Luminary*).
- **Export Career Plan**: 1-click export of career dossier to share with sponsors.

### 5. Tab 4: Community & Safe Space Forum (`/community`)
- **Topic Filters**: `Salary Transparency`, `GHC Networking`, `Workplace Safety`, `Microaggressions`, `Executive Sponsorship`.
- **Search & Sort**: Filter by query and toggle between *Trending* and *Latest*.
- **Interactive Create Post Modal**:
  - **Anonymous Posting Toggle**: Post safely as *Incognito Technologist* with identity protection.
- **Engagement Features**:
  - Live upvote/like counter with heart animations.
  - Threaded replies with inline reply composer.
  - Bookmarking and discussion link sharing.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v3.4 (with custom theme tokens, dark mode, and responsive layout)
- **Icons**: Lucide-React
- **State Architecture**: Pure client-side React state (`useState`, `useEffect`) with zero external backend dependencies needed.
- **Data**: Rich, embedded mock datasets modeled from real tech industry equity benchmarks.

---

## 🏁 Getting Started & Local Development

### Prerequisites
- Node.js (v18+ recommended, verified on v24)
- npm or pnpm

### Installation
```bash
# Clone or navigate to the project directory
cd E:\Projects\GraceNet

# Install dependencies (already installed in workspace)
npm install

# Start the Vite development server
npm run dev
```

### Production Build
```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🏆 C3 Hackathon Highlights
- **Human-Centered UI/UX**: Designed with warm, welcoming porcelain tones and soft amethysts, transitioning seamlessly to dark slate.
- **Trauma-Informed & Safe**: Features a panic exit button and anonymous identity protection to shield users in hostile work environments.
- **Action-Oriented**: Does not just report the wage gap—gives women the scripts, sponsors, and roadmaps to close it.
