import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup, within, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import { StpsReportCard } from "./StpsReportCard";

// Limpia el DOM entre tests para evitar que los renders se acumulen.
afterEach(cleanup);

// ─── Fixtures realistas: Full Gas Mérida (empresa de reparto de combustible) ──

const BASE_PROPS = {
  mes: "junio 2026",
  empleados: 24,
  diasRegistrados: 18,
  totalDias: 22,
};

describe("StpsReportCard", () => {
  // ─── CÁLCULO DE COMPLETITUD ─────────────────────────────────────────────────

  it("calcula el porcentaje correcto: 18/22 → 82%", () => {
    const { container } = render(<StpsReportCard {...BASE_PROPS} estado="listo" />);
    expect(within(container).getByText("82%")).toBeTruthy();
  });

  it("calcula 100% cuando diasRegistrados === totalDias", () => {
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} diasRegistrados={22} totalDias={22} estado="listo" />
    );
    expect(within(container).getByText("100%")).toBeTruthy();
  });

  it("calcula 0% cuando diasRegistrados es 0", () => {
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} diasRegistrados={0} estado="incompleto" />
    );
    expect(within(container).getByText("0%")).toBeTruthy();
  });

  it("el texto de días registrados muestra la fracción correcta", () => {
    const { container } = render(<StpsReportCard {...BASE_PROPS} estado="listo" />);
    expect(within(container).getByText(/18 de 22 días registrados/i)).toBeTruthy();
  });

  // ─── COMPORTAMIENTO DEL CTA ─────────────────────────────────────────────────

  it("estado listo: CTA clickeable y llama a onDescargar", () => {
    const onDescargar = vi.fn();
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="listo" onDescargar={onDescargar} />
    );
    const btn = container.querySelector("button");
    expect(btn).toBeTruthy();
    // No tiene aria-disabled en estado listo
    expect(btn!.getAttribute("aria-disabled")).toBeNull();
    fireEvent.click(btn!);
    expect(onDescargar).toHaveBeenCalledTimes(1);
  });

  it("estado generando: CTA con aria-disabled='true' y onDescargar NO se invoca", () => {
    const onDescargar = vi.fn();
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="generando" onDescargar={onDescargar} />
    );
    const btn = container.querySelector("button");
    expect(btn!.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(btn!);
    expect(onDescargar).not.toHaveBeenCalled();
  });

  it("estado incompleto: CTA con aria-disabled='true' y onDescargar NO se invoca", () => {
    const onDescargar = vi.fn();
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="incompleto" onDescargar={onDescargar} />
    );
    const btn = container.querySelector("button");
    expect(btn!.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(btn!);
    expect(onDescargar).not.toHaveBeenCalled();
  });

  // ─── ESTADOS ────────────────────────────────────────────────────────────────

  it("estado listo: renderiza CTA 'Descargar reporte' visible", () => {
    const { container } = render(<StpsReportCard {...BASE_PROPS} estado="listo" />);
    expect(within(container).getByText(/Descargar reporte/i)).toBeTruthy();
  });

  it("estado generando: muestra texto 'Generando reporte…'", () => {
    const { container } = render(<StpsReportCard {...BASE_PROPS} estado="generando" />);
    expect(within(container).getByText(/Generando reporte/i)).toBeTruthy();
  });

  it("estado generando: la barra tiene role=progressbar con aria-valuetext='generando…'", () => {
    const { container } = render(<StpsReportCard {...BASE_PROPS} estado="generando" />);
    const bar = container.querySelector("[role='progressbar']");
    expect(bar).toBeTruthy();
    expect(bar!.getAttribute("aria-valuetext")).toBe("generando…");
  });

  it("estado incompleto: muestra días faltantes en el mensaje", () => {
    // 22 - 18 = 4 días faltantes
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="incompleto" />
    );
    // Puede haber más de una mención de "4 días" (el párrafo de cuerpo y la desc del CTA)
    expect(within(container).getAllByText(/4 días/i).length).toBeGreaterThan(0);
    // El CTA también describe el problema
    expect(within(container).getAllByText(/Faltan 4 días por registrar/i).length).toBeGreaterThan(0);
  });

  it("estado incompleto: la descripción del CTA explica por qué está deshabilitado", () => {
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="incompleto" />
    );
    const btn = container.querySelector("button");
    const descId = btn!.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();
    const desc = container.querySelector(`#${descId}`);
    expect(desc).toBeTruthy();
    expect(desc!.textContent).toMatch(/Faltan/i);
  });

  it("estado error: renderiza role='alert' con mensaje de error", () => {
    const { container } = render(
      <StpsReportCard
        {...BASE_PROPS}
        estado="error"
        mensajeError="No se pudo conectar con el servidor de reportes."
      />
    );
    const alert = container.querySelector<HTMLElement>("[role='alert']");
    expect(alert).toBeTruthy();
    expect(within(alert!).getByText(/No se pudo conectar/i)).toBeTruthy();
  });

  // ─── INCIDENCIAS ────────────────────────────────────────────────────────────

  it("sin incidencias (default): no muestra línea de incidencias", () => {
    const { container } = render(<StpsReportCard {...BASE_PROPS} estado="listo" />);
    expect(within(container).queryByText(/incidencia/i)).toBeNull();
  });

  it("incidencias > 0: muestra conteo con texto (3 incidencias marcadas)", () => {
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="listo" incidencias={3} />
    );
    expect(within(container).getByText(/3 incidencias marcadas/i)).toBeTruthy();
  });

  it("incidencias === 1: muestra singular 'incidencia marcada'", () => {
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="listo" incidencias={1} />
    );
    expect(within(container).getByText(/1 incidencia marcada/i)).toBeTruthy();
  });

  // ─── CONTENIDO BASE ─────────────────────────────────────────────────────────

  it("muestra el mes y número de empleados en la cabecera", () => {
    const { container } = render(<StpsReportCard {...BASE_PROPS} estado="listo" />);
    expect(within(container).getByText(/junio 2026/i)).toBeTruthy();
    expect(within(container).getByText(/24 empleados/i)).toBeTruthy();
  });

  it("muestra la referencia legal Art. 132", () => {
    const { container } = render(<StpsReportCard {...BASE_PROPS} estado="listo" />);
    expect(within(container).getByText(/Art\. 132/i)).toBeTruthy();
  });

  // ─── ACCESIBILIDAD ──────────────────────────────────────────────────────────

  it("axe: 0 violaciones en estado listo", async () => {
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="listo" incidencias={3} onDescargar={() => {}} />
    );
    // jsdom no hace layout/canvas real; el contraste se verifica en el preview vivo
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("axe: 0 violaciones en estado incompleto", async () => {
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="incompleto" incidencias={2} />
    );
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("axe: 0 violaciones en estado generando", async () => {
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="generando" />
    );
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("axe: 0 violaciones en estado error", async () => {
    const { container } = render(
      <StpsReportCard
        {...BASE_PROPS}
        estado="error"
        mensajeError="Error de conexión con el servidor."
      />
    );
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  // ─── TEMA OSCURO ────────────────────────────────────────────────────────────

  it("tema dark: renderiza sin errores y muestra el mes", () => {
    const { container } = render(
      <StpsReportCard {...BASE_PROPS} estado="listo" theme="dark" />
    );
    expect(within(container).getByText(/junio 2026/i)).toBeTruthy();
  });
});
