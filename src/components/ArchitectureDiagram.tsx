"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ArrowDown, ArrowUpDown } from "lucide-react";

export function ArchitectureDiagram({
  steps,
  variant = "flow",
  className,
}: {
  steps: string[];
  variant?: "flow" | "bidirectional" | "migration";
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const Connector = variant === "bidirectional" ? ArrowUpDown : ArrowDown;

  return (
    <div className={clsx("flex flex-col items-stretch", className)}>
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <motion.button
            type="button"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={clsx(
              "w-full rounded-xl border px-5 py-4 text-left transition-colors duration-200",
              active === i
                ? "border-accent bg-accent-soft"
                : "border-border bg-surface hover:border-border-strong"
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={clsx(
                  "font-mono text-xs transition-colors",
                  active === i ? "text-accent" : "text-muted-2"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={clsx(
                  "text-sm font-medium transition-colors sm:text-base",
                  active === i ? "text-foreground" : "text-foreground/90"
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
                "my-1 transition-colors",
                active === i || active === i + 1 ? "text-accent" : "text-muted-2"
              )}
            >
              <Connector size={16} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
