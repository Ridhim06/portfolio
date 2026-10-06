import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { metrics } from "@/lib/site";

export function Metrics() {
  return (
    <section className="border-y border-border bg-surface/40 py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            By the numbers
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 max-w-2xl text-balance text-muted">
            Outcomes from production systems, not vanity statistics.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.04}>
              <div className="h-full bg-surface p-6 transition-colors hover:bg-surface-2">
                <div className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  <CountUp value={m.value} delay={i * 0.04} />
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">
                  {m.label}
                </div>
                {m.detail && (
                  <div className="mt-1 text-xs leading-relaxed text-muted-2">
                    {m.detail}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
