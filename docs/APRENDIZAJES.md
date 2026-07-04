# APRENDIZAJES — juan-pablos-first-project

> HISTÓRICO append-only. Lo que ya nos mordió una vez no nos muerde dos.
> Léelo antes de tocar el área correspondiente. (Backfill inicial: 2026-07-01.)

## AP-001 · 2026-06 · pnpm v11 bloquea build scripts en CI `[ci]`
- **Síntoma:** deploy fallaba instalando dependencias (esbuild sin binario).
- **Causa real:** pnpm v11 bloquea los build scripts de dependencias por seguridad.
- **Regla que queda:** CI instala con `--frozen-lockfile --ignore-scripts` (los
  binarios llegan como paquetes de plataforma). Y si cambias `package.json`,
  **regenera `pnpm-lock.yaml` antes del push** o CI truena.
- **Refs:** commit `0edea98`, workflow `.github/workflows/deploy.yml`

## AP-002 · 2026-06 · El proxy del preview rompe iframes con `.html` `[preview]`
- **Síntoma:** Storybook/pages embebidas en iframe daban 404 solo dentro del preview
  de Claude; probamos 3 servidores distintos sin éxito.
- **Causa real:** el proxy del preview recorta `.html` y query strings de las
  sub-peticiones de iframes. No era el servidor.
- **Regla que queda:** nada de iframes para contenido propio en dev; los componentes
  se renderizan **nativos** en la app (fue el origen de la migración a React unificado).
- **Refs:** decisión "Opción B", commit `5c9a0cf`

## AP-003 · 2026-06 · No bootear servidores con Bash `[entorno]`
- **Síntoma:** la Mac colapsó (procesos agotados; hasta `echo` fallaba) tras arrancar
  Storybook ~15 veces vía Bash para screenshots.
- **Causa real:** ciclos boot/kill de servidores por Bash acumulan procesos huérfanos.
- **Regla que queda:** los servidores de dev SIEMPRE por el preview MCP (un proceso
  persistente, config "portfolio"); jamás `pnpm dev &` en Bash.
- **Refs:** bitácora oral de la sesión 2026-06 (pre-sistema)

## AP-004 · 2026-06 · `--color-taupe-2` falla AA como texto `[design-system]`
- **Síntoma:** axe reportó 3 violaciones de contraste en subtítulos de la galería.
- **Causa real:** `#8f8c84` sobre papel `#fdfdfc` da 3.29:1 (< 4.5:1 AA para texto).
- **Regla que queda:** `taupe-2` es SOLO decorativo (puntos, bordes); para texto
  secundario usar `ink-soft`.
- **Refs:** fix en Componentes.tsx (sesión 2026-06-30), B-006

## AP-005 · 2026-07-01 · `gh run list` justo tras el push agarra el run viejo `[ci]`
- **Síntoma:** "verifiqué" anotaciones de un run que en realidad era el anterior
  (el nuevo aún no existía cuando corrió `gh run list --limit 1`).
- **Causa real:** GitHub tarda segundos en crear el run; el list inmediato devuelve
  el previo. Además, `deploy-pages` puede fallar transitorio ("Deployment failed,
  try again later") — un rerun lo resuelve.
- **Regla que queda:** resolver el run SIEMPRE por `headSha` del commit
  (`gh run list --json databaseId,headSha | select(.headSha==$SHA)`), y ante un
  fallo de deployment sin causa en el build: `gh run rerun --failed` UNA vez antes
  de diagnosticar.
- **Refs:** B-009 (pases 2 y 3), bitácora 2026-07-01-loop-2-nocturno

## AP-006 · 2026-07-02 · Las decisiones de gusto/producto no se toman en loops autónomos `[proceso]`
- **Síntoma:** JP volvió y preguntó "¿por qué desaparecieron el cubo J, las
  coordenadas animadas y el timeline gráfico?" — piezas que el loop nocturno
  eliminó al reconstruir la página Yo (DEC-003).
- **Causa real:** el agente trató una decisión de PERSONALIDAD del producto como
  decisión técnica. Argumentos de a11y/simplicidad válidos, pero la identidad
  visual es territorio del dueño; documentarla en DECISIONES no sustituye pedir
  su veto.
- **Regla que queda:** en trabajo autónomo, todo cambio que ALTERE la identidad
  visual o elimine elementos distintivos existentes → fila en PARA-HUMANO
  ("propongo quitar X por Y — ¿apruebas?") ANTES de ejecutarlo, o se implementa
  preservando el elemento. Reconstruir ≠ rediseñar sin permiso.
- **Refs:** DEC-003, bitácora 2026-07-01-loop-2-nocturno, sesión 2026-07-02

## AP-007 · 2026-07-02 · Las animaciones no se aproximan: se portan del código fuente `[proceso]`
- **Síntoma:** tres iteraciones del intro rechazadas por el dueño ("no es como
  antes") a pesar de gates verdes y axe 0.
- **Causa real:** reconstruí de memoria/fragmentos una coreografía cuyo código
  exacto estaba disponible en `_legacy/`. Los detalles que hacen el "feel"
  (rotateX −22°, 7 s/vuelta, blur 7px, jitter del contador, cascada i·105) no se
  adivinan — se leen.
- **Regla que queda:** para replicar comportamiento existente: (1) extraer PRIMERO
  la implementación original completa (tiempos, easings, estados iniciales,
  markup); (2) portarla literal; (3) solo entonces proponer mejoras, marcadas como
  tales. Verificar contra la referencia con muestreo temporal (tip: navegación SPA
  dentro de un eval — la navegación completa en el preview tarda 10–13 s y llega
  tarde a las fases tempranas).
- **Refs:** B-012, DEC-005, bitácora 2026-07-02-loop-3
