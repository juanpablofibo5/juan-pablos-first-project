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
