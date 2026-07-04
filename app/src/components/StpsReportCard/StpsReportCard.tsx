import type { StpsReportCardProps } from "./types";

// Ícono de descarga (flecha hacia abajo con bandeja).
function IconoDescarga({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 4v12" />
      <path d="M8 13l4 4 4-4" />
      <path d="M4 19h16" />
    </svg>
  );
}

// Ícono de alerta para incidencias (triángulo con !).
function IconoAlerta() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M12 4L3 20h18L12 4z" />
      <path d="M12 10v5" />
      <path d="M12 18v.2" />
    </svg>
  );
}

// Ícono de reloj en marcha para "generando".
function IconoGenerando() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

/**
 * StpsReportCard — TarjetaReporteSTPS
 *
 * Muestra el estado del registro mensual de jornada laboral para cumplir con
 * el Art. 132 Fr. XXXIV de la LFT. Proporciona: completitud del registro,
 * incidencias del periodo y CTA para descargar el reporte oficial.
 */
export function StpsReportCard({
  mes,
  empleados,
  diasRegistrados,
  totalDias,
  incidencias = 0,
  estado = "listo",
  mensajeError,
  onDescargar,
  theme = "light",
}: StpsReportCardProps) {
  const dark = theme === "dark";

  // Clases base del design system
  const card = dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper";
  const divider = dark ? "border-ink-700" : "border-line";
  const track = dark ? "bg-ink-800" : "bg-paper-2";
  const txt = dark ? "text-paper" : "text-ink";
  const soft = dark ? "text-taupe" : "text-ink-soft";

  // Cálculo de completitud: porcentaje redondeado al entero más cercano
  const pct =
    totalDias > 0 ? Math.round((diasRegistrados / totalDias) * 100) : 0;

  // Color de la barra según completitud
  const barColor =
    pct >= 90 ? "#4b7a5a" : pct >= 60 ? "#b07d2b" : "#b5482f";

  // Estado de error: usar role="alert"
  if (estado === "error") {
    return (
      <article
        className={`overflow-hidden rounded-card border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${card}`}
        aria-label="Reporte STPS — error"
      >
        <header className={`flex items-center justify-between border-b px-4 py-3 ${divider}`}>
          <h3 className={`font-display text-sm font-semibold ${txt}`}>
            Reporte STPS · {mes}
          </h3>
        </header>
        <div
          role="alert"
          className="flex flex-col gap-2 px-4 py-6"
        >
          <p className="text-sm font-semibold" style={{ color: "#b5482f" }}>
            Error al generar el reporte
          </p>
          {mensajeError && (
            <p className={`text-sm ${soft}`}>{mensajeError}</p>
          )}
          <p className={`text-xs ${soft}`}>
            Intenta de nuevo o contacta a soporte si el problema persiste.
          </p>
        </div>
      </article>
    );
  }

  // Si está generando, CTA deshabilitado y barra indeterminada
  const estaGenerando = estado === "generando";
  const estaIncompleto = estado === "incompleto";
  const estaListo = estado === "listo";

  // Días faltantes para el mensaje de incompleto
  const diasFaltantes = Math.max(0, totalDias - diasRegistrados);

  // Texto descriptivo del CTA según estado
  const ctaLabel = "Descargar reporte";
  const ctaDeshabilitado = !estaListo;

  // Descripción de por qué el CTA está deshabilitado (para aria)
  const ctaDescripcion =
    estaGenerando
      ? "El reporte se está generando, espera a que finalice."
      : estaIncompleto
      ? `Faltan ${diasFaltantes} ${diasFaltantes === 1 ? "día" : "días"} por registrar antes de poder descargar.`
      : undefined;

  const ctaDescId = ctaDeshabilitado ? "stps-cta-desc" : undefined;

  return (
    <article
      className={`overflow-hidden rounded-card border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${card}`}
      aria-label={`Reporte STPS ${mes}: ${pct}% de completitud, ${empleados} empleados`}
    >
      {/* Cabecera */}
      <header
        className={`flex items-center justify-between gap-3 border-b px-4 py-3 ${divider}`}
      >
        <h3 className={`font-display text-sm font-semibold ${txt}`}>
          Reporte STPS · {mes}
        </h3>
        <span className={`text-xs ${soft}`}>
          {empleados} {empleados === 1 ? "empleado" : "empleados"}
        </span>
      </header>

      {/* Cuerpo */}
      <div className="px-4 py-4 space-y-4">
        {/* Estado de generación */}
        {estaGenerando && (
          <div className="flex items-center gap-2">
            <IconoGenerando />
            <p className={`text-sm ${soft}`}>Generando reporte…</p>
          </div>
        )}

        {/* Barra de completitud */}
        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <span className={`text-xs ${soft}`}>
              Completitud del registro
            </span>
            <span
              className={`font-mono text-sm font-semibold tabular-nums ${txt}`}
              aria-label={`${pct} por ciento`}
            >
              {pct}%
            </span>
          </div>

          {estaGenerando ? (
            // Barra indeterminada (animación CSS del design system)
            <div
              className={`h-1.5 w-full overflow-hidden rounded-full ${track}`}
              role="progressbar"
              aria-label="Generando reporte STPS"
              aria-valuetext="generando…"
            >
              <div className="klk-indeterminate h-full rounded-full" style={{ background: "#4b7a5a" }} />
            </div>
          ) : (
            // Barra determinada con porcentaje (patrón klk-grow de IntegrityBadge)
            <div
              className={`h-1.5 w-full overflow-hidden rounded-full ${track}`}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Completitud: ${pct}%`}
            >
              <div
                className="klk-grow h-full rounded-full"
                style={{ width: `${pct}%`, background: barColor }}
              />
            </div>
          )}

          {/* Contadores de días */}
          <p className={`mt-1.5 text-xs ${soft}`}>
            {diasRegistrados} de {totalDias} días registrados
          </p>
        </div>

        {/* Mensaje de días faltantes (solo en incompleto) */}
        {estaIncompleto && diasFaltantes > 0 && (
          <p className={`text-sm ${soft}`}>
            Faltan{" "}
            <span className={`font-semibold ${txt}`}>
              {diasFaltantes} {diasFaltantes === 1 ? "día" : "días"}
            </span>{" "}
            por registrar para completar el periodo.
          </p>
        )}

        {/* Incidencias (ámbar, siempre texto + ícono, nunca solo color) */}
        {incidencias > 0 && (
          <div
            className="flex items-center gap-1.5"
            style={{ color: "#b07d2b" }}
          >
            <IconoAlerta />
            {/* texto en ámbar AA por tema (fix de integración; el ícono queda gráfico ≥3:1) */}
            <span className="text-sm font-medium" style={{ color: dark ? "#dab36e" : "#6f4e12" }}>
              {incidencias}{" "}
              {incidencias === 1 ? "incidencia marcada" : "incidencias marcadas"}
            </span>
          </div>
        )}
      </div>

      {/* Pie: artículo legal + CTA */}
      <footer
        className={`flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between ${divider}`}
      >
        <p className={`text-[11px] leading-snug ${soft}`}>
          Art. 132 Fr. XXXIV LFT · vigente enero 2027
        </p>

        {/* CTA de descarga */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            aria-disabled={ctaDeshabilitado ? "true" : undefined}
            aria-describedby={ctaDescId}
            onClick={estaListo ? onDescargar : undefined}
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              estaListo
                ? "bg-[#237446] text-white hover:bg-[#1b5c37] focus-visible:outline-[#237446] cursor-pointer"
                : `border ${divider} ${soft} cursor-default opacity-60`,
            ].join(" ")}
          >
            <IconoDescarga />
            {ctaLabel}
          </button>

          {/* Descripción de por qué está deshabilitado */}
          {ctaDeshabilitado && ctaDescripcion && (
            <p
              id={ctaDescId}
              className={`text-[11px] leading-snug ${soft}`}
            >
              {ctaDescripcion}
            </p>
          )}
        </div>
      </footer>
    </article>
  );
}
