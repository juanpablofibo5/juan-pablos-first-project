// LiveCheckinFeed · FeedDeFichajesEnVivo — tipos
// Componente PRESENTACIONAL (sin lógica de negocio).

export type CheckinStatus = "a_tiempo" | "retardo" | "fuera_geocerco" | "no_show";
export type CheckinType = "entrada" | "salida";

export interface CheckinEvent {
  id: string;
  /** Nombre del empleado que ficha. */
  empleado: string;
  /** Entrada o salida. */
  tipo: CheckinType;
  /** Estado del fichaje. */
  estado: CheckinStatus;
  /** Momento del fichaje (epoch en milisegundos). */
  timestamp: number;
  /** Sucursal o punto (opcional, para agrupar). */
  sucursal?: string;
}

export interface LiveCheckinFeedProps {
  /** Eventos a mostrar (los más recientes primero). */
  events: CheckinEvent[];
  /** Estado de carga (muestra skeleton). */
  loading?: boolean;
  /** Mensaje de error (si existe, muestra estado de error). */
  error?: string;
  /** Se llama al hacer clic en un evento. */
  onEventClick?: (id: string) => void;
  /** Filtra por estado; "todos" (por defecto) muestra todo. */
  filter?: CheckinStatus | "todos";
  /** Máximo de eventos a renderizar (paginación simple para rendir con muchos). */
  maxVisible?: number;
  /** Tema visual. */
  theme?: "light" | "dark";
}
