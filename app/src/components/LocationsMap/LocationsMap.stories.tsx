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

// Full Gas (cadena del sureste): estaciones reales en Campeche, Yucatán y Quintana Roo.
// Coordenadas aproximadas por localidad. Fuente: fullgas.com.mx/ubicaciones.
const fullGas: MapPoint[] = [
  // --- Campeche ---
  { id: "cam-colosio", nombre: "Full Gas Colosio", lat: 19.845, lng: -90.523, radio: 150, estado: "activo" },
  { id: "cam-juarez", nombre: "Full Gas Juárez", lat: 19.838, lng: -90.533, radio: 150, estado: "activo" },
  { id: "cam-villacabra", nombre: "Full Gas Villa Cabra", lat: 19.857, lng: -90.546, radio: 150, estado: "inactivo" },
  { id: "cam-palmira", nombre: "Full Gas Palmira", lat: 19.852, lng: -90.515, radio: 150, estado: "activo" },
  { id: "cam-buenavista", nombre: "Full Gas Buenavista (Carmen)", lat: 18.645, lng: -91.83, radio: 150, estado: "activo" },
  { id: "cam-calkini1", nombre: "Full Gas Calkiní Centro", lat: 20.367, lng: -90.05, radio: 150, estado: "activo" },
  { id: "cam-calkini2", nombre: "Full Gas Calkiní Carretera", lat: 20.392, lng: -90.072, radio: 150, estado: "incidencia" },
  { id: "cam-champ1", nombre: "Full Gas Champotón Malecón", lat: 19.351, lng: -90.722, radio: 150, estado: "activo" },
  { id: "cam-champ2", nombre: "Full Gas Champotón Echeverría", lat: 19.36, lng: -90.715, radio: 150, estado: "activo" },
  { id: "cam-esc1", nombre: "Full Gas Escárcega Lemus", lat: 18.61, lng: -90.74, radio: 150, estado: "activo" },
  { id: "cam-esc2", nombre: "Full Gas Escárcega Alarcón", lat: 18.605, lng: -90.75, radio: 150, estado: "inactivo" },
  { id: "cam-hecel", nombre: "Full Gas Hecelchakán", lat: 20.17, lng: -90.13, radio: 150, estado: "activo" },
  { id: "cam-hopel", nombre: "Full Gas Hopelchén", lat: 19.746, lng: -89.845, radio: 150, estado: "activo" },
  { id: "cam-isla", nombre: "Full Gas Isla Aguada", lat: 18.78, lng: -91.49, radio: 150, estado: "activo" },
  { id: "cam-seyba", nombre: "Full Gas Seybaplaya", lat: 19.64, lng: -90.68, radio: 150, estado: "activo" },
  { id: "cam-tenabo", nombre: "Full Gas Tenabo", lat: 20.04, lng: -90.23, radio: 150, estado: "activo" },
  // --- Yucatán ---
  { id: "yuc-caucel", nombre: "Full Gas Caucel (Mérida)", lat: 20.99, lng: -89.71, radio: 150, estado: "activo" },
  { id: "yuc-chuburna", nombre: "Full Gas Chuburná (Mérida)", lat: 21.0, lng: -89.63, radio: 150, estado: "activo" },
  { id: "yuc-mulsay", nombre: "Full Gas Mulsay (Mérida)", lat: 20.95, lng: -89.66, radio: 150, estado: "incidencia" },
  { id: "yuc-uman", nombre: "Full Gas Umán", lat: 20.88, lng: -89.75, radio: 150, estado: "activo" },
  { id: "yuc-kanasin", nombre: "Full Gas Kanasín", lat: 20.93, lng: -89.56, radio: 150, estado: "activo" },
  { id: "yuc-motul", nombre: "Full Gas Motul", lat: 21.1, lng: -89.28, radio: 150, estado: "activo" },
  { id: "yuc-valla1", nombre: "Full Gas Valladolid Matriz", lat: 20.689, lng: -88.2, radio: 150, estado: "activo" },
  { id: "yuc-valla2", nombre: "Full Gas Valladolid Zací", lat: 20.695, lng: -88.19, radio: 150, estado: "inactivo" },
  { id: "yuc-tizimin", nombre: "Full Gas Tizimín", lat: 21.14, lng: -88.15, radio: 150, estado: "activo" },
  { id: "yuc-muna", nombre: "Full Gas Muna", lat: 20.49, lng: -89.71, radio: 150, estado: "activo" },
  { id: "yuc-oxk", nombre: "Full Gas Oxkutzcab", lat: 20.3, lng: -89.42, radio: 150, estado: "activo" },
  { id: "yuc-peto", nombre: "Full Gas Peto", lat: 20.13, lng: -88.92, radio: 150, estado: "activo" },
  { id: "yuc-piste", nombre: "Full Gas Pisté", lat: 20.7, lng: -88.58, radio: 150, estado: "activo" },
  { id: "yuc-elcuyo", nombre: "Full Gas El Cuyo", lat: 21.52, lng: -87.68, radio: 150, estado: "inactivo" },
  // --- Quintana Roo ---
  { id: "qr-cancun", nombre: "Full Gas Cancún Madero", lat: 21.16, lng: -86.85, radio: 150, estado: "activo" },
  { id: "qr-tulum1", nombre: "Full Gas Tulum Cobá", lat: 20.21, lng: -87.46, radio: 150, estado: "activo" },
  { id: "qr-tulum2", nombre: "Full Gas Tulum Crucero", lat: 20.2, lng: -87.47, radio: 150, estado: "incidencia" },
  { id: "qr-bacalar", nombre: "Full Gas Bacalar", lat: 18.68, lng: -88.39, radio: 150, estado: "activo" },
  { id: "qr-chetumal", nombre: "Full Gas Chetumal Héroes", lat: 18.51, lng: -88.3, radio: 150, estado: "activo" },
  { id: "qr-carrillo", nombre: "Full Gas Carrillo Puerto", lat: 19.58, lng: -88.05, radio: 150, estado: "activo" },
  { id: "qr-jmm", nombre: "Full Gas José María Morelos", lat: 19.75, lng: -88.7, radio: 150, estado: "inactivo" },
];
export const FullGasPeninsula: Story = { args: { points: fullGas, center: [19.8, -89.2], zoom: 7, cluster: true } };
