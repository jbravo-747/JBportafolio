import Image from "next/image";

// Genera un "data art" abstracto y determinista por proyecto (seed),
// con la estética obsidiana + lima del diseño. Si hay screenshot real
// en /public, se usa esa en su lugar.
function ThumbArt({ seed }: { seed: number }) {
  const rng = (n: number) => {
    const x = Math.sin(seed * 99.13 + n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const lines = Array.from({ length: 14 }, (_, i) => {
    const y = 8 + i * 6.4 + rng(i) * 3;
    const amp = 6 + rng(i + 20) * 22;
    const phase = rng(i + 40) * Math.PI * 2;
    const points = Array.from({ length: 13 }, (_, j) => {
      const x = (j / 12) * 100;
      const yy = y + Math.sin(j * 0.7 + phase) * (amp / 14);
      return `${x.toFixed(1)},${yy.toFixed(1)}`;
    }).join(" ");
    const opacity = 0.12 + rng(i + 60) * 0.5;
    return { points, opacity, key: i };
  });

  const nodes = Array.from({ length: 9 }, (_, i) => ({
    cx: 8 + rng(i + 100) * 84,
    cy: 8 + rng(i + 140) * 84,
    r: 0.6 + rng(i + 180) * 2.2,
    key: i,
  }));

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`glow-${seed}`} cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#glow-${seed})`} />
      {lines.map((l) => (
        <polyline
          key={l.key}
          points={l.points}
          fill="none"
          stroke="#bef264"
          strokeWidth="0.5"
          strokeOpacity={l.opacity}
        />
      ))}
      {nodes.map((n) => (
        <circle
          key={n.key}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill="#bef264"
          fillOpacity="0.85"
        />
      ))}
    </svg>
  );
}

export function ProjectThumb({
  seed,
  image,
  alt,
  className = "",
}: {
  seed: number;
  image?: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface-container-high ${className}`}>
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0 grayscale transition-all duration-700 group-hover:grayscale-0">
          <ThumbArt seed={seed} />
        </div>
      )}
    </div>
  );
}
