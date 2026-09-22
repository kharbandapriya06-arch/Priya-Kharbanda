import { ContactForm } from "@/components/ContactForm";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { ProjectsStack } from "@/components/ProjectsStack";
import { education } from "@/lib/experience";
import { site } from "@/lib/site";

export function HomeContent() {
  return (
    <div>
      <Hero />

      <section id="work" className="projects">
        <div className="projects-intro">
          <p className="projects-kicker">001</p>
          <h2 className="projects-heading">Selected work</h2>
        </div>
        <ProjectsStack />
      </section>

      <section id="about" className="scroll-mt-24">
        <ExperienceTimeline />

        <div className="mx-auto w-full max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Education
          </h3>
          <ol className="mt-8 grid gap-8 md:grid-cols-2">
            {education.map((item) => (
              <li key={item.org} className="border-t border-line pt-6">
                <p className="font-serif text-2xl leading-none">{item.org}</p>
                <p className="mt-3 text-sm">{item.title}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {item.dates}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Capabilities
              </h3>
              <ul className="mt-4 space-y-2 text-base">
                {site.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Tools
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                {site.tools.join(" · ")}
              </p>
              <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Practice
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                {site.concepts.join(" · ")}
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Certifications
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6">
                {site.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Additional
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6">
                {site.awards.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul className="mt-6 space-y-1 text-sm text-muted">
                {site.languages.map((item) => (
                  <li key={item.name}>
                    {item.name} ({item.level})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
