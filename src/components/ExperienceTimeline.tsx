"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { experience } from "@/lib/experience";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ExperienceTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let ticking = false;
    let orbY = 0;
    let initialized = false;

    const update = () => {
      const track = trackRef.current;
      const progress = progressRef.current;
      const orb = orbRef.current;
      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      if (!track || !progress || !orb || items.length === 0) {
        ticking = false;
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const focusY = window.innerHeight * 0.46;
      const firstYear = items[0].querySelector(".timeline-year");
      const lastYear = items[items.length - 1].querySelector(".timeline-year");
      const firstYearRect = (firstYear ?? items[0]).getBoundingClientRect();
      const lastYearRect = (lastYear ?? items[items.length - 1]).getBoundingClientRect();
      const minY = firstYearRect.bottom - trackRect.top + 22;
      const maxY = lastYearRect.bottom - trackRect.top + 22;
      const target = clamp(focusY - trackRect.top, minY, maxY);

      if (!initialized || reduced) {
        orbY = target;
        initialized = true;
      } else {
        orbY += (target - orbY) * 0.16;
      }

      progress.style.height = `${Math.max(0, orbY)}px`;
      orb.style.transform = `translate3d(-50%, ${orbY}px, 0)`;

      const positions = items.map((node) => {
        const year = node.querySelector(".timeline-year");
        return (year ?? node).getBoundingClientRect().bottom - trackRect.top;
      });

      let progressIndex = 0;
      if (orbY <= positions[0]) {
        progressIndex = 0;
      } else if (orbY >= positions[positions.length - 1]) {
        progressIndex = positions.length - 1;
      } else {
        for (let i = 0; i < positions.length - 1; i += 1) {
          if (orbY <= positions[i + 1]) {
            progressIndex =
              i + (orbY - positions[i]) / (positions[i + 1] - positions[i]);
            break;
          }
        }
      }

      items.forEach((node, i) => {
        const current = Math.floor(progressIndex);
        const frac = progressIndex - current;
        let opacity = 0.14;
        if (reduced) {
          opacity = 1;
        } else if (i === current) {
          opacity = 1 - frac * 0.18;
        } else if (i === current + 1) {
          opacity = 0.74 + frac * 0.24;
        } else if (i === current - 1) {
          opacity = Math.max(0.14, 0.32 * (1 - frac));
        } else if (i === current + 2) {
          opacity = 0.16 + frac * 0.18;
        }
        node.style.setProperty("--tl-opacity", opacity.toFixed(3));
      });

      if (!reduced && Math.abs(target - orbY) > 0.35) {
        raf = requestAnimationFrame(update);
      } else {
        ticking = false;
      }
    };

    const kick = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);

    return () => {
      ticking = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, []);

  return (
    <section className="timeline">
      <h2 className="timeline-heading">
        <span className="text-gradient">Freelance</span> & Internships
      </h2>

      <div className="timeline-track" ref={trackRef}>
        <span className="timeline-rail" aria-hidden />
        <span className="timeline-progress" ref={progressRef} aria-hidden />
        <span className="timeline-orb" ref={orbRef} aria-hidden />

        {experience.map((role, index) => (
          <article
            key={`${role.org}-${role.year}-${role.period}`}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className="timeline-item"
            style={
              {
                "--tl-opacity": index === 0 ? 1 : index === 1 ? 0.72 : 0.16,
              } as CSSProperties
            }
          >
            <div className="timeline-left">
              <h3 className="timeline-role">{role.title}</h3>
              <p className="timeline-org">{role.org}</p>
              {role.location ? (
                <p className="timeline-place">
                  <svg
                    className="timeline-pin"
                    viewBox="0 0 16 16"
                    aria-hidden
                  >
                    <path
                      fill="currentColor"
                      d="M8 1.15A4.85 4.85 0 0 0 3.15 6c0 3.62 4.28 8.28 4.46 8.47a.55.55 0 0 0 .78 0C8.57 14.28 12.85 9.62 12.85 6A4.85 4.85 0 0 0 8 1.15Zm0 6.55A1.7 1.7 0 1 1 8 4.3a1.7 1.7 0 0 1 0 3.4Z"
                    />
                  </svg>
                  {role.location}
                </p>
              ) : null}
            </div>

            <div className="timeline-axis">
              <span className="timeline-period">{role.period}</span>
              <span className="timeline-year">{role.year}</span>
            </div>

            <p className="timeline-copy">{role.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
