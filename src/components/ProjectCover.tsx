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
        className="absolute -bottom-8 -right-4 text-[10rem] font-black leading-none tracking-[-0.06em] text-white/15 select-none"
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

const panelClass = {
  primary: "project-shot--lead",
  top: "project-shot--top",
  bottom: "project-shot--bottom",
} as const;

export function ProjectCover({
  project,
  className,
  variant = "primary",
}: {
  project: Project;
  className?: string;
  variant?: keyof typeof panelClass;
}) {
  const { from, to, motif, images } = project.cover;
  const image =
    variant === "top" ? images?.top : variant === "bottom" ? images?.bottom : images?.primary;
  const background =
    variant === "top"
      ? `linear-gradient(205deg, ${to} 0%, ${from} 82%)`
      : variant === "bottom"
        ? `linear-gradient(25deg, ${from} 8%, ${to} 100%)`
        : `linear-gradient(145deg, ${from} 0%, ${to} 120%)`;

  return (
    <div
      className={cn("project-shot", panelClass[variant], className)}
      style={image ? undefined : { background }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- local public project still
        <img src={image} alt="" className="project-shot-img" />
      ) : (
        <>
          <div
            className={cn(
              "project-shot-motif",
              variant !== "primary" && "project-shot-motif--crop",
            )}
          >
            <MotifLayer motif={motif} accent="rgba(255,255,255,0.55)" compact={variant !== "primary"} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
        </>
      )}
    </div>
  );
}
