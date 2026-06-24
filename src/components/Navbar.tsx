"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [
  { label: "Trabajo", href: "#work" },
  { label: "Expertise", href: "#expertise" },
];

// lucide-react ya no incluye íconos de marca, así que usamos el logo inline.
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-outline-variant bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-xl max-w-container-max items-center justify-between px-md">
        <a
          href="#top"
          className="font-display text-body-lg font-bold tracking-tighter text-primary-container"
        >
          {site.wordmark}
          <span className="text-on-surface-variant">{site.wordmarkSuffix}</span>
        </a>

        <div className="hidden items-center gap-md md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-body-md text-on-surface-variant transition-colors duration-200 hover:text-primary-fixed-dim"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.cvHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-md text-on-surface-variant transition-colors duration-200 hover:text-primary-fixed-dim"
          >
            CV
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Joel Bravo"
            className="flex items-center gap-xs rounded border border-outline-variant px-sm py-xs text-body-md font-medium text-on-surface transition-colors hover:border-primary-container hover:text-primary-container"
          >
            <LinkedinIcon /> LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="ml-sm rounded bg-primary-container px-sm py-xs font-bold text-on-primary-container transition-opacity hover:opacity-80"
          >
            Contacto
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-primary-container md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-sm border-t border-outline-variant bg-background/95 px-md py-sm md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-xs text-body-md text-on-surface-variant"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.cvHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="py-xs text-body-md text-on-surface-variant"
          >
            CV
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-xs py-xs text-body-md text-on-surface-variant"
          >
            <LinkedinIcon /> LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="rounded bg-primary-container px-sm py-xs text-center font-bold text-on-primary-container"
          >
            Contacto
          </a>
        </div>
      )}
    </nav>
  );
}
