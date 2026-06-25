import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, CircleMarker, Tooltip, useMap } from "react-leaflet";
import type { LocationsMapProps, MapPoint, PointStatus } from "./types";
import { AutoInvalidateSize } from "../shared/AutoInvalidateSize";

// Estado del punto: SIEMPRE con etiqueta de texto, nunca solo color (accesibilidad).
const STATUS: Record<PointStatus, { label: string; color: string }> = {
  activo: { label: "Activo", color: "#4b7a5a" },
  inactivo: { label: "Inactivo", color: "#8f8c84" },
  incidencia: { label: "Incidencia", color: "#b5482f" },
};
const ORDER: PointStatus[] = ["activo", "inactivo", "incidencia"];

const TILES = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};
const ATTR = "&copy; OpenStreetMap &copy; CARTO";

/** Marco con altura, marco y barra superior (reusado por todos los estados). */
function Shell({ theme, children }: { theme: "light" | "dark"; children: React.ReactNode }) {
  const dark = theme === "dark";
  return (
    <div
      className={`overflow-hidden rounded-[14px] border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${
        dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-3 border-b px-4 py-2.5 ${
          dark ? "border-ink-700" : "border-line"
        }`}
      >
        <h3 className={`font-display text-sm font-semibold ${dark ? "text-paper" : "text-ink"}`}>Ubicaciones</h3>
        <ul className="flex items-center gap-3" aria-label="Leyenda de estados">
          {ORDER.map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: STATUS[s].color }} aria-hidden />
              <span className={`font-mono text-xs ${dark ? "text-taupe" : "text-ink"}`}>{STATUS[s].label}</span>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
}

/** Cuerpo centrado para estados no-mapa. */
function Centered({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex h-[380px] items-center justify-center ${dark ? "bg-ink-900 text-taupe" : "bg-paper-2 text-ink-soft"}`}>
      {children}
    </div>
  );
}

/** Mueve el mapa suavemente al punto seleccionado. */
function FlyToSelected({ points, selectedId }: { points: MapPoint[]; selectedId?: string }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const p = points.find((x) => x.id === selectedId);
    if (p) map.flyTo([p.lat, p.lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
  }, [selectedId, points, map]);
  return null;
}

/** Botón de acción del componente. */
function ActionButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-paper shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      {children}
    </button>
  );
}

export function LocationsMap({
  points,
  onSelectPoint,
  selectedId,
  center,
  zoom = 13,
  theme = "light",
  loading = false,
  error,
  onRetry,
  onAddLocation,
}: LocationsMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const dark = theme === "dark";

  // --- ESTADO: cargando ---
  if (loading) {
    return (
      <Shell theme={theme}>
        <div
          role="status"
          aria-busy="true"
          aria-label="Cargando ubicaciones"
          className="grid h-[380px] grid-cols-1 sm:grid-cols-[220px_1fr]"
        >
          <div className={`hidden flex-col gap-3 border-r p-3 sm:flex ${dark ? "border-ink-700" : "border-line"}`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <div className="klk-skeleton h-2.5 w-2.5 rounded-full" />
                <div className="klk-skeleton h-3 flex-1" />
              </div>
            ))}
          </div>
          <div className="klk-skeleton h-full w-full" />
        </div>
      </Shell>
    );
  }

  // --- ESTADO: error ---
  if (error) {
    return (
      <Shell theme={theme}>
        <Centered dark={dark}>
          <div role="alert" className="flex max-w-xs flex-col items-center gap-3 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden className="text-terracotta">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
              <path d="M12 7.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>
            <div>
              <p className="font-display font-semibold">No se pudo cargar el mapa</p>
              <p className="mt-1 text-sm opacity-80">{error}</p>
            </div>
            {onRetry && <ActionButton onClick={onRetry}>Reintentar</ActionButton>}
          </div>
        </Centered>
      </Shell>
    );
  }

  // --- ESTADO: sin puntos ---
  if (points.length === 0) {
    return (
      <Shell theme={theme}>
        <Centered dark={dark}>
          <div className="flex max-w-xs flex-col items-center gap-3 text-center">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden className="text-accent">
              <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2.5" opacity="0.55" />
              <circle cx="12" cy="10" r="2.2" fill="currentColor" opacity="0.55" />
            </svg>
            <div>
              <p className="font-display font-semibold">Aún no hay ubicaciones</p>
              <p className="mt-1 text-sm opacity-80">Agrega tu primera sucursal para verla en el mapa.</p>
            </div>
            {onAddLocation && <ActionButton onClick={onAddLocation}>Agregar ubicación</ActionButton>}
          </div>
        </Centered>
      </Shell>
    );
  }

  const mapCenter: [number, number] = center ?? [points[0].lat, points[0].lng];

  return (
    <Shell theme={theme}>
      <div className="grid h-[380px] grid-cols-1 sm:grid-cols-[220px_1fr]">
        {/* Lista accesible: navegable por teclado, estado por texto (no solo color). */}
        <ul
          role="list"
          aria-label="Lista de ubicaciones"
          className={`hidden overflow-y-auto border-r sm:block ${dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"}`}
        >
          {points.map((p) => {
            const active = selectedId === p.id;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onSelectPoint?.(p.id)}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-pressed={active}
                  className={`flex w-full items-center gap-2 border-b px-3 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                    dark ? "border-ink-800 text-paper" : "border-line text-ink"
                  } ${active ? (dark ? "bg-ink-800" : "bg-accent-soft/40") : "hover:bg-taupe/15"}`}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: STATUS[p.estado].color }} aria-hidden />
                  <span className="flex-1 truncate text-sm font-medium">{p.nombre}</span>
                  <span className={`font-mono text-xs ${dark ? "text-taupe" : "text-ink"}`}>{STATUS[p.estado].label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mapa */}
        <MapContainer center={mapCenter} zoom={zoom} className="h-full w-full" style={{ background: dark ? "#1c1c1a" : "#f6f5f3" }}>
          <AutoInvalidateSize />
          <FlyToSelected points={points} selectedId={selectedId} />
          <TileLayer url={dark ? TILES.dark : TILES.light} attribution={ATTR} />
          {points.map((p) => {
            const active = selectedId === p.id || hoveredId === p.id;
            const { color, label } = STATUS[p.estado];
            return (
              <div key={p.id}>
                {/* Geocerco en metros: se escala solo con el zoom. */}
                <Circle
                  center={[p.lat, p.lng]}
                  radius={p.radio}
                  pathOptions={{ color, weight: 1, fillOpacity: active ? 0.18 : 0.08, className: p.estado === "incidencia" ? "klk-pulse" : "" }}
                />
                <CircleMarker
                  center={[p.lat, p.lng]}
                  radius={active ? 11 : 8}
                  pathOptions={{ color: dark ? "#1c1c1a" : "#fdfdfc", weight: 2, fillColor: color, fillOpacity: 1 }}
                  eventHandlers={{
                    click: () => onSelectPoint?.(p.id),
                    mouseover: () => setHoveredId(p.id),
                    mouseout: () => setHoveredId(null),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -8]}>
                    <span className="font-medium">{p.nombre}</span> — {label}
                  </Tooltip>
                </CircleMarker>
              </div>
            );
          })}
        </MapContainer>
      </div>
    </Shell>
  );
}
