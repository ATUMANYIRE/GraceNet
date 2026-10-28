export const ROADMAP_TRACKS = [
  {
    id: "fullstack-react",
    title: "Full-Stack React & Cloud Architecture",
    description: "From component mastery to high-throughput distributed micro-frontends and cloud deployments.",
    icon: "Compass",
    badgeLabel: "Full-Stack Architect",
    color: "from-[#7A5CF0] to-[#6A4CEB]",
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
    color: "from-[#F8533F] to-[#FA6E5C]",
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
        estimatedHours: "22 hrs",
        summary: "Fine-tune open-weights models (Llama 3 / Mistral) using low-rank adapters and 4-bit quantization on consumer GPUs.",
        resourceTitle: "Hugging Face PEFT Library Documentation",
        resourceUrl: "https://huggingface.co/docs/peft",
        keyTakeaway: "LoRA adapts models with <1% trainable parameters while preserving base general capabilities."
      },
      {
        id: "ai-4",
        title: "Safety Guardrails, Red Teaming & Bias Auditing",
        category: "Ethics & Safety",
        difficulty: "Advanced",
        estimatedHours: "16 hrs",
        summary: "Design LLM guardrail interceptors, semantic toxic classifiers, prompt injection defenses, and demographic parity tests.",
        resourceTitle: "NVIDIA NeMo Guardrails & OWASP LLM Top 10",
        resourceUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        keyTakeaway: "Women technologists must lead safety evaluations to prevent reinforcing historical bias."
      },
      {
        id: "ai-5",
        title: "Distributed GPU Inference Serving (vLLM & TensorRT-LLM)",
        category: "Staff Level",
        difficulty: "Staff Level",
        estimatedHours: "28 hrs",
        summary: "Optimize batch throughput with PagedAttention, continuous batching, speculative decoding, and model parallelism.",
        resourceTitle: "vLLM High-Throughput Serving Engine",
        resourceUrl: "https://vllm.ai",
        keyTakeaway: "Continuous batching improves GPU compute utilization from 15% to over 70% in high concurrency."
      }
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud Native, DevOps & High-Availability SRE",
    description: "Designing self-healing, multi-region distributed cloud infrastructure with zero downtime.",
    icon: "Shield",
    badgeLabel: "SRE Champion",
    color: "from-indigo-600 to-blue-700",
    milestones: [
      {
        id: "cd-1",
        title: "Containerization & Declarative Kubernetes Orchestration",
        category: "Infrastructure",
        difficulty: "Intermediate",
        estimatedHours: "20 hrs",
        summary: "Build multi-stage Docker images, write production Kubernetes manifests, configure Ingress controllers, and manage ConfigMaps.",
        resourceTitle: "Kubernetes The Hard Way",
        resourceUrl: "https://github.com/kelseyhightower/kubernetes-the-hard-way",
        keyTakeaway: "Treat infrastructure manifests as immutable declarative code tested via GitOps."
      },
      {
        id: "cd-2",
        title: "Infrastructure as Code (Terraform & OpenTofu)",
        category: "Cloud Ops",
        difficulty: "Intermediate",
        estimatedHours: "16 hrs",
        summary: "Structure modular Terraform configurations with state locking in DynamoDB/S3 and automated drift detection pipelines.",
        resourceTitle: "Terraform Best Practices by Anton Babenko",
        resourceUrl: "https://www.terraform-best-practices.com/",
        keyTakeaway: "Module composition and remote state isolation prevent catastrophic blast radiuses."
      },
      {
        id: "cd-3",
        title: "Zero-Trust Service Mesh & Mutual TLS (mTLS)",
        category: "Security",
        difficulty: "Advanced",
        estimatedHours: "18 hrs",
        summary: "Implement Istio or Linkerd service meshes for transparent cryptographic workload authentication and traffic splitting.",
        resourceTitle: "Istio Service Mesh Architecture",
        resourceUrl: "https://istio.io/latest/docs/",
        keyTakeaway: "Never trust internal VPC network perimeters; enforce end-to-end identity at the application layer."
      },
      {
        id: "cd-4",
        title: "Chaos Engineering & Automated Disaster Recovery",
        category: "Reliability",
        difficulty: "Advanced",
        estimatedHours: "22 hrs",
        summary: "Simulate random node terminates and network partition splits using Chaos Mesh to validate SLA self-healing targets.",
        resourceTitle: "Principles of Chaos Engineering",
        resourceUrl: "https://principlesofchaos.org/",
        keyTakeaway: "If you don't intentionally inject failure during business hours, production will inject it at 3 AM."
      },
      {
        id: "cd-5",
        title: "Multi-Region Active-Active Database Replication",
        category: "Staff Level",
        difficulty: "Staff Level",
        estimatedHours: "30 hrs",
        summary: "Architect global transactional consensus using CockroachDB, Google Spanner, or DynamoDB Global Tables.",
        resourceTitle: "Designing Data-Intensive Applications by Martin Kleppmann",
        resourceUrl: "https://dataintensive.net/",
        keyTakeaway: "The CAP theorem cannot be cheated; choose your consistency tradeoffs deliberately based on business domain."
      }
    ]
  },
  {
    id: "staff-leadership",
    title: "Engineering Leadership & Staff+ Influence",
    description: "Strategies for technical sponsorship, cross-team consensus, executive presence, and promotion calibrations.",
    icon: "Award",
    badgeLabel: "Staff+ Executive Leader",
    color: "from-amber-600 to-rose-600",
    milestones: [
      {
        id: "sl-1",
        title: "The Staff Engineer Archetypes & Career Alignment",
        category: "Career Strategy",
        difficulty: "Intermediate",
        estimatedHours: "10 hrs",
        summary: "Identify whether your impact matches Tech Lead, Architect, Solver, or Right Hand archetypes; align expectations with your VP.",
        resourceTitle: "Staff Engineer: Leadership Beyond the Management Track by Will Larson",
        resourceUrl: "https://staffeng.com/",
        keyTakeaway: "Staff+ is not just Senior++—it requires driving organizational alignment and setting technical direction."
      },
      {
        id: "sl-2",
        title: "Architectural RFCs & Asynchronous Consensus Building",
        category: "Technical Strategy",
        difficulty: "Advanced",
        estimatedHours: "14 hrs",
        summary: "Author high-stakes RFCs (Request for Comments). Master pre-wiring consensus before public review meetings.",
        resourceTitle: "Pragmatic Engineer RFC Guide",
        resourceUrl: "https://blog.pragmaticengineer.com/",
        keyTakeaway: "Controversial decisions are never decided in the review meeting; they are calibrated in 1:1 conversations beforehand."
      },
      {
        id: "sl-3",
        title: "Building an Irrefutable Staff+ Promotion Dossier",
        category: "Promotion",
        difficulty: "Advanced",
        estimatedHours: "16 hrs",
        summary: "Compile multi-million dollar business impact records, peer sponsor testimonials, and cross-organizational references.",
        resourceTitle: "The Performance Calibration Playbook",
        resourceUrl: "https://github.com",
        keyTakeaway: "Do not leave your promotion to chance. Give your sponsor the exact bullet points they need in the room."
      },
      {
        id: "sl-4",
        title: "Actively Sponsoring & Multiplying Junior & Mid Women",
        category: "Sponsorship",
        difficulty: "Leadership",
        estimatedHours: "18 hrs",
        summary: "Formalize intentional sponsorship: mention protégés in leadership forums, pass high-visibility projects, and audit review notes.",
        resourceTitle: "Catalyst California Sponsor Action Matrix",
        resourceUrl: "https://catalyst.org",
        keyTakeaway: "True executive leadership is measured by how many chairs you pull up to the table behind you."
      },
      {
        id: "sl-5",
        title: "Board & C-Suite Technical Communication",
        category: "Executive",
        difficulty: "Staff Level",
        estimatedHours: "20 hrs",
        summary: "Translate technical architectural debt into balance-sheet risk, regulatory liability, and revenue opportunity for executives.",
        resourceTitle: "Communicating with Executives as an Engineer",
        resourceUrl: "https://hbr.org",
        keyTakeaway: "Executives do not care about Kubernetes clusters; they care about latency risk, headcount efficiency, and uptime SLA."
      }
    ]
  },
  {
    id: "open-source",
    title: "Open Source Contribution & Technical Advocacy",
    description: "Becoming a recognized open-source maintainer, keynote speaker, and industry standard author.",
    icon: "Compass",
    badgeLabel: "Open Source Champion",
    color: "from-violet-600 to-fuchsia-600",
    milestones: [
      {
        id: "os-1",
        title: "Navigating Upstream RFCs & First Foundation Pull Request",
        category: "Community",
        difficulty: "Beginner",
        estimatedHours: "12 hrs",
        summary: "Clone major repositories (React, Node, Kubernetes), participate in community SIG meetings, and land your first upstream bug fix.",
        resourceTitle: "First Timers Only & CNCF Contributor Guide",
        resourceUrl: "https://www.firsttimersonly.com/",
        keyTakeaway: "Open-source credibility begins with humble documentation fixes, test coverage, and reproducible bug reports."
      },
      {
        id: "os-2",
        title: "CI/CD Automation, Semantic Releases & Vulnerability Triage",
        category: "Maintainership",
        difficulty: "Intermediate",
        estimatedHours: "15 hrs",
        summary: "Configure GitHub Actions workflows with automated SBOM generation, Dependabot security alerts, and semantic versioning.",
        resourceTitle: "Open Source Security Foundation (OpenSSF) Best Practices",
        resourceUrl: "https://bestpractices.coreinfrastructure.org/",
        keyTakeaway: "A well-maintained library has automated security scans and crystal clear release notes."
      },
      {
        id: "os-3",
        title: "Technical Writing, Architecture Blog Posts & Deep Dives",
        category: "Advocacy",
        difficulty: "Intermediate",
        estimatedHours: "14 hrs",
        summary: "Write compelling technical breakdowns that reach the top of Hacker News, Lobste.rs, and engineering team newsletters.",
        resourceTitle: "Google Developer Technical Writing Course",
        resourceUrl: "https://developers.google.com/tech-writing",
        keyTakeaway: "Writing in public attracts incoming opportunities, job offers, and conference invitations without cold applying."
      },
      {
        id: "os-4",
        title: "Crafting Winning Conference CFPs (Grace Hopper & Strange Loop)",
        category: "Public Speaking",
        difficulty: "Advanced",
        estimatedHours: "18 hrs",
        summary: "Formulate catchy titles, structured abstract outlines, and demo rehearsals that secure main-stage keynote slots.",
        resourceTitle: "Speaking at Tech Conferences: The Complete Speaker Guide",
        resourceUrl: "https://ghc.anitab.org",
        keyTakeaway: "Conference selection committees look for novel learnings and actionable takeaways, not product pitches."
      },
      {
        id: "os-5",
        title: "Foundation Governance & Becoming an Official Project Maintainer",
        category: "Governance",
        difficulty: "Staff Level",
        estimatedHours: "24 hrs",
        summary: "Step up into CNCF, Apache, or Linux Foundation governance boards. Shape standard specifications that impact the entire industry.",
        resourceTitle: "Linux Foundation Governance Guide",
        resourceUrl: "https://www.linuxfoundation.org/",
        keyTakeaway: "When women participate in technical standards bodies, the architecture of the internet reflects all of us."
      }
    ]
  }
];

export const ACHIEVEMENTS = [
  {
    id: "ach-1",
    title: "First Step Taken",
    description: "Completed your first career roadmap milestone.",
    threshold: 1,
    color: "text-[#7A5CF0] bg-[#F1EDFE] border-[#E8E2FD]"
  },
  {
    id: "ach-2",
    title: "Halfway Hero",
    description: "Completed 50% or more of your active track.",
    threshold: 3,
    color: "text-[#F8533F] bg-[#FFF0EE] border-[#FEDCD8]"
  },
  {
    id: "ach-3",
    title: "Mastery Unlocked",
    description: "Achieved 100% completion in a specialized track.",
    threshold: 5,
    color: "text-[#6A4CEB] bg-[#F1EDFE] border-[#E8E2FD]"
  }
];

export const ACHIEVEMENT_BADGES = ACHIEVEMENTS;

