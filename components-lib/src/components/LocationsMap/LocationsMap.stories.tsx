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
export const SinPuntos: Story = { args: { points: [] } };
export const ConError: Story = { args: { points: [], error: "No hay conexión con el servidor." } };
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
export const MuchosPuntos: Story = { args: { points: muchos, zoom: 12 } };
