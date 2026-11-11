import { ArrowUpRight, Trophy } from "lucide-react";
import type { MiniProject, Project } from "@/data/profile";
import { ExternalLink, TagList, cx, textLink } from "./ui";

function StatusBadge({ project }: { project: Project }) {
  if (project.award) {
    return (
      <span className="inline-flex items-start gap-2 rounded-ctl border border-accent/50 px-2 py-1 text-sm font-medium text-accent">
        <Trophy aria-hidden className="mt-0.5 size-4 shrink-0" />
        {project.award}
      </span>
    );
  }
  if (project.status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-2 rounded-ctl border border-line-strong px-2 py-1 font-mono text-sm leading-none text-fg">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        In progress
      </span>
    );
  }
  return null;
}

/** Large layout for the top project: story on top, metric + write-ups strip below. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="overflow-hidden rounded-card border border-line bg-surface"
    >
      <div className="p-6 md:p-8">
        <p className="font-mono text-sm text-muted">{project.period} · Featured</p>
        <h3 id={`${project.slug}-title`} className="mt-2 text-2xl font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-4 max-w-[65ch] text-base text-muted">{project.summary}</p>
        {project.highlights.length > 0 && (
          <ul className="mt-4 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex max-w-[65ch] gap-3 text-base">
                <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <TagList items={project.tech} label={`${project.name} tech stack`} />
        </div>
      </div>

      <div className="grid gap-8 border-t border-line p-6 md:grid-cols-2 md:p-8">
        {project.metric && (
          <div>
            <p className="font-mono text-sm text-muted">Performance</p>
            <p className="mt-2 font-mono text-4xl font-medium tracking-tight">
              <span className="text-muted line-through decoration-1">{project.metric.before}</span>
              <span aria-hidden className="mx-2 text-muted">
                →
              </span>
              <span className="sr-only"> to </span>
              <span>{project.metric.after}</span>
            </p>
            <p className="mt-2 text-base">
              <span className="font-medium text-accent">{project.metric.label}</span>
              <span className="text-muted"> · {project.metric.context}</span>
            </p>
          </div>
        )}
        {project.links.length > 0 && (
          <div>
            <p className="font-mono text-sm text-muted">Write-ups</p>
            <ul className="mt-2">
              {project.links.map((l) => (
                <li key={l.href}>
                  <ExternalLink href={l.href} className={cx("inline-block py-2 text-base leading-7", textLink)}>
                    {l.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

/** Compact ledger rows for the remaining projects. */
export function ProjectRows({ projects }: { projects: Project[] }) {
  return (
    <ul className="divide-y divide-line border-b border-line">
      {projects.map((p) => (
        <li key={p.slug}>
          <article aria-labelledby={`${p.slug}-title`} className="grid gap-2 py-8 sm:grid-cols-4 sm:gap-8">
            <p className="font-mono text-sm text-muted sm:pt-1">{p.period}</p>
            <div className="sm:col-span-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 id={`${p.slug}-title`} className="text-lg font-semibold tracking-tight">
                  {p.name}
                </h3>
                <StatusBadge project={p} />
              </div>
              <p className="mt-2 max-w-[65ch] text-base text-muted">{p.summary}</p>
              <div className="mt-4">
                <TagList items={p.tech} label={`${p.name} tech stack`} />
              </div>
              {p.links.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-6">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <ExternalLink href={l.href} className={cx("inline-block py-2 text-base leading-7", textLink)}>
                        {l.label}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function MiniProjectGrid({ projects }: { projects: MiniProject[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => {
        const body = (
          <>
            <h3 className="flex items-center justify-between gap-2 text-lg font-semibold tracking-tight">
              {p.name}
              {p.href && (
                <ArrowUpRight
                  aria-hidden
                  className="size-4 shrink-0 text-muted transition-[color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              )}
            </h3>
            <p className="mt-2 text-base text-muted">{p.summary}</p>
            <p className="mt-4 font-mono text-sm text-muted">{p.tech.join(" · ")}</p>
          </>
        );
        const card =
          "block h-full rounded-card border border-line p-6 transition-[transform,border-color] duration-200 ease-out";
        return (
          <li key={p.name}>
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(card, "group hover:-translate-y-0.5 hover:border-line-strong active:translate-y-0")}
              >
                {body}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <div className={card}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
