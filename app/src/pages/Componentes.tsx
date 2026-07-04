import { useState, type ReactNode } from "react";
import KlokkMark from "../components/brand/KlokkMark";
import { LocationsMap } from "../components/LocationsMap/LocationsMap";
import { GeofenceField } from "../components/GeofenceField/GeofenceField";
import { LiveCheckinFeed } from "../components/LiveCheckinFeed/LiveCheckinFeed";
import { OvertimeMeter } from "../components/OvertimeMeter/OvertimeMeter";
import { IntegrityBadge } from "../components/IntegrityBadge/IntegrityBadge";
import { WorkerStatusCard } from "../components/WorkerStatusCard/WorkerStatusCard";
import { KpiStatCard } from "../components/KpiStatCard/KpiStatCard";
import { WhatsAppCheckinCard } from "../components/WhatsAppCheckinCard/WhatsAppCheckinCard";
import type { MensajeChat } from "../components/WhatsAppCheckinCard/types";
import { TeamStatusBoard } from "../components/TeamStatusBoard/TeamStatusBoard";
import type { MiembroEquipo } from "../components/TeamStatusBoard/types";
import type { MapPoint } from "../components/LocationsMap/types";
import type { GeofenceValue } from "../components/GeofenceField/types";
import type { CheckinEvent } from "../components/LiveCheckinFeed/types";
import type { IntegritySignal } from "../components/IntegrityBadge/types";
import type { Worker, WorkerAction } from "../components/WorkerStatusCard/types";

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

// Señales base de una checada (la mejor manda al nivel global del sello).
const señalesOk: IntegritySignal[] = [
  { key: "ubic", label: "Dentro de la geocerca", status: "ok", detalle: "a 24 m" },
  { key: "tiempo", label: "Dentro del horario", status: "ok", detalle: "a tiempo" },
  { key: "gps", label: "GPS real, sin simulación", status: "ok" },
  { key: "id", label: "Identidad confirmada", status: "ok", detalle: "selfie" },
];
const señalesRevisar: IntegritySignal[] = [
  { key: "ubic", label: "Dentro de la geocerca", status: "ok", detalle: "a 24 m" },
  { key: "tiempo", label: "Dentro del horario", status: "alerta", detalle: "retardo 14 min" },
  { key: "gps", label: "GPS real, sin simulación", status: "ok" },
  { key: "id", label: "Identidad confirmada", status: "ok", detalle: "selfie" },
];
const señalesSospechoso: IntegritySignal[] = [
  { key: "ubic", label: "Dentro de la geocerca", status: "falla", detalle: "a 1.2 km" },
  { key: "tiempo", label: "Dentro del horario", status: "ok", detalle: "a tiempo" },
  { key: "gps", label: "GPS real, sin simulación", status: "falla", detalle: "ubicación simulada" },
  { key: "id", label: "Identidad confirmada", status: "alerta", detalle: "dispositivo nuevo" },
];

// Trabajadores de demo para WorkerStatusCard.
const trabajadores: Record<string, Worker> = {
  maria: { id: "w1", nombre: "María González", puesto: "Despachadora" },
  luis: { id: "w2", nombre: "Luis Pérez", puesto: "Cajero" },
  ana: { id: "w3", nombre: "Ana Cruz", puesto: "Supervisora" },
  jorge: { id: "w4", nombre: "Jorge Uc", puesto: "Despachador" },
};
// Conversaciones de demo para WhatsAppCheckinCard.
const chatFeliz: MensajeChat[] = [
  { de: "empleado", tipo: "texto", texto: "Entrada" },
  { de: "klokk", tipo: "texto", texto: "¡Hola María! 👋 Comparte tu ubicación para confirmar tu fichaje." },
  { de: "empleado", tipo: "ubicacion", dentroGeocerca: true },
  { de: "klokk", tipo: "confirmacion", hora: "08:02", sucursal: "Full Gas Mérida" },
];
const chatFuera: MensajeChat[] = [
  { de: "empleado", tipo: "texto", texto: "Entrada" },
  { de: "empleado", tipo: "ubicacion", dentroGeocerca: false },
  { de: "klokk", tipo: "texto", texto: "Estás fuera del punto de trabajo. Acércate a la sucursal e intenta de nuevo." },
];

// Equipo de demo para TeamStatusBoard (6 miembros, estados variados).
const equipoDemo: MiembroEquipo[] = [
  { worker: { id: "w1", nombre: "María González", puesto: "Despachadora" }, status: "presente", insideGeofence: true, lastCheckin: ahora - 120_000 },
  { worker: { id: "w2", nombre: "Luis Pérez", puesto: "Cajero" }, status: "retardo", insideGeofence: true, nota: "14 min tarde", lastCheckin: ahora - 14 * 60_000 },
  { worker: { id: "w3", nombre: "Ana Cruz", puesto: "Supervisora" }, status: "sin_datos" },
  { worker: { id: "w4", nombre: "Jorge Uc", puesto: "Despachador" }, status: "ausente", nota: "No se presentó", lastCheckin: ahora - 26 * 60 * 60_000 },
  { worker: { id: "w5", nombre: "Rosa Dzul", puesto: "Cajera" }, status: "presente", insideGeofence: true, lastCheckin: ahora - 300_000 },
  { worker: { id: "w6", nombre: "Manuel Caamal", puesto: "Despachador" }, status: "retardo", insideGeofence: false, nota: "en camino", lastCheckin: ahora - 8 * 60_000 },
];

const accionesTrabajador: WorkerAction[] = [
  { label: "Ver perfil" },
  { label: "Ver fichajes" },
  { label: "Enviar recordatorio" },
  { label: "Marcar ausencia", danger: true },
];

// Botón secundario para las acciones del pie del sello (demo).
function AccionDemo({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-md border border-line bg-paper px-2 py-1 text-[11px] font-medium text-ink-soft transition-colors hover:bg-paper-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
    </button>
  );
}

// Subtítulo para cada estado del sello dentro de la cuadrícula de demostración.
function Estado({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{label}</p>
      {children}
    </div>
  );
}

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
        <div className="flex items-center gap-4">
          <KlokkMark
            size={56}
            color="#237446"
            title="Isotipo de Klokk"
            className="shrink-0 drop-shadow-[0_8px_16px_rgba(31,45,73,.18)]"
          />
          <div>
            <p className="font-mono text-sm text-accent">Klokk · librería</p>
            <h1 className="mt-1 font-display text-4xl font-bold sm:text-5xl">Librería de componentes</h1>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Componentes presentacionales en React + TypeScript para el dashboard de Klokk.
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
      <Section title="IntegrityBadge" tag="NÚCLEO · confianza">
        <p className="-mt-2 mb-5 max-w-2xl text-sm text-ink-soft">
          Certifica que una checada es <strong>confiable</strong>: combina varias señales
          (geocerca, horario, GPS real, identidad) en un sello con nivel global. Una vista por estado.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Estado label="Verificado · happy">
            <IntegrityBadge empleado="María González" sucursal="Full Gas Mérida" tipo="entrada" timestamp={ahora - 12_000} folio="K-8F2A" señales={señalesOk} />
          </Estado>
          <Estado label="Revisar · alerta">
            <IntegrityBadge empleado="Luis Pérez" sucursal="Full Gas Umán" tipo="entrada" timestamp={ahora - 180_000} folio="K-8F2B" señales={señalesRevisar} />
          </Estado>
          <Estado label="Sospechoso · falla">
            <IntegrityBadge
              empleado="Jorge Uc"
              sucursal="Full Gas Caucel"
              tipo="salida"
              timestamp={ahora - 1_500_000}
              folio="K-8F2C"
              señales={señalesSospechoso}
              acciones={
                <>
                  <AccionDemo>Ver en mapa</AccionDemo>
                  <AccionDemo>Marcar revisada</AccionDemo>
                </>
              }
            />
          </Estado>
          <Estado label="Cargando">
            <IntegrityBadge estado="cargando" señales={[]} />
          </Estado>
          <Estado label="Vacío · sin datos">
            <IntegrityBadge estado="vacio" señales={[]} />
          </Estado>
          <Estado label="Tema oscuro">
            <IntegrityBadge empleado="Ana Cruz" sucursal="Full Gas Kanasín" tipo="entrada" timestamp={ahora - 60_000} folio="K-8F2D" señales={señalesOk} theme="dark" />
          </Estado>
        </div>
      </Section>
      <Section title="WorkerStatusCard" tag="STRETCH · tablero">
        <p className="-mt-2 mb-5 max-w-2xl text-sm text-ink-soft">
          Tarjeta de trabajador para el tablero "¿quién está hoy?": avatar/iniciales, nombre,
          puesto, estado actual, último fichaje e indicador de dentro/fuera del geocerco.
          Card del design system (radio 16px, borde 1px, sin sombra, hover sutil).
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Estado label="Presente">
            <WorkerStatusCard worker={trabajadores.maria} status="presente" insideGeofence lastCheckin={ahora - 120_000} acciones={accionesTrabajador} onSelect={() => {}} />
          </Estado>
          <Estado label="Retardo">
            <WorkerStatusCard worker={trabajadores.luis} status="retardo" insideGeofence nota="14 min tarde" lastCheckin={ahora - 14 * 60_000} acciones={accionesTrabajador} onSelect={() => {}} />
          </Estado>
          <Estado label="Ausente">
            <WorkerStatusCard worker={trabajadores.jorge} status="ausente" nota="No se presentó" lastCheckin={ahora - 26 * 60 * 60_000} acciones={accionesTrabajador} onSelect={() => {}} />
          </Estado>
          <Estado label="Sin datos">
            <WorkerStatusCard worker={trabajadores.ana} status="sin_datos" acciones={accionesTrabajador} onSelect={() => {}} />
          </Estado>
        </div>

        <p className="mb-3 mt-8 font-mono text-[11px] uppercase tracking-wide text-ink-soft">Bonus · densidad cómoda vs. compacta</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <WorkerStatusCard worker={trabajadores.maria} status="presente" insideGeofence lastCheckin={ahora - 120_000} densidad="comoda" acciones={accionesTrabajador} />
            <p className="text-center font-mono text-[11px] text-ink-soft">cómoda</p>
          </div>
          <div className="space-y-2">
            <WorkerStatusCard worker={trabajadores.maria} status="presente" insideGeofence lastCheckin={ahora - 120_000} densidad="compacta" acciones={accionesTrabajador} />
            <p className="text-center font-mono text-[11px] text-ink-soft">compacta</p>
          </div>
        </div>

        <p className="mb-3 mt-8 font-mono text-[11px] uppercase tracking-wide text-ink-soft">Tema oscuro</p>
        <div className="grid gap-4 rounded-2xl bg-ink-900 p-4 sm:grid-cols-2">
          <WorkerStatusCard worker={trabajadores.maria} status="presente" insideGeofence lastCheckin={ahora - 120_000} acciones={accionesTrabajador} theme="dark" />
          <WorkerStatusCard worker={trabajadores.jorge} status="ausente" insideGeofence={false} lastCheckin={ahora - 26 * 60 * 60_000} acciones={accionesTrabajador} theme="dark" />
        </div>
      </Section>
      <Section title="KpiStatCard" tag="NÚCLEO · métricas">
        <p className="-mt-2 mb-5 max-w-2xl text-sm text-ink-soft">
          Métrica de cabecera con tendencia vs periodo anterior. La semántica es por
          contexto: <strong>retardos que bajan pintan verde</strong> (<code>deltaBuenoCuando="baja"</code>).
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiStatCard etiqueta="Asistencia hoy" valor={94} formato="porcentaje" delta={2} />
          <KpiStatCard etiqueta="Retardos hoy" valor={3} delta={-1} deltaBuenoCuando="baja" periodo="vs ayer" />
          <KpiStatCard etiqueta="Horas extra" valor={8} formato="horas" delta={2} deltaBuenoCuando="baja" />
          <KpiStatCard etiqueta="Checadas del mes" valor={1240} delta={0} />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Estado label="Cargando">
            <KpiStatCard etiqueta="Asistencia hoy" valor={0} estado="cargando" />
          </Estado>
          <Estado label="Error">
            <KpiStatCard etiqueta="Asistencia hoy" valor={0} estado="error" mensajeError="No se pudo cargar" />
          </Estado>
          <Estado label="Sin tendencia">
            <KpiStatCard etiqueta="Sucursales activas" valor={4} />
          </Estado>
          <Estado label="Tema oscuro">
            <KpiStatCard etiqueta="Asistencia hoy" valor={94} formato="porcentaje" delta={2} theme="dark" />
          </Estado>
        </div>
      </Section>
      <Section title="WhatsAppCheckinCard" tag="MARCA · producto">
        <p className="-mt-2 mb-5 max-w-2xl text-sm text-ink-soft">
          La checada por WhatsApp — el gancho de Klokk como componente: el empleado manda
          "Entrada", comparte ubicación y queda fichado. Sin apps, sin hardware.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Estado label="Conversación · animada">
            <WhatsAppCheckinCard mensajes={chatFeliz} animado />
          </Estado>
          <Estado label="Fuera del geocerco">
            <WhatsAppCheckinCard mensajes={chatFuera} />
          </Estado>
          <Estado label="Cargando">
            <WhatsAppCheckinCard mensajes={[]} estado="cargando" />
          </Estado>
          <Estado label="Vacío">
            <WhatsAppCheckinCard mensajes={[]} estado="vacio" />
          </Estado>
          <Estado label="Tema oscuro">
            <WhatsAppCheckinCard mensajes={chatFeliz} theme="dark" />
          </Estado>
        </div>
      </Section>
      <Section title="TeamStatusBoard" tag="NÚCLEO · tablero">
        <p className="-mt-2 mb-5 max-w-2xl text-sm text-ink-soft">
          "¿Quién está ahora?" — el tablero del equipo con filtros y conteos.
          <strong> Compone WorkerStatusCard</strong> (importado, cero duplicación): la librería
          construyendo sobre sí misma.
        </p>
        <TeamStatusBoard
          miembros={equipoDemo}
          acciones={() => accionesTrabajador}
          onSelectWorker={() => {}}
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Estado label="Cargando">
            <TeamStatusBoard miembros={[]} loading />
          </Estado>
          <Estado label="Vacío">
            <TeamStatusBoard miembros={[]} />
          </Estado>
          <Estado label="Error">
            <TeamStatusBoard miembros={[]} error="No se pudo cargar el equipo" onRetry={() => {}} />
          </Estado>
          <Estado label="Tema oscuro · compacta">
            <TeamStatusBoard
              miembros={equipoDemo.slice(0, 2)}
              densidad="compacta"
              theme="dark"
            />
          </Estado>
        </div>
      </Section>
    </div>
  );
}
