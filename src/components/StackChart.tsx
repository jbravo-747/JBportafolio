"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

// Datos de ejemplo (trayectoria ascendente)
const DATA = [22, 34, 29, 52, 47, 68, 64, 88];
const W = 600;
const H = 190;
const PADX = 18;
const TOP = 18;
const BASE = 168;

const stepX = (W - PADX * 2) / (DATA.length - 1);
const pts = DATA.map((v, i) => ({
  x: PADX + i * stepX,
  y: BASE - (v / 100) * (BASE - TOP),
}));
const linePath = pts
  .map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
  .join(" ");
const areaPath =
  `M${pts[0].x.toFixed(1)},${BASE} ` +
  pts.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") +
  ` L${pts[pts.length - 1].x.toFixed(1)},${BASE} Z`;

export function StackChart() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);
  const areaRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    const area = areaRef.current;
    if (!root || !line || !area) return;
    const dots = Array.from(root.querySelectorAll<SVGCircleElement>(".chart-dot"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function showFinal() {
      line!.style.strokeDashoffset = "0";
      area!.style.opacity = "1";
      area!.style.transform = "none";
      dots.forEach((d) => {
        d.style.opacity = "1";
        d.style.transform = "scale(1)";
      });
    }

    if (reduce) {
      showFinal();
      return;
    }

    function play() {
      anime.remove([line, area, ...dots]);
      const tl = anime.timeline({ easing: "easeOutCubic" });
      tl.add({
        targets: line,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1100,
        easing: "easeInOutSine",
      })
        .add(
          {
            targets: area,
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 750,
          },
          "-=750",
        )
        .add(
          {
            targets: dots,
            opacity: [0, 1],
            scale: [0, 1],
            delay: anime.stagger(70),
            duration: 520,
            easing: "spring(1, 80, 12, 0)",
          },
          "-=520",
        );
    }

    let played = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played) {
            played = true;
            play();
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    obs.observe(root);

    // re-disparar al interactuar
    const replay = () => play();
    root.addEventListener("pointerenter", replay);
    root.addEventListener("click", replay);

    return () => {
      obs.disconnect();
      root.removeEventListener("pointerenter", replay);
      root.removeEventListener("click", replay);
      anime.remove([line, area, ...dots]);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Gráfica de trayectoria de impacto"
      className="group cursor-pointer border border-outline-variant bg-surface-container-low/40 p-md"
    >
      <div className="mb-sm flex items-center justify-between">
        <span className="font-mono text-mono-code uppercase tracking-widest text-primary-fixed-dim">
          Trayectoria de impacto
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-on-tertiary-fixed-variant transition-colors group-hover:text-primary-container">
          ↻ pasa el mouse
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-44 w-full"
      >
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bef264" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#bef264" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* líneas guía horizontales */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={PADX}
            x2={W - PADX}
            y1={TOP + t * (BASE - TOP)}
            y2={TOP + t * (BASE - TOP)}
            stroke="#2a2a2a"
            strokeWidth="1"
          />
        ))}
        {/* base */}
        <line
          x1={PADX}
          x2={W - PADX}
          y1={BASE}
          y2={BASE}
          stroke="#434938"
          strokeWidth="1"
        />

        {/* área (se revela) */}
        <g ref={areaRef} style={{ opacity: 0 }}>
          <path d={areaPath} fill="url(#chartFill)" />
        </g>

        {/* línea (se traza) */}
        <path
          ref={lineRef}
          d={linePath}
          fill="none"
          stroke="#bef264"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
          vectorEffect="non-scaling-stroke"
        />

        {/* puntos (aparecen escalonados) */}
        {pts.map((p, i) => (
          <circle
            key={i}
            className="chart-dot [transform-box:fill-box] [transform-origin:center]"
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#0e0e0e"
            stroke="#bef264"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            style={{ opacity: 0, transform: "scale(0)" }}
          />
        ))}
      </svg>
    </div>
  );
}
