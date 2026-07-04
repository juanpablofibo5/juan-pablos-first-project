import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { render, cleanup, within } from "@testing-library/react";
import axe from "axe-core";
import { WhatsAppCheckinCard } from "./WhatsAppCheckinCard";
import type { MensajeChat } from "./types";

afterEach(cleanup);

// Instala un mock base de matchMedia (reduced-motion=false) antes de cada test.
// Los tests de animación que necesiten reduced-motion=true llaman a mockMatchMedia(true)
// antes del render.
beforeEach(() => {
  mockMatchMedia(false);
});

// ── Fixtures: Full Gas Mérida ────────────────────────────────────────────────
const MENSAJES_FELIZ: MensajeChat[] = [
  { de: "empleado", tipo: "texto", texto: "Entrada" },
  { de: "klokk", tipo: "texto", texto: "¡Hola! Comparte tu ubicación para confirmar tu fichaje." },
  { de: "empleado", tipo: "ubicacion", dentroGeocerca: true },
  { de: "klokk", tipo: "confirmacion", hora: "08:57", sucursal: "Full Gas Mérida Centro" },
];

const MENSAJES_FUERA: MensajeChat[] = [
  { de: "empleado", tipo: "texto", texto: "Entrada" },
  { de: "klokk", tipo: "texto", texto: "Comparte tu ubicación para confirmar." },
  { de: "empleado", tipo: "ubicacion", dentroGeocerca: false },
  { de: "klokk", tipo: "texto", texto: "Tu ubicación está fuera del geocerco. Contacta a tu supervisor." },
];

// Helper: mockea window.matchMedia con el valor dado
function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("WhatsAppCheckinCard", () => {
  // ── Los 4 tipos de MensajeChat renderizan ──────────────────────────────────

  it("tipo empleado/texto — burbuja con el texto del empleado", () => {
    const { container } = render(
      <WhatsAppCheckinCard
        mensajes={[{ de: "empleado", tipo: "texto", texto: "Entrada" }]}
      />
    );
    expect(within(container).getByText("Entrada")).toBeTruthy();
  });

  it("tipo empleado/ubicacion dentro — muestra 'DENTRO DEL GEOCERCO' con ícono ✓", () => {
    const { container } = render(
      <WhatsAppCheckinCard
        mensajes={[{ de: "empleado", tipo: "ubicacion", dentroGeocerca: true }]}
      />
    );
    // Texto siempre presente (no solo color)
    expect(within(container).getByText("DENTRO DEL GEOCERCO")).toBeTruthy();
    // La pill tiene aria-label con descripción textual
    expect(container.querySelector("[aria-label='Ubicación dentro del geocerco']")).toBeTruthy();
    // El ícono check está (path con puntos de check)
    const svgs = container.querySelectorAll("svg");
    const hasCheckPath = Array.from(svgs).some((svg) =>
      svg.innerHTML.includes("M5 12.5")
    );
    expect(hasCheckPath).toBe(true);
  });

  it("tipo empleado/ubicacion fuera — muestra 'FUERA DEL GEOCERCO' con ícono ✕", () => {
    const { container } = render(
      <WhatsAppCheckinCard
        mensajes={[{ de: "empleado", tipo: "ubicacion", dentroGeocerca: false }]}
      />
    );
    expect(within(container).getByText("FUERA DEL GEOCERCO")).toBeTruthy();
    expect(container.querySelector("[aria-label='Ubicación fuera del geocerco']")).toBeTruthy();
    // El ícono cross está (path con líneas cruzadas)
    const svgs = container.querySelectorAll("svg");
    const hasCrossPath = Array.from(svgs).some((svg) =>
      svg.innerHTML.includes("M7.5 7.5")
    );
    expect(hasCrossPath).toBe(true);
  });

  it("tipo klokk/texto — burbuja alineada a la izquierda con el texto", () => {
    const { container } = render(
      <WhatsAppCheckinCard
        mensajes={[{ de: "klokk", tipo: "texto", texto: "¡Hola! Comparte tu ubicación." }]}
      />
    );
    expect(within(container).getByText("¡Hola! Comparte tu ubicación.")).toBeTruthy();
  });

  it("tipo klokk/confirmacion — muestra hora en mono tabular + sucursal", () => {
    const { container } = render(
      <WhatsAppCheckinCard
        mensajes={[{ de: "klokk", tipo: "confirmacion", hora: "08:57", sucursal: "Full Gas Mérida Centro" }]}
      />
    );
    expect(within(container).getByText("08:57")).toBeTruthy();
    expect(within(container).getByText(/Full Gas Mérida Centro/)).toBeTruthy();
    // La hora está en un elemento con clases mono + tabular-nums
    const horaEl = within(container).getByText("08:57");
    expect(horaEl.className).toMatch(/font-mono/);
    expect(horaEl.className).toMatch(/tabular-nums/);
  });

  // ── Conversación feliz ────────────────────────────────────────────────────

  it("humo: estado feliz — todos los mensajes visibles", () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={MENSAJES_FELIZ} contacto="Klokk" estadoContacto="en línea" />
    );
    expect(within(container).getByText("Entrada")).toBeTruthy();
    expect(within(container).getByText("DENTRO DEL GEOCERCO")).toBeTruthy();
    expect(within(container).getByText("08:57")).toBeTruthy();
    expect(within(container).getByText(/Full Gas Mérida Centro/)).toBeTruthy();
  });

  it("geocerca fuera — conversación de incidencia visible", () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={MENSAJES_FUERA} />
    );
    expect(within(container).getByText("FUERA DEL GEOCERCO")).toBeTruthy();
  });

  // ── Cabecera de marca ─────────────────────────────────────────────────────

  it("cabecera: muestra nombre del contacto y subtítulo", () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={MENSAJES_FELIZ} contacto="Klokk" estadoContacto="en línea" />
    );
    expect(within(container).getByText("Klokk")).toBeTruthy();
    expect(within(container).getByText("en línea")).toBeTruthy();
  });

  it("cabecera: fondo verde de marca #237446", () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={MENSAJES_FELIZ} />
    );
    // jsdom puede normalizar el hex a rgb(35, 116, 70), así que buscamos
    // cualquier div cuyo style.background contenga el valor en alguna forma.
    const divs = Array.from(container.querySelectorAll("div")).filter((el) => {
      const s = (el as HTMLElement).style.background || (el as HTMLElement).style.backgroundColor;
      return s.includes("237446") || s.includes("35, 116, 70") || s.includes("35,116,70");
    });
    expect(divs.length).toBeGreaterThan(0);
  });

  // ── Estado cargando ───────────────────────────────────────────────────────

  it("estado cargando — aria-busy=true y skeleton visible", () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={[]} estado="cargando" />
    );
    expect(container.querySelector("[aria-busy='true']")).toBeTruthy();
    expect(container.querySelector(".klk-skeleton")).toBeTruthy();
  });

  // ── Estado vacío ──────────────────────────────────────────────────────────

  it("estado vacio — muestra 'Aún no hay mensajes'", () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={[]} estado="vacio" />
    );
    expect(within(container).getByText("Aún no hay mensajes")).toBeTruthy();
  });

  it("mensajes vacíos con estado ok — muestra mensaje vacío", () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={[]} />
    );
    expect(within(container).getByText("Aún no hay mensajes")).toBeTruthy();
  });

  // ── Animación + reduced-motion ────────────────────────────────────────────

  it("animado + reduced-motion=true — todo el contenido visible sin animación", () => {
    // Mockea matchMedia para simular prefers-reduced-motion: reduce
    mockMatchMedia(true);

    const { container } = render(
      <WhatsAppCheckinCard mensajes={MENSAJES_FELIZ} animado={true} />
    );

    // Todo el contenido textual debe estar presente en el DOM
    expect(within(container).getByText("Entrada")).toBeTruthy();
    expect(within(container).getByText("DENTRO DEL GEOCERCO")).toBeTruthy();
    expect(within(container).getByText("08:57")).toBeTruthy();

    // Ningún wrapper debe tener la clase klk-enter (no hay animación)
    const animated = container.querySelectorAll(".klk-enter");
    expect(animated.length).toBe(0);
  });

  it("animado=true + reduced-motion=false — wrappers tienen clase klk-enter con delay", () => {
    mockMatchMedia(false);

    const { container } = render(
      <WhatsAppCheckinCard mensajes={MENSAJES_FELIZ} animado={true} />
    );

    const animated = container.querySelectorAll(".klk-enter");
    // Hay tantos wrappers animados como mensajes
    expect(animated.length).toBe(MENSAJES_FELIZ.length);

    // El primer mensaje no tiene delay (o delay 0ms), el segundo sí
    const second = animated[1] as HTMLElement;
    expect(second.style.animationDelay).toBe("180ms");
  });

  it("animado=false — sin clase klk-enter", () => {
    mockMatchMedia(false);

    const { container } = render(
      <WhatsAppCheckinCard mensajes={MENSAJES_FELIZ} animado={false} />
    );
    const animated = container.querySelectorAll(".klk-enter");
    expect(animated.length).toBe(0);
  });

  // ── Accesibilidad axe ─────────────────────────────────────────────────────

  it("axe: 0 violaciones en estado feliz", async () => {
    const { container } = render(
      <WhatsAppCheckinCard
        mensajes={MENSAJES_FELIZ}
        contacto="Klokk"
        estadoContacto="en línea"
      />
    );
    // color-contrast off: jsdom no hace layout real; se verifica en el preview vivo
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("axe: 0 violaciones en estado cargando", async () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={[]} estado="cargando" />
    );
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("axe: 0 violaciones en estado vacío", async () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={[]} estado="vacio" />
    );
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });

  it("axe: 0 violaciones con geocerca fuera del geocerco", async () => {
    const { container } = render(
      <WhatsAppCheckinCard mensajes={MENSAJES_FUERA} />
    );
    const { violations } = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(violations).toHaveLength(0);
  });
});
