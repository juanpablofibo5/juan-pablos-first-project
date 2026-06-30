// IntegrityBadge · SelloDeIntegridad — tipos
// Componente PRESENTACIONAL. Certifica que una checada de Klokk es CONFIABLE:
// combina varias señales de verificación (ubicación, tiempo, identidad, GPS…)
// en un "sello" con un nivel global. Es la tesis del producto: que nadie pueda
// "checar por el compañero".

import type { ReactNode } from "react";

/** Resultado de una señal de verificación individual. */
export type SignalStatus = "ok" | "alerta" | "falla";

export interface IntegritySignal {
  /** Identificador único dentro del sello. */
  key: string;
  /** Etiqueta legible: "Dentro de la geocerca". */
  label: string;
  /** Resultado de la señal. */
  status: SignalStatus;
  /** Detalle opcional, normalmente numérico: "a 24 m del centro". */
  detalle?: string;
}

/** Nivel global del sello, derivado de las señales. */
export type IntegrityLevel = "verificado" | "revisar" | "sospechoso";

export interface IntegrityBadgeProps {
  /** Señales de verificación evaluadas para esta checada. */
  señales: IntegritySignal[];
  /** Empleado que checó. */
  empleado?: string;
  /** Sucursal / ubicación de la checada. */
  sucursal?: string;
  /** Tipo de checada registrada. */
  tipo?: "entrada" | "salida";
  /** Momento de la checada (epoch ms). */
  timestamp?: number;
  /**
   * Índice de confianza 0–100. Normalmente lo calcula el backend ponderando
   * las señales; si se omite, el componente lo deriva de `señales`.
   */
  puntaje?: number;
  /** Folio del sello, para auditoría y trazabilidad. */
  folio?: string;
  /** Controles opcionales en el pie (p. ej. "Marcar como revisada"). */
  acciones?: ReactNode;
  /** Estado del componente: con contenido, cargando o sin datos. */
  estado?: "ok" | "cargando" | "vacio";
  /** Tema visual. */
  theme?: "light" | "dark";
}
