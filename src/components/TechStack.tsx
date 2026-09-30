"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { techTools, type TechTool } from "@/lib/tools";
import { cn } from "@/lib/utils";

const EDGE_PAD = 12;
let toolStack = 8;

function clamp(value: number, min: number, max: number) {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}

function ToolMark({ name, src }: { name: string; src: string | null }) {
  const [broken, setBroken] = useState(false);
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src && !broken) {
    return (
      <Image
        src={src}
        alt=""
        width={72}
        height={72}
        draggable={false}
        className="techstack-tool-img"
        onError={() => setBroken(true)}
      />
    );
  }

  return <span className="techstack-tool-fallback">{initials}</span>;
}

function DraggableTool({ tool }: { tool: TechTool }) {
  const itemRef = useRef<HTMLLIElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{
    pointerId: number;
    originX: number;
    originY: number;
    startX: number;
    startY: number;
    startRect: DOMRect;
  } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [zIndex, setZIndex] = useState<number | undefined>(undefined);

  function place(next: { x: number; y: number }) {
    offsetRef.current = next;
    setOffset(next);
  }

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    const item = itemRef.current;
    const section = item?.closest(".techstack");
    if (!item || !section) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      originX: offsetRef.current.x,
      originY: offsetRef.current.y,
      startX: event.clientX,
      startY: event.clientY,
      startRect: item.getBoundingClientRect(),
    };
    setZIndex(++toolStack);
    setDragging(true);
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    const item = itemRef.current;
    const section = item?.closest(".techstack");
    if (!drag || !section || drag.pointerId !== event.pointerId) return;

    const bounds = section.getBoundingClientRect();
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const nextLeft = clamp(
      drag.startRect.left + dx,
      bounds.left + EDGE_PAD,
      bounds.right - EDGE_PAD - drag.startRect.width,
    );
    const nextTop = clamp(
      drag.startRect.top + dy,
      bounds.top + EDGE_PAD,
      bounds.bottom - EDGE_PAD - drag.startRect.height,
    );

    place({
      x: drag.originX + (nextLeft - drag.startRect.left),
      y: drag.originY + (nextTop - drag.startRect.top),
    });
  }

  function endDrag(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  }

  const moved = offset.x !== 0 || offset.y !== 0;

  return (
    <li
      ref={itemRef}
      className={cn("techstack-tool", `is-${tool.size}`, dragging && "is-dragging")}
      style={{
        left: `${tool.x}%`,
        top: `${tool.y}%`,
        zIndex,
        transform: moved ? `translate3d(${offset.x}px, ${offset.y}px, 0)` : undefined,
      }}
    >
      <div className="techstack-tool-float" style={{ animationDelay: `${tool.delay}s` }}>
        <button
          type="button"
          className="techstack-tool-btn"
          aria-label={`${tool.name}. Drag to move.`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDragStart={(event) => event.preventDefault()}
        >
          <span className="techstack-tool-face">
            <ToolMark name={tool.name} src={tool.src} />
          </span>
          <span className="techstack-tool-name">{tool.name}</span>
        </button>
      </div>
    </li>
  );
}

export function TechStack() {
  return (
    <section id="tools" className="techstack" aria-label="Tools I use">
      <div className="techstack-glow" aria-hidden />

      <div className="techstack-stage">
        <div className="techstack-core">
          <p className="techstack-kicker">005</p>
          <h2 className="techstack-title">
            My Creative
            <span>Toolkit</span>
          </h2>
        </div>

        <ul className="techstack-orbit">
          {techTools.map((tool) => (
            <DraggableTool key={tool.name} tool={tool} />
          ))}
        </ul>
      </div>
    </section>
  );
}
