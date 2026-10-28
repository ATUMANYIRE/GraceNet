export const COMMUNITY_POSTS = [
  {
    id: "post-1",
    author: {
      name: "Incognito Technologist",
      role: "Staff Infrastructure Engineer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      isAnonymous: true,
      badge: "Verified Tech Staff"
    },
    title: "How I negotiated an additional $45k base using California Equal Pay Act data",
    content: "During calibration last week, HR offered a promotion to L6 with only a 7% bump ($195k). I politely paused the verbal offer, pulled audited industry medians for the Bay Area ($240k), and cited California Labor Code Section 1197.5 regarding substantially similar work. Two days later, they revised to $240k base + $50k refresh grant. Don't be afraid to cite labor equity laws—HR knows the exposure.",
    category: "Salary Transparency",
    tags: ["Salary Transparency", "Promotion", "Legal Rights"],
    createdAt: "2 hours ago",
    likes: 128,
    isLiked: false,
    replies: [
      {
        id: "rep-1-1",
        author: {
          name: "Jessica Wu",
          role: "Senior PM @ Adobe",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
          isAnonymous: false
        },
        content: "Bookmarking this! California’s transparency law has been such a game-changer. Congratulations on holding your ground!",
        createdAt: "1 hour ago"
      },
      {
        id: "rep-1-2",
        author: {
          name: "Incognito Technologist",
          role: "Director of Engineering",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          isAnonymous: true
        },
        content: "As an engineering director who sits on calibration panels: yes! When candidates come equipped with audited data and statutory language, compensation committees immediately approve the exception.",
        createdAt: "45 mins ago"
      }
    ]
  },
  {
    id: "post-2",
    author: {
      name: "Danielle Vance",
      role: "AI Research Scientist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      isAnonymous: false,
      badge: "GHC Speaker '24"
    },
    title: "GHC (Grace Hopper Celebration) Meetup: Organizing an informal peer mentorship circle",
    content: "Heading to the Catalyst California Conference and Grace Hopper Celebration this fall! If anyone is attending solo or feeling overwhelmed by the corporate booth lines, we are setting up a morning coffee huddle for early-career and mid-level women to swap system design interview questions and practice executive elevator pitches. Drop a reply to join our Slack/Discord channel!",
    category: "GHC Networking",
    tags: ["GHC Networking", "Mentorship", "Community"],
    createdAt: "5 hours ago",
    likes: 84,
    isLiked: true,
    replies: [
      {
        id: "rep-2-1",
        author: {
          name: "Sofia Rodriguez",
          role: "Junior Fullstack Dev",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
          isAnonymous: false
        },
        content: "I'd love to join! It's my very first time at a major tech conference and I was terrified of walking the expo floor alone.",
        createdAt: "3 hours ago"
      }
    ]
  },
  {
    id: "post-3",
    author: {
      name: "Incognito Technologist",
      role: "Backend Systems Lead",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      isAnonymous: true,
      badge: "Community Ally"
    },
    title: "Tactics for dealing with the 'Repeater' in architecture reviews: Credit reclamation scripts",
    content: "We've all been there: you propose a technical solution in Slack or a zoom call, complete silence, and 5 minutes later a male colleague repeats the exact same suggestion and receives praise. Here are the 2 scripts that changed my life:\n\n1. 'Thanks for echoing my proposal from earlier, [Name]! To build on what I shared on slide 3...'\n2. 'I'm glad you agree with the distributed cache architecture I outlined in the RFC.'\n\nAlways reclaim credit calmly and immediately.",
    category: "Workplace Safety",
    tags: ["Microaggressions", "Workplace Safety", "Executive Presence"],
    createdAt: "Yesterday",
    likes: 215,
    isLiked: false,
    replies: [
      {
        id: "rep-3-1",
        author: {
          name: "Dr. Maya Lin-Vanderbilt",
          role: "VP of Engineering",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
          isAnonymous: false
        },
        content: "Spot on. As a senior leader, I also make it my mission to interrupt and say: 'Let's make sure we credit Danielle who first brought this architecture up 5 minutes ago.' Leaders must amplify.",
        createdAt: "18 hours ago"
      }
    ]
  },
  {
    id: "post-4",
    author: {
      name: "Dr. Maya Lin-Vanderbilt",
      role: "VP of Engineering @ Google Cloud",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      isAnonymous: false,
      badge: "Executive Sponsor"
    },
    title: "Demystifying the Staff+ Calibration Room: What directors actually say when doors close",
    content: "When engineering leadership sits down to calibrate Staff (L6) and Principal (L7) promotions, the technical evaluation is already done. What we actually discuss is:\n1. 'Can this engineer represent the company in front of major enterprise clients or open source communities without embarrassing us?'\n2. 'When an incident occurs, do other senior engineers naturally look to her for leadership?'\n3. 'Does she have an executive sponsor in this room fighting for her headcount?'\n\nIf you don't have a sponsor in that calibration room, your dossier will get tabled regardless of your code output.",
    category: "Career Growth",
    tags: ["Career Growth", "Executive Sponsorship", "Promotion"],
    createdAt: "1 day ago",
    likes: 342,
    isLiked: true,
    replies: [
      {
        id: "rep-4-1",
        author: {
          name: "Amina El-Sayed",
          role: "Senior Cloud Architect",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          isAnonymous: false
        },
        content: "This is the single most honest summary of calibration I've ever read. Thank you Dr. Maya! This gave me the exact courage to request an executive sponsor.",
        createdAt: "20 hours ago"
      }
    ]
  },
  {
    id: "post-5",
    author: {
      name: "Tanya Kowalski",
      role: "Staff Reliability Engineer",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80",
      isAnonymous: false,
      badge: "Verified Staff"
    },
    title: "Returning from maternity leave as a Staff Engineer: How I preserved my rating and bonus",
    content: "Before taking 5 months parental leave, I was terrified my promotion trajectory would be reset. Here's what worked:\n\n1. Pre-leave impact document: Formally handed off systems with clear attribution.\n2. Scheduled a return ramp (80% hours for the first month without pay reduction, protected under California CFRA).\n3. Connected with a senior woman VP sponsor who ensured my review was annualized based on the 7 active months rather than penalized for the absence.\n\nKnow your legal protections. The 'motherhood penalty' in tech is real, but it is illegal to prorate ratings maliciously.",
    category: "Workplace Safety",
    tags: ["Workplace Safety", "Parental Leave", "Legal Rights"],
    createdAt: "2 days ago",
    likes: 189,
    isLiked: false,
    replies: [
      {
        id: "rep-5-1",
        author: {
          name: "Incognito Technologist",
          role: "Staff ML Engineer",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
          isAnonymous: true
        },
        content: "I needed to see this so badly. Heading out on leave in 6 weeks and my anxiety has been through the roof. Thank you Tanya!",
        createdAt: "1 day ago"
      }
    ]
  },
  {
    id: "post-6",
    author: {
      name: "Carmen Morales",
      role: "Senior Director of Product @ Stripe",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80",
      isAnonymous: false,
      badge: "Executive Sponsor"
    },
    title: "The subtle difference between a Mentor and a Sponsor (and why I was stuck at Senior for 4 years)",
    content: "For years, I had wonderful mentors. They gave great advice over coffee. But my career was stagnant. Why? Because mentors give advice; sponsors give opportunity.\n\nA mentor helps you write a better RFC. A sponsor puts you in charge of the company's highest-priority multi-million dollar migration and tells the CEO you're the only person who can deliver it.\n\nIf you have 3 mentors and 0 sponsors, prioritize finding a sponsor today on GraceNet.",
    category: "Career Growth",
    tags: ["Career Growth", "Mentorship", "Executive Sponsorship"],
    createdAt: "2 days ago",
    likes: 412,
    isLiked: true,
    replies: []
  },
  {
    id: "post-7",
    author: {
      name: "Elena Rostova",
      role: "Staff ML Engineer @ OpenAI",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      isAnonymous: false,
      badge: "AI Researcher"
    },
    title: "AI Engineering Study Group: Building Open-Source Agent Workflows & Eval Suites",
    content: "Calling all women engineers interested in building production AI agents! We're forming a bi-weekly hands-on hacking group to build:\n\n1. Deterministic evaluation suites for LLMs\n2. Real-time RAG pipelines with hybrid semantic search\n3. Tool-calling autonomous agents with rollback safety\n\nOpen to all skill levels! If you've been wanting to transition from frontend/backend to AI engineering, this is your community.",
    category: "GHC Networking",
    tags: ["GHC Networking", "AI Engineering", "Open Source"],
    createdAt: "3 days ago",
    likes: 156,
    isLiked: false,
    replies: [
      {
        id: "rep-7-1",
        author: {
          name: "Zara Thorne",
          role: "Head of AI Ethics",
          avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80",
          isAnonymous: false
        },
        content: "Happy to join as a guest advisor and host an interactive workshop on Constitutional AI alignment for the group!",
        createdAt: "2 days ago"
      }
    ]
  },
  {
    id: "post-8",
    author: {
      name: "Incognito Technologist",
      role: "Lead Systems Architect",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      isAnonymous: true,
      badge: "Verified Technologist"
    },
    title: "Salary Transparency 2026: Why sharing compensation numbers with female colleagues dismantles the penalty",
    content: "Last month, 4 female engineers on my team quietly shared our W-2 totals. We discovered a $35k base disparity between two engineers with the exact same title, tenure, and ratings. We approached our manager together with market comp sheets. All four of us received equity equity refreshes and market corrections.\n\nSecrecy only protects underpaying corporations. Transparency is our greatest leverage.",
    category: "Salary Transparency",
    tags: ["Salary Transparency", "Pay Equity", "Legal Rights"],
    createdAt: "4 days ago",
    likes: 278,
    isLiked: true,
    replies: []
  }
];

export const FORUM_CATEGORIES = [
  "All",
  "Salary Transparency",
  "Career Growth",
  "Workplace Safety",
  "GHC Networking"
];

export const FORUM_TAGS = FORUM_CATEGORIES;

