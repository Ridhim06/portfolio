import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { site } from "@/lib/site";

const links = [
  { label: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: site.github, Icon: GithubIcon },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <div className="rounded-3xl border border-border-strong bg-gradient-to-br from-surface to-accent-soft px-6 py-16 text-center sm:px-16 sm:py-24">
          <Reveal>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Have a system worth building? Let&apos;s talk.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-balance text-muted">
              Open to backend engineering roles focused on fintech
              infrastructure, automation, integrations, and production GenAI.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {links.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-5 py-2.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={15} />
                  {label}
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
