"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

function parseValue(raw: string) {
  const match = raw.match(/[\d,]+/);
  if (!match) return { before: "", number: 0, after: raw, hasNumber: false, decimals: 0 };
  const numStr = match[0];
  const number = parseInt(numStr.replace(/,/g, ""), 10);
  const before = raw.slice(0, match.index);
  const after = raw.slice((match.index ?? 0) + numStr.length);
  return { before, number, after, hasNumber: true, decimals: 0 };
}

function format(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

export function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const [display, setDisplay] = useState<string>(() => {
    const { before, after, hasNumber } = parseValue(value);
    return hasNumber ? `${before}0${after}` : value;
  });

  useEffect(() => {
    if (!inView) return;
    const { before, number, after, hasNumber } = parseValue(value);
    if (!hasNumber) {
      return;
    }
    const controls = animate(0, number, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(`${before}${format(latest)}${after}`),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return <span ref={ref}>{display}</span>;
}
