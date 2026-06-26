import { useEffect } from "react";
import { useMap } from "react-leaflet";

/**
 * Arregla el bug de Leaflet donde el mapa se ve "cortado" cuando el contenedor
 * cambia de tamaño o se monta dentro de un layout que aún no tiene dimensiones
 * (Storybook, hot-reload, paneles que se abren/cierran).
 * Recalcula el tamaño tras montar y en cada cambio de tamaño del contenedor.
 */
export function AutoInvalidateSize() {
  const map = useMap();
  useEffect(() => {
    const fix = () => map.invalidateSize();
    const t1 = setTimeout(fix, 80);
    const t2 = setTimeout(fix, 350);
    const ro = new ResizeObserver(fix);
    ro.observe(map.getContainer());
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
    };
  }, [map]);
  return null;
}
