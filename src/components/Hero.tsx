"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const titles = site.heroTitles;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLParagraphElement>(null);
  const drag = useRef<{ pointerId: number; ox: number; oy: number } | null>(null);
  const [bubblePos, setBubblePos] = useState<{ x: number; y: number } | null>(null);
  const [tailSide, setTailSide] = useState<"left" | "right">("left");
  const [dragging, setDragging] = useState(false);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const scroll = scrollRef.current;
    const socials = socialsRef.current;
    if (!hero || !scroll || !socials) return;

    const align = () => {
      const bottom = hero.getBoundingClientRect().bottom - socials.getBoundingClientRect().bottom;
      scroll.style.bottom = `${Math.max(0, bottom)}px`;
    };

    align();
    const observer = new ResizeObserver(align);
    observer.observe(hero);
    observer.observe(socials);
    window.addEventListener("resize", align);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", align);
    };
  }, []);

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

  function moveBubble(clientX: number, clientY: number) {
    const visual = visualRef.current;
    const bubble = bubbleRef.current;
    const session = drag.current;
    if (!visual || !bubble || !session) return;

    const bounds = visual.getBoundingClientRect();
    const width = bubble.offsetWidth;
    const height = bubble.offsetHeight;
    const x = clientX - bounds.left - session.ox;
    const y = clientY - bounds.top - session.oy;
    const nextX = Math.min(Math.max(x, -width * 0.2), bounds.width - width * 0.8);
    const nextY = Math.min(Math.max(y, -8), Math.max(-8, bounds.height - height * 0.4));

    setTailSide(nextX + width / 2 < bounds.width / 2 ? "right" : "left");
    setBubblePos({ x: nextX, y: nextY });
  }

  function onBubblePointerDown(event: PointerEvent<HTMLParagraphElement>) {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    const rect = bubble.getBoundingClientRect();
    drag.current = {
      pointerId: event.pointerId,
      ox: event.clientX - rect.left,
      oy: event.clientY - rect.top,
    };
    bubble.setPointerCapture(event.pointerId);
    setDragging(true);
    moveBubble(event.clientX, event.clientY);
  }

  function onBubblePointerMove(event: PointerEvent<HTMLParagraphElement>) {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    moveBubble(event.clientX, event.clientY);
  }

  function onBubblePointerUp(event: PointerEvent<HTMLParagraphElement>) {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
  }

  return (
    <section className="hero" id="top" ref={heroRef}>
      <a className="hero-scroll" href="#work" ref={scrollRef}>
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
            <span className="hero-headline-line">Into</span>
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

          <div className="hero-socials" ref={socialsRef}>
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

        <div className="hero-visual" ref={visualRef}>
          <p
            ref={bubbleRef}
            className={cn(
              "hero-bubble",
              tailSide === "right" && "is-tail-right",
              dragging && "is-dragging",
            )}
            style={
              bubblePos
                ? { left: bubblePos.x, top: bubblePos.y }
                : undefined
            }
            onPointerDown={onBubblePointerDown}
            onPointerMove={onBubblePointerMove}
            onPointerUp={onBubblePointerUp}
            onPointerCancel={onBubblePointerUp}
          >
            <span className="hero-bubble-wave" aria-hidden>
              👋
            </span>
            <span className="hero-bubble-copy">
              <span className="hero-bubble-line">Hey, I&apos;m</span>
              <span className="hero-bubble-line hero-bubble-name">{site.shortName} Kharbanda</span>
            </span>
          </p>
          <div className="hero-portrait-float">
            {/* eslint-disable-next-line @next/next/no-img-element -- local public portrait */}
            <img
              src={site.heroAvatar}
              alt={site.name}
              className="hero-portrait"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
