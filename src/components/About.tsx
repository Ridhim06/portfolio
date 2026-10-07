import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="About"
            title="Backend-focused, fintech-tested."
          />

          <div className="space-y-5 text-balance text-base leading-relaxed text-muted sm:text-lg">
            <Reveal>
              <p>
                I&apos;m a backend-focused Software Engineer with 4+ years of
                experience building production systems — primarily in
                Python/Django, REST APIs, asynchronous processing, relational
                databases, and the kind of fintech workflows where getting the
                failure states right matters as much as getting the happy path
                right.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                I&apos;ve also built and shipped LLM-powered functionality
                using OpenAI&apos;s APIs, including a production
                document-translation pipeline that renders legally binding
                loan documents in 12 Indian languages — real engineering
                around a real model, not a prototype.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                What I enjoy most is taking a complex, manual, or fragmented
                business process and turning it into a reliable software
                workflow — the kind that keeps running correctly long
                after the first release.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p>
                I own features end to end — from the Django services and data
                model to the JavaScript/React interfaces people actually use,
                like the agreement management module and internal loan
                dashboards. My center of gravity is still the backend: APIs,
                services, data, and the systems that connect them.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
