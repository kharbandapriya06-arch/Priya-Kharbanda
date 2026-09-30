"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps, type ProcessIcon } from "@/lib/process";
import { cn } from "@/lib/utils";

const HOLD_MS = 1100;
const GROW_MS = 850;

export function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [growing, setGrowing] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;
    let index = 0;
    let mode: "hold" | "grow" = "hold";
    let timer = 0;

    const tick = () => {
      if (cancelled) return;
      if (mode === "hold") {
        if (index >= processSteps.length - 1) {
          setInstant(true);
          index = 0;
          setActive(0);
          setGrowing(false);
          mode = "hold";
          timer = window.setTimeout(() => {
            setInstant(false);
            timer = window.setTimeout(tick, HOLD_MS);
          }, 40);
          return;
        }
        mode = "grow";
        setGrowing(true);
        timer = window.setTimeout(tick, GROW_MS);
        return;
      }
      mode = "hold";
      index += 1;
      setActive(index);
      setGrowing(false);
      timer = window.setTimeout(tick, HOLD_MS);
    };

    timer = window.setTimeout(tick, HOLD_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [inView]);

  return (
    <section ref={sectionRef} className="work" id="process">
      <div className="work-head">
        <p className="work-kicker">003</p>
        <h2 className="work-heading">
          How I work
        </h2>
        <p className="work-lead">From insight to a shipped product, one stage at a time.</p>
      </div>

      <ol className={cn("work-rail", instant && "is-instant")}>
        {processSteps.map((step, index) => {
          const done = index < active;
          const current = index === active;
          return (
            <li
              key={step.number}
              className={cn(
                "work-step",
                done && "is-done",
                current && "is-active",
                current && growing && "is-growing",
              )}
            >
              <span className="work-segment" aria-hidden>
                <span className="work-segment-fill" />
              </span>
              <span className="work-dot" aria-hidden />
              <span className="work-index">{step.number}</span>
              <span className="work-icon" aria-hidden>
                <WorkGlyph name={step.icon} />
              </span>
              <h3 className="work-title">{step.title}</h3>
              <p className="work-copy">{step.summary}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function WorkGlyph({ name }: { name: ProcessIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "discover") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 3.5 3.5" />
      </svg>
    );
  }

  if (name === "define") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2" />
      </svg>
    );
  }

  if (name === "design") {
    return (
      <svg {...common}>
        <path d="M4 17.5 14.8 6.7a1.8 1.8 0 0 1 2.5 0l.1.1a1.8 1.8 0 0 1 0 2.5L6.6 20.1 3.5 20.6 4 17.5Z" />
        <path d="m13.2 8.3 2.6 2.6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 12.5 9.2 17.5 20 6.5" />
    </svg>
  );
}
