"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

// Cuenta de 0 hasta `value` cuando entra en viewport. `pad` rellena con ceros.
export function CountUp({
  value,
  pad = 2,
  suffix = "",
  className = "",
}: {
  value: number;
  pad?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const render = (n: number) =>
      (el.textContent = String(Math.round(n)).padStart(pad, "0") + suffix);

    if (reduce) {
      render(value);
      return;
    }

    let played = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played) {
            played = true;
            const obj = { v: 0 };
            anime({
              targets: obj,
              v: value,
              round: 1,
              duration: 1500,
              easing: "easeOutExpo",
              update: () => render(obj.v),
            });
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, pad, suffix]);

  return (
    <span ref={ref} className={className}>
      {String(0).padStart(pad, "0") + suffix}
    </span>
  );
}
