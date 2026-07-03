# BACKLOG — juan-pablos-first-project

> Fuente única de trabajo pendiente. Prioridad: P1 ya · P2 pronto · P3 algún día.
> Estados: `pendiente` · `en-curso` · `atorado` · `hecho`.

| ID | P | Ítem | Criterio de aceptación | Origen | Estado |
|---|---|---|---|---|---|
| B-001 | P1 | Limpiar legacy de la raíz (~12 MB) | Raíz trackeada = solo `.github`, `.gitignore`, `.claude`, `CLAUDE.md`, `app/`, `docs/`; legacy preservado en `_legacy/` (fuera de git); deploy sigue verde | AUDIT D1 | pendiente |
| B-002 | P1 | Barrer huérfanos de `app/` + launch.json global | Sin `App.css`, `assets/` de template, `vitest.shims.d.ts`, `public/icons.svg`; launch.json global sin entrada storybook; build verde | AUDIT D3+D4 | pendiente |
| B-003 | P1 | Reconstruir página `Yo` en React nativo | Sin iframe; contenido migrado al design system; `public/yo.html` y `support.js` eliminados; axe 0 | AUDIT D2 | pendiente |
| B-004 | P2 | Red mínima de tests | Vitest + Testing Library; humo + axe por componente (6); corre en CI como gate | AUDIT D5 | pendiente |
| B-005 | P2 | Unificar radio de card del design system | Un solo token (16px, spec de Luis) usado por los 6 componentes vía `rounded-card`; preview verificado | AUDIT D6 | pendiente |
| B-006 | P2 | `taupe-2`: documentar como no-texto | Token comentado en `index.css`; 0 usos como texto; axe 0 | AUDIT D7 | pendiente |
| B-007 | P2 | Gate de lint en CI | `pnpm lint` corre en el workflow antes del build; CI verde | AUDIT D8 | pendiente |
| B-008 | P2 | Meta description + Open Graph | Tags presentes en el `index.html` construido; favicon vigente confirmado | AUDIT D9 | pendiente |
| B-009 | P3 | Actualizar versiones de las GitHub Actions | Sin avisos de Node deprecado en los runs | AUDIT D10 | pendiente |

## Cerrados

| ID | Ítem | Commit | Bitácora |
|---|---|---|---|
