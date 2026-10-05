import type { CSSProperties } from "react";
import Link from "next/link";
import { CoverViewCursor } from "@/components/CoverViewCursor";
import { projects } from "@/lib/projects";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function DownArrow() {
  return (
    <svg viewBox="0 0 16 16">
      <path
        d="M4.5 3 8 7l3.5-4M4.5 9 8 13l3.5-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16">
      <path
        d="M3 4.5 7 8l-4 3.5M9 4.5 13 8l-4 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProjectsStack() {
  const total = pad(projects.length);

  return (
    <div className="cover-list">
      <header className="cover-intro">
        <p className="cover-intro-index">001</p>
        <div className="cover-intro-row">
          <h2 className="cover-section-title">
            <span className="text-gradient">Selected work</span>
          </h2>
          <p className="cover-swipe">
            Swipe down to see
            <span className="cover-swipe-arrow" aria-hidden>
              <DownArrow />
            </span>
          </p>
        </div>
      </header>
      <CoverViewCursor />
      {projects.map((project, index) => {
        const src = project.cover.images?.primary;
        const label = project.services[0] ?? project.client;
        const wide = project.slug === "smart-scheduling" || project.slug === "monument";
        const large = wide || project.slug === "revive" || project.slug === "new-project";

        return (
          <article
            key={project.slug}
            className={["cover-card", index % 2 === 1 ? "is-invert" : "", wide ? "is-wide" : "", project.slug === "new-project" ? "is-glamora" : ""]
              .filter(Boolean)
              .join(" ")}
            style={
              {
                zIndex: index + 1,
                "--cover-from": project.cover.from,
                "--cover-to": project.cover.to,
              } as CSSProperties
            }
          >
            <p className="cover-watermark" aria-hidden>
              {pad(index + 1)}
            </p>
            <div className="cover-top">
              <p className="cover-count">
                {pad(index + 1)}
                <span aria-hidden> / </span>
                {total}
              </p>
            </div>

            <div className="cover-body">
              <div className="cover-copy">
                <p className="cover-kicker">{label}</p>
                <h3 className="cover-title">{project.title}</h3>
                <p className="cover-summary">{project.summary}</p>
                <ul className="cover-pills">
                  <li>{project.year}</li>
                  <li>{project.study.role}</li>
                </ul>
                <Link href={`/work/${project.slug}`} className="hero-btn hero-btn--solid cover-open">
                  <span className="hero-btn-label">Click to view full project</span>
                  <span className="hero-btn-arrow cover-arrows" aria-hidden>
                    <Arrow />
                  </span>
                </Link>
              </div>

              {src ? (
                <Link
                  href={`/work/${project.slug}`}
                  className={large ? "cover-media is-large" : "cover-media"}
                  aria-label={`View ${project.title}`}
                >
                  <span className="cover-stack">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local public project still */}
                    <img src={src} alt="" />
                  </span>
                </Link>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
