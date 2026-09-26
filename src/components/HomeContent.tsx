import { AboutMe } from "@/components/AboutMe";
import { ContactForm } from "@/components/ContactForm";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { ProcessStairs } from "@/components/ProcessStairs";
import { ProjectsStack } from "@/components/ProjectsStack";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { education } from "@/lib/experience";
import { site } from "@/lib/site";

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

      <section id="experience" className="scroll-mt-24">
        <ExperienceTimeline />

        <div className="mx-auto w-full max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
            Education
          </h3>
          <ol className="mt-8 grid gap-8 md:grid-cols-2">
            {education.map((item) => (
              <li key={item.org} className="border-t border-line pt-6">
                <p className="font-display text-2xl font-bold tracking-[-0.035em] leading-[0.95]">
                  {item.org}
                </p>
                <p className="mt-3 text-sm font-medium tracking-[-0.02em]">
                  {item.title}
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                  {item.dates}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Tools
              </h3>
              <p className="mt-4 text-sm font-medium leading-7 tracking-[-0.02em] text-muted">
                {site.tools.join(" · ")}
              </p>
            </div>
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Practice
              </h3>
              <p className="mt-4 text-sm font-medium leading-7 tracking-[-0.02em] text-muted">
                {site.concepts.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
