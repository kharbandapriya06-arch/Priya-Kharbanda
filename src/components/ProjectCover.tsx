import type { Motif, Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

function MotifLayer({
  motif,
  accent,
  compact = false,
}: {
  motif: Motif;
  accent: string;
  compact?: boolean;
}) {
  if (motif === "rings") {
    return (
      <>
        <div
          className="absolute -right-16 -top-16 size-72 rounded-full border"
          style={{ borderColor: accent, opacity: 0.45 }}
        />
        <div
          className="absolute right-10 top-16 size-48 rounded-full border"
          style={{ borderColor: accent, opacity: 0.7 }}
        />
        <div
          className="absolute bottom-10 left-10 size-28 rounded-full"
          style={{ background: accent, opacity: 0.85 }}
        />
      </>
    );
  }

  if (motif === "grid") {
    return (
      <div
        className="absolute inset-8 opacity-40"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: compact ? "32px 32px" : "48px 48px",
        }}
      />
    );
  }

  if (motif === "slash") {
    return (
      <>
        <div
          className="absolute -left-10 top-0 h-[140%] w-24 rotate-12"
          style={{ background: accent }}
        />
        <div
          className="absolute right-12 top-12 h-2/3 w-px"
          style={{ background: accent, opacity: 0.6 }}
        />
      </>
    );
  }

  if (motif === "type") {
    return (
      <p
        className="absolute -bottom-8 -right-4 font-serif text-[10rem] leading-none text-white/15 select-none"
        aria-hidden
      >
        24
      </p>
    );
  }

  if (motif === "blocks") {
    return (
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-3 p-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="col-span-2 row-span-1"
            style={{
              background: accent,
              opacity: 0.15 + (index % 4) * 0.12,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div
        className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{ borderColor: accent }}
      />
      <div
        className="absolute left-[58%] top-[38%] size-4 rounded-full"
        style={{ background: accent }}
      />
    </>
  );
}

export function ProjectCover({
  project,
  className,
  variant = "primary",
}: {
  project: Project;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const secondary = variant === "secondary";

  return (
    <div
      className={cn("project-shot", secondary && "project-shot--side", className)}
      style={{
        background: secondary
          ? `linear-gradient(210deg, ${project.cover.to} 0%, ${project.cover.from} 78%)`
          : `linear-gradient(145deg, ${project.cover.from} 0%, ${project.cover.to} 120%)`,
      }}
    >
      <div className={cn("project-shot-motif", secondary && "project-shot-motif--crop")}>
        <MotifLayer
          motif={project.cover.motif}
          accent="rgba(255,255,255,0.55)"
          compact={secondary}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      {secondary ? (
        <div className="project-shot-meta">
          <p className="project-shot-year">{project.year}</p>
          <p className="project-shot-name">{project.title}</p>
        </div>
      ) : null}
    </div>
  );
}
