import { useState } from "react";
import { MapContainer, TileLayer, Circle, Marker } from "react-leaflet";
import L from "leaflet";
import type { GeofenceFieldProps, GeofenceValue } from "./types";
import { AutoInvalidateSize } from "../shared/AutoInvalidateSize";

const TILES = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};
const ATTR = "&copy; OpenStreetMap &copy; CARTO";

// Pin como divIcon (HTML/SVG, sin assets externos que se rompan con el bundler).
const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" fill="#3a5688" stroke="#fdfdfc" stroke-width="1.5"/>
    <circle cx="12" cy="9" r="2.6" fill="#fdfdfc"/></svg>`,
  iconSize: [30, 30],
  iconAnchor: [15, 28],
});

export function GeofenceField({
  value,
  onChange,
  minRadio = 20,
  maxRadio = 1000,
  disabled = false,
  zoom = 15,
  theme = "light",
}: GeofenceFieldProps) {
  const [dragging, setDragging] = useState(false);
  const dark = theme === "dark";

  const invalid = value.radio < minRadio || value.radio > maxRadio;
  const set = (patch: Partial<GeofenceValue>) => onChange({ ...value, ...patch });
  const areaM2 = Math.round(Math.PI * value.radio * value.radio);

  const fieldBase = `w-full rounded-lg border px-2.5 py-1.5 font-mono text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 ${
    dark ? "border-ink-700 bg-ink-800 text-paper" : "border-line bg-paper text-ink"
  }`;

  return (
    <div className={`overflow-hidden rounded-[14px] border shadow-[0_4px_24px_-12px_rgba(28,28,26,0.18)] ${dark ? "border-ink-700 bg-ink-900" : "border-line bg-paper"} ${disabled ? "opacity-70" : ""}`}>
      {/* Barra superior */}
      <div className={`flex items-center justify-between border-b px-4 py-2.5 ${dark ? "border-ink-700" : "border-line"}`}>
        <h3 className={`font-display text-sm font-semibold ${dark ? "text-paper" : "text-ink"}`}>Editar geocerco</h3>
        <span className={`font-mono text-xs ${dark ? "text-taupe" : "text-ink-soft"}`} aria-live="polite">
          {dragging ? "Arrastrando…" : `Área ≈ ${areaM2.toLocaleString("es-MX")} m²`}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_240px]">
        {/* Mapa con pin arrastrable */}
        <MapContainer center={[value.lat, value.lng]} zoom={zoom} className="h-[320px] w-full" style={{ background: dark ? "#1c1c1a" : "#f6f5f3" }}>
          <AutoInvalidateSize />
          <TileLayer url={dark ? TILES.dark : TILES.light} attribution={ATTR} />
          <Circle center={[value.lat, value.lng]} radius={value.radio} pathOptions={{ color: invalid ? "#b5482f" : "#3a5688", weight: 1.5, fillOpacity: 0.12 }} />
          <Marker
            position={[value.lat, value.lng]}
            draggable={!disabled}
            icon={pinIcon}
            alt="Pin del geocerco"
            keyboard={false}
            eventHandlers={{
              dragstart: () => setDragging(true),
              dragend: (e) => {
                setDragging(false);
                const ll = (e.target as L.Marker).getLatLng();
                set({ lat: +ll.lat.toFixed(6), lng: +ll.lng.toFixed(6) });
              },
            }}
          />
        </MapContainer>

        {/* Controles (form, accesible por teclado) */}
        <div className={`flex flex-col gap-4 border-t p-4 sm:border-l sm:border-t-0 ${dark ? "border-ink-700" : "border-line"}`}>
          {/* Radio: slider + número sincronizados */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gf-radio" className={`text-xs font-medium ${dark ? "text-taupe" : "text-ink-soft"}`}>
              Radio (m)
            </label>
            <input
              id="gf-radio"
              type="range"
              min={minRadio}
              max={maxRadio}
              value={Math.min(Math.max(value.radio, minRadio), maxRadio)}
              disabled={disabled}
              onChange={(e) => set({ radio: Number(e.target.value) })}
              className="accent-accent disabled:opacity-50"
              aria-valuemin={minRadio}
              aria-valuemax={maxRadio}
              aria-valuenow={value.radio}
            />
            <input
              type="number"
              min={minRadio}
              max={maxRadio}
              value={value.radio}
              disabled={disabled}
              aria-label="Radio en metros"
              aria-invalid={invalid}
              aria-describedby={invalid ? "gf-radio-err" : undefined}
              onChange={(e) => set({ radio: Number(e.target.value) })}
              className={`${fieldBase} ${invalid ? "border-terracotta ring-1 ring-terracotta" : ""}`}
            />
            {invalid && (
              <p id="gf-radio-err" role="alert" className="text-xs text-terracotta">
                El radio debe estar entre {minRadio} y {maxRadio} m.
              </p>
            )}
          </div>

          {/* Lat / Lng (acceso por teclado a la ubicación) */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="gf-lat" className={`text-xs font-medium ${dark ? "text-taupe" : "text-ink-soft"}`}>Latitud</label>
              <input id="gf-lat" type="number" step="0.0001" value={value.lat} disabled={disabled} onChange={(e) => set({ lat: Number(e.target.value) })} className={fieldBase} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="gf-lng" className={`text-xs font-medium ${dark ? "text-taupe" : "text-ink-soft"}`}>Longitud</label>
              <input id="gf-lng" type="number" step="0.0001" value={value.lng} disabled={disabled} onChange={(e) => set({ lng: Number(e.target.value) })} className={fieldBase} />
            </div>
          </div>

          <p className={`text-xs ${dark ? "text-taupe" : "text-ink-soft"}`}>
            Arrastra el pin en el mapa o edita los campos.
          </p>
        </div>
      </div>
    </div>
  );
}
