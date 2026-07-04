# Klokk — Portafolio + Librería de componentes

App **Vite + React + TypeScript** que reúne el portafolio de **Juan Pablo Figueroa** y la
librería de componentes de UI **presentacionales** para el dashboard de **Klokk**, un SaaS
de control de asistencia por WhatsApp para PyMEs en México.

Los componentes corren **nativos dentro del sitio** (sin iframes ni Storybook): se ven en
vivo en la ruta `/componentes`, con **una vista por estado**.

> Hecho por Juan Pablo Figueroa para el curso, junto al instructor Luis.

🔗 **En vivo:** https://juanpablofibo5.github.io/juan-pablos-first-project/

## Stack

- **React 19 + TypeScript**
- **Vite** (bundler y dev server) + **React Router** (rutas `/`, `/yo`, `/klokk`, `/componentes`)
- **Tailwind CSS v4** con design system por tokens (`@theme` en `src/index.css`)
- **react-leaflet + Leaflet** (mapas) y **react-leaflet-cluster** (clústers)
- **Deploy:** GitHub Actions → GitHub Pages (cada push a `main` reconstruye y publica)

## Componentes

| Componente | Para qué sirve en Klokk |
|---|---|
| **LocationsMap** | Mapa de las sucursales/ubicaciones del negocio, con su estado en vivo. |
| **GeofenceField** | Editor para fijar la ubicación y el geocerco (radio) de un punto. |
| **LiveCheckinFeed** | Lista en tiempo real de fichajes de entrada/salida. |
| **OvertimeMeter** | Visualiza las horas de la semana: normal / doble / triple (tiempo extra MX). |
| **IntegrityBadge** | Sello que certifica que una checada es confiable (geocerca, horario, GPS, identidad). |
| **WorkerStatusCard** | Tarjeta de trabajador para el tablero "¿quién está hoy?" (estado + geocerco + fichaje). |
| **KpiStatCard** | Métrica de cabecera del dashboard con tendencia semántica (retardos que bajan = verde). |
| **WhatsAppCheckinCard** | La conversación de checada por WhatsApp — el gancho del producto, como componente. |
| **TeamStatusBoard** | Tablero "¿quién está ahora?": filtros con conteo, componiendo WorkerStatusCard. |
| **StpsReportCard** | Registro mensual de jornada listo para inspección (Art. 132 LFT) con completitud y descarga. |

### LocationsMap
- **Props:** `points`, `onSelectPoint?`, `selectedId?`, `center?`, `zoom?`, `theme?`, `loading?`, `error?`, `onRetry?`, `onAddLocation?`, `cluster?`
- **Estados:** cargando (skeleton) · sin puntos · error · seleccionado · hover
- **Extras:** clúster de marcadores, "volar" al punto seleccionado, geocercos proporcionales.

### GeofenceField
- **Props:** `value` (`{lat,lng,radio}`), `onChange`, `minRadio?`, `maxRadio?`, `disabled?`, `zoom?`, `theme?`
- **Estados:** interactivo (arrastrar pin / ajustar radio) · deshabilitado · valor inválido
- **Extras:** pin arrastrable, slider + número sincronizados, botón "Centrar en el pin", área en m².

### LiveCheckinFeed
- **Props:** `events`, `loading?`, `error?`, `onEventClick?`, `filter?`, `maxVisible?`, `theme?`
- **Estados:** cargando (skeleton) · vacío · streaming (entran animados) · error
- **Extras:** pills de estado, hora relativa viva, `aria-live` para anunciar nuevos fichajes.

### OvertimeMeter
- **Props:** `normal`, `doble`, `triple`, `objetivo?`, `semanaAnterior?`, `theme?`
- **Estados:** cero horas · solo normal · con tiempo extra
- **Extras:** barra apilada proporcional, marca de objetivo, leyenda, comparativo semana vs semana.

### IntegrityBadge
- **Props:** `señales`, `empleado?`, `sucursal?`, `tipo?`, `timestamp?`, `puntaje?`, `folio?`, `acciones?`, `estado?`, `theme?`
- **Estados:** verificado · revisar · sospechoso · cargando · vacío
- **Extras:** sello tipo estampa, índice de confianza (0–100), barra de acento por nivel, slot de acciones, folio de auditoría.

### WorkerStatusCard
- **Props:** `worker`, `status`, `lastCheckin?`, `insideGeofence?`, `nota?`, `onSelect?`, `acciones?`, `densidad?`, `theme?`
- **Estados:** presente · retardo · ausente · sin datos
- **Extras:** avatar con iniciales, píldora de estado, indicador dentro/fuera del geocerco, último fichaje relativo, menú de acciones accesible, densidad cómoda/compacta, tarjeta seleccionable.

### KpiStatCard
- **Props:** `etiqueta`, `valor`, `formato?`, `delta?`, `deltaBuenoCuando?`, `periodo?`, `estado?`, `mensajeError?`, `theme?`
- **Estados:** valor · cargando · error · sin tendencia
- **Extras:** semántica de tendencia por contexto (`deltaBuenoCuando="baja"`), formatos %/horas/miles, flecha+texto nunca solo color.

### WhatsAppCheckinCard
- **Props:** `contacto?`, `estadoContacto?`, `mensajes`, `animado?`, `estado?`, `theme?`
- **Estados:** conversación · cargando · vacío · ubicación dentro/fuera del geocerco
- **Extras:** 4 tipos de mensaje tipados (texto/ubicación/confirmación), entrada animada con stagger que respeta reduced-motion, cabecera con verde de marca e isotipo.

### TeamStatusBoard
- **Props:** `miembros`, `filtroInicial?`, `onSelectWorker?`, `acciones?`, `densidad?`, `loading?`, `error?`, `onRetry?`, `theme?`
- **Estados:** grid · cargando (skeletons) · vacío · error+reintentar · filtro sin resultados (positivo)
- **Extras:** composición pura de WorkerStatusCard (cero duplicación), filtros pills con conteo navegables por teclado, grid responsive 1/2/3 columnas.

### StpsReportCard
- **Props:** `mes`, `empleados`, `diasRegistrados`, `totalDias`, `incidencias?`, `estado?`, `mensajeError?`, `onDescargar?`, `theme?`
- **Estados:** listo · generando (barra indeterminada) · incompleto (qué falta) · error
- **Extras:** completitud con barra + % SIEMPRE en texto, CTA con aria-disabled explicado cuando no está listo, incidencias en ámbar con ícono.

## Design system

Tokens en `src/index.css` (`@theme`):

- **Neutros cálidos:** tinta `#1c1c1a`, papel `#fdfdfc`, líneas `#e7e5e1`, taupes.
- **Acentos:** azul `#3a5688`, terracota `#b5482f`, verde de marca `#237446`.
- **Estados:** activo `#4b7a5a`, retardo/doble `#b07d2b`, incidencia/triple `#b5482f`.
- **Tipografía:** Bricolage Grotesque (títulos), IBM Plex Sans (cuerpo), JetBrains Mono (datos/horas).

Todos los componentes soportan **tema claro y oscuro** (`theme`).

## Accesibilidad

- Navegables por **teclado** con `:focus-visible`.
- **Roles y ARIA** correctos (`role="img"`/`alert`/`status`/`list`/`menu`, `aria-live`, `aria-label`).
- El estado **nunca se comunica solo por color** (siempre hay etiqueta de texto o forma).
- Respetan **`prefers-reduced-motion`**.
- **0 violations** de axe en todos los componentes.

## Cómo correr

```bash
pnpm install
pnpm dev        # abre http://localhost:5173 — los componentes están en /componentes
pnpm build      # build de producción
pnpm preview    # sirve el build localmente
pnpm lint       # oxlint
```

## Decisiones de diseño

- **Presentacionales:** los componentes no traen lógica de negocio; reciben datos por props
  y avisan por callbacks. Esto los hace reutilizables y fáciles de integrar.
- **Estados completos:** cada componente maneja cargando/vacío/error, no solo el caso feliz
  (es donde están la mayoría de los bugs en producción).
- **Calidad sobre cantidad:** pocos componentes impecables, con estados, accesibilidad y
  design system aplicado.
- **Nativos, no aislados:** la galería vive dentro del propio sitio (ruta `/componentes`),
  así que lo que ves en desarrollo es exactamente lo que se publica.
