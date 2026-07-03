# CLAUDE.md — juan-pablos-first-project (Portafolio + Klokk)

> Kernel del sistema de agentes (doctrina:
> github.com/juanpablofibo5/agent-playbook). Si pasa de ~150 líneas, poda.

## Proyecto
- **Qué es:** portafolio de Juan Pablo Figueroa + librería de componentes en vivo de
  **Klokk** (SaaS de asistencia por WhatsApp para PyMEs mexicanas). Curso con Luis.
- **Stack:** Vite + React 19 + TypeScript + Tailwind v4 (tokens en `app/src/index.css`)
  + react-leaflet. Gestor: pnpm. Todo el código vive en `app/`.
- **Comandos** (desde `app/`): dev `pnpm dev` · build `pnpm build` · lint `pnpm lint`
- **Dev server:** usar el preview MCP (config "portfolio", puerto 5050) — NUNCA
  bootear servidores por Bash (ver AP-003).
- **Deploy:** push a `main` → GitHub Action → Pages (~40 s).
  Live: https://juanpablofibo5.github.io/juan-pablos-first-project/

## Al EMPEZAR cada sesión
1. Lee `docs/STATUS.md` — dónde estamos.
2. Lee los ítems abiertos de `docs/BACKLOG.md` — qué sigue.
3. ¿Continúas trabajo previo? Hojea la última entrada de `docs/bitacora/`.
4. Antes de tocar un área, revisa `docs/APRENDIZAJES.md` — lo que ya nos mordió.

## Al TERMINAR cada pieza
1. **Verifica con evidencia**: build/lint verdes; si es UI → preview + axe en 0.
2. Commit según convención (abajo) + **push** — se publica por pieza terminada y
   verificada; nunca a medias (preferencia explícita de JP).
3. Actualiza `docs/STATUS.md` y el ítem en `docs/BACKLOG.md`.
4. ¿Decisión no obvia? → `docs/DECISIONES.md` (append-only).
5. Bitácora de la sesión en `docs/bitacora/AAAA-MM-DD-tema.md`.
6. ¿Algo que solo JP puede hacer? → anótalo en `docs/PARA-HUMANO.md` (créalo si no
   existe) y sigue con otra cosa.

## Commits (doctrina 04 del playbook)
`tipo(ámbito): resumen` + **Por qué · Qué · Verificación · Refs (B-…, DEC-…)**.
Un commit = una pieza.

## Loops (doctrina 05)
1 ítem = 1 ciclo completo. 2 intentos y `atorado` (documentado + revertido).
2 atascos seguidos → cerrar loop con reporte en bitácora.

## Modelos (doctrina 03)
Orquestar/decidir/verificar: `fable` (hoy Fable 5) · construir con spec clara:
`sonnet` (hoy Sonnet 5) · barridos: `haiku`. La verificación final no se delega.

## Higiene específica de este repo
- **Lockfile:** CI instala con `--frozen-lockfile` — si cambias `package.json`,
  regenera `pnpm-lock.yaml` ANTES del push (ver AP-001).
- **Accesibilidad:** estándar del proyecto = 0 violaciones axe en `/componentes`.
- **Estados completos:** todo componente maneja cargando/vacío/error, con una vista
  por estado en `/componentes`; el estado nunca se comunica solo por color.
- **Design system:** tokens en `@theme` de `app/src/index.css`; el sistema Clay vive
  acotado a `.klokk-brand` (solo página Klokk) — no mezclar.
- `--color-taupe-2` es decorativo: NO usarlo como color de texto (falla AA, AP-004).
- Legacy pre-migración vive en `_legacy/` (fuera de git): no revivirlo; la página
  `Yo` aún lo usa vía `app/public/yo.html` hasta B-003.
