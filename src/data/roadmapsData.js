export const ROADMAP_TRACKS = [
  {
    id: "fullstack-react",
    title: "Full-Stack React & Cloud Architecture",
    description: "From component mastery to high-throughput distributed micro-frontends and cloud deployments.",
    icon: "Compass",
    badgeLabel: "Full-Stack Architect",
    color: "from-purple-600 to-indigo-600",
    milestones: [
      {
        id: "fs-1",
        title: "Modern React 19 Core & Server Components",
        category: "Foundations",
        difficulty: "Intermediate",
        estimatedHours: "18 hrs",
        summary: "Master React 19 action hooks (useActionState, useOptimistic, use), Server Actions, and SSR hydration mechanics.",
        resourceTitle: "React.dev 19 Docs & RFCs",
        resourceUrl: "https://react.dev",
        keyTakeaway: "Eliminate unnecessary client bundle size by executing compute on the edge server."
      },
      {
        id: "fs-2",
        title: "State Architecture & Scalable Client Stores",
        category: "Architecture",
        difficulty: "Intermediate",
        estimatedHours: "14 hrs",
        summary: "Design resilient state boundaries using Zustand, TanStack Query, and optimistic UI mutations with rollback strategies.",
        resourceTitle: "TanStack Query Guides",
        resourceUrl: "https://tanstack.com/query",
        keyTakeaway: "Decouple server cache from ephemeral client interaction state."
      },
      {
        id: "fs-3",
        title: "Web Accessibility (WCAG 2.2 AAA) & Keyboard Navigation",
        category: "Accessibility",
        difficulty: "Advanced",
        estimatedHours: "12 hrs",
        summary: "Implement full ARIA live regions, focus trap rings, high-contrast color parity, and screen-reader test suites.",
        resourceTitle: "W3C WAI ARIA Authoring Practices",
        resourceUrl: "https://www.w3.org/WAI/ARIA/apg/",
        keyTakeaway: "Accessibility is an equity imperative, not a post-launch afterthought."
      },
      {
        id: "fs-4",
        title: "Distributed Micro-Frontends & Module Federation",
        category: "Enterprise Systems",
        difficulty: "Advanced",
        estimatedHours: "24 hrs",
        summary: "Architect independent build & deployment pipelines using Webpack Module Federation or Vite federation plugins.",
        resourceTitle: "Micro Frontends in Action Guide",
        resourceUrl: "https://micro-frontends.org",
        keyTakeaway: "Empower autonomous team shipping cadence without breaking shared layout context."
      },
      {
        id: "fs-5",
        title: "Cloud Edge Deployment, CDN Caching & Observability",
        category: "Infrastructure",
        difficulty: "Staff Level",
        estimatedHours: "20 hrs",
        summary: "Deploy geo-distributed edge workers, configure Stale-While-Revalidate cache policies, and instrument OpenTelemetry APM.",
        resourceTitle: "Cloudflare Workers & OpenTelemetry",
        resourceUrl: "https://opentelemetry.io",
        keyTakeaway: "Sub-100ms global Time-to-First-Byte requires compute proximity to user edge."
      }
    ]
  },
  {
    id: "ai-systems",
    title: "AI Systems & Applied Machine Learning",
    description: "From transformer fundamentals to fine-tuning, retrieval-augmented generation (RAG), and production LLM guardrails.",
    icon: "Award",
    badgeLabel: "AI Systems Pioneer",
    color: "from-rose-500 to-purple-600",
    milestones: [
      {
        id: "ai-1",
        title: "Transformer Attention Mechanics & PyTorch Tensors",
        category: "Core AI",
        difficulty: "Intermediate",
        estimatedHours: "25 hrs",
        summary: "Implement scaled dot-product attention and multi-head attention from scratch in PyTorch; analyze compute complexities.",
        resourceTitle: "The Illustrated Transformer & PyTorch Tutorials",
        resourceUrl: "https://jalammar.github.io/illustrated-transformer/",
        keyTakeaway: "Understanding KV-cache bottlenecks is vital for scaling real-time generative inference."
      },
      {
        id: "ai-2",
        title: "High-Precision Vector Retrieval (RAG) Architecture",
        category: "Applied Engineering",
        difficulty: "Intermediate",
        estimatedHours: "20 hrs",
        summary: "Construct hybrid dense-sparse vector pipelines using Qdrant/Pinecone, BM25 rerankers, and contextual chunking strategies.",
        resourceTitle: "LangChain / LlamaIndex Production Patterns",
        resourceUrl: "https://docs.llamaindex.ai",
        keyTakeaway: "RAG quality depends 80% on document parsing and chunk semantics, 20% on model size."
      },
      {
        id: "ai-3",
        title: "Parameter-Efficient Fine-Tuning (LoRA / QLoRA)",
        category: "Model Optimization",
        difficulty: "Advanced",
        estimatedHours: "30 hrs",
        summary: "Fine-tune open weights (Llama-3, Mistral) on domain-specific datasets using 4-bit quantization and PEFT adapters.",
        resourceTitle: "Hugging Face PEFT Library Tutorials",
        resourceUrl: "https://huggingface.co/docs/peft",
        keyTakeaway: "Deliver enterprise-grade domain accuracy at 1/100th the compute budget of full fine-tuning."
      },
      {
        id: "ai-4",
        title: "AI Safety, Hallucination Audits & Adversarial Red-Teaming",
        category: "Safety & Ethics",
        difficulty: "Advanced",
        estimatedHours: "18 hrs",
        summary: "Build automated safety evaluation harnesses to test for prompt injection, jailbreaks, demographic bias, and data leakage.",
        resourceTitle: "NIST AI Risk Management Framework",
        resourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
        keyTakeaway: "Safety verification is a core technical discipline that protects users from systemic harm."
      },
      {
        id: "ai-5",
        title: "Production LLMOps & GPU Cluster Serving (vLLM / Triton)",
        category: "Staff Level",
        difficulty: "Staff Level",
        estimatedHours: "28 hrs",
        summary: "Deploy high-throughput inference engines utilizing continuous batching, PagedAttention, and automated multi-GPU autoscaling.",
        resourceTitle: "vLLM High-Throughput Serving Engine",
        resourceUrl: "https://docs.vllm.ai",
        keyTakeaway: "Mastering throughput vs latency trade-offs is what differentiates senior AI engineers."
      }
    ]
  },
  {
    id: "opensource-ghc",
    title: "Open Source Contributing & GHC Leadership",
    description: "Building a global public technical footprint, speaking at top conferences, and mentoring the next generation.",
    icon: "Shield",
    badgeLabel: "Grace Hopper Luminary",
    color: "from-emerald-500 to-teal-600",
    milestones: [
      {
        id: "os-1",
        title: "First Tier-1 Open Source PR & Code Review",
        category: "Public Impact",
        difficulty: "Beginner",
        estimatedHours: "10 hrs",
        summary: "Identify a 'good first issue' in top ecosystem repositories (React, Vite, Node, Python), submit RFC-compliant PR, and navigate review.",
        resourceTitle: "First Timers Only & Open Source Guide",
        resourceUrl: "https://opensource.guide",
        keyTakeaway: "Open source PRs serve as permanent, publicly auditable proof of code quality and collaboration."
      },
      {
        id: "os-2",
        title: "Submitting a GHC (Grace Hopper Celebration) Technical Talk",
        category: "Conference Leadership",
        difficulty: "Intermediate",
        estimatedHours: "15 hrs",
        summary: "Craft a compelling Call-for-Presentations (CFP) abstract focusing on novel architecture wins, avoiding generic topics.",
        resourceTitle: "AnitaB.org GHC Speaker Resource Kit",
        resourceUrl: "https://ghc.anitab.org",
        keyTakeaway: "Conference speaking positions you as an industry authority and unlocks executive sponsorship."
      },
      {
        id: "os-3",
        title: "Founding or Leading an Employee Resource Group (ERG)",
        category: "Organizational Equity",
        difficulty: "Advanced",
        estimatedHours: "20 hrs",
        summary: "Structure a charter, secure executive budget, and institute mentorship cohorts for women engineers within your enterprise.",
        resourceTitle: "Catalyst Workplace ERG Playbook",
        resourceUrl: "https://www.catalyst.org",
        keyTakeaway: "Convert grassroots community passion into measurable retention metrics and executive recognition."
      },
      {
        id: "os-4",
        title: "Authoring a Technical RFC / Whitepaper with Sponsorship",
        category: "Executive Impact",
        difficulty: "Staff Level",
        estimatedHours: "25 hrs",
        summary: "Author a company-wide or industry technical RFC with backing from cross-functional Principal Engineers and Directors.",
        resourceTitle: "How to Write a Great RFC",
        resourceUrl: "https://github.com/ietf",
        keyTakeaway: "Writing is leverage. An RFC that unifies 10 teams generates 100x individual code output."
      }
    ]
  },
  {
    id: "staff-plus",
    title: "Staff+ Technical Track & Executive Presence",
    description: "Transitioning from individual contributor excellence to cross-organizational technical strategy and executive advocacy.",
    icon: "User",
    badgeLabel: "Staff+ Engineering Leader",
    color: "from-amber-500 to-rose-600",
    milestones: [
      {
        id: "st-1",
        title: "Creating Your 360 Promotion Dossier & Impact Artifacts",
        category: "Career Strategy",
        difficulty: "Intermediate",
        estimatedHours: "12 hrs",
        summary: "Structure quantitative impact documents demonstrating revenue unlocked, latency saved, and talent cultivated.",
        resourceTitle: "Staff Engineer Book by Will Larson",
        resourceUrl: "https://staffeng.com",
        keyTakeaway: "If it is not written down and sponsored, it did not happen during calibration committee."
      },
      {
        id: "st-2",
        title: "Building an Executive Sponsorship Circle",
        category: "Sponsorship",
        difficulty: "Advanced",
        estimatedHours: "16 hrs",
        summary: "Identify 2-3 VP/Director-level leaders outside your direct reporting line to champion your promotion in closed-door sessions.",
        resourceTitle: "GraceNet Executive Sponsorship Blueprint",
        resourceUrl: "#sponsors",
        keyTakeaway: "Mentorship provides advice; sponsorship provides power and advocacy."
      },
      {
        id: "st-3",
        title: "Technical Strategy: Multi-Year Architecture Vision",
        category: "Strategy",
        difficulty: "Staff Level",
        estimatedHours: "30 hrs",
        summary: "Formulate a 3-year technology roadmap balancing technical debt retirement with high-growth business priorities.",
        resourceTitle: "Martin Fowler Architecture Patterns",
        resourceUrl: "https://martinfowler.com",
        keyTakeaway: "True technical strategy simplifies complexity so 50 engineers can move in sync."
      },
      {
        id: "st-4",
        title: "Mastering Closed-Door Calibration & Salary Parity Defense",
        category: "Equity Mastery",
        difficulty: "Executive",
        estimatedHours: "14 hrs",
        summary: "Defend compensation equity bands and advocate for junior women during internal performance calibrations.",
        resourceTitle: "Tech Equity Collaborative Calibration Guides",
        resourceUrl: "https://techequitycollaborative.org",
        keyTakeaway: "Hold the door open and ensure objective scoring metrics triumph over unconscious affinity bias."
      }
    ]
  }
];

export const ACHIEVEMENT_BADGES = [
  {
    id: "first_milestone",
    name: "First Step Forward",
    description: "Completed your first career milestone",
    icon: "CheckCircle",
    requiredCount: 1,
    color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800"
  },
  {
    id: "quarter_master",
    name: "Momentum Builder",
    description: "Completed 25% of your skill roadmap",
    icon: "Award",
    requiredPct: 25,
    color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800"
  },
  {
    id: "halfway_hero",
    name: "Grace Hopper Visionary",
    description: "Reached 50% technical mastery",
    icon: "Compass",
    requiredPct: 50,
    color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800"
  },
  {
    id: "staff_architect",
    name: "Staff+ Luminary",
    description: "Reached 75%+ across tracks",
    icon: "Shield",
    requiredPct: 75,
    color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800"
  }
];
