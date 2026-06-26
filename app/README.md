# Klockk — Librería de componentes

Componentes de UI **presentacionales** (React + TypeScript) para el dashboard de
**Klockk**, un SaaS de control de asistencia por WhatsApp para PyMEs en México.
Documentados y probados de forma aislada en **Storybook**.

> Hecho por Juan Pablo Figueroa para el curso, junto al instructor Luis.

## Stack

- **React 19 + TypeScript** (compatible con Next.js)
- **Vite** (bundler) + **Storybook 10** (galería/documentación)
- **Tailwind CSS v4** con design system por tokens (`@theme` en `src/index.css`)
- **react-leaflet + Leaflet** (mapas) y **react-leaflet-cluster** (clústers)

## Componentes

| Componente | Para qué sirve en Klockk |
|---|---|
| **LocationsMap** | Mapa de las sucursales/ubicaciones del negocio, con su estado en vivo. |
| **GeofenceField** | Editor para fijar la ubicación y el geocerco (radio) de un punto. |
| **LiveCheckinFeed** | Lista en tiempo real de fichajes de entrada/salida. |
| **OvertimeMeter** | Visualiza las horas de la semana: normal / doble / triple (tiempo extra MX). |

### LocationsMap
- **Props:** `points`, `onSelectPoint?`, `selectedId?`, `center?`, `zoom?`, `theme?`, `loading?`, `error?`, `onRetry?`, `onAddLocation?`, `cluster?`
- **Estados:** cargando (skeleton) · sin puntos · error · seleccionado · hover
- **Extras:** clúster de marcadores, "volar" al punto seleccionado, geocercos proporcionales, vista de la cadena Full Gas en la península.

### GeofenceField
- **Props:** `value` (`{lat,lng,radio}`), `onChange`, `minRadio?`, `maxRadio?`, `disabled?`, `zoom?`, `theme?`
- **Estados:** interactivo (arrastrar pin / ajustar radio) · deshabilitado · valor inválido
- **Extras:** pin arrastrable, slider + número sincronizados, botón "Centrar en el pin", área en m².

### LiveCheckinFeed
- **Props:** `events`, `loading?`, `error?`, `onEventClick?`, `filter?`, `maxVisible?`, `theme?`
- **Estados:** cargando (skeleton) · vacío · streaming (entran animados) · error
- **Extras:** pills de estado (a tiempo / retardo / fuera de geocerco / no-show), hora relativa viva, `aria-live` para anunciar nuevos fichajes, paginación simple.

### OvertimeMeter
- **Props:** `normal`, `doble`, `triple`, `objetivo?`, `semanaAnterior?`, `theme?`
- **Estados:** cero horas · solo normal · con tiempo extra
- **Extras:** barra apilada proporcional, marca de objetivo, leyenda, tooltips, comparativo semana vs semana, animación de entrada.

## Design system

Tokens en `src/index.css` (`@theme`):

- **Neutros cálidos:** tinta `#1c1c1a`, papel `#fdfdfc`, líneas `#e7e5e1`, taupes.
- **Acentos:** azul `#3a5688`, terracota `#b5482f`.
- **Estados:** activo `#4b7a5a`, retardo/doble `#b07d2b`, incidencia/triple `#b5482f`.
- **Tipografía:** Bricolage Grotesque (títulos), IBM Plex Sans (cuerpo), JetBrains Mono (datos/horas).

Todos los componentes soportan **tema claro y oscuro** (`theme`).

## Accesibilidad

- Navegables por **teclado** con `:focus-visible`.
- **Roles y ARIA** correctos (`role="img"`/`alert`/`status`/`list`, `aria-live`, `aria-label`).
- El estado **nunca se comunica solo por color** (siempre hay etiqueta de texto).
- Respetan **`prefers-reduced-motion`**.
- **0 violations** de axe en todos los componentes.

## Cómo correr

```bash
pnpm install
pnpm storybook   # abre http://localhost:6006
```

Hay **una historia por estado** de cada componente. Otros comandos:

```bash
pnpm build             # build de la app Vite
pnpm storybook build   # build estático de la galería (storybook-static/)
```

## Decisiones de diseño

- **Presentacionales:** los componentes no traen lógica de negocio; reciben datos por props
  y avisan por callbacks. Esto los hace reutilizables y fáciles de probar.
- **Estados completos:** cada componente maneja cargando/vacío/error, no solo el caso feliz
  (es donde están la mayoría de los bugs en producción).
- **Calidad sobre cantidad:** pocos componentes impecables, con estados, accesibilidad y
  design system aplicado.
