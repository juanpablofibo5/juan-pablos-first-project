/**
 * Página "Yo": carga la versión original (pre-migración) tal como estaba.
 * El documento vive en public/yo.html (con su framework public/support.js y la
 * foto en base64 inline). Se embebe a pantalla completa, rompiendo el contenedor
 * de la app; su nav propio queda oculto para no duplicar el header compartido.
 */
export default function Yo() {
  return (
    <div className="ml-[calc(50%-50vw)] w-screen">
      <iframe
        src={`${import.meta.env.BASE_URL}yo.html`}
        title="Juan Pablo Figueroa — Sobre mí"
        loading="lazy"
        className="block w-full border-0"
        style={{ height: "calc(100vh - 3.5rem)" }}
      />
    </div>
  );
}
