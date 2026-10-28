export const ROLE_LEVELS = [
  { id: "junior", label: "Junior / Entry (L3 / IC1)", yoe: "0 - 2 YOE", baseMultiplier: 1.0 },
  { id: "mid", label: "Mid-Level (L4 / IC2)", yoe: "3 - 5 YOE", baseMultiplier: 1.35 },
  { id: "senior", label: "Senior Engineer (L5 / IC3)", yoe: "5 - 8 YOE", baseMultiplier: 1.78 },
  { id: "lead", label: "Lead / Staff (L6 / IC4)", yoe: "8 - 12 YOE", baseMultiplier: 2.28 },
  { id: "principal", label: "Principal Engineer (L7 / IC5)", yoe: "12 - 15 YOE", baseMultiplier: 2.90 },
  { id: "director", label: "Engineering Director / VP (L8+ / M2)", yoe: "15+ YOE", baseMultiplier: 3.65 }
];

export const DISCIPLINES = [
  { id: "swe", label: "Software Engineering (Full-Stack / Backend)", baseRate: 142000 },
  { id: "aiml", label: "Machine Learning & AI Systems Engineering", baseRate: 168000 },
  { id: "pm", label: "Product Management (Technical PM)", baseRate: 148000 },
  { id: "design", label: "UI/UX Product Design & Systems", baseRate: 132000 },
  { id: "cloud", label: "Cloud, DevOps & Site Reliability (SRE)", baseRate: 146000 },
  { id: "security", label: "Cybersecurity & Zero-Trust Engineering", baseRate: 154000 },
  { id: "data", label: "Data Engineering & Distributed Analytics", baseRate: 144000 }
];

export const LOCATIONS = [
  { id: "bayarea", label: "San Francisco Bay Area / Silicon Valley", geoFactor: 1.25, tier: "Tier 1 Metro" },
  { id: "nyc", label: "New York City Metro", geoFactor: 1.20, tier: "Tier 1 Metro" },
  { id: "seattle", label: "Seattle / Puget Sound", geoFactor: 1.15, tier: "Tier 1 Tech" },
  { id: "austin", label: "Austin / Denver / Chicago / Boston", geoFactor: 1.05, tier: "Tier 2 Metro" },
  { id: "remote", label: "US Nationwide Remote (Tier-Neutral)", geoFactor: 1.00, tier: "National Remote" },
  { id: "london", label: "London / European Tech Hubs", geoFactor: 0.95, tier: "International Hub" },
  { id: "toronto", label: "Toronto / Canadian Tech Corridor", geoFactor: 0.92, tier: "Canadian Hub" }
];

// Calculate audited benchmark metrics
export function calculateBenchmark(disciplineId, levelId, locationId) {
  const discipline = DISCIPLINES.find(d => d.id === disciplineId) || DISCIPLINES[0];
  const level = ROLE_LEVELS.find(l => l.id === levelId) || ROLE_LEVELS[1];
  const location = LOCATIONS.find(loc => loc.id === locationId) || LOCATIONS[0];

  const rawMedian = discipline.baseRate * level.baseMultiplier * location.geoFactor;
  // Audited tech industry gap: Women in tech average 9% to 14% below male peers at identical titles
  const auditedFemaleMedian = Math.round(rawMedian * 0.91 / 1000) * 1000;
  const auditedMarketMedian = Math.round(rawMedian / 1000) * 1000;
  const percentile75 = Math.round(rawMedian * 1.18 / 1000) * 1000;
  const percentile90 = Math.round(rawMedian * 1.35 / 1000) * 1000;
  const equityParityTarget = Math.round(rawMedian * 1.12 / 1000) * 1000;

  return {
    disciplineName: discipline.label,
    levelName: level.label,
    yoe: level.yoe,
    locationName: location.label,
    auditedFemaleMedian,
    auditedMarketMedian,
    percentile75,
    percentile90,
    equityParityTarget,
    documentedGapPct: 9.0
  };
}

export const NEGOTIATION_TEMPLATES = [
  {
    id: "annual_review",
    title: "Annual Performance Review & Market Adjustment",
    purpose: "Use during review cycles when your impact exceeds initial scope or when peer salaries have outpaced yours.",
    generateScript: ({ roleTitle, userSalary, marketMedian, gapAmount }) => `Dear [Manager Name],

I am eager to discuss my performance and total compensation trajectory for the upcoming cycle. Over the past year in my role as ${roleTitle}, I have consistently delivered critical outcomes, including [Highlight 2 Major Metric-Driven Wins, e.g., reducing API latency by 32% and leading our multi-tenant migration].

Based on comprehensive salary benchmarks validated across the Catalyst California Conference and tech industry equity audits, the current market median for an engineer with my scope and impact is $${marketMedian.toLocaleString()}, whereas my current base is $${userSalary.toLocaleString()} (a disparity of approximately $${gapAmount.toLocaleString()}).

Given my expanded responsibilities and documented delivery, I am requesting an upward market compensation adjustment to $${marketMedian.toLocaleString()} to align with industry parity and reflect the commercial value I bring to the team.

I look forward to discussing how we can formalize this adjustment in our 1:1 this Thursday.

Best regards,
[Your Name]`
  },
  {
    id: "offer_counter",
    title: "New Job Offer Counter-Offer Script",
    purpose: "Use when receiving an initial offer that falls short of your target or the 75th percentile benchmark.",
    generateScript: ({ roleTitle, marketMedian, targetComp }) => `Hi [Recruiter / Hiring Manager],

Thank you so much for extending this offer to join the team as ${roleTitle}. I am genuinely excited about the company's mission and the technical challenges in front of us.

I’ve reviewed the compensation details thoroughly. Given the technical scope of the role, my specific track record in [Key Differentiator / Skill], and current market benchmarks for this tier, I was anticipating a base compensation closer to $${targetComp.toLocaleString()} with a total package reflecting top-quartile market rates ($${marketMedian.toLocaleString()}+ base).

If we are able to reach $${targetComp.toLocaleString()} base (or adjust the initial equity grant by equivalent value), I would be thrilled to sign immediately and decline other active interview loops.

Could we schedule a brief 10-minute call tomorrow to discuss bridging this delta?

Warmly,
[Your Name]`
  },
  {
    id: "promotion_equity",
    title: "Promotion Out-of-Band Pay Adjustment",
    purpose: "Use when taking on increased scope or promotion title without commensurate compensation bump.",
    generateScript: ({ roleTitle, marketMedian, gapAmount }) => `Hi [Manager / HR Business Partner],

Thank you for recognizing my technical leadership and formalizing my transition to ${roleTitle}. 

As we calibrate compensation bands for this level, I want to ensure my remuneration accurately reflects this elevated scope. Market audits for women in engineering at this level reflect a median rate of $${marketMedian.toLocaleString()}. 

Currently, our proposed adjustment leaves an equity delta of $${gapAmount.toLocaleString()} relative to equivalent internal and industry benchmarks. To ensure competitive retention and fair pay parity, I am proposing we set the base compensation at $${marketMedian.toLocaleString()} effective with the promotion cycle.

I have documented the business impact metrics and peer comps in the attached one-pager for your review with HR compensation committee.

Respectfully,
[Your Name]`
  },
  {
    id: "retention_counter",
    title: "Executive Retention & Equity Top-Up Ask",
    purpose: "Use for requesting refresh grants or out-of-cycle retention bonus when facing unvested cliff.",
    generateScript: ({ roleTitle, marketMedian }) => `Dear [Executive Sponsor / VP of Eng],

I wanted to follow up on our discussion regarding high-leverage initiatives for the next fiscal year. As a key contributor to our ${roleTitle} charter, I am deeply invested in driving these systems forward.

As my initial equity cliff approaches, I've analyzed our retention equity guidelines alongside current Tier-1 tech compensation benchmarks ($${marketMedian.toLocaleString()}+ total comp benchmark). To maintain alignment and long-term retention through the completion of our multi-year roadmap, I would like to request an equity refresh grant of [Number of RSU Units] or an equivalent retention performance bonus.

I would appreciate 15 minutes next week to review this proposal before executive calibration.

Thank you,
[Your Name]`
  }
];

export const COMMUNITY_SALARY_SUBMISSIONS = [
  {
    id: "cs-1",
    role: "Senior Software Engineer",
    companyTier: "Tier 1 Big Tech (Google/Meta)",
    location: "Bay Area, CA",
    yoe: 6,
    baseSalary: 215000,
    totalComp: 375000,
    gender: "Woman",
    negotiatedDelta: "+$32,000",
    tips: "Leveraged competing offers and highlighted my cross-functional system design patents."
  },
  {
    id: "cs-2",
    role: "Staff Machine Learning Engineer",
    companyTier: "AI Unicorn / Research Lab (OpenAI/Anthropic)",
    location: "San Francisco (Hybrid)",
    yoe: 9,
    baseSalary: 275000,
    totalComp: 560000,
    gender: "Woman",
    negotiatedDelta: "+$65,000 equity",
    tips: "Refused initial recruiter equity number. Asked for 75th percentile band using GraceNet benchmarks."
  },
  {
    id: "cs-3",
    role: "Lead Product Designer & Design Systems",
    companyTier: "Series D Fintech (Stripe/Plaid)",
    location: "New York, NY",
    yoe: 7,
    baseSalary: 195000,
    totalComp: 265000,
    gender: "Woman of Color",
    negotiatedDelta: "+$24,000 base",
    tips: "Used the Annual Review script. Pointed out that I was mentoring 3 junior designers with zero comp adjustment."
  },
  {
    id: "cs-4",
    role: "Mid-Level Full Stack Engineer",
    companyTier: "Public Enterprise SaaS (Salesforce/Workday)",
    location: "Remote (US)",
    yoe: 3,
    baseSalary: 152000,
    totalComp: 188000,
    gender: "Woman",
    negotiatedDelta: "+$18,000",
    tips: "Never reveal current salary first. Under California and NY labor laws, employers cannot legally ask your past wage!"
  },
  {
    id: "cs-5",
    role: "Engineering Manager (DevOps & Platform)",
    companyTier: "Cloud Infrastructure Leader (AWS/Cloudflare)",
    location: "Seattle, WA",
    yoe: 10,
    baseSalary: 245000,
    totalComp: 435000,
    gender: "Woman",
    negotiatedDelta: "+$45,000",
    tips: "Had an executive sponsor inside the VP circle who vouched for my critical path ownership during calibration."
  },
  {
    id: "cs-6",
    role: "Principal Distributed Systems Architect",
    companyTier: "Streaming Tech Giant (Netflix)",
    location: "Bay Area, CA",
    yoe: 13,
    baseSalary: 420000,
    totalComp: 610000,
    gender: "Woman",
    negotiatedDelta: "+$70,000 all-cash",
    tips: "Netflix uses top-of-market all-cash model. I brought audited data on distributed storage latency savings to command top tier."
  },
  {
    id: "cs-7",
    role: "Senior Security / Zero-Trust Engineer",
    companyTier: "Cybersecurity Leader (CrowdStrike/Datadog)",
    location: "Austin, TX (Remote)",
    yoe: 8,
    baseSalary: 210000,
    totalComp: 320000,
    gender: "Woman",
    negotiatedDelta: "+$28,000",
    tips: "Obtained executive sponsorship early. Demonstrated how my IAM vulnerability fix saved an estimated $1.2M in regulatory exposure."
  },
  {
    id: "cs-8",
    role: "Director of Software Engineering",
    companyTier: "Enterprise Big Tech (Microsoft)",
    location: "Seattle, WA",
    yoe: 16,
    baseSalary: 310000,
    totalComp: 680000,
    gender: "Woman of Color",
    negotiatedDelta: "+$95,000 RSU refresh",
    tips: "Negotiated during VP-level reorganization. Secured a written commitment for equal retention refreshes tied to divisional KPI delivery."
  },
  {
    id: "cs-9",
    role: "Data Platform Architect",
    companyTier: "Data Cloud Unicorn (Snowflake/Databricks)",
    location: "San Francisco, CA",
    yoe: 7,
    baseSalary: 220000,
    totalComp: 390000,
    gender: "Woman",
    negotiatedDelta: "+$35,000",
    tips: "Showed exact revenue impact of pipeline optimizations. Never apologize for asking for what male peers make."
  },
  {
    id: "cs-10",
    role: "Lead Mobile iOS Systems Engineer",
    companyTier: "Consumer Tech Giant (Apple/Uber)",
    location: "New York, NY",
    yoe: 8,
    baseSalary: 225000,
    totalComp: 380000,
    gender: "Woman",
    negotiatedDelta: "+$30,000 signing bonus",
    tips: "Pushed for sign-on bonus to offset unvested stock left behind at my previous employer."
  }
];
