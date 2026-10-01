"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const titles = site.heroTitles;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % titles.length;
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
      <a className="hero-scroll" href="#work">
        <span className="hero-scroll-mouse" aria-hidden>
          <span className="hero-scroll-wheel" />
        </span>
        <span className="hero-scroll-track" aria-hidden>
          <span className="hero-scroll-dot" />
        </span>
        <span className="hero-scroll-label">Scroll</span>
      </a>

      <div className="hero-layout">
        <div className="hero-copy">
          <h1 className="hero-headline">
            <span className="hero-headline-slot" aria-live="polite">
              {titles.map((title, i) => (
                <span
                  key={title.top}
                  className={cn(
                    "hero-headline-word",
                    "is-accent",
                    i === index && "is-active",
                    i === prevIndex && "is-exit",
                  )}
                  aria-hidden={i !== index}
                >
                  {title.top}
                </span>
              ))}
            </span>
            <span className="hero-headline-line">based</span>
            <span className="hero-headline-slot">
              {titles.map((title, i) => (
                <span
                  key={title.bottom}
                  className={cn(
                    "hero-headline-word",
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
            <strong>product workflows, brand systems, and digital tools</strong>{" "}
            — and I care a lot about the <strong>why</strong> behind every
            decision.
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
          <p className="hero-bubble">
            <span aria-hidden>👋 </span>
            Hey, I&apos;m {site.shortName} Kharbanda.
          </p>
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
