"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const sections = [
  { id: "problem", index: "01", label: "The problem", field: "challenge" },
  { id: "approach", index: "02", label: "My approach", field: "approach" },
  { id: "outcome", index: "03", label: "The outcome", field: "outcome" },
] as const;

export function CaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const [active, setActive] = useState<string>(sections[0].id);
  const shots =
    project.cover.gallery ??
    [
      project.cover.images?.primary,
      project.cover.images?.top,
      project.cover.images?.bottom,
    ].filter((src): src is string => Boolean(src));

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    let frame = 0;

    const update = () => {
      const line = 128;
      let current = nodes[0]?.id ?? sections[0].id;

      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node.id;
      }

      const last = nodes[nodes.length - 1];
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 32;
      const lastOnScreen = last ? last.getBoundingClientRect().top < window.innerHeight * 0.72 : false;

      if (last && (atEnd || lastOnScreen)) current = last.id;

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [project.slug]);

  return (
    <article className="case">
      <nav className="case-rail" aria-label="On this page">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn("case-rail-link", active === section.id && "is-active")}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <div className="case-main">
        <Link href="/#work" className="case-back">
          Selected work
        </Link>

        <div className="case-pills">
          <span className="case-pill">{project.title}</span>
          <span className="case-pill case-pill--quiet">{project.study.eyebrow}</span>
        </div>

        <h1 className="case-title">
          {project.study.headline}
          <span>{project.study.accent}</span>
        </h1>

        <p className="case-lede">{project.summary}</p>

        <dl className="case-meta">
          <div>
            <dt>Role</dt>
            <dd>{project.study.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.study.duration}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{project.study.type}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className="case-status" aria-hidden />
              {project.study.status}
            </dd>
          </div>
        </dl>

        {project.brief ? (
          <section className="case-brief" aria-label="Project overview">
            <div className="case-brief-lead">
              <h2>
                {project.brief.title.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <p>{project.brief.lead}</p>
              <div className="case-brief-links">
                {project.brief.links.map((link) => (
                  <a
                    key={link.label}
                    className="case-brief-link"
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- local public icon
                      <img src={link.image} alt="" />
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden>
                        <path
                          d="M10.2 13.8a4.2 4.2 0 0 0 5.94.16l2.4-2.4a4.2 4.2 0 0 0-5.94-5.94l-1.38 1.37"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.8 10.2a4.2 4.2 0 0 0-5.94-.16l-2.4 2.4a4.2 4.2 0 0 0 5.94 5.94l1.37-1.37"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
            <div className="case-brief-about">
              <h2>{project.brief.aboutTitle}</h2>
              <p>{project.brief.about}</p>
              <dl>
                <div>
                  <dt>Date:</dt>
                  <dd>{project.brief.date}</dd>
                </div>
                <div>
                  <dt>Services:</dt>
                  <dd>{project.brief.services}</dd>
                </div>
              </dl>
            </div>
          </section>
        ) : null}

        {sections.map((section) => (
          <section key={section.id} id={section.id} className="case-section">
            <h2>
              <span>{section.index}</span>
              {section.label}
            </h2>
            <p>{project[section.field]}</p>
            {section.id === "approach" && shots.length > 0 ? (
              <div className="case-shots">
                {shots.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element -- local public project still
                  <img key={src} src={src} alt="" className="case-shot" />
                ))}
              </div>
            ) : null}
          </section>
        ))}

        <Link href={`/work/${next.slug}`} className="case-next">
          <span>Next project</span>
          {next.title}
        </Link>
      </div>
    </article>
  );
}
