// OvertimeMeter · MedidorDeHorasExtra — tipos
// Componente PRESENTACIONAL de data-viz. Separa horas en normal / doble / triple
// (reglas de tiempo extra en México).

export interface OvertimeMeterProps {
  /** Horas a tarifa normal. */
  normal: number;
  /** Horas pagadas al doble. */
  doble: number;
  /** Horas pagadas al triple. */
  triple: number;
  /** Horas objetivo de la semana (marca en la barra). */
  objetivo?: number;
  /** Total de horas de la semana anterior, para el comparativo (bonus). */
  semanaAnterior?: number;
  /** Tema visual. */
  theme?: "light" | "dark";
}
