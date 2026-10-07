import {
  siCelery,
  siDjango,
  siDocker,
  siFastapi,
  siGit,
  siGithubactions,
  siJavascript,
  siMariadb,
  siMysql,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
} from "simple-icons";
import {
  BrainCircuit,
  Boxes,
  Cloud,
  Cpu,
  Layers,
  ListChecks,
  Network,
  Repeat,
  Sparkles,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/lib/site";

type BrandIcon = { path: string; hex: string };

const brandIcons: Record<string, BrandIcon> = {
  Python: siPython,
  Django: siDjango,
  FastAPI: siFastapi,
  Celery: siCelery,
  Redis: siRedis,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MariaDB: siMariadb,
  JavaScript: siJavascript,
  React: siReact,
  Docker: siDocker,
  Git: siGit,
  "CI/CD": siGithubactions,
};

// Brands whose logos aren't in simple-icons, and generic concepts
const fallbackIcons: Record<string, LucideIcon> = {
  "REST APIs": Webhook,
  Microservices: Boxes,
  "Background Jobs": Workflow,
  "Batch Processing": Layers,
  AWS: Cloud,
  "OpenAI APIs": Sparkles,
  "GPT-4.1": Sparkles,
  "LLM APIs": BrainCircuit,
  "Prompt Engineering": ListChecks,
  "Tool / Function Calling": Repeat,
  OOP: Cpu,
  SOLID: Cpu,
  "System Design": Network,
};

function SkillIcon({ name }: { name: string }) {
  const brand = brandIcons[name];
  if (brand) {
    // Near-black brand colours (e.g. Django, Git-on-dark) vanish on the dark UI
    const color = brand.hex === "092E20" ? "#44b78b" : `#${brand.hex}`;
    return (
      <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill={color}
        aria-hidden="true"
        className="shrink-0"
      >
        <path d={brand.path} />
      </svg>
    );
  }
  const Fallback = fallbackIcons[name];
  return Fallback ? (
    <Fallback size={16} className="shrink-0 text-muted" aria-hidden="true" />
  ) : null;
}

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Tech stack"
          title="Grouped by where it fits in the system, not alphabetically."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  {group.title}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-sm text-foreground/90"
                    >
                      <SkillIcon name={item} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
