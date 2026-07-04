import { useState } from "react";
import { WorkerStatusCard } from "../WorkerStatusCard/WorkerStatusCard";
import type {
  FiltroEquipo,
  TeamStatusBoardProps,
  WorkerStatus,
} from "./types";

// ── Configuración de filtros ──────────────────────────────────────────────────

const FILTROS: FiltroEquipo[] = [
  "todos",
  "presente",
  "retardo",
  "ausente",
  "sin_datos",
];

const FILTRO_LABEL: Record<FiltroEquipo, string> = {
  todos: "Todos",
  presente: "Presente",
  retardo: "Retardo",
  ausente: "Ausente",
  sin_datos: "Sin datos",
};

// ── Mensaje positivo para filtro sin resultados ───────────────────────────────

const FILTRO_VACIO: Record<WorkerStatus, string> = {
  presente: "nadie está presente ahora mismo",
  retardo: "nadie en retardo ahora mismo",
  ausente: "nadie ausente ahora mismo",
  sin_datos: "todos tienen datos de fichaje",
};

// ── Skeletons de carga ────────────────────────────────────────────────────────

function SkeletonCards({ count, dark }: { count: number; dark: boolean }) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Cargando equipo"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`rounded-card border p-4 ${
            dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="klk-skeleton h-[46px] w-[46px] rounded-full shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="klk-skeleton h-3.5 w-2/5 rounded" />
              <div className="klk-skeleton h-2.5 w-1/4 rounded" />
            </div>
          </div>
          <div className="mt-3.5 flex items-center gap-2">
            <div className="klk-skeleton h-5 w-20 rounded-full" />
            <div className="klk-skeleton ml-auto h-3 w-24 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export function TeamStatusBoard({
  miembros,
  filtroInicial = "todos",
  onSelectWorker,
  acciones,
  densidad = "comoda",
  loading = false,
  error,
  onRetry,
  theme = "light",
}: TeamStatusBoardProps) {
  const dark = theme === "dark";
  const [filtroActivo, setFiltroActivo] = useState<FiltroEquipo>(filtroInicial);

  // Conteos por estado
  const countFor = (k: FiltroEquipo): number =>
    k === "todos"
      ? miembros.length
      : miembros.filter((m) => m.status === k).length;

  // Miembros filtrados
  const miembrosFiltrados =
    filtroActivo === "todos"
      ? miembros
      : miembros.filter((m) => m.status === filtroActivo);

  const txt = dark ? "text-paper" : "text-ink";
  const soft = dark ? "text-taupe" : "text-ink-soft";

  // ── ESTADO: error ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div
        role="alert"
        className={`flex flex-col items-center justify-center gap-3 rounded-card border px-6 py-12 text-center ${
          dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"
        }`}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="text-terracotta"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.35"
          />
          <path
            d="M12 7.5v5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
        <div>
          <p className={`font-display font-semibold ${txt}`}>
            No se pudo cargar el equipo
          </p>
          <p className={`mt-1 text-sm ${soft}`}>{error}</p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={`mt-1 rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              dark
                ? "bg-ink-800 text-paper hover:bg-ink-700"
                : "bg-paper-2 text-ink hover:bg-taupe/20"
            }`}
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  // ── ESTADO: cargando ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SkeletonCards count={Math.min(Math.max(miembros.length || 3, 3), 6)} dark={dark} />
    );
  }

  // ── ESTADO: equipo vacío (sin registros) ─────────────────────────────────────
  if (miembros.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 rounded-card border px-6 py-12 text-center ${
          dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"
        }`}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="text-accent"
        >
          <path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <circle
            cx="9"
            cy="7"
            r="4"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.55"
          />
          <path
            d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
        </svg>
        <div>
          <p className={`font-display font-semibold ${txt}`}>
            Aún no hay equipo dado de alta
          </p>
          <p className={`mt-1 text-sm ${soft}`}>
            Los miembros del equipo aparecerán aquí una vez registrados.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Barra de filtros con conteos — patrón LiveCheckinFeed */}
      <div
        className={`mb-4 flex flex-wrap gap-1.5`}
        role="group"
        aria-label="Filtrar por estado"
      >
        {FILTROS.map((k) => {
          const active = filtroActivo === k;
          const count = countFor(k);
          return (
            <button
              key={k}
              type="button"
              onClick={() => setFiltroActivo(k)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                active
                  ? "bg-accent text-paper"
                  : dark
                  ? "bg-ink-800 text-taupe hover:text-paper"
                  : "bg-paper-2 text-ink-soft hover:text-ink"
              }`}
            >
              {FILTRO_LABEL[k]}
              <span className="tabular-nums opacity-80">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ESTADO: filtro sin resultados (positivo) */}
      {miembrosFiltrados.length === 0 && filtroActivo !== "todos" ? (
        <div
          className={`flex flex-col items-center justify-center gap-2 rounded-card border px-6 py-10 text-center ${
            dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"
          }`}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="text-accent"
          >
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.4"
              opacity="0.35"
            />
          </svg>
          <p className={`font-display font-semibold ${txt}`}>
            {FILTRO_VACIO[filtroActivo as WorkerStatus] ?? "Sin resultados para este filtro"}
          </p>
        </div>
      ) : (
        /* Grid de WorkerStatusCards — reutilización real, cero duplicación */
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {miembrosFiltrados.map((m) => (
            <WorkerStatusCard
              key={m.worker.id}
              worker={m.worker}
              status={m.status}
              lastCheckin={m.lastCheckin}
              insideGeofence={m.insideGeofence}
              nota={m.nota}
              onSelect={onSelectWorker}
              acciones={acciones ? acciones(m) : undefined}
              densidad={densidad}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
}
