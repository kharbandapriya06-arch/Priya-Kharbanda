import { ProjectCover } from "@/components/ProjectCover";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={cn("group block", featured ? "md:col-span-2" : undefined)}>
      <ProjectCover
        project={project}
        className={cn(
          "aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-[1.015]",
          featured && "md:aspect-[16/8]",
        )}
      />
      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {number} / {project.year}
          </p>
          <h3 className="mt-1 font-serif text-3xl leading-none tracking-tight md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            {project.summary}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">
            {project.services.join(" · ")}
          </p>
        </div>
      </div>
    </article>
  );
}
