import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "../components/brand/CountUp";
import Reveal from "../components/brand/Reveal";
import fotoJP from "../assets/juan-pablo.jpg";

/* ── Datos ───────────────────────────────────────────────────────────────── */

/* Trayectoria: EVENTS del legacy, 1:1 — x/y dibujan la trendline con sus
   altibajos reales (cae en Jun 2023, la fractura, y se recupera hasta el pico). */
const TRAYECTORIA = [
  { x: 55, y: 255, chip: "2010", label: "2010 · Primer toque", title: "Primer toque", desc: "Empiezo a jugar fútbol desde kinder. El inicio de años de torneos y entrenamientos." },
  { x: 129, y: 210, chip: "2019", label: "2019 · Selección Yucatán", title: "Selección Yucatán", desc: "Convocado al Nacional en CDMX. Una actuación destacada llamó la atención de un visor del América, que quiso firmarme; mis papás dijeron que no por mi edad." },
  { x: 203, y: 225, chip: "2020–21", label: "2020–2021 · Pandemia y Necaxa", title: "Pandemia y Necaxa", desc: "Con las academias cerradas, me uno al equipo de Necaxa. Luego regreso al América." },
  { x: 278, y: 185, chip: "2021", label: "2021 · Lázaro Cárdenas", title: "Selección Yucatán · Lázaro Cárdenas", desc: "Segundo torneo nacional representando a Yucatán. Llegamos a la final y perdimos. Una de las experiencias más formativas en el fútbol." },
  { x: 352, y: 190, chip: "2022", label: "2022 · CUM", title: "CUM · Capitán", desc: "Entro al CUM representando a mi colegio. En mi primer año me nombran capitán del equipo." },
  { x: 426, y: 160, chip: "2023", label: "2023 · Pádel", title: "Pádel", desc: "Me inicio en el pádel y desarrollo un talento completamente nuevo. Primer torneo estatal: eliminados en octavos, pero gran experiencia." },
  { x: 500, y: 200, chip: "jun 2023", label: "Jun 2023 · Lesión", title: "Fractura de clavícula", desc: "Me rompo la clavícula a dos milímetros de salirse. Tres meses sin escuela, más de un mes durmiendo sentado. Cinco meses de rehabilitación y regreso más fuerte." },
  { x: 574, y: 150, chip: "2024", label: "2024 · Muay Thai", title: "Muay Thai", desc: "Me meto al Muay Thai, entreno duro, hago sparring los jueves y tengo mi primera pelea." },
  { x: 648, y: 130, chip: "2024 ·", label: "2024 · Liga Marista", title: "Subcampeones Liga Marista", desc: "Temporada fuerte con el equipo. Terminamos como subcampeones de liga." },
  { x: 723, y: 95, chip: "ver. 2024", label: "Verano 2024 · TASIS, Londres", title: "TASIS, Londres", desc: "Me voy a internado en Inglaterra. Aprendo inglés, gano independencia, viajo solo, hago networking internacional y conozco a quien hoy es mi novia. Gané MVP de tenis y MVP de fútbol de la temporada." },
  { x: 797, y: 80, chip: "2024–26", label: "2024–2026 · Dos años fuera", title: "Dos años en TASIS", desc: "Vivir fuera de casa me enseña a cocinar, organizarme, manejar dinero y relacionarme con gente de todo el mundo. Relaciones que no tienen comparación." },
  { x: 871, y: 70, chip: "2026", label: "2026 · De vuelta", title: "De vuelta en Mérida", desc: "Terminando la prepa y tomando el curso de desarrollo web y diseño digital. Construyendo las skills para convertir ideas en productos reales." },
  { x: 945, y: 48, chip: "próximo →", label: "Próximo →", title: "Tec de Monterrey", desc: "Ing. en Transformación Digital." },
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

/* ── Intro de marca (coreografía EXACTA del legacy · DEC-004) ─────────────── */
/* Fases (tiempos del original, runBrandIntro):
   A (0 ms)    la "J" plana entra suave; el tag aparece a los 820 ms
   B (1000 ms) crossfade: la J se disuelve y el cubo entra girando LENTO (7 s/vuelta)
   C (2600 ms) el cubo se desintegra: caras se separan hacia afuera y se apagan
   D (3050 ms) el overlay se disuelve (1 s) MIENTRAS el nombre entra debajo
   onEntrada() a los 2950 ms — como el runIntro() original.
   Saltable (clic/botón/Escape). Con reduced-motion no se muestra. */

type FaseIntro = "pre" | "a" | "b" | "c" | "d" | "off";

function IntroCube({ onEntrada }: { onEntrada: () => void }) {
  const [fase, setFase] = useState<FaseIntro>("pre");
  const avisado = useRef(false);

  const entrar = () => {
    if (!avisado.current) {
      avisado.current = true;
      onEntrada();
    }
  };

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setFase("off");
      entrar();
      return;
    }
    // Doble frame para que la transición de la fase A dispare desde el estado inicial
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setFase("a")));
    const tB = setTimeout(() => setFase("b"), 1000);
    const tC = setTimeout(() => setFase("c"), 2600);
    const tHero = setTimeout(entrar, 2950);
    const tD = setTimeout(() => setFase("d"), 3050);
    const tOff = setTimeout(() => setFase("off"), 4200);
    const conTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") saltar();
    };
    document.addEventListener("keydown", conTecla);
    return () => {
      cancelAnimationFrame(raf);
      [tB, tC, tHero, tD, tOff].forEach(clearTimeout);
      document.removeEventListener("keydown", conTecla);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saltar = () => {
    entrar();
    setFase("d");
    setTimeout(() => setFase("off"), 1000);
  };

  if (fase === "off") return null;

  const enOMas = (f: FaseIntro) =>
    ["pre", "a", "b", "c", "d"].indexOf(fase) >= ["pre", "a", "b", "c", "d"].indexOf(f);

  return (
    <div
      className={`yo-intro ${enOMas("c") ? "yo-intro-desintegra" : ""} ${fase === "d" ? "yo-intro-out" : ""}`}
      role="presentation"
      onClick={saltar}
    >
      <div className="yo-intro-centro" aria-hidden="true">
        {/* La J plana (fase A, 150px desde scale .6); se disuelve al entrar el cubo */}
        <span className={`yo-intro-j ${fase === "a" ? "yo-j-in" : ""} ${enOMas("b") ? "yo-j-out" : ""}`}>
          J<span className="yo-j-punto">.</span>
        </span>
        {/* El cubo (fase B): giro lento e INCLINADO (rotateX -22°), como el original.
            Caras laterales con "J" color papel; superior e inferior vacías. */}
        <div className={`yo-cube ${enOMas("b") ? "yo-cube-in" : ""}`}>
          <span className="yo-cube-face yo-cube-front">J</span>
          <span className="yo-cube-face yo-cube-back">J</span>
          <span className="yo-cube-face yo-cube-right">J</span>
          <span className="yo-cube-face yo-cube-left">J</span>
          <span className="yo-cube-face yo-cube-top" />
          <span className="yo-cube-face yo-cube-bottom" />
        </div>
      </div>
      <p
        aria-hidden="true"
        className={`yo-intro-tag ${enOMas("a") && !enOMas("c") ? "yo-tag-in" : ""} ${enOMas("c") ? "yo-tag-out" : ""}`}
      >
        Juan Pablo Figueroa
      </p>
      <button type="button" className="yo-intro-skip" onClick={saltar}>
        Saltar intro
      </button>
    </div>
  );
}

/* ── Nombre letra por letra (como runIntro del legacy) ────────────────────── */
/* Cada letra sube con blur que se aclara, escalonada 120 + i·36 ms. */

const LINEAS_NOMBRE = ["Juan Pablo", "Figueroa"];

function NombreAnimado() {
  let indice = 0;
  return (
    <h1
      aria-label="Juan Pablo Figueroa"
      className="m-0 font-display text-[clamp(46px,8.6vw,116px)] font-bold leading-[.96] tracking-[-0.035em]"
    >
      {LINEAS_NOMBRE.map((linea, l) => (
        <span
          key={linea}
          aria-hidden="true"
          className={`block whitespace-nowrap ${l === 1 ? "text-[#aeaaa1]" : "text-ink"}`}
        >
          {[...linea].map((ch, k) => (
            <span
              key={`${l}-${k}`}
              className="yo-letra"
              style={{ animationDelay: `${120 + indice++ * 36}ms` }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/* ── Coordenadas animadas (restaurado del legacy · DEC-004) ───────────────── */
/* Cuentan de 0.0000 al valor real y rematan con "fijado ✓". */

const GEO = { lat: 20.9674, lng: 89.6237 };

function GeoCounter({ delayMs = 0 }: { delayMs?: number }) {
  const reduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [txt, setTxt] = useState(() =>
    reduced ? { lat: GEO.lat.toFixed(4), lng: GEO.lng.toFixed(4) } : { lat: "0.0000", lng: "0.0000" },
  );
  const [fijado, setFijado] = useState(!!reduced);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    // Espera su turno en la coreografía (el original: after + 650 ms)
    const espera = setTimeout(() => {
      const start = performance.now();
      const dur = 1600;
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        // Easing cuártico + jitter decreciente, EXACTO al original:
        // los dígitos tiemblan "buscando señal" y se asientan al fijarse.
        const eased = 1 - Math.pow(1 - p, 4);
        const j = () => (p < 1 ? (Math.random() - 0.5) * (1 - eased) * 0.6 : 0);
        setTxt({
          lat: Math.max(0, GEO.lat * eased + j()).toFixed(4),
          lng: Math.max(0, GEO.lng * eased + j()).toFixed(4),
        });
        if (p < 1) raf = requestAnimationFrame(step);
        else {
          setTxt({ lat: GEO.lat.toFixed(4), lng: GEO.lng.toFixed(4) });
          setFijado(true);
        }
      };
      raf = requestAnimationFrame(step);
    }, delayMs);
    return () => {
      clearTimeout(espera);
      cancelAnimationFrame(raf);
    };
  }, [reduced, delayMs]);

  return (
    <>
      <span aria-hidden="true" className="tabular-nums">
        {txt.lat}° N · {txt.lng}° W
      </span>
      <span className="sr-only">20.9674° N · 89.6237° W</span>
      {fijado && (
        <span className="ml-1.5 font-semibold text-accent" aria-hidden="true">
          fijado ✓
        </span>
      )}
    </>
  );
}

/* ── Trendline de trayectoria (port 1:1 del legacy · B-013) ─────────────────
   Gráfica SVG con los altibajos reales: sube desde 2010, CAE en Jun 2023 (la
   fractura de clavícula) y se recupera hasta el pico "Próximo". La línea se
   dibuja sola al entrar en viewport (stroke-dashoffset, 1.5 s). Los chips son
   tabs accesibles (las flechas ← → siguen funcionando, sin letrero); los nodos
   del SVG son hit-areas de mouse. */

function TrendlineTrayectoria() {
  const [activo, setActivo] = useState(0);
  const lineRef = useRef<SVGPathElement>(null);
  const cajaRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Dibujado de la línea al entrar en viewport (exacto al legacy)
  useEffect(() => {
    const line = lineRef.current;
    const caja = cajaRef.current;
    if (!line || !caja) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const len = line.getTotalLength();
    line.style.strokeDasharray = `${len}`;
    line.style.strokeDashoffset = `${len}`;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          line.getBoundingClientRect(); // reflow antes de transicionar, como el original
          line.style.transition = "stroke-dashoffset 1.5s cubic-bezier(.4,.1,.2,1)";
          line.style.strokeDashoffset = "0";
          io.disconnect();
        });
      },
      { threshold: 0.25 },
    );
    io.observe(caja);
    return () => io.disconnect();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const sig =
      e.key === "ArrowRight" ? Math.min(activo + 1, TRAYECTORIA.length - 1) : Math.max(activo - 1, 0);
    setActivo(sig);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[sig]?.focus();
  };

  const d = "M" + TRAYECTORIA.map((e) => `${e.x},${e.y}`).join(" L");
  const ev = TRAYECTORIA[activo];

  return (
    <div
      ref={cajaRef}
      className="mt-[34px] overflow-hidden rounded-2xl border border-[rgba(28,28,26,.10)] bg-paper"
    >
      {/* Gráfica (decorativa para AT; interacción accesible = chips de abajo) */}
      <div className="px-[22px] pb-1.5 pt-6" aria-hidden="true">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="block h-auto w-full overflow-visible">
          {[75, 150, 225].map((y) => (
            <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(28,28,26,.05)" strokeWidth="1" />
          ))}
          <path
            ref={lineRef}
            d={d}
            fill="none"
            stroke="#3a5688"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {TRAYECTORIA.map((e, i) => {
            const a = i === activo;
            return (
              <g key={e.label}>
                <circle cx={e.x} cy={e.y} r="18" fill="transparent" className="cursor-pointer" onClick={() => setActivo(i)} />
                <circle
                  cx={e.x}
                  cy={e.y}
                  r={a ? 7 : 5}
                  fill={a ? "#3a5688" : "#fdfdfc"}
                  stroke={a ? "#c7d0e0" : "#9a9790"}
                  strokeWidth={a ? 3 : 2}
                  style={{ pointerEvents: "none", transition: "fill .2s ease, stroke .2s ease" }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Chips (tabs accesibles; ← → navegan) */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Hitos de trayectoria"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2 px-[22px] pb-5 pt-2"
      >
        {TRAYECTORIA.map((e, i) => {
          const a = i === activo;
          return (
            <button
              key={e.label}
              type="button"
              role="tab"
              id={`hito-tab-${i}`}
              aria-selected={a}
              aria-controls="hito-panel"
              tabIndex={a ? 0 : -1}
              onClick={() => setActivo(i)}
              className="whitespace-nowrap rounded-full border px-[11px] py-1.5 font-mono text-[11.5px] tracking-[.02em] transition-all duration-[180ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              style={
                a
                  ? { background: "#1c1c1a", color: "#f6f5f3", borderColor: "#1c1c1a" }
                  : /* color original era #8f8c84: se sube a ink-soft por AA (AP-004) */
                    { background: "#fdfdfc", color: "#57544e", borderColor: "rgba(28,28,26,.12)" }
              }
            >
              {e.chip}
            </button>
          );
        })}
      </div>

      {/* Burbuja de detalle (tabpanel) */}
      <div
        id="hito-panel"
        role="tabpanel"
        aria-labelledby={`hito-tab-${activo}`}
        className="border-t border-[rgba(28,28,26,.08)] bg-[#faf9f7] px-[clamp(18px,3vw,30px)] pb-[30px] pt-6"
      >
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-accent" />
          <span className="font-mono text-[12.5px] tracking-[.04em] text-accent">{ev.label}</span>
        </div>
        <div className="mt-[11px] font-display text-[clamp(20px,2.7vw,28px)] font-semibold tracking-[-.01em] text-ink">
          {ev.title}
        </div>
        <p className="mt-[11px] max-w-[720px] text-[14.5px] leading-[1.62] text-ink-soft [text-wrap:pretty]">{ev.desc}</p>
      </div>
    </div>
  );
}

/* ── Página Yo ────────────────────────────────────────────────────────────── */

export default function Yo() {
  // Coreografía de entrada (como el legacy): el hero NO monta hasta que el cubo
  // empieza a desvanecerse — así el nombre entra escalonado y las coordenadas
  // cuentan en vivo justo en el handoff, no escondidas bajo el overlay.
  const [entrada, setEntrada] = useState(false);

  return (
    <div className="yo-page mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8">
      <IntroCube onEntrada={() => setEntrada(true)} />
      {/* ── Hero ─────────────────────────────────────────────────── */}
      {entrada && (
      <section className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-12">
        {/* Columna izquierda: texto */}
        <div className="flex-1">
          {/* Ubicación — línea con punto azul, sin pill (como el original) */}
          <Reveal delayMs={1450}>
            <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[12.5px] tracking-[.04em] text-ink-soft">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              Mérida, Yucatán · MX
            </div>
          </Reveal>

          {/* Coordenadas — línea propia, cuentan con jitter hasta fijarse */}
          <Reveal delayMs={1555}>
            <div className="mb-[30px] whitespace-nowrap font-mono text-[12.5px] tracking-[.04em] text-ink-soft">
              <GeoCounter delayMs={2100} />
            </div>
          </Reveal>

          {/* h1 — letra por letra con blur, lo primero que entra */}
          <NombreAnimado />

          {/* Tagline */}
          <Reveal delayMs={1660}>
            <p className="mt-[26px] font-mono text-[clamp(13px,1.5vw,15.5px)] tracking-[.01em] text-ink-soft">
              17 · futuro Ing. en Transformación Digital
            </p>
          </Reveal>

          {/* Bio */}
          <Reveal delayMs={1765}>
            <p className="mt-5 max-w-[520px] text-[clamp(15px,1.6vw,18px)] leading-[1.64] text-ink-soft">
              Nací y crecí en Mérida. Pasé dos años estudiando en Londres y ahora estoy de vuelta en
              casa terminando la prepa. Me mueve el deporte, la tecnología y la ambición de convertir
              ideas en productos reales.
            </p>
          </Reveal>

          {/* CTAs — primario con hover azul, como el original */}
          <Reveal delayMs={1870}>
            <div className="mt-[38px] flex flex-wrap items-center gap-[18px]">
              <a
                href="#trayectoria"
                className="inline-flex items-center rounded-lg bg-ink px-[26px] py-3.5 text-[15px] font-medium text-[#f6f5f3] transition-colors duration-200 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Ver mi trayectoria
              </a>
              <a
                href="#meta"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-ink-soft transition-colors duration-200 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Mis metas <span className="font-mono">→</span>
              </a>
            </div>
          </Reveal>

          {/* Mini-tarjeta de stats (terminal) */}
          <Reveal delayMs={1975}>
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

        {/* Columna derecha: foto — ya asentada cuando el overlay se disuelve
            (en el original animaba bajo el overlay y se revelaba lista) */}
        <div className="w-full flex-shrink-0 sm:w-64 md:w-72">
          <div className="yo-foto">
            <img
              src={fotoJP}
              alt="Retrato de Juan Pablo Figueroa"
              className="block aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>
      )}

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

        {/* Trendline de trayectoria (B-013): la gráfica original con altibajos */}
        <Reveal delayMs={80}>
          <TrendlineTrayectoria />
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
