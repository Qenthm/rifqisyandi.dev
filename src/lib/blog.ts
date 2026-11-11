import { cacheLife } from "next/cache";
import { blogFeed, type Post } from "@/data/profile";

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .trim();
}

function pick(block: string, tag: string) {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1]) : "";
}

/**
 * Latest posts from the Hugo RSS feed. Cached, so it's fetched at build time
 * and baked into the static page. Falls back to the static list on any error.
 */
export async function getLatestPosts(limit = 3): Promise<Post[]> {
  "use cache";
  cacheLife("days");

  try {
    const res = await fetch(blogFeed.rss, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`RSS ${res.status}`);
    const xml = await res.text();
    const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, item]) => {
        const date = new Date(pick(item, "pubDate"));
        return {
          title: pick(item, "title"),
          href: pick(item, "link"),
          date: Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10),
        };
      })
      .filter((p) => p.title && p.href.startsWith("https://"))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit);
    return posts.length ? posts : blogFeed.fallback.slice(0, limit);
  } catch {
    return blogFeed.fallback.slice(0, limit);
  }
}

export function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
