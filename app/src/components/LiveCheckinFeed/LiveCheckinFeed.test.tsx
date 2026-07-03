import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, within } from "@testing-library/react";
import axe from "axe-core";
import { LiveCheckinFeed } from "./LiveCheckinFeed";
import type { CheckinEvent } from "./types";

// Limpia el DOM entre tests para evitar que los renders se acumulen.
afterEach(cleanup);

// Fixtures realistas: fichajes de empleados en Mérida.
const NOW = Date.now();
const EVENTS: CheckinEvent[] = [
  {
    id: "ev-001",
    empleado: "Rosa María Dzul",
    tipo: "entrada",
    estado: "a_tiempo",
    timestamp: NOW - 2 * 60 * 1000,
    sucursal: "Sucursal Centro",
  },
  {
    id: "ev-002",
    empleado: "Jorge Chablé",
    tipo: "entrada",
    estado: "retardo",
    timestamp: NOW - 18 * 60 * 1000,
    sucursal: "Sucursal Norte",
  },
  {
    id: "ev-003",
    empleado: "Karla Tzuc",
    tipo: "salida",
    estado: "a_tiempo",
    timestamp: NOW - 45 * 60 * 1000,
    sucursal: "Sucursal Centro",
  },
];

describe("LiveCheckinFeed", () => {
  it("humo: estado feliz — muestra encabezado y empleados", () => {
    const { container } = render(<LiveCheckinFeed events={EVENTS} />);
    const sc = within(container);
    expect(sc.getByText(/Fichajes en vivo/i)).toBeTruthy();
    // El componente repite el nombre en sr-only; usamos getAllByText.
    expect(sc.getAllByText(/Rosa María Dzul/i).length).toBeGreaterThan(0);
    expect(sc.getAllByText(/Jorge Chablé/i).length).toBeGreaterThan(0);
    expect(sc.getAllByText(/Karla Tzuc/i).length).toBeGreaterThan(0);
  });

  it("estado cargando — muestra aria-busy", () => {
    const { container } = render(<LiveCheckinFeed events={[]} loading />);
    expect(container.querySelector("[aria-busy='true']")).toBeTruthy();
  });

  it("estado error — muestra role=alert y mensaje", () => {
    const { container } = render(
      <LiveCheckinFeed events={[]} error="Sin conexión al servidor" />
    );
    const sc = within(container);
    expect(sc.getByRole("alert")).toBeTruthy();
    expect(sc.getByText(/Sin conexión al servidor/i)).toBeTruthy();
  });

  it("lista vacía — muestra mensaje vacío", () => {
    const { container } = render(<LiveCheckinFeed events={[]} />);
    expect(within(container).getByText(/Sin fichajes por ahora/i)).toBeTruthy();
  });

  it("axe: 0 violaciones en estado feliz", async () => {
    const { container } = render(<LiveCheckinFeed events={EVENTS} />);
    // jsdom no hace layout/canvas real; el contraste se verifica en el preview vivo
    // (estándar del proyecto ya cumplido).
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });
});
