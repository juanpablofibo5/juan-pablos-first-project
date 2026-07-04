# PLAN.md — Librería Klokk · tanda 2 (dashboard)

> **Estado: EN REVISIÓN** — pendiente de aprobación de JP (fase A del ejercicio).
> **Insumo:** `docs/AUDIT-2026-07.md` + estado real de la librería (6 componentes
> hechos: LocationsMap, GeofenceField, LiveCheckinFeed, OvertimeMeter,
> IntegrityBadge, WorkerStatusCard — todos con axe 0 y tests).
> **Consumidor:** el loop de `agent-playbook/templates/PROMPT-LOOP.md`.
> **Estados de ítem:** `pendiente` · `en-curso` · `completado` · `atorado` · `bloqueado`.
> Al aprobarse, se registra en `docs/BACKLOG.md` como ítem que apunta aquí.

## Objetivo de la tanda

Completar las piezas que el dashboard de Klokk necesita para contarse solo:
KPIs de cabecera, el gancho del producto (checada por WhatsApp), el tablero de
equipo en vivo, y el gancho legal (reporte STPS). Con esto, la librería cubre
el flujo completo: **quién está → cómo checó → confiable o no → números → ley**.

## Criterio de "hecho" GLOBAL (aplica a TODO ítem, además del suyo)

- [ ] `pnpm lint` + `pnpm test` + `pnpm build` en verde.
- [ ] Test colocado `<Name>.test.tsx`: humo del estado feliz + estados baratos +
      `axe.run` con 0 violaciones (color-contrast off en jsdom, comentado — el
      contraste real se verifica en el preview vivo).
- [ ] Sección nueva en `/componentes` con **una vista por estado** (patrón actual).
- [ ] Fila en la tabla de `app/README.md` + subsección de props/estados.
- [ ] Convenciones: carpeta `PascalCase/` con `types.ts` + componente + test;
      props en español consistentes con la librería (`theme`, `estado`,
      `densidad`); tokens del design system (`rounded-card`, `text-ink-soft`…);
      cero `any`; el estado NUNCA comunicado solo por color; copy es-MX;
      fixtures de Full Gas Mérida/península.
- [ ] Commit atómico del ítem (convención 04: Por qué · Qué · Verificación ·
      Refs) + push.

## Fuera de alcance (el loop NO toca esto)

- Modificar los 6 componentes existentes (si un cambio parece necesario →
  `bloqueado: requiere decisión` y se anota en CHANGELOG.md).
- Las páginas `Yo`, `Klokk` y `Home` (solo `Componentes.tsx` gana secciones).
- Dependencias nuevas en `package.json`.
- Nota para P-02: la página Klokk tiene un chat demo hecho a mano; NO
  reemplazarlo en esta tanda — anotar la oportunidad en CHANGELOG.md.

---

## P-01 · KpiStatCard (TarjetaKPI) — `pendiente`

**Por qué primero:** la pieza más simple y más reutilizada (cabecera del
dashboard); calienta el loop y no depende de nada.

**Propósito:** métrica de cabecera con tendencia vs periodo anterior:
"Asistencia hoy 94% ▲2 vs semana pasada".

**API (`types.ts`):**
```ts
interface KpiStatCardProps {
  /** Etiqueta de la métrica: "Asistencia hoy". */
  etiqueta: string;
  /** Valor actual. */
  valor: number;
  /** Cómo formatear el valor. */
  formato?: "numero" | "porcentaje" | "horas"; // default "numero"
  /** Cambio vs periodo anterior; omitido = no se muestra tendencia. */
  delta?: number;
  /** Cuándo un delta es bueno: retardos que BAJAN son buenos. */
  deltaBuenoCuando?: "sube" | "baja"; // default "sube"
  /** Texto del comparativo. */
  periodo?: string; // default "vs semana pasada"
  /** Estado del componente. */
  estado?: "ok" | "cargando" | "error"; // default "ok"
  /** Mensaje corto cuando estado === "error". */
  mensajeError?: string;
  theme?: "light" | "dark";
}
```

**Estados:** valor · cargando (skeleton `klk-skeleton`) · error (mensaje, sin
valor) · sin delta (tendencia omitida).

**Variantes:** delta bueno (verde `#4b7a5a` + ▲/▼ según dirección), delta malo
(terracota), delta 0 ("sin cambio", gris); `formato` con unidades ("94%",
"46 h", "1,240"); light/dark.

**Criterio de hecho específico:**
- [ ] Semántica de `deltaBuenoCuando` correcta y **probada por test unitario**:
      `delta=-2` con `"baja"` pinta positivo (verde ▼); `delta=+2` con `"baja"`
      pinta negativo.
- [ ] Tendencia SIEMPRE flecha + texto + color (nunca solo color).
- [ ] `aria-label` que resume: "Asistencia hoy: 94 por ciento, mejora de 2
      puntos vs semana pasada".
- [ ] Los 4 estados renderizan en `/componentes` (grid de 4 KPIs de Full Gas).

---

## P-02 · WhatsAppCheckinCard (TarjetaCheckinWhatsApp) — `pendiente`

**Por qué segundo:** el gancho del producto (demo/landing); standalone, sin
dependencias de otros componentes.

**Propósito:** mockup fiel de la conversación de checada por WhatsApp: el
empleado manda "Entrada", comparte ubicación, Klokk confirma con hora y
sucursal. Es la versión componente del demo que hoy vive dibujado a mano en la
página Klokk.

**API (`types.ts`):**
```ts
type MensajeChat =
  | { de: "empleado"; tipo: "texto"; texto: string }
  | { de: "empleado"; tipo: "ubicacion"; dentroGeocerca: boolean }
  | { de: "klokk"; tipo: "texto"; texto: string }
  | { de: "klokk"; tipo: "confirmacion"; hora: string; sucursal: string };

interface WhatsAppCheckinCardProps {
  /** Nombre del contacto en la cabecera. */
  contacto?: string; // default "Klokk"
  /** Subtítulo de la cabecera. */
  estadoContacto?: string; // default "en línea"
  mensajes: MensajeChat[];
  /** true = los mensajes entran en secuencia (respeta reduced-motion). */
  animado?: boolean; // default false
  estado?: "ok" | "cargando" | "vacio"; // default "ok"
  theme?: "light" | "dark";
}
```

**Estados:** conversación · cargando (skeleton de burbujas) · vacío ("aún no
hay mensajes") · burbuja de ubicación **dentro** vs **fuera** del geocerco.

**Variantes:** `animado` (entrada secuencial con stagger; con
`prefers-reduced-motion` renderiza todo estático) · light/dark.

**Criterio de hecho específico:**
- [ ] Los 4 tipos de `MensajeChat` renderizan con su forma (test que monta los 4).
- [ ] Dentro/fuera del geocerco: pill con texto + ícono distinto (no solo color).
- [ ] `animado` **probado con matchMedia mockeado**: con reduced-motion no hay
      animación y todo es visible de inmediato.
- [ ] Cabecera con verde de marca `#237446` (es EL componente de marca).
- [ ] En `/componentes`: una conversación feliz animada + una con "fuera del
      geocerco" + estados.

---

## P-03 · TeamStatusBoard (TableroDeEquipo) — `pendiente`

**Por qué tercero:** es composición — reutiliza `WorkerStatusCard` (regla dura:
importarlo, no duplicarlo, no modificarlo) y el patrón de filtros de
`LiveCheckinFeed`. La pieza más compleja de la tanda.

**Propósito:** "¿quién está ahora?" — grid del equipo con filtros por estado y
conteos, en vivo.

**API (`types.ts`):**
```ts
import type { Worker, WorkerStatus, WorkerAction } from "../WorkerStatusCard/types";

interface MiembroEquipo {
  worker: Worker;
  status: WorkerStatus;
  lastCheckin?: number;
  insideGeofence?: boolean;
  nota?: string;
}

interface TeamStatusBoardProps {
  miembros: MiembroEquipo[];
  /** Filtro activo inicial. */
  filtroInicial?: WorkerStatus | "todos"; // default "todos"
  onSelectWorker?: (workerId: string) => void;
  /** Acciones del menú por miembro (se pasa a WorkerStatusCard). */
  acciones?: (m: MiembroEquipo) => WorkerAction[];
  densidad?: "comoda" | "compacta"; // se propaga a las cards
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  theme?: "light" | "dark";
}
```

**Estados:** grid con miembros · cargando (3–6 cards skeleton) · vacío ("aún no
hay equipo dado de alta") · error + botón reintentar · **filtro sin resultados**
("nadie en retardo ahora mismo" — mensaje positivo, no error).

**Variantes:** filtros `todos/presente/retardo/ausente/sin datos` como pills con
conteo (patrón LiveCheckinFeed) · densidad cómoda/compacta · light/dark.

**Criterio de hecho específico:**
- [ ] **Test unitario de filtrado:** fixture de 6 miembros; clic en "retardo" →
      solo retardos visibles y conteos correctos en cada pill.
- [ ] Reutiliza `WorkerStatusCard` importado — cero duplicación, cero cambios a
      ese componente (grep no muestra copias de su markup).
- [ ] Filtros navegables por teclado con foco visible; los conteos son texto.
- [ ] Grid responsive (1 col móvil / 2–3 en sm+).

---

## P-04 · StpsReportCard (TarjetaReporteSTPS) — `pendiente` · STRETCH

**Por qué al final:** stretch — valioso (el gancho legal: Art. 132 LFT, enero
2027) pero el dashboard funciona sin él. Si el loop llega con presupuesto, va.

**Propósito:** estado del registro mensual de jornada listo para inspección:
completitud, incidencias y descarga.

**API (`types.ts`):**
```ts
interface StpsReportCardProps {
  /** Mes del reporte: "junio 2026". */
  mes: string;
  empleados: number;
  /** Días con registro completo vs días laborables del mes. */
  diasRegistrados: number;
  totalDias: number;
  incidencias?: number; // default 0
  estado?: "listo" | "generando" | "incompleto" | "error"; // default "listo"
  onDescargar?: () => void;
  theme?: "light" | "dark";
}
```

**Estados:** listo (CTA "Descargar reporte") · generando (barra de progreso
indeterminada) · incompleto (qué falta: "3 días sin registro" + barra de
completitud) · error.

**Criterio de hecho específico:**
- [ ] Barra de completitud = % con **texto numérico al lado** (no solo barra).
- [ ] CTA con focus visible; deshabilitado (con `aria-disabled` y explicación)
      cuando `estado !== "listo"`.
- [ ] Test: completitud calculada correcta (18/22 → 82%) y CTA solo en "listo".

---

## Registro del loop

El loop marca aquí los estados y escribe su avance en `CHANGELOG.md` (una
entrada por vuelta + resumen ejecutivo al cierre), según PROMPT-LOOP.
