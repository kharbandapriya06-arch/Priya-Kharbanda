"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
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

  function onPointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    const card = event.currentTarget;
    const frame = card.parentElement;
    if (!frame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * 14;
    const rotateY = x * -16;
    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    card.classList.add("is-tilting");
  }

  function onPointerLeave(event: React.PointerEvent<HTMLAnchorElement>) {
    const card = event.currentTarget;
    card.classList.remove("is-tilting");
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  return (
    <article
      className="project-row"
      style={{ "--stack-i": index } as CSSProperties}
    >
      <Link
        href={`/work/${project.slug}`}
        className="project-card"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
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
            <ProjectCover project={project} variant="top" />
            <ProjectCover project={project} variant="bottom" />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function ProjectsStack() {
  const listRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const finePointer = useRef(false);

  useEffect(() => {
    finePointer.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  function moveCursor(event: React.PointerEvent<HTMLDivElement>) {
    const cursor = cursorRef.current;
    if (!cursor || !finePointer.current) return;
    const card = (event.target as HTMLElement).closest(".project-card");
    if (!card) {
      cursor.classList.remove("is-on");
      return;
    }
    cursor.classList.add("is-on");
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
  }

  function hideCursor() {
    cursorRef.current?.classList.remove("is-on");
  }

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = [...list.querySelectorAll<HTMLElement>(".project-row")];
    let raf = 0;
    let ticking = false;

    const update = () => {
      let activeIndex = 0;

      rows.forEach((row, i) => {
        const inner = row.querySelector<HTMLElement>(".project-card");
        if (!inner) return;
        const next = rows[i + 1];
        if (reduced || !next) {
          inner.style.filter = "none";
          if (!next) activeIndex = i;
          return;
        }

        const a = row.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        const covered = (a.bottom - b.top) / Math.max(a.height, 1);
        const t = Math.min(1, Math.max(0, covered));
        if (t > 0.38) activeIndex = i + 1;
        inner.style.filter = `brightness(${1 - t * 0.22})`;
      });

      rows.forEach((row, i) => {
        row.querySelector(".project-card")?.classList.toggle("is-active", i === activeIndex);
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
    <div
      className="projects-list"
      ref={listRef}
      onPointerMove={moveCursor}
      onPointerLeave={hideCursor}
    >
      <div className="project-cursor" ref={cursorRef} aria-hidden />
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
