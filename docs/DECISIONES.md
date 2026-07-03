# DECISIONES — juan-pablos-first-project

> HISTÓRICO append-only: nunca edites entradas pasadas. Si una decisión cambia,
> entrada nueva que la reemplaza.

## DEC-001 · 2026-07-01 · Adoptar agent-playbook v1.1
- **Contexto:** el AUDIT 2026-07 mostró trabajo sólido pero sin sistema: hallazgos en
  un archivo suelto, decisiones sin registro, sin protocolo de loops.
- **Decisión:** adoptar el sistema de `github.com/juanpablofibo5/agent-playbook`
  como primer proyecto piloto: kernel `CLAUDE.md` + núcleo en `docs/` (STATUS,
  BACKLOG, DECISIONES, bitácora) + módulo APRENDIZAJES (trigger ya cumplido: hay
  4 mordidas reales documentables). `AUDIT.md` se mueve a `docs/AUDIT-2026-07.md`
  y sus hallazgos D1–D10 viven ahora como B-001…B-009 en el BACKLOG.
- **Descartado:** seguir con AUDIT.md como backlog informal — sin criterios de
  aceptación ni estados, no sirve para loops.
- **Consecuencias:** todo trabajo siguiente cumple la cadena ítem ↔ commit ↔
  bitácora ↔ decisión. Prácticas heredadas que ya eran regla: publicar por pieza
  verificada; axe 0 en componentes; regenerar lockfile al tocar dependencias.
- **Estado:** vigente

## DEC-002 · 2026-07-01 · Un solo radio de card: 16px vía token `rounded-card`
- **Contexto:** convivían dos radios (token `--radius-card: 14px` en 5 componentes y
  `rounded-2xl`/16px hardcodeado en WorkerStatusCard, que venía del spec de Luis:
  "radio 16px, borde 1px, sin sombra").
- **Decisión:** el token gana pero adopta el valor del spec: `--radius-card: 16px`,
  y TODOS los componentes usan la utilidad `rounded-card` (Tailwind v4 la genera del
  token). Prohibido hardcodear radios de card en px.
- **Descartado:** mantener dos radios "por tipo de card" — inconsistencia sin
  beneficio; y bajar todo a 14px — contradice el spec del design system.
- **Consecuencias:** cambio visual sutil (+2px) en los 5 componentes originales;
  verificado en preview (8 cards → 16px computado).
- **Estado:** vigente
