import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup, within } from "@testing-library/react";
import axe from "axe-core";
import { WorkerStatusCard } from "./WorkerStatusCard";
import type { Worker } from "./types";

// Limpia el DOM entre tests para evitar que los renders se acumulen.
afterEach(cleanup);

// Fixtures realistas: trabajador en empresa de Mérida.
const WORKER: Worker = {
  id: "w-001",
  nombre: "Citlali Canul Moo",
  puesto: "Cajera",
};

const TS_RECIENTE = Date.now() - 5 * 60 * 1000; // hace 5 min

describe("WorkerStatusCard", () => {
  it("humo: estado presente — muestra nombre, puesto y badge de estado", () => {
    const { container } = render(
      <WorkerStatusCard
        worker={WORKER}
        status="presente"
        lastCheckin={TS_RECIENTE}
        insideGeofence={true}
        nota="Turno matutino"
      />
    );
    const sc = within(container);
    expect(sc.getByText(/Citlali Canul Moo/i)).toBeTruthy();
    expect(sc.getByText(/Cajera/i)).toBeTruthy();
    expect(sc.getByText(/Presente/i)).toBeTruthy();
    expect(sc.getByText(/Dentro/i)).toBeTruthy();
  });

  it("estado retardo — muestra badge Retardo y nota", () => {
    const { container } = render(
      <WorkerStatusCard
        worker={WORKER}
        status="retardo"
        nota="14 min tarde"
        insideGeofence={false}
      />
    );
    const sc = within(container);
    expect(sc.getByText(/Retardo/i)).toBeTruthy();
    expect(sc.getByText(/14 min tarde/i)).toBeTruthy();
    expect(sc.getByText(/Fuera/i)).toBeTruthy();
  });

  it("sin lastCheckin — muestra 'Sin fichajes'", () => {
    const { container } = render(
      <WorkerStatusCard worker={WORKER} status="sin_datos" />
    );
    expect(within(container).getByText(/Sin fichajes/i)).toBeTruthy();
  });

  it("onSelect — click en nombre llama al callback", () => {
    const onSelect = vi.fn();
    const { container } = render(
      <WorkerStatusCard
        worker={WORKER}
        status="presente"
        onSelect={onSelect}
      />
    );
    within(container)
      .getByRole("button", { name: /Citlali Canul Moo/i })
      .click();
    expect(onSelect).toHaveBeenCalledWith("w-001");
  });

  it("axe: 0 violaciones en estado feliz", async () => {
    const { container } = render(
      <WorkerStatusCard
        worker={WORKER}
        status="presente"
        lastCheckin={TS_RECIENTE}
        insideGeofence={true}
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
