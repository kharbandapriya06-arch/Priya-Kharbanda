"use client";

import Image from "next/image";
import { useState } from "react";
import { techTools } from "@/lib/tools";
import { cn } from "@/lib/utils";

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
        className="techstack-tool-img"
        onError={() => setBroken(true)}
      />
    );
  }

  return <span className="techstack-tool-fallback">{initials}</span>;
}

export function TechStack() {
  return (
    <section id="tools" className="techstack" aria-label="Tools I use">
      <div className="techstack-glow" aria-hidden />

      <div className="techstack-stage">
        <div className="techstack-core">
          <h2 className="techstack-title">
            My Creative
            <span>Toolkit</span>
          </h2>
        </div>

        <ul className="techstack-orbit">
          {techTools.map((tool) => (
            <li
              key={tool.name}
              className={cn("techstack-tool", `is-${tool.size}`)}
              style={{
                left: `${tool.x}%`,
                top: `${tool.y}%`,
                animationDelay: `${tool.delay}s`,
              }}
            >
              <button type="button" className="techstack-tool-btn" aria-label={tool.name}>
                <span className="techstack-tool-face">
                  <ToolMark name={tool.name} src={tool.src} />
                </span>
                <span className="techstack-tool-name">{tool.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
