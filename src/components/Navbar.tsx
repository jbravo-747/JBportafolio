"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [
  { label: "Trabajo", href: "#work" },
  { label: "Expertise", href: "#expertise" },
];

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
