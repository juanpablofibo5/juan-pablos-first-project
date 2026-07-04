import type { KpiStatCardProps } from "./types";

// ── Formateo de valores ────────────────────────────────────────────────────
// "porcentaje" → "94%"  |  "horas" → "46 h"  |  "numero" → "1,240"
function fmtValor(valor: number, formato: KpiStatCardProps["formato"]): string {
  if (formato === "porcentaje") return `${valor}%`;
  if (formato === "horas") return `${valor} h`;
  // "numero": separador de miles es-MX
  return valor.toLocaleString("es-MX");
}

// ── Semántica de delta ─────────────────────────────────────────────────────
// Un delta > 0 con deltaBuenoCuando="sube"  → bueno (verde)
// Un delta < 0 con deltaBuenoCuando="baja"  → bueno (verde)
// Un delta = 0 → neutro (gris, sin cambio)
// Los demás casos → malo (terracota)
type DeltaSemántica = "bueno" | "malo" | "neutro";

function semanticaDelta(
  delta: number,
  deltaBuenoCuando: "sube" | "baja"
): DeltaSemántica {
  if (delta === 0) return "neutro";
  if (delta > 0 && deltaBuenoCuando === "sube") return "bueno";
  if (delta < 0 && deltaBuenoCuando === "baja") return "bueno";
  return "malo";
}

// ── Tokens de color por semántica ─────────────────────────────────────────
// Verde: #4b7a5a (activo del sistema)  |  Terracota: #b5482f (incidencia)
// Los colores tienen acompañamiento de texto y forma (flecha); nunca solo color.
const COLOR_SEMANTICA: Record<
  DeltaSemántica,
  { fg: string; fgDark: string; bg: string; bgDark: string }
> = {
  bueno: {
    fg: "#2f5740",
    fgDark: "#86c1a0",
    bg: "rgba(75,122,90,.12)",
    bgDark: "rgba(134,193,160,.16)",
  },
  malo: {
    fg: "#8a3322",
    fgDark: "#e29585",
    bg: "rgba(181,72,47,.12)",
    bgDark: "rgba(226,149,133,.16)",
  },
  neutro: {
    fg: "#57544e",
    fgDark: "#a09d95",
    bg: "rgba(160,157,149,.12)",
    bgDark: "rgba(160,157,149,.16)",
  },
};

// ── Flecha según SIGNO del delta (no según semántica) ──────────────────────
// delta > 0 → ▲  |  delta < 0 → ▼  |  delta = 0 → sin flecha
function flechaDelta(delta: number): string {
  if (delta > 0) return "▲";
  if (delta < 0) return "▼";
  return "";
}

// ── aria-label del article (resumen en español natural) ───────────────────
function buildAriaLabel({
  etiqueta,
  valor,
  formato,
  delta,
  deltaBuenoCuando,
  periodo,
  semantica,
}: {
  etiqueta: string;
  valor: number;
  formato: KpiStatCardProps["formato"];
  delta?: number;
  deltaBuenoCuando: "sube" | "baja";
  periodo: string;
  semantica: DeltaSemántica;
}): string {
  const valorFmt =
    formato === "porcentaje"
      ? `${valor} por ciento`
      : formato === "horas"
        ? `${valor} horas`
        : valor.toLocaleString("es-MX");

  let tendencia = "";
  if (delta !== undefined) {
    const absDelta = Math.abs(delta);
    const dirección = delta > 0 ? "subida" : delta < 0 ? "bajada" : "";
    if (delta === 0) {
      tendencia = `, sin cambio ${periodo}`;
    } else if (semantica === "bueno") {
      tendencia = `, mejora de ${absDelta} puntos (${dirección}) ${periodo}`;
    } else {
      tendencia = `, empeora ${absDelta} puntos (${dirección}) ${periodo}`;
    }
    // Suprime advertencia de "deltaBuenoCuando" no usada en el scope
    void deltaBuenoCuando;
  }

  return `${etiqueta}: ${valorFmt}${tendencia}`;
}

// ── Componente ─────────────────────────────────────────────────────────────
export function KpiStatCard({
  etiqueta,
  valor,
  formato = "numero",
  delta,
  deltaBuenoCuando = "sube",
  periodo = "vs semana pasada",
  estado = "ok",
  mensajeError,
  theme = "light",
}: KpiStatCardProps) {
  const dark = theme === "dark";

  // Tokens de tema
  const card = dark
    ? "border-ink-700 bg-ink-900"
    : "border-line bg-paper";
  const txt = dark ? "text-paper" : "text-ink";
  const soft = dark ? "text-taupe" : "text-ink-soft";

  // ── Estado: CARGANDO ────────────────────────────────────────────────────
  if (estado === "cargando") {
    return (
      <article
        aria-busy="true"
        aria-label={`Cargando métrica ${etiqueta}`}
        className={`overflow-hidden rounded-card border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${card}`}
      >
        <div className="px-5 pt-5 pb-4">
          <div className="klk-skeleton h-3 w-32 mb-3" />
          <div className="klk-skeleton h-8 w-24 mb-2" />
          <div className="klk-skeleton h-5 w-28 !rounded-full" />
        </div>
      </article>
    );
  }

  // ── Estado: ERROR ────────────────────────────────────────────────────────
  if (estado === "error") {
    return (
      <article
        aria-label={`Error al cargar ${etiqueta}`}
        className={`overflow-hidden rounded-card border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${card}`}
      >
        <div className="px-5 pt-5 pb-4">
          <p className={`text-xs font-medium uppercase tracking-wide ${soft}`}>
            {etiqueta}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            {/* Signo de error: forma + color (nunca solo color) */}
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden
              fill="none"
              stroke="#b5482f"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M12 6.5 L12 13" />
              <path d="M12 17 L12 17.2" />
            </svg>
            <p className="text-sm" style={{ color: "#b5482f" }}>
              {mensajeError ?? "Error al cargar"}
            </p>
          </div>
        </div>
      </article>
    );
  }

  // ── Estado: OK ──────────────────────────────────────────────────────────
  const hasDelta = delta !== undefined;
  const semantica = hasDelta ? semanticaDelta(delta!, deltaBuenoCuando) : "neutro";
  const colores = COLOR_SEMANTICA[semantica];
  const fg = dark ? colores.fgDark : colores.fg;
  const bg = dark ? colores.bgDark : colores.bg;
  const flecha = hasDelta ? flechaDelta(delta!) : "";
  const absDelta = hasDelta ? Math.abs(delta!) : 0;

  const ariaLabel = buildAriaLabel({
    etiqueta,
    valor,
    formato,
    delta,
    deltaBuenoCuando,
    periodo,
    semantica,
  });

  return (
    <article
      aria-label={ariaLabel}
      className={`overflow-hidden rounded-card border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${card}`}
    >
      <div className="px-5 pt-5 pb-4">
        {/* Etiqueta */}
        <p className={`text-xs font-medium uppercase tracking-wide ${soft}`}>
          {etiqueta}
        </p>

        {/* Valor principal */}
        <p className={`mt-1 font-display text-3xl font-bold tabular-nums ${txt}`}>
          {fmtValor(valor, formato)}
        </p>

        {/* Tendencia (nunca solo por color: flecha ▲/▼ + texto + píldora) */}
        {hasDelta && (
          <div className="mt-2.5">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ color: fg, background: bg }}
              // data-attribute para tests: verificar semántica sin computar colores
              data-delta-semantica={semantica}
            >
              {delta === 0 ? (
                // Delta cero: sin flecha, texto explícito
                <span>Sin cambio</span>
              ) : (
                <>
                  <span aria-hidden>{flecha}</span>
                  <span>
                    {absDelta}
                    {formato === "porcentaje"
                      ? " pp"
                      : formato === "horas"
                        ? " h"
                        : ""}
                  </span>
                </>
              )}
              <span className={`ml-0.5 font-normal ${dark ? "text-taupe" : "text-ink-soft"}`}>
                {periodo}
              </span>
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
