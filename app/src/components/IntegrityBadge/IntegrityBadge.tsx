import KlokkMark from "../brand/KlokkMark";
import type { IntegrityBadgeProps, IntegrityLevel, SignalStatus } from "./types";

// ── Configuración por nivel global ──────────────────────────────
// `seal` es el trazo sólido del sello. La píldora tiene fg/bg con contraste AA
// en AMBOS temas (texto oscuro sobre tinte claro / texto claro sobre tinte oscuro).
const NIVEL: Record<IntegrityLevel, { label: string; desc: string; seal: string; fg: string; bg: string; fgDark: string; bgDark: string; glyph: Glyph }> = {
  verificado: { label: "Verificado", desc: "Checada confiable",    seal: "#4b7a5a", fg: "#2f5740", bg: "rgba(75,122,90,.12)",  fgDark: "#86c1a0", bgDark: "rgba(134,193,160,.16)", glyph: "check" },
  revisar:    { label: "Revisar",    desc: "Requiere revisión",    seal: "#b07d2b", fg: "#6f4e12", bg: "rgba(176,125,43,.16)", fgDark: "#dab36e", bgDark: "rgba(218,179,110,.16)", glyph: "alert" },
  sospechoso: { label: "Sospechoso", desc: "Checada no confiable", seal: "#b5482f", fg: "#8a3322", bg: "rgba(181,72,47,.12)",  fgDark: "#e29585", bgDark: "rgba(226,149,133,.16)", glyph: "cross" },
};

// ── Configuración por señal individual ──────────────────────────
// `color` para tema claro, `colorDark` aclarado para conservar contraste de
// no-texto (≥3:1) sobre fondo oscuro. La forma (✓ ! ✕) nunca depende solo del color.
const STATUS: Record<SignalStatus, { color: string; colorDark: string; glyph: Glyph; sr: string }> = {
  ok:     { color: "#4b7a5a", colorDark: "#6fae87", glyph: "check", sr: "verificada" },
  alerta: { color: "#b07d2b", colorDark: "#d2a052", glyph: "alert", sr: "con alerta" },
  falla:  { color: "#b5482f", colorDark: "#de8a78", glyph: "cross", sr: "fallida" },
};

// Peso de cada señal para el índice de confianza (0–100).
const PESO: Record<SignalStatus, number> = { ok: 1, alerta: 0.5, falla: 0 };

const TIPO = { entrada: "Entrada", salida: "Salida" } as const;

type Glyph = "check" | "alert" | "cross";

/** Deriva el nivel global a partir de las señales (la peor manda). */
function nivelDe(señales: { status: SignalStatus }[]): IntegrityLevel {
  if (señales.some((s) => s.status === "falla")) return "sospechoso";
  if (señales.some((s) => s.status === "alerta")) return "revisar";
  return "verificado";
}

/** Índice de confianza derivado de las señales, 0–100. */
function puntajeDe(señales: { status: SignalStatus }[]): number {
  if (!señales.length) return 0;
  return Math.round((100 * señales.reduce((a, s) => a + PESO[s.status], 0)) / señales.length);
}

const fmtFecha = (ts: number) => new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short" }).format(ts);
const fmtHora = (ts: number) => new Intl.DateTimeFormat("es-MX", { hour: "2-digit", minute: "2-digit" }).format(ts);

// Trazos de los íconos, centrados en un viewBox 0 0 24 24.
function GlyphPath({ glyph }: { glyph: Glyph }) {
  if (glyph === "check") return <path d="M6 12.5 L10.5 17 L18 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />;
  if (glyph === "cross") return <path d="M7.5 7.5 L16.5 16.5 M16.5 7.5 L7.5 16.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />;
  return ( // alert: exclamación
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 6.5 L12 13" />
      <path d="M12 17 L12 17.2" />
    </g>
  );
}

/** Flecha de entrada (→ hacia una pared) o salida (saliendo de la pared). */
function TipoIcon({ tipo }: { tipo: "entrada" | "salida" }) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      {tipo === "entrada" ? (
        <>
          <path d="M4 12h10" />
          <path d="M10 8l4 4-4 4" />
          <path d="M19 4v16" />
        </>
      ) : (
        <>
          <path d="M20 12H10" />
          <path d="M14 8l-4 4 4 4" />
          <path d="M5 4v16" />
        </>
      )}
    </svg>
  );
}

/** Sello circular tipo estampa: doble anillo + ticks radiales + glifo al centro. */
function Sello({ color, glyph, muted = false }: { color: string; glyph: Glyph; muted?: boolean }) {
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const a = (i * Math.PI) / 18;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return <line key={i} x1={50 + 40 * cos} y1={50 + 40 * sin} x2={50 + 44 * cos} y2={50 + 44 * sin} stroke={color} strokeWidth="2" strokeLinecap="round" />;
  });
  return (
    <svg viewBox="0 0 100 100" width="72" height="72" aria-hidden className="shrink-0">
      <circle cx="50" cy="50" r="47" fill="none" stroke={color} strokeWidth="2" opacity={muted ? 0.18 : 0.3} />
      <circle cx="50" cy="50" r="34" fill="none" stroke={color} strokeWidth="3" opacity={muted ? 0.25 : 0.85} />
      <g opacity={muted ? 0.2 : 0.55}>{ticks}</g>
      <g transform="translate(26,26) scale(2)" color={color} opacity={muted ? 0.3 : 1}>
        <GlyphPath glyph={glyph} />
      </g>
    </svg>
  );
}

/** Ícono compacto de estado para cada señal (forma + color, nunca solo color). */
function StatusIcon({ status, dark }: { status: SignalStatus; dark: boolean }) {
  const s = STATUS[status];
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden className="shrink-0" color={dark ? s.colorDark : s.color}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity={dark ? 0.18 : 0.12} />
      <GlyphPath glyph={s.glyph} />
    </svg>
  );
}

export function IntegrityBadge({ señales, empleado, sucursal, tipo, timestamp, puntaje, folio, acciones, estado = "ok", theme = "light" }: IntegrityBadgeProps) {
  const dark = theme === "dark";
  const card = dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper";
  const divider = dark ? "border-ink-700" : "border-line";
  const track = dark ? "bg-ink-800" : "bg-paper-2";
  const txt = dark ? "text-paper" : "text-ink";
  const soft = dark ? "text-taupe" : "text-ink-soft";

  const vacio = estado === "vacio" || señales.length === 0;
  const cargando = estado === "cargando";

  // ── Estado: CARGANDO ──────────────────────────────────────────
  if (cargando) {
    return (
      <article aria-busy="true" aria-label="Verificando integridad de la checada" className={`overflow-hidden rounded-[14px] border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${card}`}>
        <div className={`flex items-center justify-between border-b px-4 py-3 ${divider}`}>
          <div className="klk-skeleton h-4 w-40" />
          <div className="klk-skeleton h-3 w-14" />
        </div>
        <div className="flex items-center gap-4 px-4 py-5">
          <div className="klk-skeleton h-[72px] w-[72px] !rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="klk-skeleton h-6 w-24 !rounded-full" />
            <div className="klk-skeleton h-4 w-36" />
            <div className="klk-skeleton h-3 w-44" />
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="klk-skeleton h-1.5 w-full" />
        </div>
        <div className={`space-y-3 border-t px-4 py-4 ${divider}`}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="klk-skeleton h-5 w-5 !rounded-full" />
              <div className="klk-skeleton h-3 flex-1" style={{ maxWidth: `${70 - i * 8}%` }} />
            </div>
          ))}
        </div>
      </article>
    );
  }

  // ── Estado: VACÍO / sin señales ───────────────────────────────
  if (vacio) {
    return (
      <article aria-label="Sello de integridad sin datos" className={`overflow-hidden rounded-[14px] border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${card}`}>
        <div className={`flex items-center justify-between border-b px-4 py-3 ${divider}`}>
          <h3 className={`font-display text-sm font-semibold ${txt}`}>Sello de integridad</h3>
        </div>
        <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
          <Sello color={dark ? "#a09d95" : "#8f8c84"} glyph="alert" muted />
          <p className={`text-sm ${soft}`}>Aún no hay señales que evaluar para esta checada.</p>
        </div>
      </article>
    );
  }

  // ── Estado: CON CONTENIDO ─────────────────────────────────────
  const nivel = nivelDe(señales);
  const N = NIVEL[nivel];
  const okCount = señales.filter((s) => s.status === "ok").length;
  const score = Math.max(0, Math.min(100, Math.round(puntaje ?? puntajeDe(señales))));
  const accentFg = dark ? N.fgDark : N.fg;

  const resumenSR =
    `Sello de integridad: ${N.label}, índice de confianza ${score} por ciento. ` +
    `${okCount} de ${señales.length} señales verificadas.` +
    (empleado ? ` Empleado ${empleado}.` : "") +
    (tipo ? ` ${TIPO[tipo]}.` : "") +
    (sucursal ? ` ${sucursal}.` : "") +
    (timestamp !== undefined ? ` ${fmtFecha(timestamp)}, ${fmtHora(timestamp)}.` : "");

  return (
    <article aria-label={resumenSR} className={`overflow-hidden rounded-[14px] border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${card}`}>
      {/* Barra de acento por nivel (triage instantáneo en una lista) */}
      <div className="h-1 w-full" style={{ background: N.seal }} aria-hidden />

      {/* Cabecera */}
      <div className={`flex items-center justify-between gap-3 border-b px-4 py-3 ${divider}`}>
        <h3 className={`font-display text-sm font-semibold ${txt}`}>Sello de integridad</h3>
        {folio && (
          <span className={`font-mono text-[11px] tabular-nums ${soft}`} title="Folio de auditoría">
            #{folio}
          </span>
        )}
      </div>

      {/* Sello + resumen */}
      <div className="flex items-center gap-4 px-4 py-5">
        <div className="klk-sello">
          <Sello color={N.seal} glyph={N.glyph} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ color: accentFg, background: dark ? N.bgDark : N.bg }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden color={accentFg}>
                <GlyphPath glyph={N.glyph} />
              </svg>
              {N.label}
            </span>
            {tipo && (
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${divider} ${soft}`}>
                <TipoIcon tipo={tipo} />
                {TIPO[tipo]}
              </span>
            )}
          </div>
          <p className={`mt-1.5 truncate font-display text-lg font-semibold ${txt}`}>{empleado ?? N.desc}</p>
          {sucursal && <p className={`mt-0.5 truncate text-sm ${soft}`}>{sucursal}</p>}
          {timestamp !== undefined && (
            <p className={`mt-0.5 font-mono text-xs tabular-nums ${soft}`}>
              {fmtFecha(timestamp)} · {fmtHora(timestamp)}
            </p>
          )}
        </div>
      </div>

      {/* Índice de confianza */}
      <div className="px-4 pb-4">
        <div className="flex items-baseline justify-between">
          <span className={`text-xs ${soft}`}>Índice de confianza</span>
          <span className={`font-mono text-sm font-semibold tabular-nums ${txt}`}>{score}%</span>
        </div>
        <div className={`mt-1.5 h-1.5 w-full overflow-hidden rounded-full ${track}`}>
          <div className="klk-grow h-full rounded-full" style={{ width: `${score}%`, background: N.seal }} />
        </div>
      </div>

      {/* Señales */}
      <ul className={`border-t ${divider}`}>
        {señales.map((s) => {
          const cfg = STATUS[s.status];
          return (
            <li key={s.key} className={`flex items-center gap-3 px-4 py-2.5 ${divider} border-b last:border-b-0`}>
              <StatusIcon status={s.status} dark={dark} />
              <span className={`min-w-0 text-sm ${txt}`}>
                {s.label}
                <span className="sr-only"> — señal {cfg.sr}</span>
              </span>
              {s.detalle && <span className={`ml-auto shrink-0 whitespace-nowrap pl-3 font-mono text-xs tabular-nums ${soft}`}>{s.detalle}</span>}
            </li>
          );
        })}
      </ul>

      {/* Pie: trazabilidad + acciones */}
      <div className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t px-4 py-2.5 ${divider}`}>
        <div className="flex min-w-0 items-center gap-2">
          <KlokkMark size={14} color={dark ? "#4ab378" : "#237446"} title="" className="shrink-0" />
          <p className={`truncate font-mono text-[11px] ${soft}`}>
            {okCount}/{señales.length} señales{acciones ? "" : " · sello de Klokk"}
          </p>
        </div>
        {acciones && <div className="flex shrink-0 items-center gap-1.5">{acciones}</div>}
      </div>
    </article>
  );
}
