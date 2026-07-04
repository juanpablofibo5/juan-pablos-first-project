# ☀️ GOOD MORNING — corrida nocturna del 2026-07-02

> Doc VIVO: siempre contiene la última corrida nocturna (antes se llamaba
> GOODNIGHT.md; lo renombré a cuando lo LEES, no a cuando se escribe). Historial
> completo en `docs/bitacora/`. Detalle de esta noche:
> `docs/bitacora/2026-07-02-loop-3-port-exacto-intro.md`.

## Buenos días, Juan Pablo. La intro ya es LA intro.

Tenías razón las tres veces. Mis dos primeras "restauraciones" fueron
**aproximaciones de memoria** — y el smooth que recordabas vive en detalles que no
se adivinan. Esta noche dejé de adivinar: **extraje la implementación original
completa de `_legacy/yo.html` y la porté literal.**

### Lo que a mi versión le faltaba (y ya tiene)
| Detalle del original | Antes (mío) | Ahora |
|---|---|---|
| El cubo gira **inclinado** (`rotateX −22°`) y LENTO (7 s/vuelta) | plano y rápido | ✅ exacto |
| La **J plana de 150px** entra primero y se disuelve escalando al llegar el cubo | no existía | ✅ exacto |
| El cubo **se desintegra** (las caras se separan hacia afuera y se apagan) | fade genérico | ✅ exacto |
| El overlay se disuelve **mientras** tu nombre entra letra a letra con blur | página ya asentada | ✅ crossfade real |
| Cascada del hero (ubicación → coords → tagline → bio → CTAs) con easings propios | reveals genéricos | ✅ exacto |
| Coordenadas con easing cuártico y **jitter** ("buscan señal" temblando) | conteo liso | ✅ exacto |
| Hero original: punto azul sin pill, coords en su línea, nombre 46–116px con "Figueroa" en su gris, CTA con hover azul, foto con sombra profunda | otra estructura | ✅ exacto |

### Verificación (muestreo temporal contra la fuente)
`1.0s` J sí/cubo no → `2.1s` giro 7 s inclinado → `3.4s` crossfade (overlay 0.42 +
18/18 letras en vuelo) → `5.3s` coords temblando (9.08→12.89) → `7.4s`
`20.9674° N · 89.6237° W` fijado ✓. **Lint · 29/29 tests · build · axe 0** ✅

### Las "nuevas mejoras" que conservé (como pediste)
- **"fijado ✓"** — dato curioso: en el original era código muerto (nunca se
  pintaba); el nuestro sí vive.
- **Saltar intro** (clic/botón/Escape) y exclusión por `reduced-motion`.
- Textos mono en `ink-soft` (el gris original fallaba contraste AA).

### Pruébalo
🔗 https://juanpablofibo5.github.io/juan-pablos-first-project/yo — con
`Cmd+Shift+R` la primera vez. La secuencia completa dura ~6.5 s de principio a
"fijado ✓".

### El sistema aprendió (para que no vuelva a pasar)
**AP-007:** *replicar comportamiento = portar del código fuente, nunca aproximar
de memoria.* Tres strikes me costó; quedó como regla en APRENDIZAJES y registrado
en DEC-005 con todos los valores.

### Sigue en tu cancha
`docs/PARA-HUMANO.md` — **la decisión de fase** (mi voto sigue: la app real de
Klokk). El backlog está limpio esperándola.

Que amanezcas bien. — Claude (Fable 5) 🤝
