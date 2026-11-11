import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FeaturedProject, MiniProjectGrid, ProjectRows } from "@/components/projects";
import { Container } from "@/components/ui";
import { featuredProjects, moreProjects } from "@/data/profile";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Everything Rifqi has built: SIRA, SubmiD (CodeFest ICP Hackathon 3.0 winner), speech recognition for stuttered speech, and more.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const [top, ...rest] = featuredProjects;
  return (
    <Container className="py-16 md:py-24">
      <Link
        href="/"
        className="group inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted transition-colors duration-150 hover:text-fg"
      >
        <ArrowLeft
          aria-hidden
          className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
        />
        Back home
      </Link>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Projects</h1>
      <p className="mt-4 max-w-[60ch] text-lg text-muted">
        Team products, hackathon builds, research, and small tools, newest work first.
      </p>

      <section aria-label="Featured projects" className="mt-16">
        <FeaturedProject project={top} />
        <div className="mt-8">
          <ProjectRows projects={rest} />
        </div>
      </section>

      <section aria-labelledby="more-title" className="mt-16 md:mt-24">
        <p className="font-mono text-sm text-muted">More</p>
        <h2 id="more-title" className="mt-2 text-2xl font-semibold tracking-tight">
          Other projects
        </h2>
        <div className="mt-8">
          <MiniProjectGrid projects={moreProjects} />
        </div>
      </section>
    </Container>
  );
}
