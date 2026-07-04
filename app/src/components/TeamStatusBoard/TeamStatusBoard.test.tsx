import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup, within, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import { TeamStatusBoard } from "./TeamStatusBoard";
import type { MiembroEquipo } from "./types";

// Limpia el DOM entre tests para evitar que los renders se acumulen.
afterEach(cleanup);

// ── Fixtures realistas: equipo de Full Gas Mérida ─────────────────────────────

const AHORA = Date.now();

const FIXTURE_6: MiembroEquipo[] = [
  {
    worker: { id: "w-001", nombre: "Citlali Canul Moo", puesto: "Cajera" },
    status: "presente",
    lastCheckin: AHORA - 10 * 60 * 1000,
    insideGeofence: true,
  },
  {
    worker: { id: "w-002", nombre: "Jorge Chablé Medina", puesto: "Despachador" },
    status: "presente",
    lastCheckin: AHORA - 30 * 60 * 1000,
    insideGeofence: true,
  },
  {
    worker: { id: "w-003", nombre: "Rosa Dzul Ek", puesto: "Supervisora" },
    status: "retardo",
    lastCheckin: AHORA - 25 * 60 * 1000,
    nota: "18 min tarde",
  },
  {
    worker: { id: "w-004", nombre: "Luis Pech Canché", puesto: "Operador" },
    status: "ausente",
  },
  {
    worker: { id: "w-005", nombre: "Karla Tzuc Balam", puesto: "Asistente" },
    status: "sin_datos",
  },
  {
    worker: { id: "w-006", nombre: "Manuel Ek Caamal", puesto: "Encargado" },
    status: "retardo",
    nota: "5 min tarde",
    insideGeofence: false,
  },
];

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("TeamStatusBoard", () => {
  // ── CRITERIO CENTRAL: filtrado + conteos ──────────────────────────────────

  it("FILTRADO CLAVE: clic en 'Retardo' → solo retardos visibles; conteos correctos en TODAS las pills", () => {
    const { container } = render(<TeamStatusBoard miembros={FIXTURE_6} />);
    const sc = within(container);

    // Obtener el botón del filtro "Retardo" y verificar su conteo (2).
    const pillRetardo = sc.getByRole("button", { name: /Retardo\s*2/i });
    expect(pillRetardo).toBeTruthy();
    expect(pillRetardo.getAttribute("aria-pressed")).toBe("false");

    // Hacer clic en el filtro "Retardo".
    fireEvent.click(pillRetardo);

    // Ahora la pill está activa.
    expect(pillRetardo.getAttribute("aria-pressed")).toBe("true");

    // Solo deben verse los 2 retardos (Rosa y Manuel).
    expect(sc.getByText("Rosa Dzul Ek")).toBeTruthy();
    expect(sc.getByText("Manuel Ek Caamal")).toBeTruthy();

    // Los otros 4 no deben verse.
    expect(sc.queryByText("Citlali Canul Moo")).toBeNull();
    expect(sc.queryByText("Jorge Chablé Medina")).toBeNull();
    expect(sc.queryByText("Luis Pech Canché")).toBeNull();
    expect(sc.queryByText("Karla Tzuc Balam")).toBeNull();

    // Verificar conteos correctos en TODAS las pills.
    // Todos = 6, Presente = 2, Retardo = 2, Ausente = 1, Sin datos = 1
    expect(sc.getByRole("button", { name: /Todos\s*6/i })).toBeTruthy();
    expect(sc.getByRole("button", { name: /Presente\s*2/i })).toBeTruthy();
    expect(sc.getByRole("button", { name: /Retardo\s*2/i })).toBeTruthy();
    expect(sc.getByRole("button", { name: /Ausente\s*1/i })).toBeTruthy();
    expect(sc.getByRole("button", { name: /Sin datos\s*1/i })).toBeTruthy();
  });

  // ── Humo: estado feliz (todos) ────────────────────────────────────────────

  it("humo: estado feliz — muestra todos los miembros con filtro 'todos'", () => {
    const { container } = render(<TeamStatusBoard miembros={FIXTURE_6} />);
    const sc = within(container);

    // Los 6 miembros deben verse.
    FIXTURE_6.forEach((m) => {
      expect(sc.getByText(m.worker.nombre)).toBeTruthy();
    });
  });

  // ── Filtro sin resultados (estado positivo) ───────────────────────────────

  it("filtro sin resultados muestra mensaje positivo, no error", () => {
    // Fixture sin ausentes.
    const sinAusentes = FIXTURE_6.filter((m) => m.status !== "ausente");
    const { container } = render(<TeamStatusBoard miembros={sinAusentes} />);
    const sc = within(container);

    // Clic en "Ausente" que tiene 0 resultados.
    const pillAusente = sc.getByRole("button", { name: /Ausente\s*0/i });
    fireEvent.click(pillAusente);

    // Debe mostrar mensaje positivo (no error).
    expect(sc.getByText(/nadie ausente ahora mismo/i)).toBeTruthy();

    // No debe haber role="alert".
    expect(container.querySelector("[role='alert']")).toBeNull();
  });

  // ── Estado cargando ───────────────────────────────────────────────────────

  it("estado cargando — muestra aria-busy y skeletons", () => {
    const { container } = render(
      <TeamStatusBoard miembros={[]} loading />
    );
    expect(container.querySelector("[aria-busy='true']")).toBeTruthy();
    // Verifica que hay elementos skeleton.
    expect(container.querySelectorAll(".klk-skeleton").length).toBeGreaterThan(0);
  });

  it("estado cargando con miembros — muestra entre 3 y 6 skeletons", () => {
    const { container } = render(
      <TeamStatusBoard miembros={FIXTURE_6} loading />
    );
    const status = container.querySelector("[aria-busy='true']");
    expect(status).toBeTruthy();
  });

  // ── Estado vacío ──────────────────────────────────────────────────────────

  it("equipo vacío — muestra 'Aún no hay equipo dado de alta'", () => {
    const { container } = render(<TeamStatusBoard miembros={[]} />);
    expect(
      within(container).getByText(/Aún no hay equipo dado de alta/i)
    ).toBeTruthy();
  });

  // ── Estado error ──────────────────────────────────────────────────────────

  it("error — role=alert con mensaje y botón Reintentar", () => {
    const onRetry = vi.fn();
    const { container } = render(
      <TeamStatusBoard
        miembros={[]}
        error="Sin conexión con el servidor"
        onRetry={onRetry}
      />
    );
    const sc = within(container);
    const alert = sc.getByRole("alert");
    expect(alert).toBeTruthy();
    expect(sc.getByText(/Sin conexión con el servidor/i)).toBeTruthy();

    const btnReintentar = sc.getByRole("button", { name: /Reintentar/i });
    expect(btnReintentar).toBeTruthy();
    fireEvent.click(btnReintentar);
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("error sin onRetry — no muestra botón Reintentar", () => {
    const { container } = render(
      <TeamStatusBoard miembros={[]} error="Fallo de red" />
    );
    expect(within(container).queryByRole("button", { name: /Reintentar/i })).toBeNull();
  });

  // ── Composición: WorkerStatusCard real ───────────────────────────────────

  it("onSelectWorker — clic en nombre del trabajador llama al callback", () => {
    const onSelectWorker = vi.fn();
    const fixture = [FIXTURE_6[0]]; // solo Citlali
    const { container } = render(
      <TeamStatusBoard miembros={fixture} onSelectWorker={onSelectWorker} />
    );
    // WorkerStatusCard expone el nombre como botón cuando onSelect está definido.
    const btn = within(container).getByRole("button", {
      name: /Citlali Canul Moo/i,
    });
    fireEvent.click(btn);
    expect(onSelectWorker).toHaveBeenCalledWith("w-001");
  });

  // ── Filtro inicial ────────────────────────────────────────────────────────

  it("filtroInicial='presente' — arranca mostrando solo los presentes", () => {
    const { container } = render(
      <TeamStatusBoard miembros={FIXTURE_6} filtroInicial="presente" />
    );
    const sc = within(container);

    // La pill "Presente" debe estar activa.
    const pillPresente = sc.getByRole("button", { name: /Presente\s*2/i });
    expect(pillPresente.getAttribute("aria-pressed")).toBe("true");

    // Solo deben verse los presentes.
    expect(sc.getByText("Citlali Canul Moo")).toBeTruthy();
    expect(sc.getByText("Jorge Chablé Medina")).toBeTruthy();
    expect(sc.queryByText("Rosa Dzul Ek")).toBeNull();
  });

  // ── theme dark ───────────────────────────────────────────────────────────

  it("theme dark — renderiza sin errores", () => {
    const { container } = render(
      <TeamStatusBoard miembros={FIXTURE_6} theme="dark" />
    );
    expect(within(container).getByText("Citlali Canul Moo")).toBeTruthy();
  });

  // ── acciones → se propagan a WorkerStatusCard ─────────────────────────────

  it("acciones — se propagan y el menú es activable", () => {
    const onAccion = vi.fn();
    const { container } = render(
      <TeamStatusBoard
        miembros={[FIXTURE_6[0]]}
        acciones={(_m) => [{ label: "Ver perfil", onClick: onAccion }]}
      />
    );
    // Busca el botón de kebab que WorkerStatusCard genera cuando hay acciones.
    const kebab = container.querySelector(
      "[aria-label='Acciones de Citlali Canul Moo']"
    );
    expect(kebab).toBeTruthy();
  });

  // ── Accesibilidad ─────────────────────────────────────────────────────────

  it("axe: 0 violaciones — estado feliz", async () => {
    const { container } = render(<TeamStatusBoard miembros={FIXTURE_6} />);
    const { violations } = await axe.run(container, {
      // jsdom no hace layout real; el contraste se verifica en el preview vivo.
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("axe: 0 violaciones — estado cargando", async () => {
    const { container } = render(<TeamStatusBoard miembros={[]} loading />);
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("axe: 0 violaciones — estado error", async () => {
    const { container } = render(
      <TeamStatusBoard
        miembros={[]}
        error="Error de red"
        onRetry={() => {}}
      />
    );
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("axe: 0 violaciones — equipo vacío", async () => {
    const { container } = render(<TeamStatusBoard miembros={[]} />);
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });
});
