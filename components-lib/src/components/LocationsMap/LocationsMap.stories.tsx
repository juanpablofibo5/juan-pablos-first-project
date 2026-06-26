import type { Meta, StoryObj } from "@storybook/react-vite";
import { LocationsMap } from "./LocationsMap";
import type { MapPoint } from "./types";

// Puntos de ejemplo en Mérida, Yucatán.
const puntosMerida: MapPoint[] = [
  { id: "1", nombre: "Sucursal Centro", lat: 20.9674, lng: -89.6237, radio: 120, estado: "activo" },
  { id: "2", nombre: "Bodega Norte", lat: 21.021, lng: -89.619, radio: 200, estado: "inactivo" },
  { id: "3", nombre: "Oficina Montejo", lat: 20.989, lng: -89.61, radio: 90, estado: "incidencia" },
  { id: "4", nombre: "Almacén Periférico", lat: 20.94, lng: -89.65, radio: 150, estado: "activo" },
];

const meta: Meta<typeof LocationsMap> = {
  title: "Klockk/LocationsMap",
  component: LocationsMap,
  parameters: { layout: "padded" },
  args: { onSelectPoint: (id) => console.log("seleccionado:", id) },
};
export default meta;
type Story = StoryObj<typeof LocationsMap>;

// --- Una historia por estado ---
export const CasoFeliz: Story = { args: { points: puntosMerida, zoom: 13 } };
export const Cargando: Story = { args: { points: [], loading: true } };
export const SinPuntos: Story = { args: { points: [], onAddLocation: () => console.log("agregar ubicación") } };
export const ConError: Story = { args: { points: [], error: "No hay conexión con el servidor.", onRetry: () => console.log("reintentar") } };
export const Seleccionado: Story = { args: { points: puntosMerida, selectedId: "3", zoom: 13 } };
export const ModoOscuro: Story = { args: { points: puntosMerida, theme: "dark", zoom: 13 } };

// Criterio de aceptación: fluido con 50+ puntos.
const muchos: MapPoint[] = Array.from({ length: 60 }, (_, i) => ({
  id: String(i),
  nombre: `Punto ${i + 1}`,
  lat: 20.97 + Math.sin(i) * 0.06,
  lng: -89.62 + Math.cos(i) * 0.06,
  radio: 80 + (i % 5) * 30,
  estado: (["activo", "inactivo", "incidencia"] as const)[i % 3],
}));
export const MuchosPuntos: Story = { args: { points: muchos, zoom: 11, cluster: true } };

// Cobertura nacional: estaciones Full Gas en todo México (posiciones de ejemplo por
// ciudad). El mismo detalle de mapa que en Yucatán; las capas de CartoDB son globales.
const fullGas: MapPoint[] = [
  { id: "tij", nombre: "Full Gas Tijuana", lat: 32.5149, lng: -117.0382, radio: 150, estado: "activo" },
  { id: "mxli", nombre: "Full Gas Mexicali", lat: 32.6245, lng: -115.4523, radio: 150, estado: "activo" },
  { id: "her", nombre: "Full Gas Hermosillo", lat: 29.0729, lng: -110.9559, radio: 150, estado: "inactivo" },
  { id: "chi", nombre: "Full Gas Chihuahua", lat: 28.6353, lng: -106.0889, radio: 150, estado: "incidencia" },
  { id: "cul", nombre: "Full Gas Culiacán", lat: 24.8091, lng: -107.394, radio: 150, estado: "activo" },
  { id: "tor", nombre: "Full Gas Torreón", lat: 25.5428, lng: -103.4068, radio: 150, estado: "activo" },
  { id: "mty", nombre: "Full Gas Monterrey Valle", lat: 25.6543, lng: -100.3667, radio: 150, estado: "activo" },
  { id: "apo", nombre: "Full Gas Apodaca", lat: 25.7817, lng: -100.1886, radio: 150, estado: "incidencia" },
  { id: "slp", nombre: "Full Gas San Luis Potosí", lat: 22.1565, lng: -100.9855, radio: 150, estado: "activo" },
  { id: "ags", nombre: "Full Gas Aguascalientes", lat: 21.8853, lng: -102.2916, radio: 150, estado: "activo" },
  { id: "leo", nombre: "Full Gas León", lat: 21.1167, lng: -101.6833, radio: 150, estado: "inactivo" },
  { id: "qro", nombre: "Full Gas Querétaro", lat: 20.5888, lng: -100.3899, radio: 150, estado: "activo" },
  { id: "gdl", nombre: "Full Gas Guadalajara", lat: 20.6597, lng: -103.3496, radio: 150, estado: "activo" },
  { id: "zap", nombre: "Full Gas Zapopan", lat: 20.7236, lng: -103.3848, radio: 150, estado: "activo" },
  { id: "cdmx", nombre: "Full Gas CDMX Insurgentes", lat: 19.4326, lng: -99.1332, radio: 150, estado: "activo" },
  { id: "sat", nombre: "Full Gas Satélite", lat: 19.509, lng: -99.237, radio: 150, estado: "inactivo" },
  { id: "pue", nombre: "Full Gas Puebla", lat: 19.0414, lng: -98.2063, radio: 150, estado: "activo" },
  { id: "ver", nombre: "Full Gas Veracruz", lat: 19.1738, lng: -96.1342, radio: 150, estado: "activo" },
  { id: "oax", nombre: "Full Gas Oaxaca", lat: 17.0732, lng: -96.7266, radio: 150, estado: "activo" },
  { id: "tux", nombre: "Full Gas Tuxtla", lat: 16.7516, lng: -93.1029, radio: 150, estado: "activo" },
  { id: "mid", nombre: "Full Gas Mérida", lat: 20.9674, lng: -89.5926, radio: 150, estado: "activo" },
  { id: "cun", nombre: "Full Gas Cancún", lat: 21.1619, lng: -86.8515, radio: 150, estado: "incidencia" },
];
export const FullGasNacional: Story = { args: { points: fullGas, center: [23.6, -102.5], zoom: 5 } };
