"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const roles = [...site.roles, site.roles[0]];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((current) => current + 1);
    }, 2600);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (index !== site.roles.length) return;

    const reset = window.setTimeout(() => {
      setInstant(true);
      setIndex(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setInstant(false));
      });
    }, 560);

    return () => window.clearTimeout(reset);
  }, [index]);

  return (
    <section className="hero" id="top">
      <p className="hero-scroll" aria-hidden>
        Scroll down
      </p>

      <div className="hero-copy">
        <p className="hero-status">
          <span className="hero-status-dot" />
          Open to opportunities
        </p>

        <h1 className="hero-title">
          <span className="hero-title-hi">Hi, I’m</span>
          <span className="hero-title-name">{site.name}</span>
        </h1>

        <p className="hero-role">
          I’m a{" "}
          <span className="hero-role-slot">
            <span
              className={`hero-role-track${instant ? " is-instant" : ""}`}
              style={{ transform: `translateY(${index * -1.15}em)` }}
            >
              {roles.map((item, i) => (
                <span key={`${item}-${i}`} className="hero-role-word">
                  {item}
                </span>
              ))}
            </span>
          </span>
        </p>

        <div className="hero-actions">
          <a className="hero-btn" href="#work">
            Explore work
          </a>
          <a className="hero-btn" href={site.cvHref}>
            View CV
          </a>
        </div>

        <div className="hero-socials">
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="hero-social"
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <rect
                x="3.5"
                y="5.5"
                width="17"
                height="13"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.55"
              />
              <path
                d="M4 7.2 12 13l8-5.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.55"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={site.socials[0]?.href}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hero-social"
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path
                fill="currentColor"
                d="M6.5 9.5H4V20h2.5V9.5ZM5.25 4A1.6 1.6 0 1 0 5.26 7.2 1.6 1.6 0 0 0 5.25 4ZM20 20h-2.5v-5.6c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.8.8-2.1 1.5-.1.3-.1.7-.1 1.1V20H10.7s.1-8.4 0-9.3H13.2v1.3c.6-.9 1.7-2.2 4.2-2.2 3.1 0 5.4 2 5.4 6.3V20H20Z"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-portrait-slot" />
      </div>
    </section>
  );
}
