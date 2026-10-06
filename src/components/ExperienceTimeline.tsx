import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/lib/site";

const evolution = [
  "Backend Engineering",
  "Fintech Platform",
  "Automation",
  "Integrations",
  "Production Ownership",
  "GenAI",
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Three years in, the same platform keeps asking harder questions."
        />

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs text-muted-2 sm:text-sm">
            {evolution.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span
                  className={
                    i === evolution.length - 1
                      ? "text-accent"
                      : "text-muted"
                  }
                >
                  {step}
                </span>
                {i < evolution.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 space-y-12">
          {experience.map((entry, i) => (
            <Reveal key={entry.company} delay={i * 0.06}>
              <div
                className={
                  "grid gap-6 border-l-2 pl-6 sm:grid-cols-[220px_1fr] sm:gap-10 " +
                  (entry.current ? "border-accent" : "border-border")
                }
              >
                <div>
                  <p className="font-mono text-xs text-muted-2">
                    {entry.start} — {entry.end}
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {entry.role}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {entry.company}
                    {entry.companyNote && (
                      <span className="text-muted-2"> ({entry.companyNote})</span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-2">{entry.location}</p>
                </div>

                <div className="space-y-8">
                  {entry.groups
                    ? entry.groups.map((group) => (
                        <div key={group.title}>
                          <p className="text-sm font-semibold text-foreground">
                            {group.title}
                          </p>
                          <ul className="mt-3 space-y-2.5">
                            {group.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex gap-2.5 text-sm leading-relaxed text-muted"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-2" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          {group.stack && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {group.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-2"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    : (
                        <ul className="space-y-2.5">
                          {entry.bullets?.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-2.5 text-sm leading-relaxed text-muted"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-2" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
