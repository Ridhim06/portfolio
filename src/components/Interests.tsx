import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { interests } from "@/lib/site";

export function Interests() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-2">
            What I&apos;m interested in
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {interests.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
