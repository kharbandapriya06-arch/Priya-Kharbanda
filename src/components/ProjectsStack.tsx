"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { ProjectCover } from "@/components/ProjectCover";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

function cardStills(project: Project) {
  const { images } = project.cover;
  return [images?.primary, images?.top, images?.bottom].filter((src): src is string => Boolean(src));
}

function ProjectNote({ project }: { project: Project }) {
  return (
    <div className="project-note">
      <p className="project-note-copy">{project.summary}</p>
      <div className="project-note-meta">
        <span className="project-note-year">{project.year}</span>
        <ul className="project-note-services">
          {project.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
      <span className="hero-btn hero-btn--solid">
        <span className="hero-btn-label">Click to view full project</span>
        <span className="hero-btn-arrow" aria-hidden>
          <svg viewBox="0 0 22 16">
            <path
              d="M1.5 2.5 8 8l-6.5 5.5M11 2.5 17.5 8 11 13.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const tag = project.services[0] ?? project.year;
  const stills = cardStills(project);
  const [lead, ...sides] = stills;

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
        data-index={index}
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
            <div className="project-shot-main">
              {lead ? (
                <div className="project-shot project-shot--lead">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local public project still */}
                  <img src={lead} alt="" className="project-shot-img" />
                </div>
              ) : (
                <ProjectCover project={project} variant="primary" />
              )}
            </div>
            <div className="project-shot-side">
              {sides.map((src) => (
                <div className="project-shot" key={src}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- local public project still */}
                  <img src={src} alt="" className="project-shot-img" />
                </div>
              ))}
            </div>
          </div>
          <div className="project-desc-inline">
            <div className="project-glass">
              <ProjectNote project={project} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function ProjectsStack() {
  const listRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const descIndexRef = useRef<number | null>(null);
  const finePointer = useRef(false);
  const [descIndex, setDescIndex] = useState<number | null>(null);

  useEffect(() => {
    finePointer.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  function placeDesc(event: ReactPointerEvent<HTMLDivElement>, index: number | null) {
    const desc = descRef.current;
    if (!desc) return;
    if (index === null || !finePointer.current) {
      desc.classList.remove("is-on");
      if (descIndexRef.current !== null) {
        descIndexRef.current = null;
        setDescIndex(null);
      }
      return;
    }
    if (descIndexRef.current !== index) {
      descIndexRef.current = index;
      setDescIndex(index);
    }
    const width = Math.min(368, window.innerWidth - 24);
    const height = desc.offsetHeight || 248;
    let x = event.clientX + 22;
    let y = event.clientY + 22;
    if (x + width > window.innerWidth - 12) x = event.clientX - width - 18;
    if (y + height > window.innerHeight - 12) y = Math.max(12, event.clientY - height - 16);
    desc.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    desc.classList.add("is-on");
  }

  function moveCursor(event: ReactPointerEvent<HTMLDivElement>) {
    const cursor = cursorRef.current;
    const card = (event.target as HTMLElement).closest<HTMLElement>(".project-card");
    if (!cursor || !finePointer.current || !card) {
      cursor?.classList.remove("is-on");
      placeDesc(event, null);
      return;
    }
    cursor.classList.add("is-on");
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    const index = Number(card.dataset.index);
    placeDesc(event, Number.isNaN(index) ? null : index);
  }

  function hideCursor() {
    cursorRef.current?.classList.remove("is-on");
    descRef.current?.classList.remove("is-on");
    descIndexRef.current = null;
    setDescIndex(null);
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
      <div className="project-desc-float" ref={descRef} aria-hidden>
        {descIndex !== null ? (
          <div className="project-glass">
            <ProjectNote project={projects[descIndex]} />
          </div>
        ) : null}
      </div>
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
