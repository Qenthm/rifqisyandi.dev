"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Both icons are rendered; CSS picks one based on <html data-theme>, so the
  // server HTML never mismatches the client.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="inline-flex size-11 items-center justify-center rounded-ctl text-muted transition-colors duration-150 ease-out hover:bg-surface hover:text-fg active:translate-y-px"
    >
      <Sun aria-hidden className="size-5 in-data-[theme=light]:hidden" />
      <Moon aria-hidden className="hidden size-5 in-data-[theme=light]:block" />
    </button>
  );
}
