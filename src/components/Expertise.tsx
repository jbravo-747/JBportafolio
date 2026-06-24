import { LineChart, Layers, Braces, Database } from "lucide-react";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { StackChart } from "./StackChart";

const stack = [
  { icon: LineChart, label: "D3.JS / CANVAS" },
  { icon: Layers, label: "NEXT.JS / REACT" },
  { icon: Braces, label: "TYPESCRIPT" },
  { icon: Database, label: "DATOS ABIERTOS" },
];

const stats = [
  { value: 6, label: "Productos en producción" },
  { value: 4, label: "Instituciones y think tanks" },
];

export function Expertise() {
  return (
    <section
      id="expertise"
      className="border-y border-outline-variant px-md py-xl"
    >
      <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-xl md:grid-cols-2">
        <Reveal>
          <h2 className="mb-md font-headline text-headline-lg-mobile md:text-headline-lg">
            Stack de precisión
          </h2>
          <p className="mb-lg font-body text-body-lg leading-relaxed text-on-surface-variant">
            Mi enfoque vive en la intersección entre{" "}
            <span className="text-primary">ingeniería de alto rendimiento</span> y{" "}
            <span className="text-primary">ergonomía cognitiva</span>: que el dato
            sea legible, accionable y bello incluso bajo densidad extrema.
          </p>
          <div className="grid grid-cols-2 gap-md">
            {stats.map((s) => (
              <div key={s.label}>
                <CountUp
                  value={s.value}
                  className="mb-xs block font-display text-[48px] font-bold leading-none text-primary-container"
                />
                <div className="font-mono text-mono-code uppercase tracking-tight text-on-surface-variant">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-sm">
          {stack.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex h-40 flex-col justify-between border border-outline-variant bg-surface-container-high p-md"
            >
              <Icon size={40} className="text-primary-container" />
              <span className="font-mono font-bold text-on-surface">{label}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-xl max-w-container-max">
        <StackChart />
      </Reveal>
    </section>
  );
}
