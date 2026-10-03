"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

const services = [
  {
    number: "01",
    title: "UX Strategy & Research",
    icon: "research",
    summary:
      "Understanding the target audience through interviews and analysis to define their needs, pain points, and product goals, ensuring the solution is user-centric and solves real-world problems.",
  },
  {
    number: "02",
    title: "Wireframing & Prototyping",
    icon: "wire",
    summary:
      "Creating the structural blueprint of the product — low-fidelity wireframes — and interactive prototypes to define flow and navigation before visual design, allowing for early-stage testing of core functionality.",
  },
  {
    number: "03",
    title: "Visual Design",
    icon: "palette",
    summary:
      "Applying the brand’s aesthetic, including color, typography, and iconography, to create final high-fidelity mockups, focusing on the interface’s look, feel, and overall visual consistency.",
  },
  {
    number: "04",
    title: "Usability Testing & Iteration",
    icon: "test",
    summary:
      "Validating the designs with real users via usability tests and A/B testing, gathering feedback, and making continuous refinements to ensure the product is intuitive, effective, and ready for development.",
  },
] as const;

type ServiceIcon = (typeof services)[number]["icon"];

const CYCLE_MS = 4200;

export function ServicesStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const swipe = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const didSwipe = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cycleToken, setCycleToken] = useState(0);

  function syncPause(hover: boolean, focus: boolean) {
    hoverRef.current = hover;
    focusRef.current = focus;
    if (window.matchMedia("(max-width: 860px)").matches) {
      setPaused(false);
      return;
    }
    setPaused(hover || focus);
  }

  function stepService(direction: number) {
    setActiveIndex((prev) => (prev + direction + services.length) % services.length);
    setCycleToken((token) => token + 1);
  }

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(deck);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 860px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !inView || (!isMobile && paused)) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, paused, isMobile, cycleToken]);

  function onDeckPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!window.matchMedia("(max-width: 860px)").matches) return;
    swipe.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* The pointer can already be gone on a quick tap. */
    }
  }

  function onDeckPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!swipe.current || swipe.current.pointerId !== event.pointerId) return;
    const dx = event.clientX - swipe.current.x;
    const dy = event.clientY - swipe.current.y;
    swipe.current = null;
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      /* Capture was already released. */
    }
    if (Math.abs(dx) < 36 || Math.abs(dx) < Math.abs(dy)) return;
    didSwipe.current = true;
    stepService(dx < 0 ? 1 : -1);
  }

  function focusStep(index: number) {
    setActiveIndex(index);
    document.getElementById(`service-tab-${index}`)?.focus();
  }

  function onTabsKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const key = event.key;
    if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "ArrowRight" && key !== "ArrowLeft") {
      return;
    }
    event.preventDefault();
    const direction = key === "ArrowDown" || key === "ArrowRight" ? 1 : -1;
    const next = (activeIndex + direction + services.length) % services.length;
    focusStep(next);
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className={cn("process", inView && "is-inview", paused && "is-paused")}
      style={{ "--cycle": `${CYCLE_MS}ms` } as CSSProperties}
      aria-label="Services I offer"
    >
      <div
        className="process-layout"
        onMouseEnter={() => syncPause(true, focusRef.current)}
        onMouseLeave={() => syncPause(false, focusRef.current)}
        onFocus={() => syncPause(hoverRef.current, true)}
        onBlur={(event) => {
          const next = event.relatedTarget;
          if (next instanceof Node && event.currentTarget.contains(next)) return;
          syncPause(hoverRef.current, false);
        }}
      >
        <div className="process-intro">
          <p className="process-kicker">004</p>
          <h2 className="process-heading">
            The services I offer
          </h2>
          <p className="process-lead">
            Specifically designed to meet your needs — pick a service, or let them cycle.
          </p>

          <div
            className="process-nav"
            role="tablist"
            aria-label="Services"
            onKeyDown={onTabsKeyDown}
          >
            {services.map((step, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={step.number}
                  id={`service-tab-${index}`}
                  type="button"
                  role="tab"
                  className={cn("process-nav-item", selected && "is-active")}
                  aria-selected={selected}
                  aria-controls="service-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => stepService(index - activeIndex)}
                  onMouseEnter={() => {
                    if (window.matchMedia("(max-width: 860px)").matches) return;
                    setActiveIndex(index);
                  }}
                  onFocus={() => setActiveIndex(index)}
                >
                  <span className="process-nav-text">
                    <span className="process-nav-num">{step.number}</span>
                    <span className="process-nav-title">{step.title}</span>
                  </span>
                  <span className="process-nav-meter" aria-hidden />
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={deckRef}
          className="process-deck"
          id="service-panel"
          onPointerDown={onDeckPointerDown}
          onPointerUp={onDeckPointerUp}
          onPointerCancel={() => {
            swipe.current = null;
          }}
        >
          {services.map((step, index) => {
            const diff = ((index - activeIndex + services.length + 2) % services.length) - 2;
            const pose =
              diff === 0 ? "is-front" : diff === -1 ? "is-left" : diff === 1 ? "is-right" : "is-back";
            return (
              <button
                key={step.number}
                type="button"
                className={cn("process-deck-card", `is-${step.icon}`, pose)}
                aria-hidden={pose !== "is-front"}
                tabIndex={pose === "is-front" ? -1 : 0}
                onClick={() => {
                  if (didSwipe.current) {
                    didSwipe.current = false;
                    return;
                  }
                  setActiveIndex(index);
                }}
              >
                <span className="process-deck-head">
                  <span className="process-deck-icon">
                    <ServiceGlyph name={step.icon} />
                  </span>
                  <span className="process-deck-kicker">
                    Service
                    <span className="process-deck-mark">{step.number}</span>
                  </span>
                </span>
                <span className="process-deck-title">{step.title}</span>
                <span className="process-deck-copy">{step.summary}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceGlyph({ name }: { name: ServiceIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "research") {
    return (
      <svg {...common}>
        <circle cx="9" cy="7.5" r="2.5" />
        <path d="M4.6 16.8c.55-2.4 2.15-3.7 4.4-3.7s3.85 1.3 4.4 3.7" />
        <circle cx="16.6" cy="14.4" r="2.15" />
        <path d="m18.2 16.1 2.05 2.05" />
      </svg>
    );
  }

  if (name === "wire") {
    return (
      <svg {...common}>
        <rect x="3.5" y="4" width="17" height="16" rx="2" />
        <rect x="6" y="6.8" width="5.2" height="3.6" rx="0.6" />
        <rect x="12.6" y="6.8" width="4.8" height="3.6" rx="0.6" />
        <path d="M6 13.2h12M6 16.2h7.5" />
      </svg>
    );
  }

  if (name === "palette") {
    return (
      <svg {...common}>
        <circle cx="7.2" cy="8" r="1.7" />
        <circle cx="12" cy="8" r="1.7" />
        <circle cx="16.8" cy="8" r="1.7" />
        <path d="M5.5 14.2h13M7.2 17.6h9.6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3.5" y="3.5" width="11.5" height="15" rx="1.8" />
      <path d="m6.1 8.2 1.45 1.45 2.7-2.9" />
      <path d="M6.1 12.4h5.6M6.1 15.1h3.6" />
      <circle cx="17.2" cy="16.2" r="2.5" />
      <path d="m19 18 1.7 1.7" />
    </svg>
  );
}
