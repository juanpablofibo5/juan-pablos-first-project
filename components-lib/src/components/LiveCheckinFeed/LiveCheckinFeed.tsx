import { useEffect, useState } from "react";
import type { CheckinEvent, CheckinStatus, LiveCheckinFeedProps } from "./types";

// Estado del fichaje: SIEMPRE con etiqueta de texto, nunca solo color (accesibilidad).
const ESTADO: Record<CheckinStatus, { label: string; color: string }> = {
  a_tiempo: { label: "A tiempo", color: "#4b7a5a" },
  retardo: { label: "Retardo", color: "#b07d2b" },
  fuera_geocerco: { label: "Fuera de geocerco", color: "#b5482f" },
  no_show: { label: "No-show", color: "#57544e" },
};

/** Hora relativa: "ahora", "hace 2 min", "hace 1 h"… */
function relativo(ts: number, now: number): string {
  const s = Math.max(0, Math.floor((now - ts) / 1000));
  if (s < 5) return "ahora";
  if (s < 60) return `hace ${s} s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h} h`;
  return `hace ${Math.floor(h / 24)} d`;
}

/** Iniciales para el avatar. */
function iniciales(nombre: string): string {
  return nombre.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function Pill({ estado }: { estado: CheckinStatus }) {
  const { label, color } = ESTADO[estado];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ color, background: `${color}1A` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden />
      {label}
    </span>
  );
}

function Row({ ev, now, onClick, dark }: { ev: CheckinEvent; now: number; onClick?: (id: string) => void; dark: boolean }) {
  return (
    <li className="klk-enter">
      <button
        type="button"
        onClick={() => onClick?.(ev.id)}
        className={`flex w-full items-center gap-3 border-b px-4 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
          dark ? "border-ink-800 hover:bg-ink-800" : "border-line hover:bg-taupe/10"
        }`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium ${
            dark ? "bg-ink-800 text-paper" : "bg-paper-2 text-ink-soft"
          }`}
          aria-hidden
        >
          {iniciales(ev.empleado)}
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block truncate text-sm font-medium ${dark ? "text-paper" : "text-ink"}`}>{ev.empleado}</span>
          <span className={`block truncate font-mono text-xs ${dark ? "text-taupe" : "text-ink-soft"}`}>
            {ev.tipo === "entrada" ? "Entrada" : "Salida"}
            {ev.sucursal ? ` · ${ev.sucursal}` : ""}
          </span>
        </span>
        <Pill estado={ev.estado} />
        <time className={`shrink-0 font-mono text-xs tabular-nums ${dark ? "text-taupe" : "text-ink-soft"}`}>
          {relativo(ev.timestamp, now)}
        </time>
      </button>
    </li>
  );
}

export function LiveCheckinFeed({
  events,
  loading = false,
  error,
  onEventClick,
  filter = "todos",
  maxVisible = 50,
  theme = "light",
}: LiveCheckinFeedProps) {
  const dark = theme === "dark";

  // Reloj que avanza solo para mantener vivas las horas relativas.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  const filtrados = filter === "todos" ? events : events.filter((e) => e.estado === filter);
  const visibles = filtrados.slice(0, maxVisible);
  const restantes = filtrados.length - visibles.length;

  return (
    <div className={`overflow-hidden rounded-[14px] border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"}`}>
      {/* Barra superior con indicador "en vivo" */}
      <div className={`flex items-center justify-between border-b px-4 py-2.5 ${dark ? "border-ink-700" : "border-line"}`}>
        <h3 className={`font-display text-sm font-semibold ${dark ? "text-paper" : "text-ink"}`}>Fichajes en vivo</h3>
        <span className="inline-flex items-center gap-1.5">
          <span className="klk-livedot h-2 w-2 rounded-full" style={{ background: "#4b7a5a" }} aria-hidden />
          <span className={`font-mono text-xs ${dark ? "text-taupe" : "text-ink-soft"}`}>En vivo</span>
        </span>
      </div>

      {/* Región para lectores de pantalla: anuncia el fichaje más reciente (bonus). */}
      <p className="sr-only" aria-live="polite">
        {visibles[0] ? `Nuevo fichaje: ${visibles[0].empleado}, ${ESTADO[visibles[0].estado].label}` : ""}
      </p>

      {/* --- ESTADO: cargando (skeleton) --- */}
      {loading ? (
        <div role="status" aria-busy="true" aria-label="Cargando fichajes">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`flex items-center gap-3 border-b px-4 py-3 ${dark ? "border-ink-800" : "border-line"}`}>
              <div className="klk-skeleton h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="klk-skeleton h-3 w-1/3" />
                <div className="klk-skeleton h-2.5 w-1/4" />
              </div>
              <div className="klk-skeleton h-5 w-20 rounded-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        /* --- ESTADO: error --- */
        <div role="alert" className="flex h-[280px] flex-col items-center justify-center gap-3 px-6 text-center">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden className="text-terracotta">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
            <path d="M12 7.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
          <div>
            <p className={`font-display font-semibold ${dark ? "text-paper" : "text-ink"}`}>Se perdió la conexión en vivo</p>
            <p className={`mt-1 text-sm ${dark ? "text-taupe" : "text-ink-soft"}`}>{error}</p>
          </div>
        </div>
      ) : visibles.length === 0 ? (
        /* --- ESTADO: vacío --- */
        <div className="flex h-[280px] flex-col items-center justify-center gap-3 px-6 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
            <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2.5" opacity="0.55" />
            <path d="M8.5 12l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
          </svg>
          <div>
            <p className={`font-display font-semibold ${dark ? "text-paper" : "text-ink"}`}>Sin fichajes por ahora</p>
            <p className={`mt-1 text-sm ${dark ? "text-taupe" : "text-ink-soft"}`}>Los nuevos fichajes aparecerán aquí en tiempo real.</p>
          </div>
        </div>
      ) : (
        /* --- ESTADO: lista / streaming --- */
        <>
          <ul role="list" className="max-h-[380px] overflow-y-auto">
            {visibles.map((ev) => (
              <Row key={ev.id} ev={ev} now={now} onClick={onEventClick} dark={dark} />
            ))}
          </ul>
          {restantes > 0 && (
            <p className={`px-4 py-2 text-center font-mono text-xs ${dark ? "text-taupe" : "text-ink-soft"}`}>
              +{restantes} fichajes más
            </p>
          )}
        </>
      )}
    </div>
  );
}
