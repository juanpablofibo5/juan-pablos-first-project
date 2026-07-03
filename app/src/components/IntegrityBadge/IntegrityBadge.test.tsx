import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, within } from "@testing-library/react";
import axe from "axe-core";
import { IntegrityBadge } from "./IntegrityBadge";
import type { IntegritySignal } from "./types";

// Limpia el DOM entre tests para evitar que los renders se acumulen.
afterEach(cleanup);

// Fixtures realistas: checada de empleado en sucursal de Mérida.
const SEÑALES_OK: IntegritySignal[] = [
  { key: "geocerca", label: "Dentro de la geocerca", status: "ok", detalle: "a 12 m del centro" },
  { key: "tiempo", label: "Dentro del horario", status: "ok" },
  { key: "identidad", label: "Identificación confirmada", status: "ok" },
];

const SEÑALES_MIXTAS: IntegritySignal[] = [
  { key: "geocerca", label: "Dentro de la geocerca", status: "ok", detalle: "a 8 m del centro" },
  { key: "gps", label: "Señal GPS", status: "alerta", detalle: "precisión 52 m" },
  { key: "identidad", label: "Identificación confirmada", status: "falla" },
];

const TS = new Date("2025-06-15T09:07:00-06:00").getTime();

describe("IntegrityBadge", () => {
  it("humo: estado feliz — muestra nivel Verificado y nombre del empleado", () => {
    const { container } = render(
      <IntegrityBadge
        señales={SEÑALES_OK}
        empleado="Rosa María Dzul"
        sucursal="Sucursal Centro, Mérida"
        tipo="entrada"
        timestamp={TS}
        folio="KLK-2025-0042"
      />
    );
    const sc = within(container);
    expect(sc.getAllByText(/verificado/i).length).toBeGreaterThan(0);
    expect(sc.getByText(/Rosa María Dzul/i)).toBeTruthy();
    expect(sc.getByText(/Sucursal Centro, Mérida/i)).toBeTruthy();
  });

  it("señales mixtas — nivel Sospechoso (falla presente)", () => {
    const { container } = render(
      <IntegrityBadge señales={SEÑALES_MIXTAS} empleado="Juan Pérez" />
    );
    // aria-label del article incluye "Sospechoso"
    expect(within(container).getAllByText(/sospechoso/i).length).toBeGreaterThan(0);
  });

  it("estado cargando — muestra aria-busy", () => {
    const { container } = render(
      <IntegrityBadge señales={[]} estado="cargando" />
    );
    expect(container.querySelector("[aria-busy='true']")).toBeTruthy();
  });

  it("estado vacío — muestra mensaje sin datos", () => {
    const { container } = render(
      <IntegrityBadge señales={[]} estado="vacio" />
    );
    expect(within(container).getByText(/no hay señales/i)).toBeTruthy();
  });

  it("axe: 0 violaciones en estado feliz", async () => {
    const { container } = render(
      <IntegrityBadge
        señales={SEÑALES_OK}
        empleado="Rosa María Dzul"
        sucursal="Sucursal Centro, Mérida"
        tipo="entrada"
        timestamp={TS}
      />
    );
    // jsdom no hace layout/canvas real; el contraste se verifica en el preview vivo
    // (estándar del proyecto ya cumplido).
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });
});
