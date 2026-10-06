import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { projectsSorted, projects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Ridhim Garg`,
    description: project.tagline,
    openGraph: {
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projectsSorted.findIndex((p) => p.slug === slug);
  const prev = projectsSorted[(index - 1 + projectsSorted.length) % projectsSorted.length];
  const next = projectsSorted[(index + 1) % projectsSorted.length];

  return <ProjectCaseStudy project={project} prev={prev} next={next} />;
}
