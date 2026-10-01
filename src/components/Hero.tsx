"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const roles = [
  { left: "Graphic", right: "Designer" },
  { left: "UI/UX", right: "Designer" },
  { left: "Product", right: "Designer" },
] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % roles.length;
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

      <div className="hero-copy">
        <h1 className="hero-title hero-split">
          <span className="hero-split-side hero-split-side--left">I am Priya</span>
          <span className="hero-split-gap" aria-hidden />
          <span className="hero-split-side hero-split-side--right">Kharbanda</span>
        </h1>
        <p className="hero-role hero-split" aria-live="polite">
          <span className="hero-split-side hero-split-side--left">
            <span className="hero-role-slot">
              {roles.map((role, i) => (
                <span
                  key={role.left}
                  className={cn(
                    "hero-title-word",
                    "hero-title-accent",
                    i === index && "is-active",
                    i === prevIndex && "is-exit",
                  )}
                  aria-hidden={i !== index}
                >
                  {role.left}
                </span>
              ))}
            </span>
          </span>
          <span className="hero-split-gap" aria-hidden />
          <span className="hero-split-side hero-split-side--right hero-title-accent">
            Designer
          </span>
        </p>
      </div>

      <div className="hero-visual">
        {/* eslint-disable-next-line @next/next/no-img-element -- local public portrait */}
        <img
          src={site.heroAvatar}
          alt={site.name}
          className="hero-portrait"
        />
      </div>

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
    </section>
  );
}
