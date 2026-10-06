import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/lib/site";

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
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
                      className="rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-sm text-foreground/90"
                    >
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
