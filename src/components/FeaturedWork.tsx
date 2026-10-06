import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projectsSorted } from "@/lib/projects";

export function FeaturedWork() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Featured work"
          title="Real systems. Real problems. Real decisions."
          description="Every case study below is sourced from production work — the architecture, the trade-offs, and the parts that broke before they worked."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {projectsSorted.map((project, i) => (
            <div
              key={project.slug}
              className={project.flagship ? "sm:col-span-2" : undefined}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
