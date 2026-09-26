"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { processSteps, type ProcessIcon } from "@/lib/process";
import { cn } from "@/lib/utils";

function StepIcon({ name }: { name: ProcessIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "discover") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16.2 16.2 21 21" />
        <path d="M8.5 11h5M11 8.5v5" />
      </svg>
    );
  }

  if (name === "define") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "design") {
    return (
      <svg {...common}>
        <path d="M4 17.5 14.5 7l2.5 2.5L6.5 20H4v-2.5Z" />
        <path d="m13.2 8.3 2.5 2.5" />
        <path d="M16.8 4.8c.9-.9 2.3-.9 3.2 0s.9 2.3 0 3.2l-1.7 1.7-3.2-3.2 1.7-1.7Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4.5 11.5 19.5 5l-4.2 14.2-3.1-5.4L4.5 11.5Z" />
      <path d="m12.2 13.8 2.4 5.4" />
    </svg>
  );
}

const CYCLE_MS = 2600;

export function ProcessStairs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !inView) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % processSteps.length);
    }, CYCLE_MS);

    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process"
      aria-label="Design process"
    >
      <div className="process-intro">
        <p className="process-kicker">002</p>
        <h2 className="process-heading">
          <span className="text-gradient">How</span> I work
        </h2>
        <p className="process-lead">
          A four-step workflow that climbs from insight to shipped product —
          one stage at a time.
        </p>
      </div>

      <ol className="process-stairs">
        {processSteps.map((step, index) => {
          const active = index === activeIndex;
          return (
            <li
              key={step.number}
              className={cn("process-step", active && "is-active")}
              style={{ "--step-i": index } as CSSProperties}
              aria-current={active ? "step" : undefined}
            >
              <span className="process-step-rail" aria-hidden>
                <span className="process-step-node" />
              </span>
              <div className="process-step-card">
                <div className="process-step-top">
                  <span className="process-step-icon">
                    <StepIcon name={step.icon} />
                  </span>
                  <p className="process-step-number">{step.number}</p>
                </div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-copy">{step.summary}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
