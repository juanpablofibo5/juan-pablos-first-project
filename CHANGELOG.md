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
