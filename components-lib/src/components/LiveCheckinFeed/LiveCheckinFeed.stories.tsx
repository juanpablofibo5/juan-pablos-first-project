import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LiveCheckinFeed } from "./LiveCheckinFeed";
import type { CheckinEvent, CheckinStatus, CheckinType } from "./types";

const ahora = Date.now();
const min = (n: number) => ahora - n * 60_000;

const ejemplo: CheckinEvent[] = [
  { id: "1", empleado: "María González", tipo: "entrada", estado: "a_tiempo", timestamp: min(0.2), sucursal: "Sucursal Centro" },
  { id: "2", empleado: "Luis Pérez", tipo: "entrada", estado: "retardo", timestamp: min(3), sucursal: "Bodega Norte" },
  { id: "3", empleado: "Ana Cruz", tipo: "salida", estado: "a_tiempo", timestamp: min(12), sucursal: "Sucursal Centro" },
  { id: "4", empleado: "Jorge Uc", tipo: "entrada", estado: "fuera_geocerco", timestamp: min(25), sucursal: "Oficina Montejo" },
  { id: "5", empleado: "Sofía Canul", tipo: "entrada", estado: "no_show", timestamp: min(48), sucursal: "Almacén Periférico" },
  { id: "6", empleado: "Diego Martín", tipo: "salida", estado: "a_tiempo", timestamp: min(95), sucursal: "Bodega Norte" },
];

const meta: Meta<typeof LiveCheckinFeed> = {
  title: "Klockk/LiveCheckinFeed",
  component: LiveCheckinFeed,
  parameters: { layout: "padded" },
  args: { onEventClick: (id) => console.log("evento:", id) },
};
export default meta;
type Story = StoryObj<typeof LiveCheckinFeed>;

export const CasoFeliz: Story = { args: { events: ejemplo } };
export const Cargando: Story = { args: { events: [], loading: true } };
export const Vacio: Story = { args: { events: [] } };
export const ConError: Story = { args: { events: [], error: "No se pudo conectar con el servidor en vivo." } };
export const ModoOscuro: Story = { args: { events: ejemplo, theme: "dark" } };

// Streaming: agrega un fichaje nuevo cada 2.5 s (entra animado + se anuncia por aria-live).
const NOMBRES = ["María González", "Luis Pérez", "Ana Cruz", "Jorge Uc", "Sofía Canul", "Diego Martín", "Paola Ek", "Iván Chan"];
const ESTADOS: CheckinStatus[] = ["a_tiempo", "a_tiempo", "retardo", "fuera_geocerco", "no_show"];
const SUCURSALES = ["Sucursal Centro", "Bodega Norte", "Oficina Montejo", "Almacén Periférico"];

function StreamingDemo() {
  const [events, setEvents] = useState<CheckinEvent[]>(ejemplo.slice(0, 3));
  const nextId = useRef(100);
  useEffect(() => {
    const t = setInterval(() => {
      const id = String(nextId.current++);
      const nuevo: CheckinEvent = {
        id,
        empleado: NOMBRES[Math.floor(Math.random() * NOMBRES.length)],
        tipo: (Math.random() > 0.5 ? "entrada" : "salida") as CheckinType,
        estado: ESTADOS[Math.floor(Math.random() * ESTADOS.length)],
        timestamp: Date.now(),
        sucursal: SUCURSALES[Math.floor(Math.random() * SUCURSALES.length)],
      };
      setEvents((prev) => [nuevo, ...prev].slice(0, 30));
    }, 2500);
    return () => clearInterval(t);
  }, []);
  return <LiveCheckinFeed events={events} onEventClick={(id) => console.log("evento:", id)} />;
}

export const Streaming: Story = { render: () => <StreamingDemo /> };
