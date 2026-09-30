"use client";

import { useEffect, useRef } from "react";

export function StudioCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const sections = () =>
      Array.from(document.querySelectorAll<HTMLElement>(".studio-light"));

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = event.target instanceof Element ? event.target : null;
      const section = target?.closest<HTMLElement>(".studio-light") ?? null;

      for (const node of sections()) {
        node.classList.toggle("is-dot", node === section);
      }

      dot.classList.toggle("is-on", Boolean(section));
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    };

    const hide = () => {
      dot.classList.remove("is-on");
      for (const node of sections()) node.classList.remove("is-dot");
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("blur", hide);
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      document.removeEventListener("mouseleave", hide);
      hide();
    };
  }, []);

  return <div ref={dotRef} className="studio-cursor" aria-hidden />;
}
