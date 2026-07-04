# CHANGELOG — loop tanda 2 (PLAN.md)

> Registro por vuelta del loop multi-agente (fase B del ejercicio). Una entrada
> por ítem al completarse — no al final — y resumen ejecutivo al cierre.
> Orquestación: builders `sonnet` construyen su carpeta; el orquestador (Fable 5)
> verifica con evidencia, cablea `/componentes` + README, y committea por ítem.

_(entradas del loop debajo)_

## Vuelta 1 · P-01 KpiStatCard — completado
- **Builder** (`sonnet`): 3 archivos (451 líneas), 21 tests propios. Semántica
  `deltaBuenoCuando` probada en los 4 casos (+0) vía `data-delta-semantica`.
- **Orquestador:** tests escopados 21/21 ✓; demo con 8 vistas en `/componentes`;
  fila+subsección en README. Gates completos y axe al cierre de la tanda.
- **Decisiones del builder (aceptadas):** aria-label "mejora/empeora N puntos"
  (equivalente funcional al ejemplo del plan); "sin delta" como sub-caso de `ok`.

## Vuelta 2 · P-02 WhatsAppCheckinCard — completado
- **Builder** (`sonnet`): 3 archivos (527 líneas), 19 tests. Los 4 tipos de
  MensajeChat probados; reduced-motion con matchMedia mockeado; suite 108/108.
- **Orquestador:** demo con 5 vistas; README. Nota: durante el vuelo, sus tests
  a medias tiraban la suite de los demás builders (matchMedia) — su
  auto-verificación lo resolvió sola antes de entregar, como manda el prompt.
- **Decisión del builder (aceptada):** colores de burbuja en hex derivados de
  tokens (coherente con el demo original de la página Klokk).
- **Oportunidad anotada (no ejecutada — fuera de alcance):** la página Klokk
  podría reemplazar su chat hecho a mano por este componente. Requiere decisión.

## Vuelta 3 · P-03 TeamStatusBoard — completado
- **Builder** (`sonnet`): 3 archivos (625 líneas), 16 tests (4 de axe). Test
  clave de filtrado: 6 miembros, clic en "Retardo" → solo 2 visibles, conteos
  de TODAS las pills correctos. Reutilización probada con grep: cero copias del
  markup de WorkerStatusCard, cero cambios a ese componente.
- **Orquestador:** demo principal interactiva + 4 estados; README. Sin
  desviaciones del plan.

## Vuelta 4 · P-04 StpsReportCard (stretch) — completado
- **Builder** (`sonnet`): 3 archivos (556 líneas), 23 tests. Completitud 18/22
  → "82%" probada; CTA solo invocable en "listo" (aria-disabled + onClick
  undefined en los demás, verificado con vi.fn()).
- **Lo que el builder ASUMIÓ mal (atrapado por el orquestador):** usó la clase
  `klk-indeterminate` "del design system" — no existía. Se agregó al design
  system (index.css) con su exclusión de reduced-motion. Lección: los builders
  citan APIs con confianza aunque no existan; verificar todo supuesto.
- **Fix del orquestador previo:** error de tipos en su test (Element vs
  HTMLElement) que además destapó que mi gate por grep dejaba pasar builds
  rojos → regla nueva: gates por EXIT CODE (commit 52ff038).
- **Orquestador:** demo con 5 vistas; README.

## Vuelta 5 · fixes de integración (verificación viva del orquestador)
El axe de página (el ÚNICO que mide contraste real — jsdom no puede) encontró
2 defectos de builders tras el cableado:
- **WhatsAppCheckinCard:** "en línea" con `text-white/75` sobre el verde de
  marca = 3.99:1 → `text-white/90` (AA).
- **StpsReportCard:** "3 incidencias marcadas" en ámbar #b07d2b como TEXTO =
  3.54:1 → texto a ámbar AA por tema (#6f4e12 / #dab36e), el ícono queda
  gráfico en #b07d2b (≥3:1 ✓).
Re-verificado: axe 0 en toda la página con los 10 componentes.

---

# RESUMEN EJECUTIVO — loop tanda 2 cerrado

| Ítem | Resultado | Commit | Tests propios |
|---|---|---|---|
| P-01 KpiStatCard | ✅ completado | `295902e` (+hotfix `52ff038`) | 21 |
| P-02 WhatsAppCheckinCard | ✅ completado | `e6d2eca` | 19 |
| P-03 TeamStatusBoard | ✅ completado | `7c8c10c` | 16 |
| P-04 StpsReportCard (stretch) | ✅ completado | `df6fbc3` | 23 |
| Fixes de integración | ✅ | (commit de cierre) | — |

**Números:** 4/4 ítems (stretch incluido) · 0 atorados · 0 bloqueados · suite
29 → **108 tests** · **axe 0** con 10 componentes · librería 6 → **10**.

**Hallazgos que el plan no preveía:**
1. Un builder ASUMIÓ una clase del design system que no existía
   (`klk-indeterminate`) y la citó como existente — los builders afirman APIs
   con confianza; todo supuesto se verifica. Se agregó al design system.
2. Mi gate por `grep "error"` convertía un build ROJO en verde (el match del
   texto pasaba la cadena). Un push salió con typecheck roto; se corrigió
   hacia adelante. Regla nueva: **gates por exit code, jamás por grep**.
3. El contraste solo se puede verificar VIVO: 2 defectos AA de builders
   invisibles para jsdom, cazados por el axe de página del orquestador.
4. Tests de un builder a medio vuelo tiran la suite de los demás (paralelismo);
   la auto-verificación de cada builder lo resuelve antes de entregar, pero el
   orquestador no debe correr gates globales hasta que todos aterricen.

**Dónde dudé / asumí:** los colores hex inline de los builders (vs clases
Tailwind) se aceptaron por coherencia con el patrón existente de la librería;
la "oportunidad Klokk.tsx" (usar WhatsAppCheckinCard en la página) quedó
anotada SIN ejecutar — es decisión de JP.

**Recomendación (una):** reemplazar el chat hecho a mano de la página Klokk
por `WhatsAppCheckinCard` — 30 líneas menos, un solo origen de verdad del
componente de marca, y la página gana los estados. Requiere tu ok (AP-006).
