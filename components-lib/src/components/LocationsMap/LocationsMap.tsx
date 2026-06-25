import { useState } from "react";
import { MapContainer, TileLayer, Circle, CircleMarker, Tooltip } from "react-leaflet";
import type { LocationsMapProps, PointStatus } from "./types";

// Estado del punto: SIEMPRE con etiqueta de texto, nunca solo color (accesibilidad).
const STATUS: Record<PointStatus, { label: string; color: string }> = {
  activo: { label: "Activo", color: "#16a34a" },
  inactivo: { label: "Inactivo", color: "#9ca3af" },
  incidencia: { label: "Incidencia", color: "#d97706" },
};

const TILES = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};
const ATTR = '&copy; OpenStreetMap &copy; CARTO';

/** Contenedor con la altura y el marco del componente (reusado por todos los estados). */
function Frame({ theme, children }: { theme: "light" | "dark"; children: React.ReactNode }) {
  const dark = theme === "dark";
  return (
    <div
      className={`flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border ${
        dark ? "border-neutral-700 bg-neutral-900 text-neutral-300" : "border-neutral-200 bg-neutral-50 text-neutral-600"
      }`}
    >
      {children}
    </div>
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
}: LocationsMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const dark = theme === "dark";

  // --- ESTADO: cargando ---
  if (loading) {
    return (
      <Frame theme={theme}>
        <div role="status" aria-busy="true" className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="text-sm">Cargando mapa…</span>
        </div>
      </Frame>
    );
  }

  // --- ESTADO: error ---
  if (error) {
    return (
      <Frame theme={theme}>
        <div role="alert" className="flex max-w-xs flex-col items-center gap-2 text-center">
          <span aria-hidden className="text-2xl">⚠️</span>
          <p className="font-medium">No se pudo cargar el mapa</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </Frame>
    );
  }

  // --- ESTADO: sin puntos ---
  if (points.length === 0) {
    return (
      <Frame theme={theme}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span aria-hidden className="text-2xl">📍</span>
          <p className="font-medium">Aún no hay ubicaciones</p>
          <p className="text-sm opacity-80">Agrega un punto para verlo en el mapa.</p>
        </div>
      </Frame>
    );
  }

  const mapCenter: [number, number] = center ?? [points[0].lat, points[0].lng];

  return (
    <div className={`grid h-[420px] w-full grid-cols-1 overflow-hidden rounded-xl border sm:grid-cols-[220px_1fr] ${dark ? "border-neutral-700" : "border-neutral-200"}`}>
      {/* Lista accesible: navegable por teclado, estado por texto (no solo color). */}
      <ul
        role="list"
        aria-label="Ubicaciones"
        className={`hidden overflow-y-auto sm:block ${dark ? "bg-neutral-900" : "bg-white"}`}
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
                className={`flex w-full items-center gap-2 border-b px-3 py-2.5 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${
                  dark ? "border-neutral-800 text-neutral-200" : "border-neutral-100 text-neutral-800"
                } ${active ? (dark ? "bg-neutral-800" : "bg-blue-50") : "hover:bg-neutral-500/10"}`}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: STATUS[p.estado].color }} aria-hidden />
                <span className="flex-1 truncate font-medium">{p.nombre}</span>
                <span className="text-xs opacity-70">{STATUS[p.estado].label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Mapa */}
      <MapContainer center={mapCenter} zoom={zoom} className="h-full w-full" style={{ background: dark ? "#171717" : "#f5f5f5" }}>
        <TileLayer url={dark ? TILES.dark : TILES.light} attribution={ATTR} />
        {points.map((p) => {
          const active = selectedId === p.id || hoveredId === p.id;
          const { color, label } = STATUS[p.estado];
          return (
            <div key={p.id}>
              {/* Geocerco en metros: se escala solo con el zoom. */}
              <Circle center={[p.lat, p.lng]} radius={p.radio} pathOptions={{ color, weight: 1, fillOpacity: active ? 0.18 : 0.08 }} />
              <CircleMarker
                center={[p.lat, p.lng]}
                radius={active ? 11 : 8}
                pathOptions={{ color: "#fff", weight: 2, fillColor: color, fillOpacity: 1 }}
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
  );
}
