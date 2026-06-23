import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { ProjectThumb } from "./ProjectThumb";
import { Reveal } from "./Reveal";

// Mapa estático -> las clases literales son visibles para el JIT de Tailwind.
const COL_SPAN: Record<Project["cols"], string> = {
  8: "md:col-span-8",
  6: "md:col-span-6",
  4: "md:col-span-4",
};

function CategoryChip({ label }: { label: string }) {
  return (
    <span className="inline-block border border-primary-container/20 bg-background/80 px-sm py-base font-mono text-xs uppercase text-primary-container backdrop-blur">
      {label}
    </span>
  );
}

function StackTags({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-xs">
      {stack.map((t) => (
        <span
          key={t}
          className="bg-surface-container-highest px-xs py-1 font-mono text-[12px] uppercase text-on-surface-variant"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { title, category, description, stack, href, cols, featured, image, seed } =
    project;

  return (
    <Reveal
      as="article"
      delay={(index % 3) * 80}
      className={`${COL_SPAN[cols]} bento-card group flex flex-col border border-outline-variant bg-surface-container-low p-md`}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col">
        <div className="relative mb-md overflow-hidden">
          <ProjectThumb
            seed={seed}
            image={image}
            alt={title}
            className={featured ? "aspect-[16/8]" : "aspect-[4/3]"}
          />
          <div className="absolute left-md top-md">
            <CategoryChip label={category} />
          </div>
        </div>

        <div
          className={
            featured
              ? "flex flex-1 flex-col justify-between gap-md md:flex-row md:items-end"
              : "flex flex-1 flex-col"
          }
        >
          <div className={featured ? "min-w-0 flex-1" : ""}>
            <h3 className="mb-xs font-headline text-[24px] leading-tight text-on-surface md:text-headline-lg-mobile">
              {title}
            </h3>
            <p className="mb-md max-w-prose text-body-md text-on-surface-variant">
              {description}
            </p>
            <StackTags stack={stack} />
          </div>

          <span className="mt-md flex shrink-0 items-center gap-xs font-bold text-primary-container transition-colors group-hover:text-primary-fixed-dim md:mt-0">
            Ver proyecto <ArrowUpRight size={18} />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-container-max px-md py-xl">
      <Reveal className="mb-lg">
        <h2 className="mb-xs font-headline text-headline-lg-mobile md:text-headline-lg">
          Trabajo seleccionado
        </h2>
        <div className="h-base w-xl bg-primary-container" />
      </Reveal>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.href} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
