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

    const hold = window.setTimeout(() => setPhase("out"), 2400);
    const done = window.setTimeout(onComplete, 3100);

    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <div className={`intro intro--${phase}`} aria-hidden="true">
      <div className="intro-inner">
        <p className="intro-brand">Priya Kharbanda</p>
        <p className="intro-script">Portfolio</p>

        <div className="intro-loader">
          <span className="intro-ring" />
          <span className="intro-ring intro-ring--inner" />
          <span className="intro-core" />
        </div>
      </div>
    </div>
  );
}
