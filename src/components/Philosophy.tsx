import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { philosophy } from "@/lib/site";

export function Philosophy() {
  return (
    <section className="border-y border-border bg-surface/30 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Engineering philosophy"
          title="A few principles that show up in most of my decisions."
          align="center"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
                <span className="font-mono text-xs text-muted-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-base font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
