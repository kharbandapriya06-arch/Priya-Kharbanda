import { AboutMe } from "@/components/AboutMe";
import { ContactForm } from "@/components/ContactForm";
import { Education } from "@/components/Education";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { ProjectsStack } from "@/components/ProjectsStack";
import { HowIWork } from "@/components/ServicesOffer";
import { ServicesStudio } from "@/components/ProcessStairs";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { TechStack } from "@/components/TechStack";

export function HomeContent() {
  return (
    <div>
      <Hero />
      <SkillsMarquee />

      <section id="work" className="projects">
        <div className="projects-intro">
          <p className="projects-kicker">001</p>
          <h2 className="projects-heading">
            <span className="text-gradient">Selected</span> work
          </h2>
        </div>
        <ProjectsStack />
      </section>

      <div className="studio-light">
        <AboutMe />
        <HowIWork />
        <ServicesStudio />
      </div>

      <TechStack />

      <section id="experience" className="scroll-mt-24">
        <ExperienceTimeline />
        <Education />
      </section>

      <ContactForm />
    </div>
  );
}
