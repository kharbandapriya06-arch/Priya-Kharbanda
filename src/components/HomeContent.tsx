import { ContactForm } from "@/components/ContactForm";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectCard } from "@/components/ProjectCard";
import { education } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export function HomeContent() {
  return (
    <div id="top">
      <section className="mx-auto w-full max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {site.availability} · {site.location}
        </p>
        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.8rem,8vw,6.4rem)] leading-[0.92] tracking-tight">
          Interfaces and systems that make complex work feel{" "}
          <em className="text-accent">simple to use</em>.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
          {site.intro}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <a
            href="#work"
            className="bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-accent"
          >
            Selected work
          </a>
          <a
            href="#contact"
            className="text-sm underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Start a project
          </a>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:grid-cols-3 md:px-8">
          <p>UI/UX, visual, and presentation design</p>
          <p>Figma · Framer · Adobe</p>
          <p className="md:text-right">{site.name}</p>
        </div>
      </section>

      <section
        id="work"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            001
          </p>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl">Selected work</h2>
        </div>
        <div className="grid gap-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              featured={project.featured}
            />
          ))}
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:pt-28 md:pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            002
          </p>
          <h2 className="mt-2 max-w-3xl font-serif text-4xl md:text-5xl">
            Designer working across UI/UX, visual communication, and digital
            content.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-7 text-muted">
            {site.about}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-accent"
            >
              Get in touch
            </a>
            <a
              href={site.cvHref}
              className="border border-line px-6 py-3 text-sm transition-colors hover:border-ink"
            >
              Download CV
            </a>
          </div>
        </div>

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

      <section
        id="contact"
        className="scroll-mt-24 border-t border-line bg-surface"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-28">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              003
            </p>
            <h2 className="mt-2 font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.95] tracking-tight">
              Tell me what you are making.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-muted">
              I take on product, web, and visual work. Share a short brief —
              even unfinished notes are useful.
            </p>
            <dl className="mt-12 space-y-6 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Email
                </dt>
                <dd className="mt-2">
                  <a href={`mailto:${site.email}`} className="hover:text-accent">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a href={site.phoneHref} className="hover:text-accent">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Based in
                </dt>
                <dd className="mt-2">{site.location}</dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
