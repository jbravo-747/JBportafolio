import { Send } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section id="contact" className="mx-auto max-w-container-max px-md py-xl text-center">
      <Reveal>
        <h2 className="mb-md font-display text-display-xl-mobile font-bold md:text-display-xl">
          Convierto datos complejos en{" "}
          <span className="text-primary-container">decisiones claras</span>.
        </h2>
        <p className="mx-auto mb-lg max-w-2xl font-body text-body-lg text-on-surface-variant">
          Disponible para colaboraciones en productos de datos, visualización y
          herramientas de decisión. Hablemos de tu arquitectura de datos.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-md rounded-xl bg-primary-container px-xl py-lg text-xl font-bold text-on-primary-container transition-transform hover:scale-105"
        >
          Iniciar contacto <Send size={24} />
        </a>
      </Reveal>
    </section>
  );
}
