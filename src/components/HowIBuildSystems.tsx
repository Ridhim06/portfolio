import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Reveal } from "@/components/Reveal";

const pattern = [
  "Client / Internal System",
  "REST API",
  "Django Service Layer",
  "Database",
  "Celery Task",
  "Third-party API / External System",
  "Status / Result / Notification",
];

const layers = [
  { title: "API layer", description: "A clear contract in, a predictable response out." },
  { title: "Business logic", description: "Rules and validation live in the service layer, not the view." },
  { title: "Relational persistence", description: "Schema that can evolve without breaking what's live." },
  { title: "Async workers", description: "Long-running or unreliable work moves off the request/response cycle." },
  { title: "External integrations", description: "Third-party APIs treated as unreliable by default." },
  { title: "Failure handling", description: "Retries and explicit failure states, not silent drops." },
  { title: "Notifications / monitoring", description: "Someone — or something — finds out when it breaks." },
];

export function HowIBuildSystems() {
  return (
    <section className="border-y border-border bg-surface/30 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="How I build systems"
              title="The pattern that shows up across almost everything I ship."
              description="Most of my production workflows follow the same shape — an API layer, business logic, persistence, async workers, and an external system on the other end that can fail."
            />

            <div className="mt-10 space-y-5">
              {layers.map((layer, i) => (
                <Reveal key={layer.title} delay={i * 0.04}>
                  <div className="flex gap-4">
                    <span className="font-mono text-xs text-muted-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {layer.title}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:pt-2">
            <ArchitectureDiagram steps={pattern} />
          </div>
        </div>
      </Container>
    </section>
  );
}
