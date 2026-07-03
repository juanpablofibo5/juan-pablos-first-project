# Portafolio de Juan Pablo · Klokk

Portafolio personal + **librería de componentes en vivo** de **Klokk**: un SaaS de
control de asistencia por WhatsApp para PyMEs mexicanas (proyecto del curso de
desarrollo con agentes, junto al instructor Luis).

🔗 **En vivo:** https://juanpablofibo5.github.io/juan-pablos-first-project/

| Ruta | Qué hay |
|---|---|
| `/` | Portada |
| `/yo` | Quién soy y mi trayectoria |
| `/klokk` | El problema y la solución: Klokk, pitch completo |
| `/componentes` | **6 componentes React del dashboard corriendo en vivo** — una vista por estado, 0 violaciones axe |

## Mapa del repo

```
app/        ← la aplicación real (Vite + React 19 + TS + Tailwind v4)
  src/pages/        páginas del sitio
  src/components/   librería de componentes de Klokk (+ docs en app/README.md)
docs/       ← sistema de trabajo con agentes: STATUS, BACKLOG, DECISIONES,
              APRENDIZAJES, bitácora y auditorías (playbook: agent-playbook)
.github/    ← CI: push a main → lint → build → deploy a Pages
```

## Cómo correr

```bash
cd app
pnpm install
pnpm dev        # http://localhost:5173
```

## Cómo se trabaja aquí

Este repo opera bajo el sistema **agent-playbook**: estado en `docs/STATUS.md`,
trabajo en `docs/BACKLOG.md`, decisiones y aprendizajes registrados, y cada commit
con su *por qué*, su *verificación* y sus referencias. La historia completa se puede
auditar con `git log` + `docs/bitacora/`.
