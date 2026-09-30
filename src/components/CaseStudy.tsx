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
  const shots = [
    project.cover.images?.primary,
    project.cover.images?.top,
    project.cover.images?.bottom,
  ].filter((src): src is string => Boolean(src));

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
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

        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="case-section">
            <h2>
              <span>{section.index}</span>
              {section.label}
            </h2>
            <p>{project[section.field]}</p>
            {index === 0 && shots[0] ? (
              // eslint-disable-next-line @next/next/no-img-element -- local public project still
              <img src={shots[0]} alt="" className="case-shot" />
            ) : null}
            {index === 1 && shots.length > 1 ? (
              <div className="case-shot-row">
                {shots.slice(1).map((src) => (
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
