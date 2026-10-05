"use client";

import { useEffect, useState } from "react";

export function CoverViewCursor() {
  const [point, setPoint] = useState({ x: 0, y: 0, show: false });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("has-view-cursor");

    const move = (event: PointerEvent) => {
      const target = event.target;
      const overMedia = target instanceof Element && Boolean(target.closest(".cover-media"));
      setPoint({ x: event.clientX, y: event.clientY, show: overMedia });
    };

    const hide = () => setPoint((current) => ({ ...current, show: false }));

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", move);
    window.addEventListener("blur", hide);
    document.addEventListener("mouseleave", hide);

    return () => {
      document.documentElement.classList.remove("has-view-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      window.removeEventListener("blur", hide);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  if (!point.show) return null;

  return (
    <span
      className="cover-view-cursor"
      style={{ left: point.x, top: point.y }}
      aria-hidden
    >
      View
    </span>
  );
}
