"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { processSteps } from "@/lib/process";
import { cn } from "@/lib/utils";

const steps = processSteps;

const CYCLE_MS = 3800;

export function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const skipScroll = useRef(true);
  const fromUser = useRef(false);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !inView || paused) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, paused]);

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    if (fromUser.current) {
      fromUser.current = false;
      return;
    }
    if (!inView) return;
    const item = sectionRef.current?.querySelectorAll<HTMLElement>(".offer-item")[active];
    item?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active, inView]);

  return (
    <section
      ref={sectionRef}
      className={cn("offer", inView && "is-in")}
      id="process"
    >
      <div className="offer-intro">
        <p className="offer-kicker">002</p>
        <h2 className="offer-heading">How I work</h2>
        <p className="offer-lead">
          From insight to a shipped product, one stage at a time.
        </p>
      </div>

      <div className="offer-scroll">
        <div className="offer-row" onMouseLeave={() => setPaused(false)}>
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={cn("offer-item", index === active && "is-active")}
              style={{ "--i": index } as CSSProperties}
              tabIndex={0}
              onMouseEnter={() => {
                fromUser.current = true;
                setPaused(true);
                setActive(index);
              }}
              onFocus={() => {
                fromUser.current = true;
                setPaused(true);
                setActive(index);
              }}
              onBlur={() => setPaused(false)}
            >
              <div className="offer-card">
                <span className="offer-num">{step.number}</span>
                <h3 className="offer-title">{step.title}</h3>
                <p className="offer-copy">{step.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

