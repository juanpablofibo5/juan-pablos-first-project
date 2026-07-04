# Bitácora 2026-07-02 · LOOP 3 (nocturno) — port 1:1 del intro del legacy

- **Agente/modelo:** Fable 5 · **Rama:** main · **Ítems:** B-012
- **Contexto:** tercer intento sobre el intro de Yo. JP (3 veces): "quiero que se
  vea EXACTAMENTE como antes, smooth y clean; corre un loop hasta lograrlo".

## Resumen ejecutivo
Dejé de aproximar y porté la coreografía **desde el código fuente** del legacy
(`runBrandIntro`/`prepIntro`/`runIntro`/`animateGeo`). Aparecieron los detalles
que hacían el "feel" y que mis dos aproximaciones no tenían: **cubo inclinado
(rotateX −22°) a 7 s/vuelta**, J plana de 150px que se disuelve escalando,
desintegración de caras hacia afuera, nombre en 18 letras con blur(7px) y stagger
exacto, cascada del hero con los easings originales, y **jitter** en las
coordenadas (tiemblan "buscando señal" con easing cuártico). Hero reestructurado a
la maqueta original. Verificado con muestreo temporal contra la fuente: **todas
las marcas coinciden**. Gates verdes, axe 0, desplegado.

## Qué hice
- Extracción completa del original (funciones + markup + keyframes + estados
  iniciales) con Python sobre `_legacy/yo.html` → tabla de 8 diferencias graves
  contra mi versión anterior.
- Port literal en `Yo.tsx` + `index.css` → commit `3628c53`.
- Referencia viva montada en `public/_ref/` para A/B (gitignorada y eliminada al cierre).

## Verificación (muestreo temporal, SPA-nav)
1.0 s J sí/cubo no · 2.1 s `yo-cube-spin/7s` + matrix3d + J fuera · 3.4 s overlay
0.42 en disolución + desintegración + 18/18 letras en vuelo + foto lista · 5.3 s
jitter vivo (9.0880 → 12.8910) · 7.4 s `20.9674° N · 89.6237° W` + fijado ✓ +
overlay desmontado. Axe 0. Lint/tests/build verdes.

## Hallazgos
- El "fijado ✓" del original era **código muerto** (ref sin cablear — verificado
  dos veces en vivo). Se conserva el nuestro como mejora, con bendición implícita
  de JP ("con las nuevas mejoras").
- `geoPulse`/`geoSweep`/`floatY`/`revealUp` estaban definidos y sin uso en el
  original — no se portaron (CSS muerto).
- La navegación completa en el preview tarda 10–13 s (llega tarde a las fases);
  el muestreo por navegación SPA dentro de un eval sí alcanza todas las marcas.

## Atascos
- Ninguno terminal. Dos evals fallidos (sintaxis await; selector del overlay tras
  el re-render del runtime del legacy) — corregidos en el momento.

## Decisiones
- DEC-005 · port 1:1 desde el fuente; mejoras conservadas y marcadas

## Estado al cerrar
lint ✅ · tests 29/29 ✅ · build ✅ · axe 0 ✅ · deploy del port: ver run de `3628c53`
· árbol limpio ✅ · `_ref` eliminado ✅

## Recomendación
La que sigue en pie: **decisión de fase en PARA-HUMANO**. Y adoptar AP-007 como
hábito: replicar = portar del fuente, nunca de memoria.
