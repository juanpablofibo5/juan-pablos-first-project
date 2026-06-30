import { useEffect, useRef, useState } from "react";
import type { WorkerStatus, WorkerStatusCardProps, WorkerAction } from "./types";

// ── Configuración por estado ────────────────────────────────────
// `dot`/`dotDark`: color del indicador (siempre acompañado de texto, nunca
// solo color). `tint`: fondo del avatar cuando no hay foto.
const STATUS: Record<WorkerStatus, { label: string; dot: string; dotDark: string; tint: string; tintDark: string; fg: string; fgDark: string }> = {
  presente:  { label: "Presente",  dot: "#4b7a5a", dotDark: "#6fae87", tint: "rgba(75,122,90,.14)",  tintDark: "rgba(111,174,135,.18)", fg: "#2f5740", fgDark: "#86c1a0" },
  retardo:   { label: "Retardo",   dot: "#b07d2b", dotDark: "#d2a052", tint: "rgba(176,125,43,.16)", tintDark: "rgba(210,160,82,.18)", fg: "#6f4e12", fgDark: "#dab36e" },
  ausente:   { label: "Ausente",   dot: "#b5482f", dotDark: "#de8a78", tint: "rgba(181,72,47,.14)",  tintDark: "rgba(222,138,120,.18)", fg: "#8a3322", fgDark: "#e29585" },
  sin_datos: { label: "Sin datos", dot: "#8f8c84", dotDark: "#a09d95", tint: "rgba(143,140,132,.14)", tintDark: "rgba(160,157,149,.16)", fg: "#57544e", fgDark: "#a09d95" },
};

/** Iniciales a partir del nombre (máx. 2). */
const iniciales = (n: string) =>
  n.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("") || "?";

/** Tiempo relativo en español; cae a fecha corta si es viejo. */
function haceCuanto(ts: number): string {
  const min = Math.floor((Date.now() - ts) / 60_000);
  if (min < 1) return "hace un momento";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short" }).format(ts);
}

function PinIcon({ inside }: { inside: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      {inside ? <path d="M9 10.5l2 2 4-4" /> : <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" />}
    </svg>
  );
}

/** Menú contextual accesible (bonus): trigger con kebab + popover con role=menu. */
function ActionMenu({ nombre, acciones, dark }: { nombre: string; acciones: WorkerAction[]; dark: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus();
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? []);
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  const btn = dark ? "text-taupe hover:bg-ink-800 hover:text-paper" : "text-ink-soft hover:bg-paper-2 hover:text-ink";

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Acciones de ${nombre}`}
        onClick={() => setOpen((o) => !o)}
        className={`grid h-8 w-8 place-items-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${btn}`}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="currentColor">
          <circle cx="12" cy="5" r="1.7" />
          <circle cx="12" cy="12" r="1.7" />
          <circle cx="12" cy="19" r="1.7" />
        </svg>
      </button>
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label={`Acciones de ${nombre}`}
          onKeyDown={onMenuKeyDown}
          className={`absolute right-0 z-20 mt-1 min-w-[170px] overflow-hidden rounded-xl border py-1 shadow-[0_8px_28px_-8px_rgba(28,28,26,0.30)] ${
            dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"
          }`}
        >
          {acciones.map((a, i) => (
            <button
              key={i}
              role="menuitem"
              type="button"
              onClick={() => {
                a.onClick?.();
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none ${
                a.danger
                  ? "text-terracotta hover:bg-terracotta/10"
                  : dark
                  ? "text-paper hover:bg-ink-800"
                  : "text-ink hover:bg-paper-2"
              }`}
            >
              {a.icon && <span aria-hidden className="grid h-4 w-4 place-items-center">{a.icon}</span>}
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function WorkerStatusCard({
  worker,
  status,
  lastCheckin,
  insideGeofence,
  nota,
  onSelect,
  acciones,
  densidad = "comoda",
  theme = "light",
}: WorkerStatusCardProps) {
  const dark = theme === "dark";
  const S = STATUS[status];
  const compact = densidad === "compacta";
  const selectable = typeof onSelect === "function";

  const dot = dark ? S.dotDark : S.dot;
  const tint = dark ? S.tintDark : S.tint;
  const fg = dark ? S.fgDark : S.fg;
  const txt = dark ? "text-paper" : "text-ink";
  const soft = dark ? "text-taupe" : "text-ink-soft";
  const fichaje = lastCheckin !== undefined ? haceCuanto(lastCheckin) : null;

  // Card del design system: radio 16px, borde 1px, SIN sombra, hover sutil.
  const card = [
    "relative rounded-2xl border transition-colors duration-[180ms]",
    selectable ? "cursor-pointer" : "",
    dark ? "border-ink-700 bg-ink-900 hover:bg-ink-800" : "border-line bg-paper hover:border-taupe/60 hover:bg-paper-2/60",
  ].join(" ");

  const av = compact ? 38 : 46;
  const geo =
    insideGeofence === undefined
      ? null
      : { inside: insideGeofence, label: insideGeofence ? "Dentro" : "Fuera", color: insideGeofence ? (dark ? "#6fae87" : "#4b7a5a") : (dark ? "#de8a78" : "#b5482f") };

  const resumen =
    `${worker.nombre}${worker.puesto ? `, ${worker.puesto}` : ""}. Estado: ${S.label}.` +
    (geo ? ` ${geo.inside ? "Dentro" : "Fuera"} del geocerco.` : "") +
    (fichaje ? ` Último fichaje ${fichaje}.` : " Sin fichajes.");

  return (
    <article aria-label={resumen} className={`${card} ${compact ? "p-3" : "p-4"}`}>
      <div className={`flex items-start ${compact ? "gap-2.5" : "gap-3"}`}>
        {/* Avatar con badge de estado */}
        <div className="relative shrink-0">
          {worker.avatarUrl ? (
            <img src={worker.avatarUrl} alt="" width={av} height={av} className="rounded-full object-cover" style={{ width: av, height: av }} />
          ) : (
            <span
              aria-hidden
              className={`grid place-items-center rounded-full font-display font-semibold ${compact ? "text-xs" : "text-sm"} ${txt}`}
              style={{ width: av, height: av, background: tint }}
            >
              {iniciales(worker.nombre)}
            </span>
          )}
          <span
            aria-hidden
            className={`absolute -bottom-0.5 -right-0.5 rounded-full ${compact ? "h-3 w-3" : "h-3.5 w-3.5"} ${dark ? "ring-ink-900" : "ring-paper"} ring-2`}
            style={{ background: dot }}
          />
        </div>

        {/* Nombre + puesto */}
        <div className="min-w-0 flex-1">
          {selectable ? (
            <button
              type="button"
              onClick={() => onSelect!(worker.id)}
              className={`block max-w-full truncate text-left font-display font-semibold leading-tight after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent ${compact ? "text-sm" : "text-base"} ${txt}`}
            >
              {worker.nombre}
            </button>
          ) : (
            <p className={`truncate font-display font-semibold leading-tight ${compact ? "text-sm" : "text-base"} ${txt}`}>{worker.nombre}</p>
          )}
          {worker.puesto && <p className={`truncate text-xs ${soft}`}>{worker.puesto}</p>}
        </div>

        {/* Menú de acciones (bonus) — z-10 para quedar sobre el área seleccionable */}
        {acciones && acciones.length > 0 && (
          <div className="relative z-10">
            <ActionMenu nombre={worker.nombre} acciones={acciones} dark={dark} />
          </div>
        )}
      </div>

      {/* Estado + geocerco + último fichaje */}
      <div className={`flex flex-wrap items-center gap-x-2.5 gap-y-1.5 ${compact ? "mt-2.5" : "mt-3.5"}`}>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ color: fg, background: tint }}
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
          {S.label}
        </span>
        {nota && <span className={`text-xs ${soft}`}>{nota}</span>}

        <span className={`ml-auto flex items-center gap-x-2.5 gap-y-1 font-mono text-xs ${soft}`}>
          {geo && (
            <span className="inline-flex items-center gap-1 whitespace-nowrap font-sans font-medium" style={{ color: geo.color }}>
              <PinIcon inside={geo.inside} />
              {geo.label}
            </span>
          )}
          {geo && fichaje && <span aria-hidden className="opacity-50">·</span>}
          <span className="whitespace-nowrap">{fichaje ?? "Sin fichajes"}</span>
        </span>
      </div>
    </article>
  );
}
