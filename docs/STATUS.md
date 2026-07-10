# STATUS — juan-pablos-first-project

> Doc VIVO: se edita, no se apenda. **Actualizado:** 2026-07-09 · por Claude (Fable 5)

## Ahora
- **Producción LIVE en dominio propio** (DEC-006): **https://jpfigueroa.com** sirve el
  portafolio (HTTP 200, SSL, `www`→apex 308, deep links a 200 por rewrites SPA). El
  dominio se movió del proyecto `casa-confianza` al portafolio con autorización de JP;
  DNS ya apuntaba a Vercel (`verified` sin tocar Hostinger). Pages sigue como espejo.
- **Deploy automático en push ACTIVO:** GitHub App conectada; cada push a `main`
  redeploya `jpfigueroa.com` (probado con `c29b4cc`, `source=git` → READY sin CLI).
- **AUDIT 2026-07-b entregado** (revisión profunda del build de la tanda 2, fase C):
  calidad homogénea, deuda menor → B-015…B-020 en el backlog. Leer con `CHANGELOG.md`.

## Siguiente
- **Sin bloqueos de infra:** dominio + deploy automático resueltos.
- **Decisión de JP pendiente:** la siguiente fase del proyecto (opciones en
  `docs/PARA-HUMANO.md`; recomendación del agente: app real de Klokk).

## Bloqueado / atorado
- El siguiente loop, hasta que haya backlog nuevo (decisión de fase).

## Salud
build ✅ · lint ✅ (gate CI) · tests 108/108 ✅ (gate CI) · axe 0 en /yo y /componentes ✅ ·
CI sin anotaciones ✅ · **prod Vercel ✅ https://jpfigueroa.com (HTTP 200, SSL, auto-deploy)** ·
Pages ✅ espejo · última verificación: 2026-07-09

## Mapa rápido
- `app/src/pages/` → Home, Yo (nativa ✨), Klokk (React+Clay), Componentes — 0 iframes
- `app/src/components/` → 6 componentes presentacionales (+ .test.tsx c/u) + `brand/` + `shared/`
- `app/src/index.css` → design system (tokens; `rounded-card` 16px; `.reveal` global)
- `docs/` → sistema de agentes · `_legacy/` → sitio viejo fuera de git (no revivir)
