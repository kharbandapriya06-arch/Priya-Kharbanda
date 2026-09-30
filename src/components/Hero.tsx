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
        <a className="hero-scroll" href="#work">
          <span className="hero-scroll-mouse" aria-hidden>
            <span className="hero-scroll-wheel" />
          </span>
          <span className="hero-scroll-track" aria-hidden>
            <span className="hero-scroll-dot" />
          </span>
          <span className="hero-scroll-label">Scroll</span>
        </a>

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

        <div className="hero-actions">
          <a className="hero-btn hero-btn--solid" href="#work">
            <span className="hero-btn-label">Explore my work</span>
            <span className="hero-btn-arrow" aria-hidden>
              <svg viewBox="0 0 16 16">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
          <a
            className="hero-btn"
            href={site.cvHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hero-btn-label">View resume</span>
            <span className="hero-btn-arrow" aria-hidden>
              <svg viewBox="0 0 16 16">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        <div className="hero-socials">
          {site.socials.map((social) => {
            const external = social.href.startsWith("http");
            return (
              <a
                key={social.label}
                className="hero-social"
                href={social.href}
                aria-label={social.label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local public icon */}
                <img src={social.image} alt="" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-portrait-slot">
          <span className="hero-frame-circle" aria-hidden />
          <span className="hero-frame-sage" aria-hidden />
          <span className="hero-frame-forest" aria-hidden />
          <svg className="hero-frame-spark" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 1.2 13.4 8.8 21 12l-7.6 1.6L12 22.8 10.6 15.2 3 12l7.6-1.6Z"
              fill="currentColor"
            />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element -- local public portrait */}
          <img
            src={site.heroAvatar}
            alt={site.name}
            className="hero-portrait"
          />
          <p className="hero-nameplate">
            <span>
              {site.name.split(" ")[0]}
              <br />
              {site.name.split(" ").slice(1).join(" ")}
            </span>
            <svg className="hero-nameplate-gem" viewBox="0 0 12 12" aria-hidden>
              <path
                d="M6 .7 7.1 4.9 11.3 6 7.1 7.1 6 11.3 4.9 7.1.7 6 4.9 4.9Z"
                fill="currentColor"
              />
            </svg>
          </p>
        </div>
      </div>
    </section>
  );
}

