import { useState, type ReactNode } from "react";
import { LocationsMap } from "../components/LocationsMap/LocationsMap";
import { GeofenceField } from "../components/GeofenceField/GeofenceField";
import { LiveCheckinFeed } from "../components/LiveCheckinFeed/LiveCheckinFeed";
import { OvertimeMeter } from "../components/OvertimeMeter/OvertimeMeter";
import type { MapPoint } from "../components/LocationsMap/types";
import type { GeofenceValue } from "../components/GeofenceField/types";
import type { CheckinEvent } from "../components/LiveCheckinFeed/types";

const puntos: MapPoint[] = [
  { id: "1", nombre: "Full Gas Mérida", lat: 20.9674, lng: -89.6237, radio: 150, estado: "activo" },
  { id: "2", nombre: "Full Gas Umán", lat: 20.88, lng: -89.75, radio: 150, estado: "inactivo" },
  { id: "3", nombre: "Full Gas Kanasín", lat: 20.93, lng: -89.56, radio: 150, estado: "incidencia" },
  { id: "4", nombre: "Full Gas Caucel", lat: 20.99, lng: -89.71, radio: 150, estado: "activo" },
];

const ahora = Date.now();
const eventos: CheckinEvent[] = [
  { id: "1", empleado: "María González", tipo: "entrada", estado: "a_tiempo", timestamp: ahora - 12_000, sucursal: "Mérida" },
  { id: "2", empleado: "Luis Pérez", tipo: "entrada", estado: "retardo", timestamp: ahora - 180_000, sucursal: "Umán" },
  { id: "3", empleado: "Ana Cruz", tipo: "salida", estado: "a_tiempo", timestamp: ahora - 720_000, sucursal: "Kanasín" },
  { id: "4", empleado: "Jorge Uc", tipo: "entrada", estado: "fuera_geocerco", timestamp: ahora - 1_500_000, sucursal: "Caucel" },
];

function Section({ title, tag, children }: { title: string; tag: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-2xl">{title}</h2>
        <span className="rounded-full border border-line bg-paper-2 px-2 py-0.5 font-mono text-[11px] text-ink-soft">{tag}</span>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function Componentes() {
  const [geo, setGeo] = useState<GeofenceValue>({ lat: 20.9674, lng: -89.6237, radio: 200 });

  return (
    <div>
      <header className="py-12">
        <p className="font-mono text-sm text-accent">Klockk · librería</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Librería de componentes</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Componentes presentacionales en React + TypeScript para el dashboard de Klockk.
          Aquí corren <strong>nativos</strong> dentro del sitio (sin iframes).
        </p>
      </header>

      <Section title="LocationsMap" tag="NÚCLEO · mapa">
        <LocationsMap points={puntos} cluster />
      </Section>
      <Section title="GeofenceField" tag="NÚCLEO · formulario">
        <GeofenceField value={geo} onChange={setGeo} />
      </Section>
      <Section title="LiveCheckinFeed" tag="NÚCLEO · tiempo real">
        <LiveCheckinFeed events={eventos} />
      </Section>
      <Section title="OvertimeMeter" tag="STRETCH · data-viz">
        <OvertimeMeter normal={40} doble={6} triple={2} objetivo={48} semanaAnterior={44} />
      </Section>
    </div>
  );
}
