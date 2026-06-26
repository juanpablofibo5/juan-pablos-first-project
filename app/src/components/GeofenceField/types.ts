// GeofenceField · EditorDeGeocerco — tipos
// Input controlado (presentacional): devuelve { lat, lng, radio }.

export interface GeofenceValue {
  lat: number;
  lng: number;
  /** Radio del geocerco en metros. */
  radio: number;
}

export interface GeofenceFieldProps {
  /** Valor controlado. */
  value: GeofenceValue;
  /** Emite el nuevo valor en cada cambio (pin o radio). */
  onChange: (value: GeofenceValue) => void;
  /** Radio mínimo en metros. */
  minRadio?: number;
  /** Radio máximo en metros. */
  maxRadio?: number;
  /** Deshabilita la edición. */
  disabled?: boolean;
  /** Zoom inicial del mapa. */
  zoom?: number;
  /** Tema visual. */
  theme?: "light" | "dark";
}
