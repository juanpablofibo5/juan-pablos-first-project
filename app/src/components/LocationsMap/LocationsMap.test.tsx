/**
 * LocationsMap — tests en jsdom.
 *
 * ESTRATEGIA: react-leaflet usa canvas y WebGL que jsdom no provee.
 * Sólo probamos los estados que NO montan MapContainer:
 *   - loading (skeleton)
 *   - error
 *   - sin puntos (vacío)
 *
 * El estado con mapa real se verifica en el preview vivo (/componentes).
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup, within } from "@testing-library/react";
import axe from "axe-core";
import { LocationsMap } from "./LocationsMap";

// AutoInvalidateSize usa ResizeObserver que jsdom no implementa.
vi.mock("../shared/AutoInvalidateSize", () => ({
  AutoInvalidateSize: () => null,
}));

// Stub de react-leaflet y leaflet para que jsdom no reviente.
vi.mock("react-leaflet", () => ({
  MapContainer: () => null,
  TileLayer: () => null,
  Circle: () => null,
  CircleMarker: () => null,
  Marker: () => null,
  Tooltip: () => null,
  useMap: () => ({ flyTo: vi.fn(), getZoom: () => 13 }),
}));
vi.mock("react-leaflet-cluster", () => ({ default: () => null }));
vi.mock("leaflet", () => ({
  default: {
    divIcon: () => ({}),
    icon: () => ({}),
  },
}));

// Limpia el DOM entre tests para evitar que los renders se acumulen.
afterEach(cleanup);

describe("LocationsMap", () => {
  it("estado cargando — muestra aria-busy y label de carga", () => {
    const { container } = render(<LocationsMap points={[]} loading />);
    const busy = container.querySelector("[aria-busy='true']");
    expect(busy).toBeTruthy();
    expect(busy?.getAttribute("aria-label")).toMatch(/cargando/i);
  });

  it("estado error — muestra role=alert, mensaje y botón Reintentar", () => {
    const onRetry = vi.fn();
    const { container } = render(
      <LocationsMap
        points={[]}
        error="No se pudo conectar con el servidor de mapas"
        onRetry={onRetry}
      />
    );
    const sc = within(container);
    expect(sc.getByRole("alert")).toBeTruthy();
    expect(
      sc.getByText(/No se pudo conectar con el servidor de mapas/i)
    ).toBeTruthy();
    const btn = sc.getByRole("button", { name: /Reintentar/i });
    expect(btn).toBeTruthy();
    btn.click();
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("sin puntos — muestra mensaje vacío y botón Agregar ubicación", () => {
    const onAdd = vi.fn();
    const { container } = render(
      <LocationsMap points={[]} onAddLocation={onAdd} />
    );
    const sc = within(container);
    expect(sc.getByText(/Aún no hay ubicaciones/i)).toBeTruthy();
    const btn = sc.getByRole("button", { name: /Agregar ubicación/i });
    btn.click();
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("axe: 0 violaciones en estado sin puntos", async () => {
    const { container } = render(<LocationsMap points={[]} />);
    // jsdom no hace layout/canvas real; el contraste se verifica en el preview vivo
    // (estándar del proyecto ya cumplido).
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });
});
