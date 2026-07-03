import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, within } from "@testing-library/react";
import axe from "axe-core";
import { OvertimeMeter } from "./OvertimeMeter";

// Limpia el DOM entre tests para evitar que los renders se acumulen.
afterEach(cleanup);

// Fixtures realistas: semana con horas extra en una empresa de Mérida.
const BASE = { normal: 40, doble: 4, triple: 2 };

describe("OvertimeMeter", () => {
  it("humo: estado feliz — muestra total, leyenda y horas extra", () => {
    const { container } = render(
      <OvertimeMeter {...BASE} objetivo={48} semanaAnterior={43} />
    );
    const sc = within(container);
    // Total: 40 + 4 + 2 = 46 h
    expect(sc.getByText("46 h")).toBeTruthy();
    // Leyenda de segmentos
    expect(sc.getByText("Normal")).toBeTruthy();
    expect(sc.getByText("Doble")).toBeTruthy();
    expect(sc.getByText("Triple")).toBeTruthy();
    // Texto de horas extra en el subtítulo
    expect(sc.getByText(/6 h de tiempo extra/i)).toBeTruthy();
  });

  it("estado cero horas — muestra mensaje vacío", () => {
    const { container } = render(
      <OvertimeMeter normal={0} doble={0} triple={0} />
    );
    expect(within(container).getByText(/sin horas registradas/i)).toBeTruthy();
  });

  it("solo horas normales — no muestra subtítulo de tiempo extra", () => {
    const { container } = render(
      <OvertimeMeter normal={35} doble={0} triple={0} />
    );
    expect(within(container).queryByText(/tiempo extra/i)).toBeNull();
  });

  it("axe: 0 violaciones en estado feliz", async () => {
    const { container } = render(
      <OvertimeMeter {...BASE} objetivo={48} semanaAnterior={43} />
    );
    // jsdom no hace layout/canvas real; el contraste se verifica en el preview vivo
    // (estándar del proyecto ya cumplido).
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });
});
