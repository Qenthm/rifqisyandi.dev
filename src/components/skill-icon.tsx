import { AudioLines, Box, Database, Server } from "lucide-react";
import * as simpleIcons from "simple-icons";
import type { SkillIcon as SkillIconType } from "@/data/profile";

const lucide = { database: Database, server: Server, audio: AudioLines, box: Box };

type SimpleIcon = { path: string; title: string };

/** Renders a self-hosted logo (simple-icons SVG path, inlined at build time). */
export function SkillIcon({ icon, className }: { icon: SkillIconType; className?: string }) {
  if (icon.kind === "lucide") {
    const Icon = lucide[icon.name];
    return <Icon aria-hidden className={className} strokeWidth={1.75} />;
  }
  const key = `si${icon.slug[0].toUpperCase()}${icon.slug.slice(1)}`;
  const data = (simpleIcons as unknown as Record<string, SimpleIcon | undefined>)[key];
  if (!data) return <Box aria-hidden className={className} strokeWidth={1.75} />;
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={data.path} />
    </svg>
  );
}
