// StpsReportCard · TarjetaReporteSTPS — tipos
// Componente PRESENTACIONAL. Muestra el estado del registro mensual de jornada
// requerido por el Art. 132 Fr. XXXIV LFT (vigente enero 2027).
// Es el gancho legal de Klokk: demuestra que el empleador cumple con el
// registro electrónico de asistencia exigido por la reforma laboral.

/** Estado de la generación del reporte. */
export type StpsEstado = "listo" | "generando" | "incompleto" | "error";

export interface StpsReportCardProps {
  /** Mes del reporte legible: "junio 2026". */
  mes: string;
  /** Número de empleados incluidos en el reporte. */
  empleados: number;
  /** Días con registro completo de jornada en el mes. */
  diasRegistrados: number;
  /** Total de días laborables del mes. */
  totalDias: number;
  /** Incidencias laborales marcadas en el periodo. Default 0. */
  incidencias?: number;
  /**
   * Estado del reporte:
   * - `listo`: reporte generado, CTA de descarga habilitado.
   * - `generando`: reporte en proceso, barra indeterminada.
   * - `incompleto`: faltan días por registrar, CTA deshabilitado.
   * - `error`: error al generar, mensaje con role="alert".
   */
  estado?: StpsEstado;
  /** Mensaje de error cuando estado === "error". */
  mensajeError?: string;
  /** Callback al presionar "Descargar reporte" (solo activo en "listo"). */
  onDescargar?: () => void;
  /** Tema visual. */
  theme?: "light" | "dark";
}
