import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, within } from "@testing-library/react";
import axe from "axe-core";
import { KpiStatCard } from "./KpiStatCard";

// Limpia el DOM entre tests para evitar que los renders se acumulen.
afterEach(cleanup);

// Fixtures realistas: métricas de Full Gas Mérida (empresa de distribución en la península).
const BASE = { etiqueta: "Asistencia hoy", valor: 94, formato: "porcentaje" as const };

describe("KpiStatCard — estado feliz", () => {
  it("humo: renderiza etiqueta y valor formateado como porcentaje", () => {
    const { container } = render(<KpiStatCard {...BASE} />);
    const sc = within(container);
    expect(sc.getByText(/asistencia hoy/i)).toBeTruthy();
    expect(sc.getByText("94%")).toBeTruthy();
  });

  it("formato horas — muestra '46 h'", () => {
    const { container } = render(
      <KpiStatCard etiqueta="Horas semana" valor={46} formato="horas" />
    );
    expect(within(container).getByText("46 h")).toBeTruthy();
  });

  it("formato numero con miles — muestra separador es-MX '1,240'", () => {
    const { container } = render(
      <KpiStatCard etiqueta="Checadas totales" valor={1240} formato="numero" />
    );
    // toLocaleString("es-MX") en jsdom produce "1,240"
    expect(within(container).getByText("1,240")).toBeTruthy();
  });

  it("sin delta — no renderiza píldora de tendencia", () => {
    const { container } = render(
      <KpiStatCard etiqueta="Empleados" valor={12} />
    );
    // No debe existir ningún elemento con data-delta-semantica
    expect(container.querySelector("[data-delta-semantica]")).toBeNull();
  });
});

// ── SEMÁNTICA deltaBuenoCuando: los 4 casos obligatorios ─────────────────
// El data-attribute `data-delta-semantica` en la píldora es la fuente de verdad
// de los tests (no los colores computados, que jsdom no resuelve).
describe("KpiStatCard — semántica deltaBuenoCuando (4 casos)", () => {
  it("caso 1: delta +2, deltaBuenoCuando='sube' → bueno (verde ▲)", () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Asistencia hoy"
        valor={94}
        formato="porcentaje"
        delta={2}
        deltaBuenoCuando="sube"
      />
    );
    const pildora = container.querySelector("[data-delta-semantica]");
    expect(pildora).toBeTruthy();
    expect(pildora!.getAttribute("data-delta-semantica")).toBe("bueno");
    // Flecha hacia arriba (signo positivo del delta)
    expect(pildora!.textContent).toContain("▲");
  });

  it("caso 2: delta -2, deltaBuenoCuando='sube' → malo (terracota ▼)", () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Asistencia hoy"
        valor={90}
        formato="porcentaje"
        delta={-2}
        deltaBuenoCuando="sube"
      />
    );
    const pildora = container.querySelector("[data-delta-semantica]");
    expect(pildora).toBeTruthy();
    expect(pildora!.getAttribute("data-delta-semantica")).toBe("malo");
    // Flecha hacia abajo (signo negativo del delta)
    expect(pildora!.textContent).toContain("▼");
  });

  it("caso 3: delta -2, deltaBuenoCuando='baja' → bueno (verde ▼) — retardos que bajan", () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Retardos semana"
        valor={3}
        formato="numero"
        delta={-2}
        deltaBuenoCuando="baja"
      />
    );
    const pildora = container.querySelector("[data-delta-semantica]");
    expect(pildora).toBeTruthy();
    // Delta negativo con deltaBuenoCuando="baja" → BUENO aunque la flecha baje
    expect(pildora!.getAttribute("data-delta-semantica")).toBe("bueno");
    expect(pildora!.textContent).toContain("▼");
  });

  it("caso 4: delta +2, deltaBuenoCuando='baja' → malo (terracota ▲) — retardos que suben", () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Retardos semana"
        valor={5}
        formato="numero"
        delta={2}
        deltaBuenoCuando="baja"
      />
    );
    const pildora = container.querySelector("[data-delta-semantica]");
    expect(pildora).toBeTruthy();
    // Delta positivo con deltaBuenoCuando="baja" → MALO aunque la flecha suba
    expect(pildora!.getAttribute("data-delta-semantica")).toBe("malo");
    expect(pildora!.textContent).toContain("▲");
  });

  it("caso extra: delta 0 → neutro (gris, texto 'Sin cambio', sin flecha)", () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Puntualidad"
        valor={80}
        formato="porcentaje"
        delta={0}
        deltaBuenoCuando="sube"
      />
    );
    const pildora = container.querySelector("[data-delta-semantica]");
    expect(pildora).toBeTruthy();
    expect(pildora!.getAttribute("data-delta-semantica")).toBe("neutro");
    expect(within(pildora as HTMLElement).getByText(/sin cambio/i)).toBeTruthy();
    // Sin flecha
    expect(pildora!.textContent).not.toContain("▲");
    expect(pildora!.textContent).not.toContain("▼");
  });
});

// ── Estados ───────────────────────────────────────────────────────────────
describe("KpiStatCard — estados", () => {
  it("cargando — muestra aria-busy='true'", () => {
    const { container } = render(
      <KpiStatCard etiqueta="Asistencia hoy" valor={0} estado="cargando" />
    );
    expect(container.querySelector("[aria-busy='true']")).toBeTruthy();
  });

  it("cargando — no muestra valor numérico", () => {
    const { container } = render(
      <KpiStatCard etiqueta="Asistencia hoy" valor={94} estado="cargando" />
    );
    // El valor "94" no debe estar en el DOM
    expect(within(container).queryByText("94")).toBeNull();
  });

  it("error — muestra mensajeError y no el valor", () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Horas semana"
        valor={0}
        estado="error"
        mensajeError="Sin datos de nómina"
      />
    );
    const sc = within(container);
    expect(sc.getByText(/sin datos de nómina/i)).toBeTruthy();
    // Sin valor numérico
    expect(sc.queryByText(/\d h/)).toBeNull();
  });

  it("error sin mensajeError — muestra texto genérico", () => {
    const { container } = render(
      <KpiStatCard etiqueta="Empleados" valor={0} estado="error" />
    );
    expect(within(container).getByText(/error al cargar/i)).toBeTruthy();
  });
});

// ── Tendencia / periodo ────────────────────────────────────────────────────
describe("KpiStatCard — texto de periodo", () => {
  it("periodo por defecto es 'vs semana pasada'", () => {
    const { container } = render(
      <KpiStatCard etiqueta="Asistencia hoy" valor={94} formato="porcentaje" delta={2} />
    );
    expect(within(container).getByText(/vs semana pasada/i)).toBeTruthy();
  });

  it("periodo personalizable", () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Asistencia hoy"
        valor={94}
        formato="porcentaje"
        delta={2}
        periodo="vs ayer"
      />
    );
    expect(within(container).getByText(/vs ayer/i)).toBeTruthy();
  });
});

// ── Temas ────────────────────────────────────────────────────────────────
describe("KpiStatCard — temas", () => {
  it("light: el article existe y tiene la etiqueta", () => {
    const { container } = render(
      <KpiStatCard {...BASE} theme="light" />
    );
    expect(within(container).getByText(/asistencia hoy/i)).toBeTruthy();
  });

  it("dark: el article existe y tiene la etiqueta", () => {
    const { container } = render(
      <KpiStatCard {...BASE} theme="dark" />
    );
    expect(within(container).getByText(/asistencia hoy/i)).toBeTruthy();
  });
});

// ── Accesibilidad ──────────────────────────────────────────────────────────
describe("KpiStatCard — accesibilidad axe", () => {
  it("estado feliz con delta → 0 violaciones axe", async () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Asistencia hoy"
        valor={94}
        formato="porcentaje"
        delta={2}
        deltaBuenoCuando="sube"
        periodo="vs semana pasada"
      />
    );
    // jsdom no hace layout/canvas real; el contraste se verifica en el preview vivo
    // (estándar del proyecto ya cumplido).
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("aria-label del article describe etiqueta + valor + tendencia en español", () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Asistencia hoy"
        valor={94}
        formato="porcentaje"
        delta={2}
        deltaBuenoCuando="sube"
        periodo="vs semana pasada"
      />
    );
    const article = container.querySelector("article");
    expect(article).toBeTruthy();
    const label = article!.getAttribute("aria-label") ?? "";
    // Debe mencionar la etiqueta
    expect(label.toLowerCase()).toContain("asistencia hoy");
    // Debe mencionar el valor
    expect(label).toContain("94");
    // Debe mencionar la tendencia ("mejora" dado delta positivo con sube)
    expect(label.toLowerCase()).toContain("mejora");
  });

  it("estado cargando → 0 violaciones axe", async () => {
    const { container } = render(
      <KpiStatCard etiqueta="Asistencia hoy" valor={0} estado="cargando" />
    );
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("estado error → 0 violaciones axe", async () => {
    const { container } = render(
      <KpiStatCard
        etiqueta="Horas semana"
        valor={0}
        estado="error"
        mensajeError="Sin datos"
      />
    );
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });
});
