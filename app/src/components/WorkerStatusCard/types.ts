// WorkerStatusCard · TarjetaDeTrabajador — tipos
// Componente PRESENTACIONAL (STRETCH). Tarjeta compacta de un trabajador:
// avatar/iniciales, nombre, puesto, estado actual, último fichaje e indicador
// de dentro/fuera del geocerco. Pensada para tableros tipo "¿quién está hoy?".

import type { ReactNode } from "react";

/** Estado de asistencia del trabajador en este momento. */
export type WorkerStatus = "presente" | "ausente" | "retardo" | "sin_datos";

export interface Worker {
  /** Identificador estable. */
  id: string;
  /** Nombre completo; del que se derivan las iniciales. */
  nombre: string;
  /** Puesto o rol ("el punto" de la tarjeta): "Despachador", "Cajera"… */
  puesto?: string;
  /** URL de avatar; si falta, se muestran las iniciales. */
  avatarUrl?: string;
}

/** Acción del menú contextual (bonus). */
export interface WorkerAction {
  /** Texto del elemento de menú. */
  label: string;
  /** Handler; el componente cierra el menú después de invocarlo. */
  onClick?: () => void;
  /** Marca la acción como destructiva (color de alerta). */
  danger?: boolean;
  /** Ícono opcional a la izquierda. */
  icon?: ReactNode;
}

export interface WorkerStatusCardProps {
  /** Trabajador a mostrar. */
  worker: Worker;
  /** Estado de asistencia actual. */
  status: WorkerStatus;
  /** Último fichaje (epoch ms). Si falta, se muestra "sin registro". */
  lastCheckin?: number;
  /** Si está dentro del geocerco. Si es `undefined`, no se muestra el indicador. */
  insideGeofence?: boolean;
  /** Nota contextual breve junto al estado: "14 min tarde", "No se presentó"… */
  nota?: string;
  /** Si se provee, la tarjeta es seleccionable (abre el perfil del trabajador). */
  onSelect?: (workerId: string) => void;
  /** Acciones del menú contextual (bonus). Si está vacío, no se muestra el menú. */
  acciones?: WorkerAction[];
  /** Densidad visual (bonus). */
  densidad?: "comoda" | "compacta";
  /** Tema visual. */
  theme?: "light" | "dark";
}
