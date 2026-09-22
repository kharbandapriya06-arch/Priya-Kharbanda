"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/lib/experience";
import { cn } from "@/lib/utils";

export function ExperienceTimeline() {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight * 0.52;
      let next = 0;
      let best = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - mid);
        if (distance < best) {
          best = distance;
          next = index;
        }
      });

      setActive((current) => (current === next ? current : next));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="timeline">
      <h2 className="timeline-heading">Freelance & Internships</h2>

      <div className="timeline-track">
        {experience.map((role, index) => (
          <article
            key={`${role.org}-${role.year}-${role.period}`}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className={cn("timeline-item", active === index && "is-active")}
          >
            <div className="timeline-left">
              <h3 className="timeline-role">{role.title}</h3>
              <p className="timeline-org">{role.org}</p>
              {role.location ? (
                <p className="timeline-place">
                  <span className="timeline-pin" aria-hidden />
                  {role.location}
                </p>
              ) : null}
            </div>

            <div className="timeline-axis">
              <span className="timeline-period">{role.period}</span>
              <span className="timeline-year">{role.year}</span>
              <span className="timeline-node" aria-hidden />
            </div>

            <p className="timeline-copy">{role.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
