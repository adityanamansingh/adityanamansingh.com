"use client";
import { useEffect, useRef } from "react";

// Decorative blueprint grid with a soft glow that follows the pointer. aria-hidden, no pointer events, static for reduced motion / touch.
export default function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return;
    let raf = 0, x = innerWidth * 0.7, y = 140, tx = x, ty = y;
    const tick = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      el.style.setProperty("--px", `${x.toFixed(1)}px`); el.style.setProperty("--py", `${y.toFixed(1)}px`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(tick); };
    addEventListener("pointermove", move, { passive: true });
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="backdrop">
      <div className="backdrop-grid" />
      <div className="backdrop-glow" />
    </div>
  );
}
