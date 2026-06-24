"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import anime from "animejs";
import { Play, RotateCw, X } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);
  const areaRef = useRef<SVGGElement | null>(null);
  const reduceRef = useRef(false);

  useLayoutEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (wrapRef.current) wrapRef.current.style.height = "0px";
  }, []);

  function dots() {
    return rootRef.current
      ? Array.from(
          rootRef.current.querySelectorAll<SVGCircleElement>(".chart-dot"),
        )
      : [];
  }

  function showFinal() {
    const line = lineRef.current;
    const area = areaRef.current;
    if (line) line.style.strokeDashoffset = "0";
    if (area) {
      area.style.opacity = "1";
      area.style.transform = "none";
    }
    dots().forEach((d) => {
      d.style.opacity = "1";
      d.style.transform = "scale(1)";
    });
  }

  function playChart() {
    const line = lineRef.current;
    const area = areaRef.current;
    const ds = dots();
    if (!line || !area) return;
    if (reduceRef.current) {
      showFinal();
      return;
    }
    anime.remove([line, area, ...ds]);
    const tl = anime.timeline({ easing: "easeOutCubic" });
    tl.add({
      targets: line,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1100,
      easing: "easeInOutSine",
    })
      .add(
        { targets: area, opacity: [0, 1], translateY: [12, 0], duration: 750 },
        "-=750",
      )
      .add(
        {
          targets: ds,
          opacity: [0, 1],
          scale: [0, 1],
          delay: anime.stagger(70),
          duration: 520,
          easing: "spring(1, 80, 12, 0)",
        },
        "-=520",
      );
  }

  // Al abrir: despliega el panel (altura) y dibuja la gráfica.
  useEffect(() => {
    if (!open) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (reduceRef.current) {
      wrap.style.height = "auto";
      showFinal();
      return;
    }
    wrap.style.height = "auto";
    const target = wrap.offsetHeight;
    wrap.style.height = "0px";
    void wrap.offsetHeight; // reflow
    anime({
      targets: wrap,
      height: target,
      duration: 650,
      easing: "easeOutCubic",
      complete: () => {
        wrap.style.height = "auto";
      },
    });
    playChart();
  }, [open]);

  function handleClose() {
    const wrap = wrapRef.current;
    if (!wrap || reduceRef.current) {
      setOpen(false);
      return;
    }
    const current = wrap.offsetHeight;
    wrap.style.height = current + "px";
    void wrap.offsetHeight;
    anime({
      targets: wrap,
      height: 0,
      duration: 420,
      easing: "easeInCubic",
      complete: () => setOpen(false),
    });
  }

  return (
    <div
      ref={rootRef}
      className="border border-outline-variant bg-surface-container-low/40 p-md"
    >
      <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-mono-code uppercase tracking-widest text-primary-fixed-dim">
            Demo en vivo · Visualización de datos
          </span>
          <p className="mt-xs text-body-md text-on-surface-variant">
            Una muestra interactiva de lo que construyo — pulsa para
            desplegarla.
          </p>
        </div>

        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex shrink-0 items-center gap-xs rounded bg-primary-container px-md py-xs font-bold text-on-primary-container transition-transform hover:scale-105"
          >
            <Play size={18} /> Ejecutar visualización
          </button>
        ) : (
          <div className="flex shrink-0 gap-xs">
            <button
              type="button"
              onClick={playChart}
              aria-label="Re-ejecutar"
              className="flex items-center gap-xs rounded border border-outline-variant px-sm py-xs font-mono text-mono-code uppercase tracking-wide text-on-surface transition-colors hover:border-primary-container hover:text-primary-container"
            >
              <RotateCw size={16} /> Re-ejecutar
            </button>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Cerrar"
              className="flex items-center rounded border border-outline-variant px-sm py-xs text-on-surface-variant transition-colors hover:border-primary-container hover:text-primary-container"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* contenedor que se despliega */}
      <div ref={wrapRef} className="h-0 overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="mt-md h-44 w-full"
          role="img"
          aria-label="Gráfica de trayectoria de impacto"
        >
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bef264" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#bef264" stopOpacity="0" />
            </linearGradient>
          </defs>

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
          <line
            x1={PADX}
            x2={W - PADX}
            y1={BASE}
            y2={BASE}
            stroke="#434938"
            strokeWidth="1"
          />

          <g ref={areaRef} style={{ opacity: 0 }}>
            <path d={areaPath} fill="url(#chartFill)" />
          </g>

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
    </div>
  );
}
