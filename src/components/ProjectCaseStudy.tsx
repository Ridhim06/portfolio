import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ManualVsAutomated } from "@/components/ManualVsAutomated";
import type { Project } from "@/lib/projects";

const sections = [
  { key: "context", num: "01", title: "Context" },
  { key: "problem", num: "02", title: "Problem" },
  { key: "myRole", num: "03", title: "My Role" },
  { key: "architecture", num: "04", title: "Architecture" },
  { key: "implementation", num: "05", title: "Implementation" },
  { key: "challenges", num: "06", title: "Engineering Challenges" },
  { key: "impact", num: "07", title: "Impact" },
  { key: "learned", num: "08", title: "What I Learned" },
] as const;

export function ProjectCaseStudy({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const cs = project.caseStudy;
  const isPsKit = project.slug === "ps-kit-automation";

  return (
    <article className="pb-24 pt-28 sm:pb-32 sm:pt-36">
      <Container className="max-w-3xl">
        <Reveal>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {project.tag}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {project.name}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted">
            {project.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border-strong px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-3">
            {project.impact.map((point) => (
              <div key={point} className="text-sm text-foreground/90">
                {point}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      <Container className="mt-20 max-w-3xl space-y-20 sm:mt-24">
        {sections.map(({ key, num, title }) => {
          if (key === "architecture") {
            if (!cs.diagram) return null;
            return (
              <section key={key}>
                <SectionLabel num={num} title={title} />
                {cs.architectureNote && (
                  <Reveal delay={0.04}>
                    <p className="mt-4 text-balance leading-relaxed text-muted">
                      {cs.architectureNote}
                    </p>
                  </Reveal>
                )}
                <div className="mt-8 max-w-md">
                  <ArchitectureDiagram
                    steps={cs.diagram}
                    variant={cs.diagramVariant}
                  />
                </div>
              </section>
            );
          }

          if (key === "implementation") {
            return (
              <section key={key}>
                <SectionLabel num={num} title={title} />
                {isPsKit ? (
                  <div className="mt-8">
                    <ManualVsAutomated
                      before={[
                        "Manually identify loan product & template",
                        "Manually fill borrower/loan fields",
                        "Manually assemble multi-page kit",
                        "Manually route for signature",
                      ]}
                      after={[
                        "Template resolved automatically by product/workflow",
                        "Fields mapped automatically from case data",
                        "Kit assembled by the document service",
                        "Routed to the e-signature workflow automatically",
                      ]}
                    />
                  </div>
                ) : (
                  <BulletList items={cs.implementation} />
                )}
              </section>
            );
          }

          if (key === "challenges") {
            if (!cs.challenges.length) return null;
            return (
              <section key={key}>
                <SectionLabel num={num} title={title} />
                <BulletList items={cs.challenges} />
              </section>
            );
          }

          if (key === "impact") {
            return (
              <section key={key}>
                <SectionLabel num={num} title={title} />
                <BulletList items={cs.impactPoints} accent />
              </section>
            );
          }

          if (key === "learned") {
            return (
              <section key={key}>
                <SectionLabel num={num} title={title} />
                <Reveal delay={0.04}>
                  <blockquote className="mt-6 border-l-2 border-accent pl-6 text-balance text-lg italic leading-relaxed text-foreground/90">
                    {cs.learned}
                  </blockquote>
                </Reveal>
              </section>
            );
          }

          const text =
            key === "context" ? cs.context : key === "problem" ? cs.problem : cs.myRole;

          return (
            <section key={key}>
              <SectionLabel num={num} title={title} />
              <Reveal delay={0.04}>
                <p className="mt-6 text-balance text-lg leading-relaxed text-muted">
                  {text}
                </p>
              </Reveal>
            </section>
          );
        })}

        {cs.subsystems && (
          <section>
            <SectionLabel num="09" title="Sub-systems" />
            <div className="mt-8 space-y-5">
              {cs.subsystems.map((sub) => (
                <Reveal key={sub.name}>
                  <div className="rounded-2xl border border-border bg-surface p-6">
                    <p className="text-base font-semibold text-foreground">
                      {sub.name}
                    </p>
                    <p className="mt-1.5 text-sm text-muted">{sub.summary}</p>
                    <ul className="mt-4 space-y-2">
                      {sub.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-sm leading-relaxed text-foreground/85"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </Container>

      <Container className="mt-24 max-w-3xl">
        <div className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
          >
            <p className="flex items-center gap-1.5 font-mono text-xs text-muted-2">
              <ArrowLeft size={12} /> Previous
            </p>
            <p className="mt-2 text-sm font-medium text-foreground group-hover:text-accent">
              {prev.name}
            </p>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group rounded-2xl border border-border bg-surface p-5 text-right transition-colors hover:border-border-strong"
          >
            <p className="flex items-center justify-end gap-1.5 font-mono text-xs text-muted-2">
              Next <ArrowRight size={12} />
            </p>
            <p className="mt-2 text-sm font-medium text-foreground group-hover:text-accent">
              {next.name}
            </p>
          </Link>
        </div>
      </Container>
    </article>
  );
}

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-accent">{num}</span>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

function BulletList({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item, i) => (
        <Reveal key={item} delay={Math.min(i * 0.03, 0.2)} as="li">
          <div className="flex gap-3 text-balance leading-relaxed text-muted">
            <span
              className={
                "mt-2 h-1.5 w-1.5 shrink-0 rounded-full " +
                (accent ? "bg-accent" : "bg-muted-2")
              }
            />
            <span className={accent ? "text-foreground/90" : undefined}>
              {item}
            </span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
