# STATUS — juan-pablos-first-project

> Doc VIVO: se edita, no se apenda. **Actualizado:** 2026-07-02 · por Claude (Fable 5)

## Ahora
- **Intro de Yo portada 1:1 del código fuente del legacy** (`3628c53`, loop 3
  nocturno): coreografía exacta (J → cubo inclinado 7 s → desintegración →
  crossfade con nombre letra a letra + coords con jitter). Reporte ejecutivo:
  `GOOD-MORNING.md` (antes GOODNIGHT.md). Reglas nuevas: AP-006 (identidad no se
  decide en autónomo) y AP-007 (replicar = portar del fuente, no aproximar).

## Siguiente
- **Decisión de JP pendiente:** la siguiente fase del proyecto (4 opciones en
  `docs/PARA-HUMANO.md`; recomendación del agente: app real de Klokk).

## Bloqueado / atorado
- El siguiente loop, hasta que haya backlog nuevo (decisión de fase).

## Salud
build ✅ · lint ✅ (gate CI) · tests 29/29 ✅ (gate CI) · axe 0 en /yo y /componentes ✅ ·
CI sin anotaciones ✅ · deploy ✅ HTTP 200 · última verificación: 2026-07-01 (noche)

## Mapa rápido
- `app/src/pages/` → Home, Yo (nativa ✨), Klokk (React+Clay), Componentes — 0 iframes
- `app/src/components/` → 6 componentes presentacionales (+ .test.tsx c/u) + `brand/` + `shared/`
- `app/src/index.css` → design system (tokens; `rounded-card` 16px; `.reveal` global)
- `docs/` → sistema de agentes · `_legacy/` → sitio viejo fuera de git (no revivir)
