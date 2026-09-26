"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % site.heroTitles.length;
        window.setTimeout(() => setPrevIndex(current), 0);
        return next;
      });
    }, 3200);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (prevIndex === null) return;
    const clear = window.setTimeout(() => setPrevIndex(null), 700);
    return () => window.clearTimeout(clear);
  }, [prevIndex, index]);

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1 className="hero-title" aria-live="polite">
          <span className="hero-title-slot hero-title-slot--top">
            {site.heroTitles.map((title, i) => (
              <span
                key={`top-${title.top}-${i}`}
                className={cn(
                  "hero-title-word",
                  "hero-title-accent",
                  i === index && "is-active",
                  i === prevIndex && "is-exit",
                )}
                aria-hidden={i !== index}
              >
                {title.top}
              </span>
            ))}
          </span>

          <span className="hero-title-fixed">based</span>

          <span className="hero-title-slot hero-title-slot--bottom">
            {site.heroTitles.map((title, i) => (
              <span
                key={`bottom-${title.bottom}-${i}`}
                className={cn(
                  "hero-title-word",
                  "hero-title-rest",
                  i === index && "is-active",
                  i === prevIndex && "is-exit",
                )}
                aria-hidden={i !== index}
              >
                {title.bottom}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-lead">
          I design clear interfaces for{" "}
          <strong>product workflows, brand systems, and digital tools</strong> —
          and I care a lot about the <strong>why</strong> behind every decision.
        </p>

        <p className="hero-prev">
          <span className="hero-prev-label">Previously at</span>{" "}
          <span className="hero-prev-orgs">
            {site.previouslyAt.join(" · ")}
          </span>
        </p>
      </div>

      <div className="hero-visual">
        <div className="hero-visual-glow" aria-hidden />
        <div className="hero-bubble" role="note">
          <p className="hero-bubble-text">
            <span aria-hidden>👋</span> Hey, I’m {site.shortName}. I like getting
            to the root of things.
          </p>
        </div>

        <div className="hero-portrait-slot">
          {/* eslint-disable-next-line @next/next/no-img-element -- local public portrait */}
          <img
            src={site.heroAvatar}
            alt={site.name}
            className="hero-portrait"
          />
        </div>
      </div>
    </section>
  );
}
