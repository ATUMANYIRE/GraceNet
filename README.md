# 🩺 Corvana AI — Clinical Front Desk AI Copilot
> **Single-file, one-screen landing hero for Corvana AI**  
> *The AI Copilot Made For Calmer Clinical Coordination.*

---

## 💎 Branding & Identity System

Corvana AI is built with a cohesive, modern medical-technology aesthetic:
- **Logo Mark**: A precision blue-violet gradient geometric **"V" mark** (`#3B82F6` → `#6366F1` → `#7A5CF0`) symbolizing velocity, care, and precision AI.
- **Brand Typography**: Tight neo-grotesk (`Inter` / `Inter Display` style) for all interface elements. The headline is 500 weight with tight `-0.045em` tracking.
- **Color Palette**:
  - **Page**: Pure White `#FEFEFE`
  - **Ink**: Deep Black `#000000`
  - **Nav Ink**: Muted Slate `#3A3C40`
  - **Muted**: Neutral Grey `#5E6064`
  - **Primary Accent**: Energetic Coral `#F8533F`
  - **Announcement Accent**: Coral `#FA6E5C`
  - **Data Violet**: Violet `#7A5CF0`
  - **Chip Lavender**: Soft Lavender `#F1EDFE` → `#E8E2FD` with violet ink `#6A4CEB`

---

## 📐 Layout & Mathematical Scaling

The composition is authored in reference px of a **1514×1039** artboard:
```css
--u: min(100cqw / 1514, max(100svh / 1039, .68px));
```
- **Desktop (≥1024px)**: The entire composition locks within the viewport centered both horizontally and vertically, scaling continuously without scrollbars.
- **Mobile & Portrait (<1024px)**: The page re-flows into a locked screen with real pixel dimensions and a horizontal swipeable panel strip with synchronized active pagination dots.

---

## 🔬 Core Components & Visual Architecture

### 1. Announcement Bar
- **Dimensions**: Full width, 38px tall in coral `#FA6E5C`.
- **Content**: "30% off for all new clinics." with an underlined "CLAIM THE DEAL NOW" link.

### 2. Navigation Bar
- **Dimensions**: Full width, 68px tall, white with a hairline bottom border (`rgba(0,0,0,0.06)`).
- **Left**: Blue-violet gradient "V" logo mark and "Corvana AI" brand title.
- **Centre**: `Care` (current, bold 600 weight) · `Features` · `Clinics` · `Customers` · `Careers`.
- **Right**: Light-grey "Watch a Demo" pill button.

### 3. Headline & Subline
- **Headline**: Two centred lines in clip masks (72u, 500 weight, `-0.045em` tracking):
  - *"The AI Copilot Made For Calmer"*
  - *"Clinical Coordination"*
- **Subline**: 22.4u font size / 31u line-height in muted slate (`#5E6064`):
  - *"From first check-in to aftercare reminders, take over routine tasks and paperwork while giving every patient a warm welcome."*

### 4. Heartbeat Trace & Main CTA
- **Main Button**: A 233×71.5u frosted glass ring (translucent white `rgba(255,255,255,0.72)` with 14px backdrop blur and soft shadow) holding a black pill button: *"Start Your Trial"* (22u). Lifts 1px on hover with an elevated shadow.
- **Pixel ECG Trace**: Runs edge-to-edge behind the button across the full 1514u width:
  - **Pixels**: 6.2u squares on a 9.6u grid, coral `#F8533F` with lighter `#FB7565` baseline dots.
  - **Position**: Baseline sits 9u below the button centre.
  - **Cardiac Spikes**: Four heartbeats located at −462u, −225u, +231u, and +468u from the centre. Each features a P bump, Q dip, tall R spike (≈60u up staircase), S drop (≈47u down staircase), and T bump.
  - **Monitor Sweep**: 3.2s looping linear animation delayed by `--t` = x / 1514, sweeping a glowing bright monitor head left to right while pixels settle to 58% opacity.

### 5. Strip of Three Tall Rounded Panels (1313.5 × 429.5u)
- **Panel 1: Patient Panel (436.5u)**
  - Smooth mint-green to pale sky-blue studio gradient (`#a4e6ce` → `#bde8f5`).
  - Still fallback image of a laughing older woman with silver wavy hair, gold hoops, and a coral knit sweater.
  - 5-second seamless looping video overlaid at 107.78% width, left −3.89%, full height, fading in automatically once playback initiates.
  - Corvana AI Front Desk Copilot verification badge.
- **Panel 2: Metric Panel (425.5u)**
  - Neutral `#EAEAEA` background framing a white 339×316u card.
  - *"Check-ins Completed"* with an interactive `›` chevron button (gets grey hover disc).
  - Stat: **18.7K** (50u, 600 weight) + lavender chip **+21.3%** *"vs Prior Week"*.
  - SVG chart with violet `#7A5CF0` and coral `#F8533F` rising trajectory lines, filled coral dot with soft ring, ringed violet dot, grey vertical drop line, and bottom tick marks.
- **Panel 3: Peony Panel (436.5u)**
  - High-resolution macro of ruffled coral peony petals.
  - Frosted 292×241u **Patient Trust Rating** card:
    - **98%** (44.5u, 400 weight).
    - Symmetric violet bar-wave meter opening smoothly from the centre on entrance.
    - Sentiment: *"Wonderful"* with 5 gold stars.
  - White 66.5u **Avatars Card**:
    - Three overlapping rounded clinician photos.
    - **62K+** Clinicians Onboarded.

---

## 🎬 Motion Choreography (Web Animations API)
- Behind an `entry-pending` class with an automatic failsafe timer:
  1. Announcement bar, logo, and nav links rise in (55ms stagger).
  2. Headline lines wipe up out of their clip masks, followed by the subline.
  3. Glass ring fades in and the black CTA button rises.
  4. Metric card and right peony stack rise into place.
  5. Chart lines draw in with `stroke-dashoffset`, dots pop with elastic scaling, and the bar-wave meter expands outward.
- **Accessibility**: Honors `prefers-reduced-motion: reduce` by bypassing entrance timelines, video autoplay, and sweeps.

---

## 💻 Tech Stack & Zero Build Step
- **Plain HTML5, CSS3, and Vanilla JavaScript**: Zero frameworks, zero external compile dependencies.
- **Double-click ready**: Open `index.html` directly in any web browser, or serve through any static host.
- Also compatible with Vite for local development (`npm run dev` / `npm run build`).

---

## 🚀 Local Development & Preview

```bash
# Clone or navigate to the directory
cd E:\Projects\GraceNet

# Start the local server
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) to view the live Corvana AI hero.
