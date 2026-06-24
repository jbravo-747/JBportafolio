import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "CV — Ing. Joel Bravo",
  description:
    "Currículum de Joel Eduardo Bravo Guadarrama — Forward Deployed Engineer, Ingeniero de Datos y DevOps.",
};

type Job = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
};

const experience: Job[] = [
  {
    org: "Instituto Mexicano para la Competitividad (IMCO)",
    role: "Forward Deployed Engineer / Ingeniero de Datos y DevOps",
    period: "Octubre 2018 – Actualidad",
    bullets: [
      "Desarrollo, administración y operación de más de 5 sitios web productivos (imco.org.mx, comparacarreras.org) con tráfico acumulado superior a 20 millones de visitas.",
      "Administración de infraestructura web y servicios en la nube con AWS, OCI y Google Cloud.",
      "Mejores prácticas de seguridad web, respaldos automatizados y monitoreo continuo, con disponibilidad superior al 99%.",
      "Administración de servidores Windows y Linux y dispositivos macOS; gestión de Google Workspace, Active Directory, red local y VPN.",
      "Ingeniería de datos: diseño e implementación de pipelines, procesamiento y transformación de fuentes gubernamentales para análisis de competitividad y política pública.",
      "Desarrollo de Monitores de Datos: dashboards interactivos de visualización y análisis desplegados como herramientas públicas.",
      "Integración de soluciones de IA y modelos de lenguaje (LLM) para automatización de flujos editoriales y procesos internos.",
    ],
  },
  {
    org: "U-Rent-It",
    role: "Especialista en Transformación Digital",
    period: "Abril 2025 – Actualidad",
    bullets: [
      "Implementación, configuración y soporte del ERP Odoo: CRM, flota vehicular, contratos y facturación.",
      "Reportes financieros y operativos automatizados: análisis de flota, contratos de arrendamiento y dashboards de KPIs.",
      "Analítica y optimización de campañas digitales y sitio web con Google Analytics y Search Console.",
      "Integración de soluciones de IA y automatización para optimización de procesos internos.",
    ],
  },
  {
    org: "Instituto Nacional Electoral (INE)",
    role: "Forward Deployed Engineer / Analista QA de Sistemas Electorales",
    period: "Enero 2018 – Agosto 2018",
    bullets: [
      "QA para los sistemas de cómputos distritales y registro de actas de las elecciones de Presidente, Senador y Diputado 2018.",
      "Documentación técnica: casos de uso, diseño de pruebas, diagramas UML, manuales, historias de usuario y matrices de pruebas.",
      "Testing automatizado y manual: pruebas unitarias, integración, regresión y estrés con HP ALM, Selenium y JMeter; validación de datos con SQL en Oracle.",
    ],
  },
  {
    org: "Proeducación I.A.P.",
    role: "Ingeniero en Sistemas / Webmaster",
    period: "Enero 2017 – Noviembre 2017",
    bullets: [
      "Sistema interno de gestión de operaciones (PHP, JavaScript, Angular, HTML, CSS3, MySQL) y administración de plataformas de educación a distancia, servidores, redes y sitios web institucionales.",
    ],
  },
  {
    org: "Facultad de Psicología UNAM",
    role: "Desarrollador de Software",
    period: "2016",
    bullets: [
      "Sistema 'Estudiante en Riesgo': diagnóstico y canalización de estudiantes en riesgo de deserción mediante un sistema experto.",
    ],
  },
  {
    org: "Prime Moto Services",
    role: "Becario de Sistemas",
    period: "2014",
    bullets: ["Soporte técnico y prácticas en el área de sistemas."],
  },
];

const education = [
  "Ingeniería en Computación – UNAM (2017)",
  "Certificación Profesional en Análisis de Datos – Google / Coursera",
  "Diplomado en E-commerce – UNAM",
  "Certificación en Administración de Servidores Linux – Platzi",
  "Certificación en Web Scraping – Platzi",
  "Claude AI Capabilities and Limitations",
];

const skills = [
  "AWS",
  "OCI",
  "Google Cloud",
  "Linux",
  "Windows",
  "macOS",
  "Docker",
  "Bash",
  "Python",
  "JavaScript",
  "React",
  "Vue.js",
  "D3.js",
  "Node.js",
  "WordPress",
  "Odoo CRM",
  "Active Directory",
  "VPN",
  "Google Analytics",
  "Search Console",
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-md">
      <h2 className="font-headline text-headline-lg-mobile text-on-surface">
        {children}
      </h2>
      <div className="mt-xs h-base w-xl bg-primary-container" />
    </div>
  );
}

export default function CVPage() {
  return (
    <main className="mx-auto max-w-3xl px-md py-xl">
      {/* Acciones */}
      <div className="mb-lg flex flex-wrap items-center justify-between gap-md">
        <Link
          href="/"
          className="flex items-center gap-xs font-mono text-mono-code uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary-container"
        >
          <ArrowLeft size={16} /> Volver al portafolio
        </Link>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-xs rounded bg-primary-container px-sm py-xs font-bold text-on-primary-container transition-opacity hover:opacity-80"
        >
          <Download size={18} /> Descargar PDF
        </a>
      </div>

      {/* Encabezado */}
      <header className="mb-xl flex flex-col gap-lg border-b border-outline-variant pb-lg sm:flex-row sm:items-center">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-primary-container/30 sm:h-40 sm:w-40">
          <Image
            src="/profile.jpg"
            alt="Ing. Joel Bravo"
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="font-display text-display-xl-mobile font-bold leading-tight text-primary">
            Joel Eduardo <span className="text-primary-container">Bravo</span>
          </h1>
          <p className="mt-xs font-mono text-mono-code uppercase tracking-widest text-primary-fixed-dim">
            Forward Deployed Engineer · Datos &amp; DevOps
          </p>
          <div className="mt-md flex flex-wrap gap-md font-mono text-mono-code text-on-surface-variant">
            <span className="flex items-center gap-xs">
              <MapPin size={14} /> Ciudad de México
            </span>
            <a
              href="mailto:bravojoel.eg@gmail.com"
              className="flex items-center gap-xs transition-colors hover:text-primary-container"
            >
              <Mail size={14} /> bravojoel.eg@gmail.com
            </a>
          </div>
        </div>
      </header>

      {/* Perfil */}
      <section className="mb-xl">
        <SectionTitle>Perfil</SectionTitle>
        <p className="font-body text-body-lg leading-relaxed text-on-surface-variant">
          Ingeniero en Computación con más de 9 años de experiencia como Forward
          Deployed Engineer en entornos de gobierno, sector público y
          organizaciones de la sociedad civil. Me especializo en embeber con
          equipos cliente para traducir sus necesidades en soluciones técnicas y
          desplegarlas de extremo a extremo: pipelines de datos, infraestructura
          cloud, dashboards de análisis, integraciones de sistemas e
          implementaciones de IA. He operado en proyectos de alto impacto
          institucional —sistemas electorales críticos, plataformas de política
          pública, ERP para gestión de flota y activos.
        </p>
      </section>

      {/* Experiencia */}
      <section className="mb-xl">
        <SectionTitle>Experiencia</SectionTitle>
        <div className="flex flex-col gap-lg">
          {experience.map((job) => (
            <article
              key={job.org + job.period}
              className="border border-outline-variant bg-surface-container-low p-md"
            >
              <div className="mb-sm flex flex-col justify-between gap-xs md:flex-row md:items-baseline">
                <h3 className="font-headline text-[22px] leading-tight text-on-surface">
                  {job.org}
                </h3>
                <span className="shrink-0 font-mono text-mono-code uppercase tracking-wide text-primary-fixed-dim">
                  {job.period}
                </span>
              </div>
              <p className="mb-sm font-body text-body-md font-semibold text-on-surface">
                {job.role}
              </p>
              <ul className="flex flex-col gap-xs">
                {job.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-sm text-body-md text-on-surface-variant"
                  >
                    <span className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-primary-container" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Formación + Habilidades */}
      <section className="mb-xl grid grid-cols-1 gap-xl md:grid-cols-2">
        <div>
          <SectionTitle>Formación</SectionTitle>
          <ul className="flex flex-col gap-sm">
            {education.map((e) => (
              <li
                key={e}
                className="flex gap-sm text-body-md text-on-surface-variant"
              >
                <span className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-primary-container" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle>Habilidades</SectionTitle>
          <div className="flex flex-wrap gap-xs">
            {skills.map((s) => (
              <span
                key={s}
                className="bg-surface-container-highest px-xs py-1 font-mono text-[12px] uppercase text-on-surface-variant"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-lg">
            <h3 className="mb-sm font-mono text-mono-code uppercase tracking-widest text-primary-fixed-dim">
              Idiomas
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Español — Nativo · Inglés — Intermedio
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
