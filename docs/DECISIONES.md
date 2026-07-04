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

## DEC-003 · 2026-07-01 · La página Yo se reconstruye, no se replica
- **Contexto:** el legacy `yo.html` (236 KB) tenía splash 3D, timeline con contenido
  oculto tras clic y foto en base64 inline, todo sobre un micro-runtime JS propio.
- **Decisión:** reconstrucción nativa en el design system neutro del portafolio
  (misma paleta que ya usaba el legacy): timeline vertical con TODO visible, metas
  con su porqué siempre a la vista, foto extraída a asset real de Vite, `Reveal`/
  `CountUp` de brand/ para el movimiento. Contenido migrado verbatim (13 hitos,
  5 metas, 4 stats, 4 cards).
- **Descartado:** réplica 1:1 del legacy interactivo — contenido oculto perjudica
  a11y y móvil, y el splash era ornamento sin información.
- **Consecuencias:** mueren `public/yo.html` y `public/support.js` (−292 KB);
  la app entera es React nativo — cero iframes.
- **Estado:** matizada por DEC-004 (la simplificación visual se revirtió)

## DEC-004 · 2026-07-02 · La personalidad del legacy se restaura (veto de JP a DEC-003)
- **Contexto:** JP volvió del loop nocturno preguntando por el cubo J, las
  coordenadas animadas y el timeline gráfico. DEC-003 los había eliminado por
  criterio técnico — pero eran identidad, no ornamento (ver AP-006).
- **Decisión:** los tres se restauran en React nativo: IntroCube (una vez por
  sesión, saltable con clic/botón/Escape, no monta con reduced-motion),
  GeoCounter (0.0000 → 20.9674° N con "fijado ✓", con fallback estático y
  sr-only), TimelineInteractivo (patrón tabs accesible: nodos sobre línea, chip
  activo en tinta, burbuja de detalle, ← → por teclado).
- **Descartado:** volver al runtime JS del legacy (muerto con razón); y dejar la
  página simplificada (el dueño ya vetó esa dirección).
- **Consecuencias:** queda la regla AP-006 — decisiones de identidad visual no se
  toman en loops autónomos; van a PARA-HUMANO primero.
- **Estado:** vigente

## DEC-005 · 2026-07-02 · El intro de Yo se porta 1:1 del código fuente del legacy
- **Contexto:** dos restauraciones "aproximadas" no pasaron el estándar de JP
  ("exactamente como antes"). El código original completo estaba en `_legacy/yo.html`.
- **Decisión:** port literal de `runBrandIntro`/`prepIntro`/`runIntro`/`animateGeo`:
  fases 0/1000/2600/2950/3050/4200 ms; J plana 150px (scale .6→1→1.25); cubo 120px
  con giro INCLINADO `rotateX(-22°)` a 7 s/vuelta; caras con bordes translúcidos y
  superior/inferior vacías; nombre en 18 letras (espacio incluido) desde
  translateY(24px)/scale(.94)/blur(7px) con stagger 120+i·36; cascada del hero a
  i·105 tras after=1448 con easings .9s/.85s cbz(.2,.6,.2,1); coordenadas con easing
  cuártico y JITTER decreciente a los after+650. Hero reestructurado al original
  (ubicación con punto sin pill, coords en línea propia, h1 clamp 46–116px,
  "Figueroa" #aeaaa1, CTA hover azul, foto asentada al disolverse el overlay).
- **Mejoras conservadas** (pedido de JP "con las nuevas mejoras"): "fijado ✓" (en el
  original era código muerto — ref sin cablear, verificado en vivo), botón Saltar +
  Escape, exclusión por reduced-motion, textos mono en ink-soft (AA) en vez del
  #8f8c84 original (AP-004).
- **Descartado:** tercera ronda de afinación de memoria (tres strikes, ver AP-007).
- **Estado:** vigente
