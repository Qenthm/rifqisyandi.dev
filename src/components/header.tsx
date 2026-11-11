import Link from "next/link";
import { nav, profile } from "@/data/profile";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-ctl focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex h-16 w-full max-w-275 items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-fg"
          aria-label={`${profile.name}, home`}
        >
          <span aria-hidden className="text-accent">
            ~/
          </span>
          rifqisyandi
        </Link>
        <div className="flex items-center gap-1">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-ctl px-3 text-sm text-muted transition-colors duration-150 ease-out hover:text-fg active:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <MobileMenu items={nav} />
        </div>
      </div>
    </header>
  );
}
