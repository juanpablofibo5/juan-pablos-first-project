# Bitácora 2026-07-02 · restaurar personalidad de la página Yo (veto de JP)

- **Agente/modelo:** Fable 5 (sin builders: trabajo de sensibilidad de diseño tras
  un fallo de criterio en ese mismo terreno) · **Rama:** main · **Ítems:** B-011

## Objetivo
JP preguntó por qué desaparecieron el cubo J, las coordenadas animadas y el
timeline gráfico. Responder honesto (fue DEC-003, no un error) y restaurar los tres.

## Qué hice
- AP-006: regla nueva — decisiones de identidad visual NO se toman en loops
  autónomos; van a PARA-HUMANO antes de ejecutarse.
- DEC-004: restauración fiel en React (DEC-003 queda matizada).
- IntroCube + GeoCounter + TimelineInteractivo en Yo.tsx (+ CSS del cubo en
  index.css, zona global) → commit `2d631f5`.

## Hallazgos
- La herramienta de captura (~3 s por round-trip del proxy) no alcanza a
  fotografiar un splash de 2.6 s; la verificación funcional fue por DOM y por el
  flag de sesión (ciclo completo comprobado).
- El patrón tabs resolvió la tensión original: interacción como el legacy Y
  accesibilidad correcta (aria-selected, roving tabindex, flechas).

## Atascos
- Ninguno (un Edit falló por texto inexacto; segundo intento con el bloque releído).

## Decisiones
- DEC-004 (restaurar personalidad; matiza DEC-003)

## Estado al cerrar
lint ✅ · tests 29/29 ✅ · build ✅ · axe 0 en /yo ✅ · intro/coords/timeline
verificados en preview ✅ · publicado `2d631f5` ✅

## Recomendación
Sigue pendiente la **decisión de fase** en PARA-HUMANO. Y llevar AP-006 a la
doctrina del playbook (05-LOOPS) para que la regla aplique en TODOS los proyectos,
no solo aquí.

---

## Seguimiento (misma sesión) · el intro no se veía en visitas repetidas
JP reportó no ver el intro. Causa: mi gate de "una vez por sesión de navegador"
(sessionStorage) — otra micro-decisión de gusto no consultada; el original salía
en CADA visita. Fix: gate eliminado (aparece en cada montaje de la página, también
en navegación SPA), ventana 2.4 s = una revolución completa del cubo (2.2 s).
Verificado con captura real del overlay (truco: congelar animación + clonar nodo,
navegando por SPA para no matar el contexto del eval). Gates verdes.
