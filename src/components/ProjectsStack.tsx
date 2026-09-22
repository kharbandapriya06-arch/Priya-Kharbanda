"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ProjectCover } from "@/components/ProjectCover";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const tag = project.services[0] ?? project.year;

  return (
    <article
      className="project-row"
      style={{ "--stack-i": index } as CSSProperties}
    >
      <div className="project-card">
        <div className="project-head">
          <span className="project-index">{number}</span>
          <h3 className="project-title">
            {project.title}
            <span className="project-dash"> – </span>
            <span className="project-kicker">{project.client}</span>
          </h3>
          <span className="project-tag">{tag}</span>
        </div>
        <div className="project-media">
          <div className="project-shots">
            <ProjectCover project={project} variant="primary" />
            <ProjectCover project={project} variant="secondary" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectsStack() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = [...list.querySelectorAll<HTMLElement>(".project-row")];
    let raf = 0;
    let ticking = false;

    const update = () => {
      rows.forEach((row, i) => {
        const inner = row.querySelector<HTMLElement>(".project-card");
        if (!inner) return;
        const next = rows[i + 1];
        if (reduced || !next) {
          inner.style.filter = "none";
          return;
        }

        const a = row.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        const covered = (a.bottom - b.top) / Math.max(a.height, 1);
        const t = Math.min(1, Math.max(0, covered));
        inner.style.filter = `brightness(${1 - t * 0.22})`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="projects-list" ref={listRef}>
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
