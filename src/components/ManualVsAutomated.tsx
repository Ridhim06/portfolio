import { ArrowRight, X, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function ManualVsAutomated({
  before,
  after,
}: {
  before: string[];
  after: string[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <Reveal>
        <div className="h-full rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-2">
            Before
          </p>
          <ul className="mt-4 space-y-3">
            {before.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <X size={15} className="mt-0.5 shrink-0 text-muted-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="hidden justify-center sm:flex">
        <ArrowRight size={20} className="text-accent" />
      </div>
      <div className="flex justify-center sm:hidden">
        <ArrowRight size={18} className="rotate-90 text-accent" />
      </div>

      <Reveal delay={0.1}>
        <div className="h-full rounded-2xl border border-accent/30 bg-accent-soft p-6">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
            After
          </p>
          <ul className="mt-4 space-y-3">
            {after.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
