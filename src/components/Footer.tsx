"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const roles = [
  "Graphic Designer",
  "UI UX Designer",
  "UX Researcher",
] as const;

const TYPE_MS = 55;
const ERASE_MS = 35;
const HOLD_MS = 1800;

export function Footer() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState<string>(roles[0]);
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("holding");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(roles[0]);
      return;
    }

    const full = roles[roleIndex];

    if (phase === "holding") {
      const id = window.setTimeout(() => setPhase("erasing"), HOLD_MS);
      return () => window.clearTimeout(id);
    }

    if (phase === "erasing") {
      if (text.length === 0) {
        setRoleIndex((current) => (current + 1) % roles.length);
        setPhase("typing");
        return;
      }
      const id = window.setTimeout(() => {
        setText((current) => current.slice(0, -1));
      }, ERASE_MS);
      return () => window.clearTimeout(id);
    }

    if (phase === "typing") {
      if (text === full) {
        setPhase("holding");
        return;
      }
      const id = window.setTimeout(() => {
        setText(full.slice(0, text.length + 1));
      }, TYPE_MS);
      return () => window.clearTimeout(id);
    }
  }, [phase, text, roleIndex]);

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-left">
          {site.name},{" "}
          <span className="site-footer-role">
            {text}
            <span className="site-footer-caret" aria-hidden />
          </span>
        </p>
      </div>
    </footer>
  );
}
