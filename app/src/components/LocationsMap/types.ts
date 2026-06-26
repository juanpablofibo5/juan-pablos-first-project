// LocationsMap · MapaDeUbicaciones — tipos
// Componente PRESENTACIONAL (sin lógica de negocio).

export type PointStatus = "activo" | "inactivo" | "incidencia";

export interface MapPoint {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  /** Radio del geocerco en metros. */
  radio: number;
  estado: PointStatus;
}

export interface LocationsMapProps {
  /** Puntos del negocio a mostrar. Vacío => estado "sin puntos". */
  points: MapPoint[];
  /** Se llama al seleccionar un punto (marcador o lista). */
  onSelectPoint?: (id: string) => void;
  /** Punto resaltado actualmente. */
  selectedId?: string;
  /** Centro del mapa [lat, lng]. Por defecto, el primer punto. */
  center?: [number, number];
  /** Zoom inicial. */
  zoom?: number;
  /** Tema visual. */
  theme?: "light" | "dark";
  /** Estado de carga. */
  loading?: boolean;
  /** Mensaje de error (si existe, muestra estado de error). */
  error?: string;
  /** Si se provee, el estado de error muestra un botón "Reintentar". */
  onRetry?: () => void;
  /** Si se provee, el estado vacío muestra un botón "Agregar ubicación". */
  onAddLocation?: () => void;
  /** Agrupa marcadores cercanos en clústers (útil con muchos puntos). */
  cluster?: boolean;
}
