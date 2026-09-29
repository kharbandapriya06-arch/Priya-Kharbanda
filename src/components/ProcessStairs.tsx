"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const active = services[activeIndex];

  function syncPause(hover: boolean, focus: boolean) {
    hoverRef.current = hover;
    focusRef.current = focus;
    setPaused(hover || focus);
  }

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
    if (reduced || !inView || paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, paused]);

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
          <p className="process-kicker">003</p>
          <h2 className="process-heading">
            The services <span className="text-gradient">I offer</span>
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
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                >
                  <span className="process-nav-icon" aria-hidden>
                    <ServiceGlyph name={step.icon} />
                  </span>
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
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${activeIndex}`}
          className={cn("process-panel", `is-${active.icon}`)}
        >
          <div key={active.number} className="process-panel-body">
            <p className="process-panel-watermark" aria-hidden>
              {active.number}
            </p>
            <span className="process-panel-icon">
              <ServiceGlyph name={active.icon} />
            </span>
            <p className="process-panel-kicker">Service {active.number}</p>
            <h3 className="process-panel-title">{active.title}</h3>
            <p className="process-panel-copy">{active.summary}</p>
            <p className="process-panel-count">
              {String(activeIndex + 1).padStart(2, "0")}
              <span> / {String(services.length).padStart(2, "0")}</span>
            </p>
          </div>
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
