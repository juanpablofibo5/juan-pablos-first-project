# BACKLOG — juan-pablos-first-project

> Fuente única de trabajo pendiente. Prioridad: P1 ya · P2 pronto · P3 algún día.
> Estados: `pendiente` · `en-curso` · `atorado` · `hecho`.

| ID | P | Ítem | Criterio de aceptación | Origen | Estado |
|---|---|---|---|---|---|
| B-015 | P2 | Higiene de la tanda 2: iconos compartidos + micro-limpiezas | `shared/iconos.tsx` con los primitivos (Pin/Check/Cross/Alerta); 8 funciones locales migradas sin cambio visual; `void deltaBuenoCuando` eliminado; gates + axe 0 | AUDIT 2026-07-b F-01/F-05 | pendiente |
| B-016 | P2 | Lazy-loading por ruta + foto optimizada | `React.lazy` por página + chunk de leaflet separado; /yo y /klokk no descargan el mapa; foto ≤40 KB; bundle inicial medido antes/después en el AUDIT | AUDIT 2026-07-b F-02 | pendiente |
| B-017 | P3 | Dieta de paleta de WhatsAppCheckinCard | 16 hex únicos → constantes nombradas estilo NIVEL/STATUS (o tokens); mismo render (screenshot antes/después idéntico); axe 0 | AUDIT 2026-07-b F-03 | pendiente |
| B-018 | P3 | Hora relativa consistente (hook `useAhora`) | WorkerStatusCard (y por composición TeamStatusBoard) actualizan "hace N min" cada 15 s como LiveCheckinFeed; test del hook | AUDIT 2026-07-b F-04 | pendiente |
| B-019 | P3 | Ciclo de vida de artefactos de loop | PLAN/CHANGELOG de tanda cerrada archivados en `docs/loops/2026-07-tanda2/`; regla en el playbook (07-CATALOGO) | AUDIT 2026-07-b F-06 | pendiente |
| B-020 | P3 | CI: cancel-in-progress en deploys | `cancel-in-progress: true` en el group pages; una ráfaga de pushes no deja runs rojos de cola | AUDIT 2026-07-b F-07 | pendiente |

## Cerrados

| ID | Ítem | Commit | Bitácora |
|---|---|---|---|
| B-001 | Limpiar legacy de la raíz (~12 MB → `_legacy/`) | `a380254` | 2026-07-01-loop-1-higiene |
| B-002 | Barrer huérfanos de `app/` + launch.json global | `0838047` | 2026-07-01-loop-1-higiene |
| B-005 | Radio de card unificado a 16px (`rounded-card`) | `dc460cb` | 2026-07-01-loop-1-higiene |
| B-006 | `taupe-2` documentado como no-texto | `3fe76c2` | 2026-07-01-loop-1-higiene |
| B-007 | Gate de lint en CI | `97c17cc` | 2026-07-01-loop-1-higiene |
| B-008 | Meta description + OG + theme-color | `b519371` | 2026-07-01-loop-1-higiene |
| B-010 | README de portada en la raíz | `e99aab7` | 2026-07-01-loop-2-nocturno |
| B-003 | Página `Yo` en React nativo (muere el último iframe) | `8f49871` | 2026-07-01-loop-2-nocturno |
| B-004 | Red de tests: 29 pruebas + gate en CI | `aa6d383` | 2026-07-01-loop-2-nocturno |
| B-009 | Actions al día — 0 avisos de Node deprecado (3 pases) | `58aa56d`+2 | 2026-07-01-loop-2-nocturno |
| B-011 | Restaurar personalidad del legacy en Yo (cubo J + coords + timeline) | `2d631f5` | 2026-07-02-restaurar-personalidad |
| B-012 | Intro y hero de Yo portados 1:1 del código fuente del legacy | `3628c53` | 2026-07-02-loop-3-port-exacto-intro |
| B-013 | Trendline de Trayectoria 1:1 (valle en jun 2023) — sin letrero | `b39bc57` | 2026-07-02-loop-3 (seguimiento) |
| B-014 | PLAN.md tanda 2: 4 componentes vía loop multi-agente (108 tests, axe 0) | `295902e`…cierre | 2026-07-02-loop-4-tanda2 |
