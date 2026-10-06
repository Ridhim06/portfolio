import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import type { Project } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Reveal delay={Math.min(index * 0.05, 0.3)} className="h-full">
      <Link
        href={`/work/${project.slug}`}
        className={clsx(
          "group flex h-full flex-col justify-between rounded-2xl border p-6 transition-all duration-300 sm:p-7",
          project.flagship
            ? "border-accent/30 bg-gradient-to-br from-accent-soft to-surface hover:border-accent/60"
            : "border-border bg-surface hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2"
        )}
      >
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              {project.tag}
            </span>
            <span className="font-mono text-xs text-muted-2">
              {String(project.order).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-4 text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {project.name}
          </h3>

          <p className="mt-3 text-balance text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>

          <div className="mt-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
              Role
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
              {project.role}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border-strong px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <ul className="mt-5 space-y-1.5">
            {project.impact.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-foreground/90"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex items-center gap-1.5 text-sm font-medium text-accent">
          View case study
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </Link>
    </Reveal>
  );
}
