import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-275 px-4 md:px-8", className)} {...props} />;
}

/**
 * Ledger-style section: a mono index label + heading in the left column,
 * content in the right column on desktop; stacked on mobile.
 */
export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <Container className="grid gap-8 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <header className="md:col-span-3" data-reveal>
          <p className="font-mono text-sm text-muted">
            {index} / {id}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl"
          >
            {title}
          </h2>
        </header>
        <div className="min-w-0 md:col-span-9" data-reveal>
          {children}
        </div>
      </Container>
    </section>
  );
}

/** External link: opens in a new tab and shows an ↗ indicator. */
export function ExternalLink({
  href,
  children,
  className,
  iconClassName,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
}) {
  let head: ReactNode = children;
  let tail: ReactNode = null;
  if (typeof children === "string") {
    const i = children.lastIndexOf(" ");
    head = i === -1 ? "" : children.slice(0, i + 1);
    tail = i === -1 ? children : children.slice(i + 1);
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx("group", className)}
    >
      {head}
      {/* Last word + arrow never wrap apart, so the ↗ can't orphan on its own line. */}
      <span className="whitespace-nowrap">
        {tail}
        <ArrowUpRight
          aria-hidden
          className={cx(
            "ml-1 inline-block size-4 align-[-2px] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            iconClassName,
          )}
        />
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export const textLink =
  "text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-accent active:text-accent-hover";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-ctl border border-line px-2 py-1 font-mono text-sm leading-none text-muted">
      {children}
    </li>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ul>
  );
}

const btnBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-ctl px-4 text-base font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:translate-y-px";

export const btn = {
  primary: cx(btnBase, "bg-accent text-accent-fg hover:bg-accent-hover"),
  secondary: cx(
    btnBase,
    "border border-line-strong text-fg hover:border-fg/60 hover:bg-surface",
  ),
};
