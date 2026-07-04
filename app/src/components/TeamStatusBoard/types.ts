// TeamStatusBoard · TableroDeEquipo — tipos
// Tablero de equipo en vivo: "¿quién está ahora?"
// Reutiliza WorkerStatusCard importado (cero duplicación de markup).

import type { Worker, WorkerStatus, WorkerAction } from "../WorkerStatusCard/types";

export type { Worker, WorkerStatus, WorkerAction };

/** Un miembro del equipo con su estado actual. */
export interface MiembroEquipo {
  worker: Worker;
  status: WorkerStatus;
  /** Último fichaje (epoch ms). */
  lastCheckin?: number;
  /** Si está dentro del geocerco. */
  insideGeofence?: boolean;
  /** Nota contextual breve junto al estado. */
  nota?: string;
}

/** Filtro activo en el tablero. */
export type FiltroEquipo = WorkerStatus | "todos";

export interface TeamStatusBoardProps {
  /** Lista de miembros del equipo. */
  miembros: MiembroEquipo[];
  /** Filtro activo inicial. */
  filtroInicial?: FiltroEquipo;
  /** Callback cuando se selecciona un trabajador. */
  onSelectWorker?: (workerId: string) => void;
  /** Acciones del menú por miembro (se pasa a WorkerStatusCard). */
  acciones?: (m: MiembroEquipo) => WorkerAction[];
  /** Densidad visual — se propaga a cada WorkerStatusCard. */
  densidad?: "comoda" | "compacta";
  /** Estado de carga. */
  loading?: boolean;
  /** Mensaje de error. Si se provee, muestra el estado de error. */
  error?: string;
  /** Callback para reintentar tras un error. */
  onRetry?: () => void;
  /** Tema visual. */
  theme?: "light" | "dark";
}
