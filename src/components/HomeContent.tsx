import { AboutMe } from "@/components/AboutMe";
import { ContactForm } from "@/components/ContactForm";
import { Education } from "@/components/Education";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { ProcessStairs } from "@/components/ProcessStairs";
import { ProjectsStack } from "@/components/ProjectsStack";
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

      <ProcessStairs />

      <AboutMe />

      <TechStack />

      <section id="experience" className="scroll-mt-24">
        <ExperienceTimeline />
        <Education />
      </section>

      <ContactForm />
    </div>
  );
}
