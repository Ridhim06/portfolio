"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";
import { ArrowDown, ArrowUpDown } from "lucide-react";

const CYCLE_MS = 1600;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function ArchitectureDiagram({
  steps,
  variant = "flow",
  className,
}: {
  steps: string[];
  variant?: "flow" | "bidirectional" | "migration";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.15 });
  const reducedMotion = usePrefersReducedMotion();

  const [autoIndex, setAutoIndex] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const playing = inView && !paused && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setAutoIndex((i) => (i + 1) % steps.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const active = hovered ?? autoIndex;
  const Connector = variant === "bidirectional" ? ArrowUpDown : ArrowDown;

  return (
    <div
      ref={containerRef}
      className={clsx("flex flex-col items-stretch", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHovered(null);
      }}
    >
      {steps.map((step, i) => {
        const isActive = active === i;
        const connectorLive = playing && active === i;

        return (
          <div key={step} className="flex flex-col items-center">
            <motion.button
              type="button"
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={clsx(
                "relative w-full overflow-hidden rounded-xl border px-5 py-4 text-left transition-colors duration-300",
                isActive
                  ? "border-accent bg-accent-soft"
                  : "border-border bg-surface hover:border-border-strong"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="diagram-active-sheen"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
                  transition={{ duration: 0.4 }}
                />
              )}
              <div className="relative flex items-center gap-3">
                <span
                  className={clsx(
                    "font-mono text-xs transition-colors",
                    isActive ? "text-accent" : "text-muted-2"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={clsx(
                    "text-sm font-medium transition-colors sm:text-base",
                    isActive ? "text-foreground" : "text-foreground/90"
                  )}
                >
                  {step}
                </span>
              </div>
            </motion.button>

            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 + 0.1 }}
                className={clsx(
                  "relative my-1 flex h-6 w-5 items-center justify-center transition-colors",
                  active === i || active === i + 1 ? "text-accent" : "text-muted-2"
                )}
              >
                <Connector size={16} className="relative z-10" />
                {connectorLive && variant !== "bidirectional" && (
                  <motion.span
                    key={`pulse-${i}-${autoIndex}`}
                    className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(110,123,242,0.6)]"
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: 24, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: CYCLE_MS / 1000, ease: "easeInOut" }}
                  />
                )}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
