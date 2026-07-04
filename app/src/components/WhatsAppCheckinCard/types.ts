// WhatsAppCheckinCard · TarjetaCheckinWhatsApp — tipos
// Componente PRESENTACIONAL. Simula la conversación de checada por WhatsApp:
// el empleado manda "Entrada", comparte ubicación y Klokk confirma con hora
// y sucursal. Es la versión componente del gancho de producto de Klokk.

/** Mensaje de un participante en la conversación de checada. */
export type MensajeChat =
  | { de: "empleado"; tipo: "texto"; texto: string }
  | { de: "empleado"; tipo: "ubicacion"; dentroGeocerca: boolean }
  | { de: "klokk"; tipo: "texto"; texto: string }
  | { de: "klokk"; tipo: "confirmacion"; hora: string; sucursal: string };

export interface WhatsAppCheckinCardProps {
  /** Nombre del contacto mostrado en la cabecera. */
  contacto?: string; // default "Klokk"
  /** Subtítulo de la cabecera. */
  estadoContacto?: string; // default "en línea"
  /** Mensajes de la conversación. */
  mensajes: MensajeChat[];
  /** true = los mensajes entran en secuencia con stagger (respeta reduced-motion). */
  animado?: boolean; // default false
  /** Estado del componente. */
  estado?: "ok" | "cargando" | "vacio"; // default "ok"
  /** Tema visual. */
  theme?: "light" | "dark";
}
