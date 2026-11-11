import { ArrowRight, ArrowUpRight, Download, FileText, Mail, MapPin, Trophy } from "lucide-react";
import Link from "next/link";
import {
  awards,
  experience,
  featuredProjects,
  profile,
  skillGroups,
} from "@/data/profile";
import { formatDate, getLatestPosts } from "@/lib/blog";
import { FeaturedProject, ProjectRows } from "./projects";
import { SkillIcon } from "./skill-icon";
import { Container, ExternalLink, Section, btn, cx, textLink } from "./ui";

function GithubMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

function LinkedinMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function SocialButtons() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <ul className="flex flex-wrap gap-2">
      <li>
        {profile.cv.available ? (
          <a href={profile.cv.href} download className={btn.primary}>
            <Download aria-hidden className="size-4" />
            Download CV
          </a>
        ) : (
          <span
            aria-disabled="true"
            title="CV not uploaded yet: add the PDF to public/ and set cv.available = true"
            className="inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded-ctl border border-dashed border-line-strong px-4 text-base text-muted"
          >
            <FileText aria-hidden className="size-4" />
            CV coming soon
          </span>
        )}
      </li>
      <li>
        <a href={profile.socials.github} {...ext} className={btn.secondary}>
          <GithubMark className="size-4" />
          GitHub
          <ArrowUpRight aria-hidden className="size-4 text-muted" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <a href={profile.socials.linkedin} {...ext} className={btn.secondary}>
          <LinkedinMark className="size-4" />
          LinkedIn
          <ArrowUpRight aria-hidden className="size-4 text-muted" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <a href={`mailto:${profile.email}`} className={btn.secondary}>
          <Mail aria-hidden className="size-4" />
          Email
        </a>
      </li>
    </ul>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Container className="py-16 md:py-24">
        <div
          aria-hidden
          className="flex size-16 items-center justify-center rounded-card border border-line-strong bg-surface font-mono text-2xl font-medium tracking-tight"
        >
          {profile.initials}
        </div>
        <p className="mt-8 font-mono text-sm text-muted">Hi, I&apos;m {profile.shortName} 👋</p>
        <h1
          id="hero-title"
          className="mt-2 text-4xl font-semibold tracking-[-0.03em] md:text-6xl"
        >
          {profile.name}
        </h1>
        <p className="mt-4 max-w-[60ch] text-lg text-muted md:text-2xl md:leading-snug">
          <span className="text-fg">{profile.headline}.</span> {profile.education}, class of 2023.
        </p>
        <ul className="mt-6 flex flex-col gap-2 font-mono text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
          <li className="inline-flex items-center gap-2">
            <MapPin aria-hidden className="size-4" />
            {profile.location}
          </li>
          <li className="inline-flex items-center gap-2">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            <span>
              Currently: <span className="text-fg">{profile.currently}</span>
            </span>
          </li>
        </ul>
        <div className="mt-8">
          <SocialButtons />
        </div>
      </Container>
    </section>
  );
}

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="max-w-[65ch] space-y-4 text-lg">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        {profile.facts.map((f) => (
          <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-4 sm:gap-8">
            <dt className="font-mono text-sm text-muted sm:pt-0.5">{f.label}</dt>
            <dd className="text-base sm:col-span-3">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" index="02" title="Skills">
      <div className="space-y-8">
        {skillGroups.map((g) => (
          <div key={g.label}>
            <h3 className="font-mono text-sm text-muted">{g.label}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {g.skills.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center gap-3 rounded-ctl border border-line px-3 py-2 text-base"
                >
                  <SkillIcon icon={s.icon} className="size-4 shrink-0 text-muted" />
                  <span className="truncate">{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" index="03" title="Experience">
      <ol className="relative border-l border-line">
        {experience.map((e) => (
          <li key={e.role} className="relative pb-8 pl-8 last:pb-0">
            <span
              aria-hidden
              className="absolute top-1.5 -left-1.25 size-2.5 rounded-full border-2 border-bg bg-accent"
            />
            <p className="font-mono text-sm text-muted">
              <time dateTime={e.start}>{e.period.split(" – ")[0]}</time> –{" "}
              <time dateTime={e.end}>{e.period.split(" – ")[1]}</time>
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">{e.role}</h3>
            <p className="text-base text-muted">{e.org}</p>
            <ul className="mt-4 space-y-2">
              {e.points.map((p) => (
                <li key={p} className="max-w-[65ch] text-base">
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function ProjectsSection() {
  const [top, ...rest] = featuredProjects;
  return (
    <Section id="projects" index="04" title="Projects">
      <FeaturedProject project={top} />
      <div className="mt-8">
        <ProjectRows projects={rest} />
      </div>
      <Link href="/projects" className={cx(btn.secondary, "mt-8 group")}>
        See all projects
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      </Link>
    </Section>
  );
}

export function AwardsSection() {
  return (
    <Section id="awards" index="05" title="Awards">
      <ul className="divide-y divide-line border-y border-line">
        {awards.map((a) => (
          <li key={a.event} className="grid gap-2 py-6 sm:grid-cols-4 sm:gap-8">
            <p className="font-mono text-sm text-muted sm:pt-0.5">{a.date}</p>
            <div className="sm:col-span-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <Trophy aria-hidden className="size-4 text-accent" />
                {a.title} · {a.event}
              </h3>
              <p className="mt-1 text-base text-muted">{a.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export async function WritingSection() {
  const posts = await getLatestPosts(3);
  return (
    <Section id="writing" index="06" title="Writing">
      <p className="max-w-[65ch] text-lg">
        I write about the engineering behind my projects: profiling, refactoring, testing, and
        team workflow.
      </p>
      <ol className="mt-8 divide-y divide-line border-y border-line">
        {posts.map((p) => (
          <li key={p.href}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-1 py-4 sm:grid-cols-4 sm:gap-8"
            >
              <time dateTime={p.date} className="font-mono text-sm text-muted sm:pt-0.5">
                {formatDate(p.date)}
              </time>
              <span className="flex items-start justify-between gap-4 text-base font-medium sm:col-span-3">
                <span className="transition-colors duration-150 ease-out group-hover:text-accent">
                  {p.title}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-muted transition-[color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ol>
      <ExternalLink href={profile.socials.blog} className={cx("mt-6 inline-block py-2 text-base leading-7", textLink)}>
        All posts on rifqi-blog
      </ExternalLink>
    </Section>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" index="07" title="Contact">
      <p className="max-w-[65ch] text-lg">
        Email is the best way to reach me. I&apos;m also on GitHub and LinkedIn.
      </p>
      <a
        href={`mailto:${profile.email}`}
        className={cx(
          "mt-4 inline-block font-medium tracking-tight break-all text-2xl md:text-4xl",
          textLink,
        )}
      >
        {profile.email}
      </a>
      <div className="mt-8">
        <SocialButtons />
      </div>
    </Section>
  );
}
