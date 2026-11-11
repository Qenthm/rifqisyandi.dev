import { cacheLife } from "next/cache";
import { profile } from "@/data/profile";
import { Container } from "./ui";

async function year() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-2 py-8 font-mono text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {await year()} {profile.name}
        </p>
        <p>Built with Next.js · Jakarta</p>
      </Container>
    </footer>
  );
}
