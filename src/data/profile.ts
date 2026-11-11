/**
 * All site content lives here. Edit this file to update the portfolio —
 * components read from it and never hard-code personal details.
 */

export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  /** Short label shown next to the name, e.g. a year, "Solo", "In progress". */
  period: string;
  status?: "in-progress";
  tech: string[];
  summary: string;
  highlights: string[];
  award?: string;
  /** Optional headline metric, rendered in the featured layout. */
  metric?: { before: string; after: string; label: string; context: string; href?: string };
  links: Link[];
};

export type MiniProject = {
  name: string;
  tech: string[];
  summary: string;
  href?: string;
};

export type SkillIcon =
  | { kind: "simple"; slug: string }
  | { kind: "lucide"; name: "database" | "server" | "audio" | "box" };

export type Skill = { name: string; icon: SkillIcon };

export type SkillGroup = { label: string; skills: Skill[] };

export type Experience = {
  role: string;
  org: string;
  period: string;
  start: string; // ISO yyyy-mm, used for <time>
  end: string;
  points: string[];
};

export type Award = { title: string; event: string; date: string; detail: string };

export type Post = { title: string; href: string; date: string /* ISO */ };

export const site = {
  url: "https://rifqisyandi.dev",
  title: "Rifqisyandi Khairurrizal — Full-stack & ML engineer",
  description:
    "Rifqi is a Computer Science student at Universitas Indonesia building full-stack products and moving into ML engineering — speech recognition for stuttered speech, invoice risk scoring, and an ICP hackathon win.",
};

export const profile = {
  name: "Rifqisyandi Khairurrizal",
  shortName: "Rifqi",
  initials: "RK",
  headline: "Full-stack developer moving into ML / AI engineering",
  education: "Computer Science @ Universitas Indonesia (Fasilkom UI)",
  location: "Jakarta, Indonesia",
  currently: "speech recognition for stuttered speech",
  bio: [
    "I'm a Computer Science student at Universitas Indonesia who likes building real products end to end — backend, frontend, and lately machine learning.",
    "I was Scrum Master for a 9-person team shipping an invoice risk-scoring SaaS, won 1st place at CodeFest ICP Hackathon 3.0, and I'm now working on speech recognition for people who stutter.",
    "The areas I want to go deeper in are ML engineering, backend systems, and post-quantum cryptography.",
  ],
  facts: [
    { label: "Studying", value: "B.Sc. Computer Science, Fasilkom UI" },
    { label: "Class of", value: "2023 · expected graduation July 2027" },
    { label: "Interests", value: "ML engineering, backend systems, post-quantum cryptography" },
  ],
  email: "rifqisyandik@gmail.com",
  socials: {
    github: "https://github.com/Qenthm",
    linkedin: "https://www.linkedin.com/in/rifqisyandi/",
    blog: "https://rifqi-blog.vercel.app",
  },
  cv: {
    href: "/cv.pdf",
    /** Flip to true once public/cv.pdf exists. */
    available: false,
  },
};

const blog = (slug: string) => `https://rifqi-blog.vercel.app/posts/${slug}/`;

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { name: "Python", icon: { kind: "simple", slug: "python" } },
      { name: "Java", icon: { kind: "simple", slug: "openjdk" } },
      { name: "TypeScript", icon: { kind: "simple", slug: "typescript" } },
      { name: "JavaScript", icon: { kind: "simple", slug: "javascript" } },
      { name: "Rust", icon: { kind: "simple", slug: "rust" } },
      { name: "SQL", icon: { kind: "lucide", name: "database" } },
      { name: "C++", icon: { kind: "simple", slug: "cplusplus" } },
    ],
  },
  {
    label: "Frameworks",
    skills: [
      { name: "FastAPI", icon: { kind: "simple", slug: "fastapi" } },
      { name: "Django", icon: { kind: "simple", slug: "django" } },
      { name: "Spring Boot", icon: { kind: "simple", slug: "springboot" } },
      { name: "React", icon: { kind: "simple", slug: "react" } },
      { name: "Celery", icon: { kind: "simple", slug: "celery" } },
      { name: "Azle", icon: { kind: "simple", slug: "internetcomputer" } },
    ],
  },
  {
    label: "Machine learning",
    skills: [
      { name: "PyTorch", icon: { kind: "simple", slug: "pytorch" } },
      { name: "Whisper", icon: { kind: "lucide", name: "audio" } },
      { name: "scikit-learn", icon: { kind: "simple", slug: "scikitlearn" } },
    ],
  },
  {
    label: "Tools & cloud",
    skills: [
      { name: "Git", icon: { kind: "simple", slug: "git" } },
      { name: "Docker", icon: { kind: "simple", slug: "docker" } },
      { name: "PostgreSQL", icon: { kind: "simple", slug: "postgresql" } },
      { name: "AWS EC2", icon: { kind: "lucide", name: "server" } },
      { name: "Linux", icon: { kind: "simple", slug: "linux" } },
      { name: "Vercel", icon: { kind: "simple", slug: "vercel" } },
      { name: "Linear", icon: { kind: "simple", slug: "linear" } },
    ],
  },
];

export const experience: Experience[] = [
  {
    role: "Teaching Assistant — Introduction to Computer Organization",
    org: "Fakultas Ilmu Komputer, Universitas Indonesia",
    period: "Aug 2024 – Jun 2025",
    start: "2024-08",
    end: "2025-06",
    points: ["Assisted students in the course through lab sessions, grading, and Q&A."],
  },
];

export const featuredProjects: Project[] = [
  {
    slug: "sira",
    name: "Smart Invoice Reminder AI (SIRA)",
    period: "2026",
    tech: ["Python", "FastAPI", "React", "Celery", "PostgreSQL"],
    summary:
      "SaaS accounts-receivable platform that automatically reminds customers to pay their invoices. Team of 9 — I was Scrum Master and a full-stack developer.",
    highlights: [
      "Built a deterministic, weighted credit-risk scoring engine that rates each customer LOW / MEDIUM / HIGH, so businesses know who to follow up first.",
      "Profiled a Celery background task with pyinstrument and removed an N+1 query bottleneck, then refactored it with Extract Class and dependency injection.",
    ],
    metric: {
      before: "121 ms",
      after: "4 ms",
      label: "~97% faster",
      context: "Celery task after removing an N+1 query",
      href: blog("tdd-beyond-green"),
    },
    links: [
      { label: "Benchmarks: TDD beyond green tests", href: blog("tdd-beyond-green") },
      { label: "A three-tier static analysis gate", href: blog("static-analysis-three-tiers") },
      { label: "OCP, ISP and LSP in a FastAPI service", href: blog("three-solid-principles-one-protocol") },
    ],
  },
  {
    slug: "submid",
    name: "SubmiD",
    period: "2024",
    tech: ["TypeScript", "Azle", "React", "Internet Computer"],
    summary:
      "Decentralized form builder and response-collection platform on the Internet Computer, built by a team of 4 in about two weeks. I owned testing and deployment for the final demo.",
    highlights: [],
    award: "1st place · CodeFest ICP Hackathon 3.0",
    links: [],
  },
  {
    slug: "stutter-asr",
    name: "Speech Recognition for Stuttered Speech",
    period: "Ongoing",
    status: "in-progress",
    tech: ["Python", "OpenAI Whisper"],
    summary:
      "Disfluency-aware ASR for Indonesian speech: reproducing an existing research pipeline and adapting it so Whisper handles stuttered speech better, and exploring a live streaming version.",
    highlights: [],
    links: [],
  },
  {
    slug: "scele-bot",
    name: "SCeLE Deadline Bot",
    period: "Solo",
    tech: ["TypeScript", "Node.js", "GitHub Actions", "Vercel"],
    summary:
      "Monitors SCeLE, UI's Moodle-based learning platform, and sends Discord alerts when deadlines or course content change.",
    highlights: [],
    links: [],
  },
];

export const moreProjects: MiniProject[] = [
  {
    name: "Building Store",
    tech: ["Java", "Spring Boot", "React"],
    summary: "E-commerce app — I built 3 of its 5 core modules end to end.",
  },
  {
    name: "Sijarta",
    tech: ["JavaScript", "Node.js"],
    summary: "Household-services booking platform — I built 1 of its 4 core modules.",
  },
  {
    name: "Personal tech blog",
    tech: ["Hugo", "Vercel"],
    summary: "Engineering write-ups on profiling, refactoring, and TDD.",
    href: "https://rifqi-blog.vercel.app",
  },
];

export const awards: Award[] = [
  {
    title: "Champion",
    event: "CodeFest ICP Hackathon 3.0",
    date: "May 2024",
    detail: "With SubmiD, a decentralized form builder on the Internet Computer.",
  },
];

export const blogFeed = {
  rss: "https://rifqi-blog.vercel.app/index.xml",
  /** Shown if the RSS feed can't be fetched at build time. */
  fallback: [
    {
      title: "Git, Linear, Discord: The Automation Layer That Replaced Manual Status Updates",
      href: blog("discord-linear-dev-workflow"),
      date: "2026-05-25",
    },
    {
      title: "Static Analysis Isn't Optional: How We Built a Three-Tier Quality Gate for SIRA",
      href: blog("static-analysis-three-tiers"),
      date: "2026-05-25",
    },
    {
      title: "TDD Isn't Enough: How Benchmarks Turned Green Tests Into Real Evidence",
      href: blog("tdd-beyond-green"),
      date: "2026-05-22",
    },
  ] satisfies Post[],
};

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
];
