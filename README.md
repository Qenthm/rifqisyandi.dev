# rifqisyandi.dev

Personal portfolio of Rifqisyandi Khairurrizal. Next.js (App Router) + TypeScript + Tailwind CSS v4, fully static.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also fetches the blog RSS)
npm run lint
```

## Editing content

**All content lives in [`src/data/profile.ts`](src/data/profile.ts).** You shouldn't need to touch components.

| What | Where in `profile.ts` |
| --- | --- |
| Name, headline, bio, "Currently:" line, socials | `profile` |
| SEO title / description / domain | `site` |
| Skills (grouped) | `skillGroups`, where `icon.slug` is a [simple-icons](https://simpleicons.org) slug, or a Lucide fallback |
| Experience timeline | `experience` |
| Featured projects (first one gets the large layout) | `featuredProjects` |
| Smaller cards on `/projects` | `moreProjects` |
| Awards | `awards` |
| Blog feed URL + fallback posts | `blogFeed` |

### Adding the CV
1. Put the PDF at `public/cv.pdf`.
2. In `profile.ts` set `cv.available: true`. The "CV coming soon" placeholder becomes a **Download CV** button.

### Adding a photo
Currently an "RK" initials tile (`Hero` in `src/components/sections.tsx`). To use a photo, put it in `public/` and swap the tile for `next/image` with explicit `width`/`height`.

### Writing section
Latest 3 posts are pulled from `https://rifqi-blog.vercel.app/index.xml` **at build time** (cached for a day). If the feed is unreachable, `blogFeed.fallback` is shown. Redeploy to pick up new posts immediately.

## Design system
- Colors are CSS variables in `src/app/globals.css` (`--bg`, `--surface`, `--border`, `--muted`, `--fg`, `--accent`), exposed to Tailwind as `bg-bg`, `text-muted`, `text-accent`, etc. Dark is default; the toggle saves to `localStorage`.
- Type scale: 14 / 16 / 18 / 24 / 36 / 56px. Fonts: Geist + Geist Mono.
- Radius: 12px cards (`rounded-card`), 8px controls (`rounded-ctl`).
- Motion: 150–300ms ease-out, disabled under `prefers-reduced-motion`.

## Deploy (Vercel)
1. Push to GitHub, then on [vercel.com/new](https://vercel.com/new) import the repo (no config needed), or run `npx vercel` then `npx vercel --prod`.
2. Domain: buy `rifqisyandi.dev` (Cloudflare, Porkbun, Namecheap, or Vercel). `.dev` is HSTS-preloaded, so HTTPS is mandatory; Vercel issues the certificate automatically.
3. Vercel → Project → Settings → Domains: add `rifqisyandi.dev` and `www.rifqisyandi.dev` (set `www` to redirect to the apex), then set the DNS records Vercel shows you (apex `A` + `www` `CNAME`), or switch nameservers to Vercel.
