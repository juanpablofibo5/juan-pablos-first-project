// KpiStatCard · TarjetaKPI — tipos
// Componente PRESENTACIONAL. Muestra una métrica de cabecera con tendencia
// vs periodo anterior: "Asistencia hoy 94% ▲2 vs semana pasada".
// La semántica de `deltaBuenoCuando` determina si el cambio es positivo o
// negativo independientemente de su signo matemático (ej.: retardos que BAJAN
// son buenos → delta negativo es favorable).

export interface KpiStatCardProps {
  /** Etiqueta de la métrica: "Asistencia hoy". */
  etiqueta: string;
  /** Valor actual. */
  valor: number;
  /** Cómo formatear el valor. */
  formato?: "numero" | "porcentaje" | "horas"; // default "numero"
  /** Cambio vs periodo anterior; omitido = no se muestra tendencia. */
  delta?: number;
  /** Cuándo un delta es bueno: retardos que BAJAN son buenos. */
  deltaBuenoCuando?: "sube" | "baja"; // default "sube"
  /** Texto del comparativo. */
  periodo?: string; // default "vs semana pasada"
  /** Estado del componente. */
  estado?: "ok" | "cargando" | "error"; // default "ok"
  /** Mensaje corto cuando estado === "error". */
  mensajeError?: string;
  theme?: "light" | "dark";
}
