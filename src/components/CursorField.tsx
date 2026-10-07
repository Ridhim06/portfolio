"use client";

import { useEffect, useRef } from "react";

const SPACING = 34;
const RADIUS = 170;
const PUSH = 26;

type Dot = { x: number; y: number; ox: number; oy: number; vx: number; vy: number };

// Fixed, full-viewport field of dots that ripple away from the cursor and
// light up near it, plus a soft glow that trails the pointer.
export function CursorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999, gx: -9999, gy: -9999 };
    let accent = [110, 123, 242];
    let dotRgb = [255, 255, 255];
    let baseAlpha = 0.1;

    const readTheme = () => {
      const light = document.documentElement.dataset.theme === "light";
      accent = light ? [79, 91, 213] : [110, 123, 242];
      dotRgb = light ? [9, 9, 11] : [255, 255, 255];
      baseAlpha = light ? 0.12 : 0.1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = SPACING / 2; y < h; y += SPACING) {
        for (let x = SPACING / 2; x < w; x += SPACING) {
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      // Smoothly trail the glow behind the real cursor
      mouse.gx += (mouse.x - mouse.gx) * 0.12;
      mouse.gy += (mouse.y - mouse.gy) * 0.12;

      if (mouse.gx > -999) {
        const g = ctx.createRadialGradient(mouse.gx, mouse.gy, 0, mouse.gx, mouse.gy, 320);
        g.addColorStop(0, `rgba(${accent[0]},${accent[1]},${accent[2]},0.16)`);
        g.addColorStop(1, `rgba(${accent[0]},${accent[1]},${accent[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(mouse.gx - 320, mouse.gy - 320, 640, 640);
      }

      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS && dist > 0.1) {
          const f = (1 - dist / RADIUS) ** 2 * PUSH;
          d.vx += (dx / dist) * f * 0.12;
          d.vy += (dy / dist) * f * 0.12;
        }
        // Spring back to rest position
        d.vx += (d.ox - d.x) * 0.06;
        d.vy += (d.oy - d.y) * 0.06;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;

        const near = Math.max(0, 1 - dist / (RADIUS * 1.4));
        const r = 1 + near * 1.6;
        if (near > 0.02) {
          ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${baseAlpha + near * 0.7})`;
        } else {
          ctx.fillStyle = `rgba(${dotRgb[0]},${dotRgb[1]},${dotRgb[2]},${baseAlpha})`;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (mouse.gx < -999) {
        mouse.gx = e.clientX;
        mouse.gy = e.clientY;
      }
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    readTheme();
    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
