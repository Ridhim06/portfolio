import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Award, Trophy } from "lucide-react";
import { achievements, education } from "@/lib/site";

const icons = [Award, Trophy];

export function Achievements() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Achievements" title="Recognition, briefly." />
            <div className="mt-10 space-y-5">
              {achievements.map((item, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="flex gap-4 rounded-2xl border border-border bg-surface p-6">
                      <Icon size={20} className="mt-0.5 shrink-0 text-accent" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Education" title="Compact, by design." />
            <Reveal delay={0.1}>
              <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
                <p className="text-sm font-semibold text-foreground">
                  {education.degree}
                </p>
                <p className="mt-1.5 text-sm text-muted">{education.school}</p>
                <p className="mt-0.5 text-xs text-muted-2">{education.location}</p>
                <p className="mt-4 font-mono text-xs text-accent">
                  CGPA: {education.cgpa}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
