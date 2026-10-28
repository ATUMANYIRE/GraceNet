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
    category: "Microaggressions",
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
      name: "Amina Diallo",
      role: "Principal Security Architect",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80",
      isAnonymous: false,
      badge: "Sponsor Mentor"
    },
    title: "Mentorship is good, but Sponsorship is what will get you to Principal & Director",
    content: "If you feel stuck at Senior (L5) for more than 3 years, more code reviews will not unlock L6. You need an Executive Sponsor: someone who actively mentions your name when VPs discuss who will lead high-visibility $10M+ initiatives. In the GraceNet Sponsorship tab, look for sponsors with 'Executive Sponsorship' tags. Reach out with your recent wins and ask for 20 minutes to share your promotion charter.",
    category: "Executive Sponsorship",
    tags: ["Executive Sponsorship", "Career Growth", "Staff Engineer"],
    createdAt: "2 days ago",
    likes: 310,
    isLiked: true,
    replies: []
  }
];

export const FORUM_TAGS = [
  "All",
  "Salary Transparency",
  "GHC Networking",
  "Workplace Safety",
  "Microaggressions",
  "Executive Sponsorship"
];
