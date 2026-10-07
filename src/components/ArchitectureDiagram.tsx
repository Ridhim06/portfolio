"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";
import { ArrowRight, ArrowLeftRight, ArrowDown } from "lucide-react";

const CYCLE_MS = 950;

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
  orientation = "horizontal",
  className,
}: {
  steps: string[];
  variant?: "flow" | "bidirectional" | "migration";
  orientation?: "horizontal" | "vertical";
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
  const vertical = orientation === "vertical";
  const Connector =
    variant === "bidirectional" ? ArrowLeftRight : vertical ? ArrowDown : ArrowRight;

  return (
    <div
      ref={containerRef}
      className={clsx(
        vertical
          ? "flex flex-col items-stretch gap-0"
          : "flex snap-x snap-mandatory items-stretch gap-0 overflow-x-auto overscroll-x-contain pb-2",
        className
      )}
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
          <div
            key={step}
            className={clsx(
              vertical
                ? "flex flex-col items-stretch"
                : "flex shrink-0 snap-start items-center"
            )}
          >
            <motion.button
              type="button"
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              initial={vertical ? { opacity: 0, y: 12 } : { opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "0px -10%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={clsx(
                "relative flex flex-col justify-center overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors duration-300",
                vertical
                  ? "min-h-[60px] w-full"
                  : "h-[76px] w-[168px] sm:w-[184px]",
                isActive
                  ? "border-accent bg-accent-soft"
                  : "border-border bg-surface hover:border-border-strong"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="diagram-active-sheen"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent"
                  transition={{ duration: 0.3 }}
                />
              )}
              <div className="relative flex flex-col gap-1">
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
                    "text-sm font-medium leading-snug transition-colors",
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
                transition={{ duration: 0.4, delay: i * 0.05 + 0.08 }}
                className={clsx(
                  "relative flex h-6 w-6 shrink-0 items-center justify-center transition-colors",
                  vertical ? "mx-auto my-0.5" : "my-1",
                  active === i || active === i + 1 ? "text-accent" : "text-muted-2"
                )}
              >
                <Connector size={16} className="relative z-10" />
                {connectorLive && variant !== "bidirectional" && (
                  <motion.span
                    key={`pulse-${i}-${autoIndex}`}
                    className={clsx(
                      "absolute h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(110,123,242,0.6)]",
                      vertical
                        ? "left-1/2 top-0 -translate-x-1/2"
                        : "left-0 top-1/2 -translate-y-1/2"
                    )}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={
                      vertical
                        ? { y: 24, opacity: [0, 1, 1, 0] }
                        : { x: 24, opacity: [0, 1, 1, 0] }
                    }
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
