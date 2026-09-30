"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollUp() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      className={cn("scroll-top", visible && "is-visible")}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      onClick={scrollUp}
    >
      <svg viewBox="0 0 16 16" aria-hidden>
        <path
          d="M8 13V3M4 7l4-4 4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
