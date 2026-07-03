# Bitácora 2026-07-01 · LOOP 1 — higiene (deuda del AUDIT)

- **Agente/modelo:** Claude · Fable 5 (razonador, sin delegación: ítems chicos y
  secuenciales, delegar costaba más que ejecutar) · **Rama:** main
- **Ítems:** B-001, B-002, B-005, B-006, B-007, B-008 · **Límite:** 6 ítems / 2 atascos

## Resumen ejecutivo
Primer loop bajo el playbook: **6/6 ítems cerrados, 0 atascos**. El repo pasó de
cargar ~12 MB de legacy y huérfanos a una raíz limpia (solo fuente real), el design
system quedó con un solo radio de card por token, CI ahora corre lint como gate, y
el sitio tiene meta/OG para compartirse bien. Axe final: 0 violaciones. Quedan las
dos piezas grandes del AUDIT (B-003 página Yo, B-004 tests) para sesión dedicada.

## Tabla de ítems
| Ítem | Resultado | Commit | Nota |
|---|---|---|---|
| B-001 legacy raíz | hecho | `a380254` | 12 MB fuera de git, preservados en `_legacy/` (cero destrucción) |
| B-002 huérfanos app/ | hecho | `0838047` | + launch.json global sin storybook (config fuera del repo) |
| B-005 radio de card | hecho | `dc460cb` | token 16px + `rounded-card` en los 6; verificado: 8 cards → 16px computado |
| B-006 taupe-2 | hecho | `3fe76c2` | 0 usos como texto; token comentado (AP-004) |
| B-007 lint en CI | hecho | `97c17cc` | gate antes del build |
| B-008 meta/OG | hecho | `b519371` | 7 tags en dist; favicon ya era el vigente |

## Hallazgos
- El `launch.json` **del repo** ya estaba limpio; el que referenciaba Storybook era
  el **global** (`~/.claude/launch.json`) — el AUDIT no distinguía ambos. Corregido
  el global; sin cambio de repo.
- El favicon ya era el isotipo vigente (#237446) — B-008 se redujo a meta/OG.
- `taupe-2` ya no tenía usos como texto (el fix de axe del 2026-06-30 los eliminó);
  solo faltaba blindar el token con documentación.

## Atascos
- Ninguno.

## Decisiones
- DEC-002 · un solo radio de card: 16px vía token `rounded-card`

## Estado al cerrar
build ✅ · lint ✅ · axe 0 ✅ · árbol limpio ✅ · CI del último push: verificar en
`gh run list` (gate de lint incluido) — el loop cierra con el run en cola/verde.

## Recomendación
**B-003 (reconstruir `Yo` en React) como próxima sesión dedicada.** Es la única
página fuera del sistema (iframe sobre HTML legacy de 236 KB), bloquea borrar
`public/yo.html`/`support.js`, y con ella el AUDIT queda saldado salvo tests
(B-004, que conviene hacer justo después para congelar el estado bueno).
