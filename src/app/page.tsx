import {
  About,
  AwardsSection,
  ContactSection,
  ExperienceSection,
  Hero,
  ProjectsSection,
  Skills,
  WritingSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ExperienceSection />
      <ProjectsSection />
      <AwardsSection />
      <WritingSection />
      <ContactSection />
    </>
  );
}
