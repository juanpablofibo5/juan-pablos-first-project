import type { OvertimeMeterProps } from "./types";

const SEG = [
  { key: "normal", label: "Normal", color: "#4b7a5a" },
  { key: "doble", label: "Doble", color: "#b07d2b" },
  { key: "triple", label: "Triple", color: "#b5482f" },
] as const;

const fmt = (h: number) => `${Number.isInteger(h) ? h : h.toFixed(1)} h`;

export function OvertimeMeter({ normal, doble, triple, objetivo, semanaAnterior, theme = "light" }: OvertimeMeterProps) {
  const dark = theme === "dark";
  const valores = { normal, doble, triple };
  const total = normal + doble + triple;
  const extra = doble + triple;
  const scaleMax = Math.max(total, objetivo ?? 0, 0.0001);

  const delta = semanaAnterior !== undefined ? total - semanaAnterior : undefined;
  const ariaLabel = `Horas de la semana: ${fmt(total)} en total. ${fmt(normal)} normales, ${fmt(doble)} al doble, ${fmt(triple)} al triple.${objetivo !== undefined ? ` Objetivo ${fmt(objetivo)}.` : ""}`;

  return (
    <div className={`overflow-hidden rounded-[14px] border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"}`}>
      {/* Header */}
      <div className={`flex items-end justify-between border-b px-4 py-3 ${dark ? "border-ink-700" : "border-line"}`}>
        <div>
          <h3 className={`font-display text-sm font-semibold ${dark ? "text-paper" : "text-ink"}`}>Horas de la semana</h3>
          {extra > 0 && (
            <p className={`mt-0.5 font-mono text-xs ${dark ? "text-taupe" : "text-ink-soft"}`}>{fmt(extra)} de tiempo extra</p>
          )}
        </div>
        <div className="text-right">
          <span className={`font-mono text-2xl font-semibold tabular-nums ${dark ? "text-paper" : "text-ink"}`}>{fmt(total)}</span>
          {delta !== undefined && delta !== 0 && (
            <p className={`font-mono text-xs tabular-nums ${dark ? "text-taupe" : "text-ink-soft"}`}>
              {delta > 0 ? "▲" : "▼"} {fmt(Math.abs(delta))} vs semana pasada
            </p>
          )}
        </div>
      </div>

      <div className="p-4">
        {total === 0 ? (
          /* --- ESTADO: cero horas --- */
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className={`h-10 w-full rounded-lg ${dark ? "bg-ink-800" : "bg-paper-2"}`} />
            <p className={`text-sm ${dark ? "text-taupe" : "text-ink-soft"}`}>Sin horas registradas esta semana.</p>
          </div>
        ) : (
          <>
            {/* Barra apilada */}
            <div className="relative mt-5">
              <div
                role="img"
                aria-label={ariaLabel}
                className={`flex h-10 w-full overflow-hidden rounded-lg ${dark ? "bg-ink-800" : "bg-paper-2"}`}
              >
                {SEG.map((s) => {
                  const v = valores[s.key];
                  if (v <= 0) return null;
                  const pct = (v / scaleMax) * 100;
                  return (
                    <div
                      key={s.key}
                      title={`${s.label}: ${fmt(v)}`}
                      className="klk-grow h-full"
                      style={{ width: `${pct}%`, background: s.color }}
                    />
                  );
                })}
              </div>

              {/* Marca de objetivo */}
              {objetivo !== undefined && objetivo > 0 && objetivo <= scaleMax && (
                <div className="absolute top-0 h-10" style={{ left: `${(objetivo / scaleMax) * 100}%` }} title={`Objetivo: ${fmt(objetivo)}`}>
                  <div className={`h-full w-0.5 ${dark ? "bg-paper" : "bg-ink"}`} />
                  <span
                    className={`absolute -top-5 whitespace-nowrap font-mono text-[10px] ${
                      objetivo / scaleMax > 0.9 ? "right-0" : "-translate-x-1/2"
                    } ${dark ? "text-taupe" : "text-ink-soft"}`}
                  >
                    Obj. {fmt(objetivo)}
                  </span>
                </div>
              )}
            </div>

            {/* Leyenda */}
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {SEG.map((s) => (
                <li key={s.key} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} aria-hidden />
                  <span className={`text-xs ${dark ? "text-taupe" : "text-ink-soft"}`}>{s.label}</span>
                  <span className={`font-mono text-xs font-medium tabular-nums ${dark ? "text-paper" : "text-ink"}`}>{fmt(valores[s.key])}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
