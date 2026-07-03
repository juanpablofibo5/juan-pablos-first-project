# AUDIT.md — Portafolio + Librería Klokk

> Auditoría en **solo lectura** · 2026-07-01 · no se modificó ningún archivo de código.
> Repo: `juan-pablos-first-project` · rama `main` · live: https://juanpablofibo5.github.io/juan-pablos-first-project/

---

## 1 · Mapa de arquitectura

El repo tiene **dos capas superpuestas**: la app real (en `app/`, lo único que se
construye y despliega) y una gran capa de **artefactos legacy en la raíz** (sitio
estático pre-migración + builds viejos), toda versionada pero muerta.

```
juan-pablos-first-project/
│
├── app/                         ← ✅ LA APP REAL (Vite + React 19 + TS + Tailwind v4)
│   ├── index.html               entry HTML (favicon.svg, título, #root)
│   ├── src/
│   │   ├── main.tsx             createRoot → <BrowserRouter basename=BASE_URL>
│   │   ├── App.tsx             header sticky + nav + <Routes>
│   │   ├── index.css           design system (2 sistemas de tokens, ver abajo)
│   │   ├── pages/              Home · Yo · Klokk · Componentes
│   │   ├── components/         6 presentacionales + brand/ + shared/
│   │   └── assets/            ⚠️ hero.png, react.svg, vite.svg (template, sin uso)
│   ├── public/                favicon.svg, icons.svg⚠️, support.js⚠️, yo.html⚠️
│   ├── vite.config.ts         base '/juan-pablos-first-project/' en prod
│   └── package.json           React 19, RRD 7, leaflet; sin Storybook (removido)
│
├── .github/workflows/deploy.yml ← push a main → build → Pages (+ 404 SPA fallback)
│
└── [RAÍZ LEGACY — ~12 MB muertos, versionados, NO desplegados]
    ├── Portfolio JP.html (700K) · Portfolio JP (offline).html (708K)
    ├── index.html · klockk.html · yo.html (236K) · componentes.html · support.js (56K)
    ├── storybook/ (9 MB, build estático) · screenshots/ (244K) · uploads/ (1.2 MB)
    └── .thumbnail · dev-server.mjs
```

**Flujo de ejecución (runtime):**
`main.tsx` → `BrowserRouter` (basename = base de Vite) → `App` (nav + rutas) →
página. Rutas: `/` `→` Home, `/yo`, `/klokk` (+ redirect `/klockk`), `/componentes`.

**Datos:** 100 % mock/in-page (arrays de ejemplo). No hay backend ni capa de datos —
es correcto: los componentes son **presentacionales** (reciben props, avisan por callbacks).

**Design system (`src/index.css`) — dos sistemas conviven a propósito:**
1. **Global neutro** (`@theme`): tinta/papel/línea, azul acento `#3a5688`, mono/display.
   Lo usan Home, Componentes y los 6 componentes.
2. **Clay, acotado a `.klokk-brand`**: verde de marca `#237446`, superficies con sombra
   "clay", curvas y duraciones. Solo la página Klokk. Bien encapsulado para no contaminar.

**Deploy:** `git push main` → GitHub Actions (`pnpm install --frozen-lockfile
--ignore-scripts` → `pnpm build` → `cp dist/index.html dist/404.html` para deep-links) →
Pages. Automático, ~40 s. **El fallback SPA está resuelto en CI** (no hay bug de rutas).

---

## 2 · Inventario de componentes

### Componentes de UI (`src/components/`)

| Componente | Estado | Notas |
|---|:--:|---|
| **LocationsMap** | ✅ Completo | Mapa Leaflet + clúster. Estados: cargando/vacío/error/seleccionado/hover. 0 axe. |
| **GeofenceField** | ✅ Completo | Pin arrastrable + radio. Estados: interactivo/deshabilitado/inválido. |
| **LiveCheckinFeed** | ✅ Completo | Feed en vivo. Estados: cargando/vacío/streaming/error. `aria-live`. |
| **OvertimeMeter** | ✅ Completo | Data-viz de horas. Estados: cero/solo-normal/con-extra. |
| **IntegrityBadge** | ✅ Completo | Sello de confianza. 5 estados + índice + acciones. 0 axe. |
| **WorkerStatusCard** | ✅ Completo | Tarjeta de trabajador. 4 estados + menú/densidad/seleccionable. 0 axe. |

### Soporte (`brand/` y `shared/`)

| Pieza | Estado | Notas |
|---|:--:|---|
| **KlokkMark** | ✅ Completo | Isotipo SVG, color/tamaño/tema por props. |
| **CountUp** | ✅ Completo | Animación de números (usada en Klokk). |
| **Reveal** | ✅ Completo | Entrada por scroll. |
| **AutoInvalidateSize** | ✅ Completo | Helper de Leaflet (recalcula tamaño). |

### Páginas (`src/pages/`)

| Página | Estado | Notas |
|---|:--:|---|
| **Klokk** | ✅ Completo | 447 líneas, React nativo, sistema Clay, contenido íntegro. Impecable. |
| **Componentes** | ✅ Completo | Galería en vivo de los 6, una vista por estado. |
| **Home** | 🟡 Mínimo | Landing de 29 líneas: hero + 3 tarjetas. Funciona pero es delgado (sin cierre/contacto). |
| **Yo** | 🟠 A medias | **No es React**: un `<iframe>` que embebe el legacy `public/yo.html` (236K) + `support.js`. Hack funcional, pero es una isla de mantenimiento pesada e inconsistente. |

### Faltante / no construido

| Ítem | Estado | Por qué importa |
|---|:--:|---|
| **Tests automatizados** | ❌ Falta | Cero. La correctitud (a11y, interacción) se verifica **a mano**. Al quitar Storybook+vitest quedó sin red de seguridad. |
| **Página "Yo" nativa** | ❌ Falta | Existe solo como iframe legacy (ver arriba). |
| **Meta/SEO + OG tags** | ❌ Falta | `index.html` solo tiene title+favicon; sin description ni Open Graph para compartir. |

---

## 3 · Deuda técnica priorizada

### 🔴 Alta — ruido y peso que estorban ya

**D1 · ~12 MB de legacy versionado en la raíz.**
`Portfolio JP.html` (700K), `Portfolio JP (offline).html` (708K), `index.html`,
`klockk.html`, `yo.html` (236K), `componentes.html`, `support.js` (56K), `storybook/`
(9 MB, build estático **ya huérfano** tras remover Storybook), `screenshots/` (244K),
`uploads/` (incluye `AAmerican_identity_exhibition.html`, ajeno al proyecto), `.thumbnail`.
No se despliegan (CI solo construye `app/`), pero inflan el repo, confunden qué es fuente
real, y ralentizan clones. **Fix:** borrar del control de versiones (git rm). Impacto alto,
esfuerzo bajo.

**D2 · La página `Yo` es un iframe sobre HTML legacy.**
Depende de `public/yo.html` (236K con foto en base64) + `public/support.js` (framework
propio). Rompe el contenedor de la app (`w-screen`), no comparte el design system, y no
se puede mantener como el resto. **Fix:** reconstruir `Yo` en React nativo (como Klokk) y
eliminar los `public/*.html/js` legacy. Impacto alto, esfuerzo medio.

### 🟡 Media — huérfanos y falta de red de seguridad

**D3 · Archivos huérfanos dentro de `app/`.**
`src/App.css` (184 líneas, **no se importa**), `src/assets/{hero.png,react.svg,vite.svg}`
(plantilla Vite, sin uso), `vitest.shims.d.ts` (huérfano tras quitar vitest),
`public/icons.svg` (sin referencias). **Fix:** eliminar. Esfuerzo bajo.

**D4 · `.claude/launch.json` aún referencia Storybook.**
Config de arranque con una entrada `storybook` que ya no existe. **Fix:** quitar esa entrada.
Esfuerzo trivial.

**D5 · Cero tests automatizados.**
Para una **librería de componentes**, no tener ni un test de humo es la deuda más
silenciosa: cualquier regresión (una prop rota, un estado que deja de renderizar, una
violación de axe nueva) pasa sin avisar. **Fix:** reintroducir Vitest + Testing Library
(unit) o Playwright (a11y con axe) con 1–2 pruebas por componente. Esfuerzo medio.

### 🟢 Baja — pulido y consistencia

**D6 · Dos radios de card en el design system.**
Token `--radius-card: 14px` (lo usan los 4 componentes viejos con `rounded-[14px]`) vs.
`rounded-2xl` (16px) en WorkerStatusCard. **Fix:** unificar a un solo token.

**D7 · `--color-taupe-2` (#8f8c84) es una trampa de contraste.**
Falla AA como texto sobre papel (3.29:1). Ya causó 3 violaciones de axe (corregidas) pero
el token invita a reincidir. **Fix:** documentarlo "no para texto" o oscurecerlo.

**D8 · CI no corre lint.**
Existe `pnpm lint` (oxlint) pero el workflow solo hace `pnpm build` (que sí typechea con
`tsc`). **Fix:** agregar un paso de lint/typecheck como gate. Esfuerzo bajo.

**D9 · `index.html` sin meta description / OG.** Y verificar que `public/favicon.svg` sea
el isotipo nuevo (#237446), no el viejo. Esfuerzo bajo.

**D10 · Avisos de Node deprecado en CI** (actions forzadas a Node 24). Cosmético; subir
versiones de las actions cuando toque.

---

## 4 · Qué construiría primero (y por qué) — 5 bullets

1. **Limpiar la raíz legacy (D1) — primero de todo.** Es el cambio de mayor relación
   valor/esfuerzo: `git rm` de ~12 MB muertos deja el repo legible y hace que el resto de
   la auditoría "aterrice". Media hora, cero riesgo (nada de eso se despliega).

2. **Reconstruir la página `Yo` en React nativo (D2).** Es el único agujero real de
   producto: hoy es un iframe legacy que rompe la coherencia visual y el mantenimiento.
   Reconstruirla cierra la migración y permite borrar los `public/*.html/js` — matando D2
   y parte de D3 de un golpe.

3. **Barrer los huérfanos de `app/` y el launch.json (D3 + D4).** `App.css`, `assets/`
   template, `vitest.shims`, `icons.svg`, entrada Storybook en launch.json. Trivial, y deja
   la base sin "código zombie" que confunda a quien lea el proyecto (incluido tu yo futuro).

4. **Reintroducir una red mínima de tests (D5).** Aunque sea 1 prueba de humo + axe por
   componente. Es una librería: sin tests, cada mejora futura es a ciegas. Poner el andamiaje
   ahora (con 6 componentes estables) es el mejor momento — captura el estado "bueno" como
   línea base.

5. **Cerrar el pulido del design system (D6 + D7 + D8).** Unificar el radio de card,
   marcar `taupe-2` como no-texto, y añadir el gate de lint en CI. Son detalles, pero son
   los que hacen que la librería se sienta *sistema* y no colección — y el gate de CI evita
   que la deuda vuelva a entrar.

> **Orden sugerido:** D1 → (D3+D4) → D2 → D5 → (D6+D7+D8). Empezar por lo barato y de alto
> impacto (limpieza) baja el ruido antes de meter trabajo nuevo (reconstruir `Yo`, tests).
