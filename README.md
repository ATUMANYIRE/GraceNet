# 🌟 GraceNet — Women in Tech Career Sponsorship & Pay Equity Platform
> **Built for the Catalyst California Conference (C3) Hackathon**  
> *The Career Copilot Built For Women In Technology.*

---

## 💎 Design Philosophy & Aesthetic (Inspired by Corvana AI)

GraceNet combines the human empowerment mission of the **Catalyst California Conference** with the refined, modern editorial craftsmanship of high-end AI copilots:
- **Consistent Brand Identity**: An iconic geometric violet-to-rose gradient **"G" Spark Logo Mark** (`#3B82F6` → `#6D28D9` → `#8B5CF6` → `#F43F5E`) used across the platform:
  - In browser tab favicon (`<link rel="icon">`)
  - In top announcement bar
  - In main navigation header
  - In Hero showcase cards (Verified Sponsor pill, Calibration Trust card)
  - In modal headers and badge seals
  - In footer branding
- **Typography**: Tight neo-grotesk (`Inter` & `Plus Jakarta Sans`) with headlines styled at 500 weight with tight tracking (`-0.045em`).
- **Color Palette**:
  - **Background**: Warm Porcelain `#FEFEFE` (and `#0F172A` Dark Slate Mode)
  - **Primary Ink**: Deep Black `#000000` / `#0F172A`
  - **Nav Ink**: Muted Slate `#3A3C40`
  - **Brand Colors**: Deep Violet `#6D28D9`, Rose Quartz `#F43F5E`, Soft Amethyst `#EDE9FE`, Emerald Accent `#10B981`

---

## 🚀 Hero Showcase & Screen Hierarchy

### 1. Top Announcement Bar
- 38px gradient bar (`#6D28D9` → `#F43F5E`) highlighting the **Catalyst California Conference (C3) Hackathon** with an instant *"CLAIM YOUR SPONSOR NOW"* action link.

### 2. Navigation Bar
- 68px clean white bar with hairline border, brand "G" Spark mark, central nav links (`Sponsorship` · `Pay Equity` · `Roadmaps` · `Community`), quick *"Safety & Rights"* pill, dark/light theme toggle, and *"Join Network"* onboarding pill.

### 3. Dynamic Hero Section
- **Headline**: Two centred lines in tight neo-grotesk:
  - *"The Career Copilot Built For"*
  - *"Women In Technology"*
- **Subline**: *"From salary parity audits to executive sponsorship doors, take control of your career trajectory while cultivating allies who advocate for you in closed-door calibration rooms."*
- **Main Action Button**: A 240px frosted glass ring with backdrop blur holding a black tactile pill button: *"Match With A Sponsor"*.
- **Pixel ECG Career Pulse Line**: Edge-to-edge pixel-art staircase wave spanning 1514u width behind the button with 6.2u squares on a 9.6u grid, brand violet `#6D28D9` and rose `#F43F5E` cardiac spikes, and a continuous 3.2s monitor sweep light.
- **Three Tall Rounded Showcase Panels (1313.5 × 429.5u)**:
  1. **Executive Sponsor Panel**: Mint-to-sky studio gradient with Dr. Maya Lin-Vanderbilt (VP of Engineering), live video loop, and *"Verified Executive Sponsor • Google Cloud"* badge.
  2. **Wage Transparency Metric Panel**: Card showing **$240K** median base salary, lavender chip **+18.4%** *"vs Market Benchmark"*, and dual trajectory chart comparing Female Tech Median vs Industry Market Target.
  3. **Grace Hopper Calibration Panel**: Abstract floral bloom background holding the frosted **98% Promotion Calibration Rate** card with symmetric violet bar-wave meter and **142+ Women Promoted** avatars card.

---

## 🛠️ Complete Platform Modules

### 1. Tab 1: Executive Sponsorship & Mentorship Matcher (`/sponsors`)
- Search by name, title, company, or technical skill with filter pills (`All`, `Software Engineering`, `AI/ML`, `Product`, `Leadership`).
- Verified sponsor cards from **Google, Meta, NASA JPL, OpenAI, Stripe, Cloudflare, Adobe**.
- Interactive **Request Sponsorship Drawer**:
  - Engagement mode selection (Executive Sponsorship vs Technical Mentorship vs Salary Negotiation Coaching).
  - Priority focus areas (*Staff+ Dossier*, *Calibration Strategy*, *System Design*).
  - **AI Smart Pitch Generator** for introductory cover letters.
  - Live **My Active Requests** tracker.

### 2. Tab 2: Audited Wage Transparency & Parity Engine (`/pay-equity`)
- Calibration inputs: Seniority Level, Technical Discipline, Metro Location, and Current Salary slider.
- Live **Visual Benchmark Distribution Bar** comparing user compensation to Female Median, Market Parity Target, 75th Percentile, and 90th Percentile.
- **Pay Gap Analysis Badge** calculating dollar disparity and 10-year compounding lost earnings.
- **Dynamic Negotiation Scripts** for Annual Reviews, Job Offers, Promotions, and Retention Grants with 1-click clipboard copy.
- Anonymous peer wage disclosures with submission modal.

### 3. Tab 3: Grace Hopper Skill Roadmaps (`/roadmaps`)
- 0%–100% dynamic progress bar calculated across active tracks.
- Four career tracks:
  1. *Full-Stack React & Cloud Architecture*
  2. *AI Systems & Machine Learning Engineering*
  3. *Open Source Contributing & GHC Leadership*
  4. *Staff+ Technical Track & Executive Presence*
- Checkable milestones with difficulty badges, estimated hours, and curated learning links.
- Unlockable achievement badges (*First Step Forward*, *Momentum Builder*, *Grace Hopper Visionary*, *Staff+ Luminary*).
- 1-click Career Dossier export.

### 4. Tab 4: Community & Safe Space Forum (`/community`)
- Verified safe space forum with topic filters (`Salary Transparency`, `GHC Networking`, `Workplace Safety`, `Microaggressions`).
- **Anonymous Posting Toggle** (`Incognito Technologist`) with identity protection.
- Upvote/like counters with heart animations and threaded replies.

### 5. Workplace Safety & Rights Hub
- Accessible via Navbar pill or panic button.
- Comprehensive guides on **California Equal Pay Act (Labor Code § 1197.5)**, EEOC deadlines, Equal Rights Advocates hotline, 988 mental health crisis lines, and off-premise documentation protocols.
- **Quick Safe Exit** button that immediately redirects to Wikipedia for privacy.

---

## 🏁 Getting Started & Local Development

```bash
# Clone or navigate to the repository
cd E:\Projects\GraceNet

# Start the Vite development server
npm run dev

# Or build for production
npm run build
```

* **Live Development Server**: [http://localhost:5173/](http://localhost:5173/)
