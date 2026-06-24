import { ArrowRight, ArrowDown } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-md pt-xl"
    >
      {/* El fondo de cuadrícula animada lo provee <RippleGrid /> (canvas global). */}
      <Reveal className="relative z-10 mx-auto w-full max-w-container-max">
        <p className="mb-sm font-mono text-mono-code uppercase tracking-widest text-primary-fixed-dim">
          {site.role}
        </p>
        <h1 className="mb-md max-w-4xl font-display text-display-xl-mobile font-bold leading-tight text-primary md:text-display-xl">
          {site.hero.titleStart}{" "}
          <span className="text-primary-container">{site.hero.titleAccent}</span>.
        </h1>
        <p className="mb-lg max-w-2xl font-body text-body-lg text-on-surface-variant">
          {site.hero.subtitle}
        </p>
        <div className="flex flex-wrap gap-md">
          <a
            href="#work"
            className="flex items-center gap-xs rounded bg-primary-container px-lg py-sm font-bold text-on-primary-container transition-transform hover:scale-105"
          >
            Ver trabajo <ArrowRight size={18} />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded border border-outline-variant px-lg py-sm font-bold text-on-surface transition-colors hover:bg-surface-container-high"
          >
            Contacto
          </a>
        </div>
      </Reveal>

      <div className="absolute bottom-md left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center opacity-50">
        <span className="mb-base font-mono text-mono-code uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown size={18} />
      </div>
    </section>
  );
}
