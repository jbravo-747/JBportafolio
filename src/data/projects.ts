// Los 6 trabajos del portafolio.
// `cols` controla el ancho en el grid bento de 12 columnas (desktop).
// `image` es opcional: si dejas una screenshot en /public/projects/<archivo>,
// se usa; si no, se renderiza un placeholder de "data art" con la paleta.
export type Project = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  href: string;
  cols: 8 | 6 | 4;
  featured?: boolean;
  image?: string;
  seed: number;
};

export const projects: Project[] = [
  {
    title: "Mujeres en la Economía",
    category: "Monitor · Data viz",
    description:
      "Monitor interactivo de las brechas de género en la economía mexicana para IMCO.",
    stack: ["Next.js", "D3.js", "Data viz"],
    href: "https://imco.org.mx/monitor/mujeres-en-la-economia/",
    cols: 8,
    featured: true,
    seed: 1,
  },
  {
    title: "Compara Carreras",
    category: "Herramienta · Datos",
    description:
      "Comparador de carreras universitarias: salarios, empleo y demanda laboral.",
    stack: ["React", "D3.js", "Datos abiertos"],
    href: "https://comparacarreras.imco.org.mx/",
    cols: 4,
    seed: 2,
  },
  {
    title: "Radar Arancelario",
    category: "Monitor · Comercio",
    description:
      "Seguimiento visual de aranceles y su impacto en el comercio exterior.",
    stack: ["Next.js", "Visualización", "Comercio"],
    href: "https://imco.org.mx/monitor/radar-arancelario/",
    cols: 4,
    seed: 3,
  },
  {
    title: "Tres Mundiales",
    category: "Microsite · Storytelling",
    description:
      "Sitio de datos y narrativa sobre los mundiales de fútbol en México.",
    stack: ["Next.js", "Scrollytelling", "Mapas"],
    href: "https://tresmundiales.imco.org.mx/",
    cols: 8,
    featured: true,
    seed: 4,
  },
  {
    title: "FMCN — Prototipo",
    category: "Producto · Prototipo",
    description:
      "Prototipo de plataforma para el Fondo Mexicano para la Conservación de la Naturaleza.",
    stack: ["Next.js", "Vercel", "Prototipo"],
    href: "https://fmcn-prototipo.vercel.app/",
    cols: 6,
    seed: 5,
  },
  {
    title: "UrentIT",
    category: "Marca · Web",
    description:
      "Sitio corporativo de mi empresa de soluciones y servicios de TI.",
    stack: ["Next.js", "Tailwind", "Branding"],
    href: "https://urentit.mx/",
    cols: 6,
    seed: 6,
  },
];
