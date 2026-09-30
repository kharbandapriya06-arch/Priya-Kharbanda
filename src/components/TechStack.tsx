"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { techGroups, techTools, type TechGroup, type TechTool } from "@/lib/tools";
import { cn } from "@/lib/utils";

const CYCLE_MS = 3800;

function groupLabel(id: TechGroup) {
  return techGroups.find((group) => group.id === id)?.label ?? id;
}

function ToolMark({
  name,
  src,
  size,
}: {
  name: string;
  src: string | null;
  size: number;
}) {
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
        width={size}
        height={size}
        draggable={false}
        className="techstack-mark-img"
        onError={() => setBroken(true)}
      />
    );
  }

  return <span className="techstack-mark-fallback">{initials}</span>;
}

export function TechStack() {
  const [group, setGroup] = useState<"all" | TechGroup>("all");
  const [activeName, setActiveName] = useState(techTools[0].name);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const visible = useMemo(
    () => (group === "all" ? techTools : techTools.filter((tool) => tool.group === group)),
    [group],
  );

  const active = visible.find((tool) => tool.name === activeName) ?? visible[0];
  const activeIndex = Math.max(
    0,
    visible.findIndex((tool) => tool.name === active.name),
  );

  useEffect(() => {
    if (paused || visible.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setTimeout(() => {
      setActiveName((current) => {
        const index = visible.findIndex((tool) => tool.name === current);
        const next = visible[(index + 1) % visible.length];
        return next?.name ?? current;
      });
    }, CYCLE_MS);

    return () => window.clearTimeout(id);
  }, [paused, activeName, visible]);

  function selectGroup(next: "all" | TechGroup) {
    const list = next === "all" ? techTools : techTools.filter((tool) => tool.group === next);
    setGroup(next);
    setActiveName((current) =>
      list.some((tool) => tool.name === current) ? current : list[0].name,
    );
  }

  function onStageMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -7, y: px * 9 });
  }

  return (
    <section id="tools" className={cn("techstack", paused && "is-paused")} aria-label="Tools I use">
      <div className="techstack-glow" aria-hidden />

      <div className="techstack-inner">
        <div className="techstack-head">
          <div>
            <p className="techstack-kicker">005</p>
            <h2 className="techstack-title">
              My Creative
              <span>Toolkit</span>
            </h2>
          </div>

          <div className="techstack-filters" role="group" aria-label="Filter tools">
            {techGroups.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn("techstack-filter", group === item.id && "is-active")}
                aria-pressed={group === item.id}
                onClick={() => selectGroup(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="techstack-board">
          <div
            className="techstack-stage"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => {
              setPaused(false);
              setTilt({ x: 0, y: 0 });
            }}
            onPointerMove={onStageMove}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
          >
            <div className="techstack-feature" key={active.name}>
              <div
                className="techstack-feature-mark"
                style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
              >
                <ToolMark name={active.name} src={active.src} size={168} />
              </div>
              <p className="techstack-feature-group">{groupLabel(active.group)}</p>
              <h3 className="techstack-feature-name">{active.name}</h3>
              <p className="techstack-feature-note">{active.note}</p>
            </div>

            <div className="techstack-stage-foot">
              <p className="techstack-count">
                {String(activeIndex + 1).padStart(2, "0")}
                <span> / {String(visible.length).padStart(2, "0")}</span>
              </p>
              <div className="techstack-meter" aria-hidden>
                <span key={`${active.name}-${paused ? "hold" : "run"}`} className="techstack-meter-fill" />
              </div>
            </div>
          </div>

          <ul
            className="techstack-grid"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
          >
            {visible.map((tool) => (
              <li key={tool.name}>
                <ToolTile
                  tool={tool}
                  active={tool.name === active.name}
                  onSelect={() => setActiveName(tool.name)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ToolTile({
  tool,
  active,
  onSelect,
}: {
  tool: TechTool;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={cn("techstack-tile", active && "is-active")}
      aria-pressed={active}
      aria-label={`${tool.name}, ${groupLabel(tool.group)}`}
      onClick={onSelect}
    >
      <span className="techstack-tile-mark">
        <ToolMark name={tool.name} src={tool.src} size={72} />
      </span>
      <span className="techstack-tile-name">{tool.name}</span>
    </button>
  );
}
