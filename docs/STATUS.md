# STATUS — juan-pablos-first-project

> Doc VIVO: se edita, no se apenda. **Actualizado:** 2026-07-09 · por Claude (Fable 5)

## Ahora
- **Producción en Vercel LIVE** (DEC-006): https://juan-pablos-first-project.vercel.app
  sirve la app en la raíz con deep links a HTTP 200 (rewrites SPA). Deploy inicial a
  prod por CLI ✓ verificado. Pages sigue como espejo + gate de calidad.
- **AUDIT 2026-07-b entregado** (revisión profunda del build de la tanda 2, fase C):
  calidad homogénea, deuda menor → B-015…B-020 en el backlog. Leer con `CHANGELOG.md`.

## Siguiente
- **2 acciones de JP en `docs/PARA-HUMANO.md` (P1):** (1) conectar la GitHub App de
  Vercel → deploy-en-push automático; (2) agregar el dominio + DNS (Hostinger↔Vercel).
- **Decisión de JP pendiente:** la siguiente fase del proyecto (opciones en
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
