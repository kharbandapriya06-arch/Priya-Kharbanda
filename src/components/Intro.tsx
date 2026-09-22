"use client";

import { useEffect, useMemo, useState } from "react";

const NAME = "PRIYA KHARBANDA";
const LETTERS = NAME.split("");
const MID = (LETTERS.length - 1) / 2;

function formatProgress(value: number) {
  const digits = value < 100 ? String(value).padStart(2, "0") : "100";
  return digits.split("").join(" ");
}

export function Intro({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"load" | "collapse" | "rest" | "split">(
    "load",
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(100);
      const skip = window.setTimeout(onComplete, 250);
      return () => window.clearTimeout(skip);
    }

    let frame = 0;
    let cancelled = false;
    const start = performance.now();

    const delay = 450;
    const load = 1400;
    const holdEnd = delay + load + 150;
    const collapseEnd = holdEnd + 480;
    const restEnd = collapseEnd + 590;
    const splitEnd = restEnd + 780;

    const loop = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;

      if (elapsed < delay) {
        setProgress(0);
      } else if (elapsed < delay + load) {
        const t = (elapsed - delay) / load;
        const eased = 1 - (1 - t) * (1 - t);
        setProgress(Math.min(100, Math.round(eased * 100)));
      } else {
        setProgress(100);
      }

      if (elapsed >= holdEnd && elapsed < collapseEnd) {
        setPhase("collapse");
      } else if (elapsed >= collapseEnd && elapsed < restEnd) {
        setPhase("rest");
      } else if (elapsed >= restEnd && elapsed < splitEnd) {
        setPhase("split");
      } else if (elapsed >= splitEnd) {
        onComplete();
        return;
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [onComplete]);

  const fillClip = useMemo(
    () => `inset(0 ${100 - progress}% 0 0)`,
    [progress],
  );

  return (
    <div className={`intro intro--${phase}`} aria-hidden="true">
      <div className="intro-panel intro-panel--top" />
      <div className="intro-panel intro-panel--bottom" />

      <div className="intro-copy">
        <h1 className="intro-title">
          <span className="sr-only">Priya Kharbanda</span>
          <span className="intro-title-layer intro-title-layer--outline">
            {LETTERS.map((char, index) => (
              <span
                key={`o-${index}`}
                className="intro-char"
                style={{ ["--dx" as string]: MID - index }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <span
            className="intro-title-layer intro-title-layer--fill"
            style={{ clipPath: fillClip }}
          >
            {LETTERS.map((char, index) => (
              <span
                key={`f-${index}`}
                className="intro-char"
                style={{ ["--dx" as string]: MID - index }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <div
          className="intro-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Loading portfolio"
        >
          <span className="intro-progress-value">{formatProgress(progress)}</span>
          <span className="intro-progress-track">
            <span
              className="intro-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
