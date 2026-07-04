import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "../components/brand/CountUp";
import Reveal from "../components/brand/Reveal";
import fotoJP from "../assets/juan-pablo.jpg";

/* ── Datos ───────────────────────────────────────────────────────────────── */

const TIMELINE = [
  {
    year: "2010",
    title: "Primer toque",
    desc: "Empiezo a jugar fútbol desde kinder. El inicio de años de torneos y entrenamientos.",
    next: false,
  },
  {
    year: "2019",
    title: "Selección Yucatán",
    desc: "Convocado al Nacional en CDMX. Una actuación destacada llamó la atención de un visor del América, que quiso firmarme; mis papás dijeron que no por mi edad.",
    next: false,
  },
  {
    year: "2020–2021",
    title: "Pandemia y Necaxa",
    desc: "Con las academias cerradas, me uno al equipo de Necaxa. Luego regreso al América.",
    next: false,
  },
  {
    year: "2021",
    title: "Selección Yucatán · Lázaro Cárdenas",
    desc: "Segundo torneo nacional representando a Yucatán. Llegamos a la final y perdimos. Una de las experiencias más formativas en el fútbol.",
    next: false,
  },
  {
    year: "2022",
    title: "CUM · Capitán",
    desc: "Entro al CUM representando a mi colegio. En mi primer año me nombran capitán del equipo.",
    next: false,
  },
  {
    year: "2023",
    title: "Pádel",
    desc: "Me inicio en el pádel y desarrollo un talento completamente nuevo. Primer torneo estatal: eliminados en octavos, pero gran experiencia.",
    next: false,
  },
  {
    year: "Jun 2023",
    title: "Fractura de clavícula",
    desc: "Me rompo la clavícula a dos milímetros de salirse. Tres meses sin escuela, más de un mes durmiendo sentado. Cinco meses de rehabilitación y regreso más fuerte.",
    next: false,
  },
  {
    year: "2024",
    title: "Muay Thai",
    desc: "Me meto al Muay Thai, entreno duro, hago sparring los jueves y tengo mi primera pelea.",
    next: false,
  },
  {
    year: "2024",
    title: "Subcampeones Liga Marista",
    desc: "Temporada fuerte con el equipo. Terminamos como subcampeones de liga.",
    next: false,
  },
  {
    year: "Verano 2024",
    title: "TASIS, Londres",
    desc: "Me voy a internado en Inglaterra. Aprendo inglés, gano independencia, viajo solo, hago networking internacional y conozco a quien hoy es mi novia. Gané MVP de tenis y MVP de fútbol de la temporada.",
    next: false,
  },
  {
    year: "2024–2026",
    title: "Dos años en TASIS",
    desc: "Vivir fuera de casa me enseña a cocinar, organizarme, manejar dinero y relacionarme con gente de todo el mundo. Relaciones que no tienen comparación.",
    next: false,
  },
  {
    year: "2026",
    title: "De vuelta en Mérida",
    desc: "Terminando la prepa y tomando el curso de desarrollo web y diseño digital. Construyendo las skills para convertir ideas en productos reales.",
    next: false,
  },
  {
    year: "Próximo →",
    title: "Tec de Monterrey",
    desc: "Ing. en Transformación Digital.",
    next: true,
  },
];

type MetaStatus = "En curso" | "Pendiente";

const METAS: {
  num: string;
  meta: string;
  why: string;
  status: MetaStatus;
}[] = [
  {
    num: "01",
    meta: "Graduarme de la prepa y entrar al Tec de Monterrey",
    why: "Mi siguiente gran paso: Ingeniería en Transformación Digital.",
    status: "En curso",
  },
  {
    num: "02",
    meta: "Convertir cualquier idea en un producto real",
    why: "Del concepto al producto sin depender de nadie.",
    status: "En curso",
  },
  {
    num: "03",
    meta: "Dominar web, apps y software de punta a punta",
    why: "Front-end, back-end y diseño en un mismo flujo.",
    status: "Pendiente",
  },
  {
    num: "04",
    meta: "Aportar a la plataforma proptech familiar",
    why: "Sumar valor real a KlockK · Terra58.",
    status: "Pendiente",
  },
  {
    num: "05",
    meta: "Empezar a monetizar mis propias habilidades",
    why: "Convertir el craft en ingresos propios.",
    status: "Pendiente",
  },
];

const CARDS_SOBRE = [
  {
    num: "01",
    cat: "deporte — Fútbol",
    desc: "Competitivo y de equipo. Donde aprendí disciplina, lectura de juego y a no rendirme.",
  },
  {
    num: "02",
    cat: "deporte — Tenis",
    desc: "Mi lado individual: enfoque, precisión y la mentalidad de mejorar punto a punto.",
  },
  {
    num: "03",
    cat: "craft — Desarrollo web",
    desc: "Tomando un curso de desarrollo y diseño digital para construir mis propias ideas.",
  },
  {
    num: "04",
    cat: "visión — Emprendimiento",
    desc: "Empezar temprano, construir cosas reales y dejar mi marca en tech.",
  },
];

const STATS_SOBRE = [
  { value: 16, label: "años con el balón" },
  { value: 2, label: "países donde viví · MX · UK" },
  { value: 4, label: "deportes que practico" },
  { value: 2, label: "MVP en una temporada · TASIS · fútbol y tenis", accent: true },
];

/* ── Componente auxiliar de encabezado de sección ────────────────────────── */

function SectionHead({
  n,
  eyebrow,
  title,
}: {
  n: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-sm font-semibold tabular-nums text-accent">{n}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[.16em] text-accent">{eyebrow}</p>
        <h2 className="mt-1 max-w-2xl text-2xl font-extrabold font-display leading-snug text-ink sm:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

/* ── Intro: cubo 3D con la J (restaurado del legacy · DEC-004) ────────────── */
/* Una vez por sesión de navegador; saltable con clic, botón o Escape;
   con reduced-motion no se muestra. */

function IntroCube() {
  const [estado, setEstado] = useState<"oculto" | "visible" | "saliendo">("oculto");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("yo-intro-vista")) return;
    setEstado("visible");
  }, []);

  useEffect(() => {
    if (estado === "oculto") return;
    const saltarConTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEstado("saliendo");
    };
    document.addEventListener("keydown", saltarConTecla);
    const t = setTimeout(() => setEstado("saliendo"), estado === "visible" ? 2100 : 500);
    return () => {
      document.removeEventListener("keydown", saltarConTecla);
      clearTimeout(t);
    };
  }, [estado]);

  useEffect(() => {
    if (estado !== "saliendo") return;
    const t = setTimeout(() => {
      sessionStorage.setItem("yo-intro-vista", "1");
      setEstado("oculto");
    }, 480);
    return () => clearTimeout(t);
  }, [estado]);

  if (estado === "oculto") return null;
  const saltar = () => setEstado("saliendo");

  return (
    <div className={`yo-intro ${estado === "saliendo" ? "yo-intro-out" : ""}`} role="presentation" onClick={saltar}>
      <div className="yo-cube-scene" aria-hidden="true">
        <div className="yo-cube">
          <span className="yo-cube-face yo-cube-front">J.</span>
          <span className="yo-cube-face yo-cube-back">J.</span>
          <span className="yo-cube-face yo-cube-right">J.</span>
          <span className="yo-cube-face yo-cube-left">J.</span>
          <span className="yo-cube-face yo-cube-top">J.</span>
          <span className="yo-cube-face yo-cube-bottom">J.</span>
        </div>
      </div>
      <p className="yo-intro-tag">Juan Pablo Figueroa</p>
      <button type="button" className="yo-intro-skip" onClick={saltar}>
        Saltar intro
      </button>
    </div>
  );
}

/* ── Coordenadas animadas (restaurado del legacy · DEC-004) ───────────────── */
/* Cuentan de 0.0000 al valor real y rematan con "fijado ✓". */

const GEO = { lat: 20.9674, lng: 89.6237 };

function GeoCounter() {
  const reduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [p, setP] = useState(reduced ? 1 : 0);
  const [fijado, setFijado] = useState(!!reduced);

  useEffect(() => {
    if (reduced) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setP(eased);
      if (t < 1) raf = requestAnimationFrame(step);
      else setFijado(true);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <span className="font-mono text-xs text-accent">
      <span aria-hidden="true" className="tabular-nums">
        {(GEO.lat * p).toFixed(4)}° N · {(GEO.lng * p).toFixed(4)}° W
      </span>
      <span className="sr-only">20.9674° N · 89.6237° W</span>
      {fijado && (
        <span className="ml-1.5 font-semibold" aria-hidden="true">
          fijado ✓
        </span>
      )}
    </span>
  );
}

/* ── Timeline gráfico interactivo (restaurado del legacy · DEC-004) ────────── */
/* Patrón tabs accesible: nodos sobre la línea, chip activo en tinta,
   burbuja de detalle abajo; ← → navegan con teclado. */

function TimelineInteractivo() {
  const [idx, setIdx] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight" ? Math.min(idx + 1, TIMELINE.length - 1) : Math.max(idx - 1, 0);
    setIdx(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  const item = TIMELINE[idx];

  return (
    <div className="mt-10">
      <div className="relative">
        <div aria-hidden="true" className="absolute left-0 right-0 top-[8px] h-px bg-line" />
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Hitos de trayectoria"
          onKeyDown={onKeyDown}
          className="relative flex gap-6 overflow-x-auto pb-3 pt-0.5"
        >
          {TIMELINE.map((t, i) => {
            const active = i === idx;
            return (
              <button
                key={`${t.year}-${t.title}`}
                type="button"
                role="tab"
                id={`hito-tab-${i}`}
                aria-selected={active}
                aria-controls="hito-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setIdx(i)}
                className="group flex shrink-0 flex-col items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span
                  aria-hidden="true"
                  className={`h-[15px] w-[15px] rounded-full border-2 transition-colors ${
                    active
                      ? t.next
                        ? "border-accent bg-accent"
                        : "border-ink bg-ink"
                      : t.next
                        ? "border-accent bg-paper group-hover:bg-accent/20"
                        : "border-line bg-paper group-hover:border-ink"
                  }`}
                />
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-xs transition-colors ${
                    active ? "bg-ink text-paper" : "bg-paper-2 text-ink-soft group-hover:text-ink"
                  }`}
                >
                  {t.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="hito-panel"
        role="tabpanel"
        aria-labelledby={`hito-tab-${idx}`}
        className="mt-5 rounded-card border border-line bg-paper-2/60 p-6"
      >
        <span className="font-mono text-xs font-semibold text-accent">{item.year}</span>
        <h3 className="mt-1 font-display text-xl font-bold text-ink">{item.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{item.desc}</p>
      </div>
    </div>
  );
}

/* ── Página Yo ────────────────────────────────────────────────────────────── */

export default function Yo() {
  return (
    <div className="yo-page mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8">
      <IntroCube />
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-12">
        {/* Columna izquierda: texto */}
        <div className="flex-1">
          {/* Chip ubicación */}
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3 py-1.5">
              <span className="text-xs font-semibold text-ink-soft">Mérida, Yucatán · MX</span>
              <GeoCounter />
            </div>
          </Reveal>

          {/* h1 */}
          <Reveal delayMs={60}>
            <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">
              <span className="block text-ink">Juan Pablo</span>
              <span className="block text-ink-soft">Figueroa</span>
            </h1>
          </Reveal>

          {/* Tagline */}
          <Reveal delayMs={100}>
            <p className="mt-3 font-mono text-sm text-ink-soft">
              17 · futuro Ing. en Transformación Digital
            </p>
          </Reveal>

          {/* Bio */}
          <Reveal delayMs={140}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft">
              Nací y crecí en Mérida. Pasé dos años estudiando en Londres y ahora estoy de vuelta en
              casa terminando la prepa. Me mueve el deporte, la tecnología y la ambición de convertir
              ideas en productos reales.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delayMs={180}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#trayectoria"
                className="inline-flex min-h-11 items-center rounded-card bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-ink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Ver mi trayectoria
              </a>
              <a
                href="#meta"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-accent transition-colors duration-150 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Mis metas →
              </a>
            </div>
          </Reveal>

          {/* Mini-tarjeta de stats (terminal) */}
          <Reveal delayMs={220}>
            <div className="mt-8 inline-block rounded-card border border-line bg-paper-2 px-5 py-4 font-mono text-xs">
              <p className="mb-2 text-accent">// estado</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                <span className="text-ink-soft">disponible</span>
                <span className="flex items-center gap-1.5 text-ink">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-accent"
                  />
                  activo
                </span>

                <span className="text-ink-soft">edad</span>
                <span className="text-ink">17</span>

                <span className="text-ink-soft">años fuera</span>
                <span className="text-ink">02</span>

                <span className="text-ink-soft">idiomas</span>
                <span className="text-ink">ES·EN</span>

                <span className="text-ink-soft">siguiente</span>
                <span className="text-ink">Tec</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Columna derecha: foto */}
        <Reveal delayMs={80} className="flex-shrink-0">
          <div className="w-full sm:w-64 md:w-72">
            <img
              src={fotoJP}
              alt="Retrato de Juan Pablo Figueroa"
              className="aspect-[4/5] w-full rounded-card object-cover grayscale transition duration-500 hover:grayscale-0"
            />
          </div>
        </Reveal>
      </section>

      {/* ── 01 · Trayectoria ─────────────────────────────────────── */}
      <section
        id="trayectoria"
        className="mt-20 border-t border-line pt-16"
        aria-label="Trayectoria"
      >
        <Reveal>
          <SectionHead
            n="01"
            eyebrow="Trayectoria"
            title="de Mérida a Londres y de vuelta a casa"
          />
        </Reveal>

        {/* Timeline gráfico interactivo (DEC-004) */}
        <Reveal delayMs={80}>
          <p className="mt-3 font-mono text-xs text-ink-soft">
            toca cada punto · o navega con ← →
          </p>
          <TimelineInteractivo />
        </Reveal>
      </section>

      {/* ── 02 · En un año ───────────────────────────────────────── */}
      <section
        id="meta"
        className="mt-4 border-t border-line pt-16"
        aria-label="Metas en un año"
      >
        <Reveal>
          <SectionHead
            n="02"
            eyebrow="En un año"
            title="dónde quiero estar en doce meses"
          />
        </Reveal>

        <div className="mt-10 space-y-3">
          {METAS.map((item, i) => (
            <Reveal key={item.num} delayMs={i * 60}>
              <div className="flex items-start gap-5 rounded-card border border-line bg-paper px-5 py-5 transition-colors duration-150 hover:border-accent/60">
                {/* Número */}
                <span className="font-mono text-xs font-bold tabular-nums text-accent">
                  {item.num}
                </span>

                {/* Texto */}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-snug text-ink">{item.meta}</p>
                  <p className="mt-1 text-sm text-ink-soft">{item.why}</p>
                </div>

                {/* Píldora de status */}
                <span
                  className={`ml-auto mt-0.5 flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "En curso"
                      ? "bg-accent/10 text-accent"
                      : "bg-paper-2 text-ink-soft"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 03 · Sobre mí ────────────────────────────────────────── */}
      <section
        id="sobre-mi"
        className="mt-4 border-t border-line pt-16"
        aria-label="Sobre mí"
      >
        <Reveal>
          <SectionHead
            n="03"
            eyebrow="Sobre mí"
            title="lo que me mueve dentro y fuera de la cancha"
          />
        </Reveal>

        {/* Frase grande */}
        <Reveal delayMs={60}>
          <blockquote className="mt-8 max-w-3xl font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
            Del fútbol aprendí a{" "}
            <span className="text-accent">competir</span>. De vivir solo en Londres, a{" "}
            <span className="text-accent">resolver</span>. Ahora junto las dos para{" "}
            <span className="text-accent">construir</span> lo que se me ocurra.
          </blockquote>
        </Reveal>

        {/* Stats con CountUp */}
        <Reveal delayMs={100}>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS_SOBRE.map((s) => (
              <div
                key={s.label}
                className="rounded-card border border-line bg-paper-2 px-4 py-5 text-center"
              >
                <p
                  className={`font-mono text-3xl font-bold tabular-nums ${
                    s.accent ? "text-accent" : "text-ink"
                  }`}
                >
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2 text-xs leading-snug text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Cards 2×2 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CARDS_SOBRE.map((c, i) => (
            <Reveal key={c.num} delayMs={i * 60}>
              <article className="rounded-card border border-line bg-paper p-6 transition-colors duration-150 hover:border-accent/60">
                <span className="font-mono text-xs font-bold tabular-nums text-accent">
                  {c.num} / {c.cat}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Cierre de página ─────────────────────────────────────── */}
      <footer className="mt-20 border-t border-line pt-10">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                construyendo desde Mérida — apuntando alto.
              </p>
              <p className="mt-1 text-sm text-ink-soft">© 2026 Juan Pablo Figueroa</p>
            </div>

            <Link
              to="/klokk"
              className="inline-flex min-h-11 items-center gap-2 rounded-card border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Conoce Klokk →
            </Link>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
