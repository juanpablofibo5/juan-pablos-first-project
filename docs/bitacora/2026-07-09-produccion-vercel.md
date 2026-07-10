# Bitácora 2026-07-09 · Producción en Vercel + dominio propio

- **Objetivo (JP):** llevar el portafolio a producción en Vercel con deploy
  automático y dejarlo publicado en dominio propio.
- **Resultado:** LIVE en **https://jpfigueroa.com**, deploy automático en push activo.

## Qué se hizo
1. **Preparar el código para dos destinos** (DEC-006): `base` de Vite condicionado a
   `VERCEL=1` (raíz `/` en Vercel, subruta en Pages); `app/vercel.json` con rewrites
   SPA (deep links a 200); `packageManager: pnpm@11.7.0` como única fuente de versión.
   Commits `a271060`, `a1ad231`.
2. **Proyecto Vercel** creado por API (rootDirectory `app`, framework Vite) en el team
   de JP. Primer deploy por CLI a prod.
3. **Dominio:** `jpfigueroa.com` NO estaba libre — servía el proyecto `casa-confianza`.
   Con autorización explícita de JP, se movió al portafolio (apex + `www`→apex 308).
   DNS ya apuntaba a Vercel → `verified` sin tocar Hostinger. `og:url`+canonical al
   dominio (`2186c48`).
4. **Deploy automático:** JP conectó la GitHub App de Vercel; repo ligado
   (`juanpablofibo5/juan-pablos-first-project`, rama `main`). Probado con push vacío
   `c29b4cc` → deployment `source=git` a `READY` sin CLI.

## Hallazgos (→ candidatos a AP del playbook)
1. **El install de Vercel debe copiar al de CI.** Primer deploy falló con
   `ERR_PNPM_IGNORED_BUILDS` (esbuild): pnpm v11 sin `--ignore-scripts` sale con
   exit 1. Mismo caso que AP-001. Fix: `installCommand` en `vercel.json` con el mismo
   flag. Regla: el entorno de deploy replica el `install` del CI, no el default.
2. **Un dominio "propio" puede no estar libre.** Estaba asignado a otro proyecto del
   mismo dueño. Antes de prometer "lo publico en tu dominio", verificar en qué
   proyecto vive el dominio (`/v9/projects/{id}/domains`) — y la reasignación es
   decisión del dueño (outward-facing), no del agente.
3. **Mover un dominio entre proyectos no cambia el DNS.** Vercel enruta por dominio
   internamente; con el DNS ya apuntando a Vercel, quedó `verified` al instante.
4. **Parseo de JSON de la API:** `githubCommitMessage` trae saltos de línea →
   `json.load` estándar truena ("Invalid control character"). Usar `strict=False` o
   no leer ese campo.

## Estado al cerrar
prod ✅ jpfigueroa.com (HTTP 200, SSL, /klokk y /componentes a 200, www→apex 308) ·
deploy automático ✅ (source=git) · Pages ✅ espejo · docs al día (DEC-006, STATUS,
PARA-HUMANO 2 filas cerradas).

## Siguiente
- Sin bloqueos de infra. Queda la decisión de fase (PARA-HUMANO) y el swap del chat.
- casa-confianza quedó sin dominio propio (vive en su `*.vercel.app`): cuando JP
  lo retome, necesitará su propio dominio.
