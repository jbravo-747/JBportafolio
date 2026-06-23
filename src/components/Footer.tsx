import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-lowest py-xl">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-md px-md md:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="mb-xs font-display text-body-lg font-bold text-primary">
              {site.wordmark}
              <span className="text-on-surface-variant">{site.wordmarkSuffix}</span>
            </h2>
            <p className="font-mono text-mono-code text-on-tertiary-fixed-variant">
              © {new Date().getFullYear()} · Productos de datos e ingeniería de
              alto rendimiento.
            </p>
          </div>
          <div className="mt-lg flex flex-wrap gap-md">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-mono-code uppercase tracking-widest text-on-tertiary-fixed-variant transition-colors hover:text-primary-container"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between md:items-end">
          <p className="max-w-sm text-left text-on-surface-variant md:text-right">
            Cierro la brecha entre los datasets crudos y la inteligencia
            estratégica.
          </p>
          <div className="mt-lg self-start rounded-full bg-primary-container p-base md:self-end">
            <div className="flex items-center gap-xs rounded-full bg-background px-md py-xs">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary-container">
                Estado: Disponible
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
