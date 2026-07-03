/**
 * GeofenceField — tests en jsdom.
 *
 * ESTRATEGIA: react-leaflet usa canvas/WebGL que jsdom no provee.
 * Mockeamos:
 *   - react-leaflet: MapContainer como div stub, resto null, useMap con no-ops.
 *   - AutoInvalidateSize: null (usa ResizeObserver que jsdom no implementa).
 *   - leaflet: divIcon/icon como stubs.
 * Verificamos que los controles numéricos (lat, lng, radio, slider)
 * y el botón "Centrar en el pin" rendericen correctamente.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup, within } from "@testing-library/react";
import axe from "axe-core";
import { GeofenceField } from "./GeofenceField";
import type { GeofenceValue } from "./types";

// AutoInvalidateSize usa ResizeObserver que jsdom no implementa.
vi.mock("../shared/AutoInvalidateSize", () => ({
  AutoInvalidateSize: () => null,
}));

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="map-stub">{children}</div>
  ),
  TileLayer: () => null,
  Circle: () => null,
  Marker: () => null,
  useMap: () => ({
    flyTo: vi.fn(),
    setView: vi.fn(),
    getZoom: () => 15,
  }),
}));

vi.mock("leaflet", () => ({
  default: {
    divIcon: () => ({}),
    icon: () => ({}),
  },
}));

// Limpia el DOM entre tests para evitar que los renders se acumulen.
afterEach(cleanup);

// Fixture realista: sucursal en el centro de Mérida, Yucatán.
const VALUE: GeofenceValue = {
  lat: 20.9674,
  lng: -89.6233,
  radio: 150,
};

describe("GeofenceField", () => {
  it("humo: muestra encabezado, campos numéricos y slider", () => {
    const { container } = render(
      <GeofenceField value={VALUE} onChange={vi.fn()} />
    );
    const sc = within(container);
    expect(sc.getByText(/Editar geocerco/i)).toBeTruthy();
    expect(sc.getByRole("slider")).toBeTruthy();
    expect(sc.getByLabelText(/Radio en metros/i)).toBeTruthy();
    expect(sc.getByLabelText(/Latitud/i)).toBeTruthy();
    expect(sc.getByLabelText(/Longitud/i)).toBeTruthy();
  });

  it("muestra el área calculada en m²", () => {
    const { container } = render(
      <GeofenceField value={VALUE} onChange={vi.fn()} />
    );
    // El componente muestra "Área ≈ X m²"
    expect(within(container).getByText(/Área ≈/i)).toBeTruthy();
  });

  it("radio inválido — muestra mensaje de error con role=alert", () => {
    const { container } = render(
      <GeofenceField
        value={{ ...VALUE, radio: 5 }}
        onChange={vi.fn()}
        minRadio={20}
      />
    );
    expect(within(container).getByRole("alert")).toBeTruthy();
  });

  it("disabled — el slider y los inputs quedan deshabilitados", () => {
    const { container } = render(
      <GeofenceField value={VALUE} onChange={vi.fn()} disabled />
    );
    const sc = within(container);
    expect((sc.getByRole("slider") as HTMLInputElement).disabled).toBe(true);
    const spinbuttons = sc.getAllByRole("spinbutton");
    spinbuttons.forEach((inp) => {
      expect((inp as HTMLInputElement).disabled).toBe(true);
    });
  });

  it("botón 'Centrar en el pin' renderiza", () => {
    const { container } = render(
      <GeofenceField value={VALUE} onChange={vi.fn()} />
    );
    expect(
      within(container).getByRole("button", { name: /Centrar en el pin/i })
    ).toBeTruthy();
  });

  it("axe: 0 violaciones en estado feliz", async () => {
    const { container } = render(
      <GeofenceField value={VALUE} onChange={vi.fn()} />
    );
    // jsdom no hace layout/canvas real; el contraste se verifica en el preview vivo
    // (estándar del proyecto ya cumplido).
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });
});
