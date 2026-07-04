import { useEffect, useState } from "react";
import KlokkMark from "../brand/KlokkMark";
import type { MensajeChat, WhatsAppCheckinCardProps } from "./types";

// ── Verde de marca (spec P-02: "EL componente de marca") ────────────────────
const BRAND_GREEN = "#237446";
const BRAND_TINT_LIGHT = "#e7f2ec";
const BRAND_TINT_DARK = "rgba(35,116,70,0.22)";

// ── Ícono de pin de ubicación ────────────────────────────────────────────────
function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M12 2C8.686 2 6 4.686 6 8c0 5 6 12 6 12s6-7 6-12c0-3.314-2.686-6-6-6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// ── Ícono de check (geocerca dentro) ─────────────────────────────────────────
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden>
      <path
        d="M5 12.5L9.5 17L19 7.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Ícono de X (geocerca fuera) ───────────────────────────────────────────────
function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden>
      <path
        d="M7.5 7.5L16.5 16.5M16.5 7.5L7.5 16.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Burbuja: empleado a la derecha, tintada ──────────────────────────────────
function BurbujaEmpleadoTexto({
  texto,
  dark,
}: {
  texto: string;
  dark: boolean;
}) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[80%] rounded-2xl rounded-br-md px-3 py-2 text-sm"
        style={{
          background: dark ? BRAND_TINT_DARK : BRAND_TINT_LIGHT,
          color: dark ? "#86c1a0" : "#1b5c34",
        }}
      >
        {texto}
      </div>
    </div>
  );
}

// ── Burbuja: empleado ubicación ──────────────────────────────────────────────
function BurbujaUbicacion({
  dentroGeocerca,
  dark,
}: {
  dentroGeocerca: boolean;
  dark: boolean;
}) {
  const pillBg = dentroGeocerca
    ? dark
      ? BRAND_TINT_DARK
      : BRAND_TINT_LIGHT
    : dark
      ? "rgba(181,72,47,0.18)"
      : "rgba(181,72,47,0.10)";
  const pillFg = dentroGeocerca
    ? dark
      ? "#86c1a0"
      : "#1b5c34"
    : dark
      ? "#e29585"
      : "#8a3322";
  const pillLabel = dentroGeocerca ? "DENTRO DEL GEOCERCO" : "FUERA DEL GEOCERCO";
  const pillSrText = dentroGeocerca
    ? "Ubicación dentro del geocerco"
    : "Ubicación fuera del geocerco";

  return (
    <div className="flex justify-end">
      <div
        className="max-w-[85%] rounded-2xl rounded-br-md p-3"
        style={{
          background: dark ? "#2a2a27" : "#ffffff",
          boxShadow: dark
            ? "0 1px 4px rgba(0,0,0,0.35)"
            : "0 1px 4px rgba(28,28,26,0.10)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <PinIcon
            className={dark ? "text-taupe" : "text-ink-soft"}
          />
          <p
            className="text-sm font-medium"
            style={{ color: dark ? "#e0ddd8" : "#1c1c1a" }}
          >
            Ubicación en tiempo real
          </p>
        </div>
        <span
          className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
          style={{ background: pillBg, color: pillFg }}
        >
          {dentroGeocerca ? <CheckIcon /> : <CrossIcon />}
          <span aria-label={pillSrText}>{pillLabel}</span>
        </span>
      </div>
    </div>
  );
}

// ── Burbuja: Klokk texto (superficie, izquierda) ─────────────────────────────
function BurbujaKlokkTexto({
  texto,
  dark,
}: {
  texto: string;
  dark: boolean;
}) {
  return (
    <div className="flex justify-start">
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-md px-3 py-2 text-sm"
        style={{
          background: dark ? "#2a2a27" : "#ffffff",
          color: dark ? "#e0ddd8" : "#1c1c1a",
          boxShadow: dark
            ? "0 1px 4px rgba(0,0,0,0.35)"
            : "0 1px 4px rgba(28,28,26,0.10)",
        }}
      >
        {texto}
      </div>
    </div>
  );
}

// ── Burbuja: Klokk confirmación ───────────────────────────────────────────────
function BurbujaConfirmacion({
  hora,
  sucursal,
  dark,
}: {
  hora: string;
  sucursal: string;
  dark: boolean;
}) {
  return (
    <div className="flex justify-start">
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-md px-3 py-2 text-sm"
        style={{
          background: dark ? "#2a2a27" : "#ffffff",
          color: dark ? "#e0ddd8" : "#1c1c1a",
          boxShadow: dark
            ? "0 1px 4px rgba(0,0,0,0.35)"
            : "0 1px 4px rgba(28,28,26,0.10)",
        }}
      >
        Fichaje registrado a las{" "}
        <span
          className="font-mono font-semibold tabular-nums"
          style={{ color: dark ? "#86c1a0" : BRAND_GREEN }}
        >
          {hora}
        </span>
        . {sucursal}.
      </div>
    </div>
  );
}

// ── Burbuja wrapper con animación opcional ───────────────────────────────────
function BurbujaWrapper({
  index,
  animado,
  reducedMotion,
  children,
}: {
  index: number;
  animado: boolean;
  reducedMotion: boolean;
  children: React.ReactNode;
}) {
  const shouldAnimate = animado && !reducedMotion;
  return (
    <div
      className={shouldAnimate ? "klk-enter" : undefined}
      style={
        shouldAnimate
          ? {
              animationDelay: `${index * 180}ms`,
              animationFillMode: "both",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

// ── Hooks ────────────────────────────────────────────────────────────────────
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ── Componente principal ─────────────────────────────────────────────────────
export function WhatsAppCheckinCard({
  contacto = "Klokk",
  estadoContacto = "en línea",
  mensajes,
  animado = false,
  estado = "ok",
  theme = "light",
}: WhatsAppCheckinCardProps) {
  const dark = theme === "dark";
  const reducedMotion = useReducedMotion();

  const cardBg = dark ? "#1c1c1a" : "#ffffff";
  const bodyBg = dark ? "#1c1c1a" : "#f6f5f3";
  const borderColor = dark ? "#3a3a36" : "#e7e5e1";

  // ── Estado: cargando (skeleton de 3 burbujas) ────────────────────────────
  if (estado === "cargando") {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label="Cargando conversación"
        className="overflow-hidden rounded-card"
        style={{
          border: `1px solid ${borderColor}`,
          background: cardBg,
          boxShadow: "0 4px 24px -12px rgba(28,28,26,0.18)",
        }}
      >
        {/* Cabecera skeleton */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: BRAND_GREEN }}
        >
          <div className="klk-skeleton h-9 w-9 !rounded-full" style={{ opacity: 0.4 }} />
          <div className="flex-1 space-y-1.5">
            <div className="klk-skeleton h-3 w-20" style={{ opacity: 0.4 }} />
            <div className="klk-skeleton h-2.5 w-14" style={{ opacity: 0.4 }} />
          </div>
        </div>
        {/* Burbujas skeleton */}
        <div className="space-y-3 p-4" style={{ background: bodyBg }}>
          <div className="flex justify-end">
            <div className="klk-skeleton h-8 w-24 rounded-2xl rounded-br-md" />
          </div>
          <div className="flex justify-start">
            <div className="klk-skeleton h-10 w-52 rounded-2xl rounded-bl-md" />
          </div>
          <div className="flex justify-end">
            <div className="klk-skeleton h-16 w-48 rounded-2xl rounded-br-md" />
          </div>
        </div>
      </div>
    );
  }

  // ── Estado: vacío ────────────────────────────────────────────────────────
  if (estado === "vacio" || mensajes.length === 0) {
    return (
      <div
        aria-label="Conversación de checada vacía"
        className="overflow-hidden rounded-card"
        style={{
          border: `1px solid ${borderColor}`,
          background: cardBg,
          boxShadow: "0 4px 24px -12px rgba(28,28,26,0.18)",
        }}
      >
        {/* Cabecera */}
        <Cabecera
          contacto={contacto}
          estadoContacto={estadoContacto}
          dark={dark}
        />
        {/* Cuerpo vacío */}
        <div
          className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center"
          style={{ background: bodyBg }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            style={{ color: dark ? "#4ab378" : BRAND_GREEN, opacity: 0.5 }}
          >
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            className="text-sm"
            style={{ color: dark ? "#a09d95" : "#57544e" }}
          >
            Aún no hay mensajes
          </p>
        </div>
      </div>
    );
  }

  // ── Estado: conversación ─────────────────────────────────────────────────
  return (
    <div
      aria-label={`Conversación de checada con ${contacto}`}
      className="overflow-hidden rounded-card"
      style={{
        border: `1px solid ${borderColor}`,
        background: cardBg,
        boxShadow: "0 4px 24px -12px rgba(28,28,26,0.18)",
      }}
    >
      {/* Cabecera con verde de marca */}
      <Cabecera
        contacto={contacto}
        estadoContacto={estadoContacto}
        dark={dark}
      />

      {/* Conversación */}
      <div className="space-y-3 p-4" style={{ background: bodyBg }}>
        {mensajes.map((msg, i) => (
          <BurbujaWrapper
            key={i}
            index={i}
            animado={animado}
            reducedMotion={reducedMotion}
          >
            <RenderMensaje msg={msg} dark={dark} />
          </BurbujaWrapper>
        ))}
      </div>
    </div>
  );
}

// ── Cabecera de marca ────────────────────────────────────────────────────────
function Cabecera({
  contacto,
  estadoContacto,
  dark,
}: {
  contacto: string;
  estadoContacto: string;
  dark: boolean;
}) {
  // La referencia al avatar circular con KlokkMark usa el mismo patrón del demo
  // dibujado a mano en Klokk.tsx (líneas 281-288), solo como referencia visual.
  const avatarBg = dark ? "#1c1c1a" : "#ffffff";
  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{ background: BRAND_GREEN }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ background: avatarBg }}
        aria-hidden
      >
        <KlokkMark size={26} color={BRAND_GREEN} title="" />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-bold text-white">{contacto}</p>
        <p className="text-xs text-white/75">{estadoContacto}</p>
      </div>
    </div>
  );
}

// ── Despachador de mensajes ───────────────────────────────────────────────────
function RenderMensaje({ msg, dark }: { msg: MensajeChat; dark: boolean }) {
  if (msg.de === "empleado" && msg.tipo === "texto") {
    return <BurbujaEmpleadoTexto texto={msg.texto} dark={dark} />;
  }
  if (msg.de === "empleado" && msg.tipo === "ubicacion") {
    return (
      <BurbujaUbicacion dentroGeocerca={msg.dentroGeocerca} dark={dark} />
    );
  }
  if (msg.de === "klokk" && msg.tipo === "texto") {
    return <BurbujaKlokkTexto texto={msg.texto} dark={dark} />;
  }
  if (msg.de === "klokk" && msg.tipo === "confirmacion") {
    return (
      <BurbujaConfirmacion hora={msg.hora} sucursal={msg.sucursal} dark={dark} />
    );
  }
  // TypeScript exhaustiveness guard — nunca debería llegar aquí
  return null;
}
