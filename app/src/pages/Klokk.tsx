import { Link } from "react-router-dom";
import KlokkMark from "../components/brand/KlokkMark";
import CountUp from "../components/brand/CountUp";
import Reveal from "../components/brand/Reveal";

/* ── Datos (migrados del klockk.html original, sin perder información) ───── */

const PROBLEMAS = [
  {
    tag: "Operativo",
    title: "El día a día se controla a ojo",
    desc: "Listas de papel, grupos de WhatsApp o pura confianza. El ausentismo no se detecta a tiempo, las horas extra se cobran sin comprobarse y el gerente persigue información que debería llegar sola.",
  },
  {
    tag: "Legal",
    title: "La ley ya viene en camino",
    desc: "El Art. 132 Fr. XXXIV de la LFT obliga a registrar electrónicamente la jornada. La operación arranca el 1 de enero de 2027, con multas de hasta $587,000 MXN. La mayoría de las PyMEs ni sabe que existe.",
  },
  {
    tag: "Adopción",
    title: 'Lo "profesional" no es para ellos',
    desc: "Checadores biométricos, apps de RRHH, software empresarial: hardware caro, instalación técnica, capacitación y presupuestos que una PyME de 20–50 personas no tiene. El empleado no descarga apps. El jefe no tiene IT.",
  },
];

const PROBLEMA_STATS = [
  { value: 4.9, decimals: 1, suffix: "M", label: "PyMEs en México, todas con empleados" },
  { value: 68.4, decimals: 1, suffix: "%", label: "del empleo nacional lo generan las PyMEs" },
  { value: 70, suffix: "%", label: "sigue operando con métodos manuales" },
  { value: 587, prefix: "$", suffix: "K", label: "multa máxima por incumplir la LFT" },
];

const PASOS = [
  {
    n: "1",
    title: 'Manda "Entrada" por WhatsApp',
    desc: "Al llegar al trabajo. Sin abrir ninguna app — el chat que ya usa todos los días.",
  },
  {
    n: "2",
    title: "Comparte su ubicación",
    desc: "Klokk verifica que esté dentro del radio configurado del punto de trabajo.",
  },
  {
    n: "3",
    title: "Registro confirmado",
    desc: "El gerente lo ve en el dashboard en tiempo real, desde cualquier dispositivo.",
  },
];

const FEATURES = [
  { num: "01", title: "Fichaje por WhatsApp", desc: "Entrada y salida sin apps, sin hardware, sin instalar nada." },
  { num: "02", title: "Geolocalización automática", desc: "Acepta o rechaza el fichaje según la ubicación real del empleado." },
  { num: "03", title: "Dashboard en tiempo real", desc: "Quién entró, quién falta y horas acumuladas, desde cualquier dispositivo." },
  { num: "04", title: "Alertas automáticas", desc: "Si alguien no ficha a tiempo, el supervisor recibe aviso por WhatsApp." },
  { num: "05", title: "Reporte STPS en un clic", desc: "Registro mensual de jornada listo para inspección laboral." },
  { num: "06", title: "Multi-sucursal", desc: "Una cuenta, tantos puntos de control como necesite la empresa." },
  { num: "07", title: "Cálculo de horas extra", desc: "Jornada real vs. esperada por empleado, automático." },
  { num: "08", title: "Implementación en 24 h", desc: "Alta de empleados, configuración y primer fichaje el mismo día." },
];

const COMPETIDORES = [
  {
    title: "Checador biométrico",
    cons: [
      "Hardware de $5,000–15,000 por equipo",
      "Instalación y mantenimiento técnico",
      "Solo en lugar fijo — no sirve en campo",
    ],
  },
  {
    title: "Apps de RRHH",
    cons: [
      "Desde $800 USD/mes, para 500+ personas",
      "El empleado debe descargar una app",
      "Curva de aprendizaje alta para RRHH",
    ],
  },
  {
    title: "Excel · papel",
    cons: [
      "No cumple la LFT desde 2027",
      "Fácil de falsificar o manipular",
      "Horas perdidas reconciliando a mano",
    ],
  },
];

const KLOKK_PROS = [
  "Cero hardware, cero instalación",
  "Implementación en 24 horas",
  "Funciona en cualquier ubicación con GPS",
  "Cumplimiento legal automático",
];

const DIFERENCIADOR_STATS = [
  { value: 94, suffix: "%", label: "penetración de WhatsApp en México" },
  { value: 90, suffix: "%", label: "empleados activos desde el día uno" },
  { value: 24, suffix: "h", label: "de implementación sin perfil técnico" },
];

/* ── Encabezado de sección numerado ─────────────────────────────────────── */

function SectionHead({ n, eyebrow, title }: { n: string; eyebrow: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-sm font-semibold tabular-nums text-[var(--accent-blue)]">{n}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--accent-blue)]">{eyebrow}</p>
        <h2 className="mt-1 max-w-2xl text-2xl font-extrabold leading-snug text-[var(--text-1)] sm:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function Klokk() {
  return (
    <div className="klokk-brand">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="klokk-rise flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <span
            className="inline-flex transition-transform duration-300 ease-[var(--ease-clay)] hover:-translate-y-1"
            style={{ filter: "drop-shadow(0 18px 30px rgba(31,45,73,.22))" }}
          >
            <KlokkMark size={112} color="var(--brand-deep)" title="Isotipo de Klokk" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--accent-blue)]">
              Proyecto 01 · Producto
            </p>
            <h1 className="mt-2 text-5xl font-extrabold leading-none tracking-tight text-[var(--text-1)] sm:text-6xl">
              Klokk
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[var(--text-2)]">
              Registra la asistencia de tu equipo con un WhatsApp. Sin apps. Sin hardware. Sin
              capacitación. El empleado manda un mensaje, comparte su ubicación, y queda fichado en
              segundos — listo para cumplir con la Ley Federal del Trabajo.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-tint)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-deep)]">
                <span className="klk-livedot h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                En desarrollo activo
              </span>
              {["Mérida, Yucatán", "HR-tech · asistencia", "PyMEs · 10–200 empleados"].map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-[var(--surface-sunken)] px-3 py-1.5 text-xs font-semibold text-[var(--text-2)]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 · El problema ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--surface-sunken)] py-16 sm:py-20">
        <Reveal>
          <SectionHead
            n="01"
            eyebrow="El problema"
            title="Tres capas de dolor — y las tres golpean al mismo cliente"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PROBLEMAS.map((p, i) => (
            <Reveal key={p.tag} delayMs={i * 80}>
              <article className="clay-card h-full rounded-[26px] p-7">
                <span className="inline-flex rounded-full bg-[var(--surface-sunken)] px-3 py-1 text-xs font-bold uppercase tracking-[.12em] text-[var(--text-3)]">
                  {p.tag}
                </span>
                <h3 className="mt-4 text-lg font-bold text-[var(--text-1)]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">{p.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[26px] bg-[var(--surface-sunken)] shadow-[var(--clay-rest)] sm:grid-cols-4">
            {PROBLEMA_STATS.map((s) => (
              <div key={s.label} className="bg-[var(--surface)] p-6">
                <p className="font-mono text-3xl font-bold tabular-nums text-[var(--text-1)]">
                  <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs leading-snug text-[var(--text-2)]">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 02 · A quién le duele ────────────────────────────────────── */}
      <section className="border-t border-[var(--surface-sunken)] py-16 sm:py-20">
        <Reveal>
          <SectionHead
            n="02"
            eyebrow="A quién le duele"
            title="El tomador de decisión, y por qué importa ahora"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-5">
          <Reveal className="sm:col-span-2">
            <article className="clay-card h-full rounded-[26px] p-7">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--accent-blue)]">
                El cliente
              </p>
              <h3 className="mt-3 text-lg font-bold text-[var(--text-1)]">
                Dueño o gerente de una PyME con personal en campo o por turnos
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Construcción", "Limpieza", "Restaurantes", "Retail"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-[var(--brand-tint)] px-3 py-1 text-xs font-semibold text-[var(--brand-deep)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal className="sm:col-span-3" delayMs={80}>
            <article className="clay-card h-full rounded-[26px] p-7">
              <p className="text-[var(--text-2)]">
                El mercado no estaba listo para comprar esto por gusto.{" "}
                <strong className="font-semibold text-[var(--text-1)]">
                  Enero 2027 lo convierte en obligación legal.
                </strong>{" "}
                Esa es la diferencia entre vender un "nice to have" y vender cumplimiento.
              </p>
              <p className="mt-4 text-[var(--text-2)]">
                Klokk entra primero al{" "}
                <strong className="font-semibold text-[var(--brand-deep)]">sureste</strong>, cuando
                nadie más ha llegado todavía. El terreno está abierto.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ── 03 · La solución ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--surface-sunken)] py-16 sm:py-20">
        <Reveal>
          <SectionHead
            n="03"
            eyebrow="La solución"
            title="Fichaje en menos de 15 segundos · tres pasos"
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-4">
            {PASOS.map((p, i) => (
              <Reveal key={p.n} delayMs={i * 80}>
                <div className="clay-card flex items-start gap-4 rounded-[26px] p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] font-mono text-base font-bold text-white">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-bold text-[var(--text-1)]">{p.title}</h3>
                    <p className="mt-1 text-sm text-[var(--text-2)]">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Demo de chat (WhatsApp) */}
          <Reveal delayMs={120}>
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[26px] bg-[var(--surface)] shadow-[var(--clay-raised)]">
              <div className="flex items-center gap-3 bg-[var(--brand-deep)] px-4 py-3 text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                  <KlokkMark size={26} color="var(--brand)" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold">Klokk</p>
                  <p className="text-xs text-white/75">en línea</p>
                </div>
              </div>

              <div className="space-y-3 bg-[var(--surface-sunken)] p-4">
                <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-[var(--brand-tint)] px-3 py-2 text-sm text-[var(--brand-deep)]">
                  Entrada
                </div>
                <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-1)] shadow-[var(--clay-rest)]">
                  ¡Hola Carlos! 👋 Comparte tu ubicación para confirmar tu fichaje.
                </div>
                <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[var(--surface)] p-3 shadow-[var(--clay-rest)]">
                  <p className="text-sm font-medium text-[var(--text-1)]">📍 Ubicación en tiempo real</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-tint)] px-2.5 py-1 text-xs font-bold text-[var(--brand-deep)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                    DENTRO DEL GEOCERCO
                  </span>
                </div>
                <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-1)] shadow-[var(--clay-rest)]">
                  Fichaje registrado a las{" "}
                  <span className="font-mono font-semibold tabular-nums">08:57</span>. ¡Buen día! ✅
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 · Funciones clave ─────────────────────────────────────── */}
      <section className="border-t border-[var(--surface-sunken)] py-16 sm:py-20">
        <Reveal>
          <SectionHead n="04" eyebrow="Funciones clave" title="Lo que hace el producto, sin relleno" />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.num} delayMs={(i % 4) * 60}>
              <article className="clay-card h-full rounded-[26px] p-6">
                <span className="font-mono text-sm font-bold tabular-nums text-[var(--accent-blue)]">
                  {f.num}
                </span>
                <h3 className="mt-3 font-bold text-[var(--text-1)]">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-2)]">{f.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 05 · Klokk vs. la competencia ────────────────────────────── */}
      <section className="border-t border-[var(--surface-sunken)] py-16 sm:py-20">
        <Reveal>
          <SectionHead
            n="05"
            eyebrow="Klokk vs. la competencia"
            title="Por qué nadie más resuelve las tres capas a la vez"
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {COMPETIDORES.map((c, i) => (
            <Reveal key={c.title} delayMs={i * 70}>
              <article className="clay-card h-full rounded-[26px] p-6">
                <h3 className="font-bold text-[var(--text-1)]">{c.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.cons.map((con) => (
                    <li key={con} className="flex gap-2 text-sm text-[var(--text-2)]">
                      <span aria-hidden className="select-none text-[var(--text-3)]">
                        ✕
                      </span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal delayMs={210}>
            <article className="h-full rounded-[26px] border-2 border-[var(--brand)] bg-[var(--brand-tint)] p-6 shadow-[var(--clay-raised)]">
              <div className="flex items-center gap-2">
                <KlokkMark size={28} color="var(--brand-deep)" />
                <h3 className="text-lg font-extrabold text-[var(--brand-deep)]">Klokk</h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {KLOKK_PROS.map((pro) => (
                  <li key={pro} className="flex gap-2 text-sm font-medium text-[var(--text-1)]">
                    <span aria-hidden className="select-none font-bold text-[var(--brand)]">
                      ✓
                    </span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        {/* El diferenciador */}
        <Reveal>
          <div className="mt-8 rounded-[26px] bg-[var(--text-1)] p-8 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-white/55">El diferenciador</p>
            <h3 className="mt-3 max-w-2xl text-2xl font-extrabold leading-snug sm:text-3xl">
              WhatsApp es lo único que nadie tiene que aprender a usar.
            </h3>
            <p className="mt-4 max-w-3xl text-white/75">
              El empleado de limpieza, el albañil, el mesero — todos ya lo usan a diario. Klokk no les
              pide cambiar su comportamiento, solo mandar un mensaje más. Eso elimina el motivo
              principal por el que fracasan los sistemas de asistencia: la falta de adopción.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {DIFERENCIADOR_STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-4xl font-bold tabular-nums text-[#7fd6a3]">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Siguiente ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--surface-sunken)] py-16 sm:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--accent-blue)]">
                Siguiente
              </p>
              <h2 className="mt-2 max-w-xl text-2xl font-extrabold text-[var(--text-1)] sm:text-3xl">
                Así se ve por dentro: la librería de componentes
              </h2>
            </div>
            <Link
              to="/componentes"
              className="clay-btn inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-6 text-sm font-semibold"
            >
              Ver los componentes
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--surface-sunken)] py-10">
        <div className="flex flex-col gap-1 text-sm text-[var(--text-3)]">
          <p>
            <strong className="font-semibold text-[var(--text-2)]">Klokk</strong> — asistencia
            laboral por WhatsApp · Mérida, MX
          </p>
          <p>© 2026 Juan Pablo Figueroa</p>
        </div>
      </footer>
    </div>
  );
}
