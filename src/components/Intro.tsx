"use client";

import { useEffect, useState } from "react";

export function Intro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const skip = window.setTimeout(onComplete, 200);
      return () => window.clearTimeout(skip);
    }

    const hold = window.setTimeout(() => setPhase("out"), 2200);
    const done = window.setTimeout(onComplete, 2800);

    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <div className={`intro intro--${phase}`} aria-hidden="true">
      <div className="intro-glow intro-glow--a" />
      <div className="intro-glow intro-glow--b" />
      <div className="intro-glow intro-glow--c" />

      <div className="intro-inner">
        <p className="intro-kicker">Welcome</p>
        <p className="intro-brand">Priya Kharbanda</p>
        <div className="intro-script-wrap">
          <p className="intro-label">Portfolio</p>
        </div>

        <div className="intro-loader">
          <span className="intro-ring" />
          <span className="intro-ring intro-ring--inner" />
          <span className="intro-core" />
        </div>
        <div className="intro-bar" aria-hidden>
          <span className="intro-bar-fill" />
        </div>
      </div>
    </div>
  );
}
