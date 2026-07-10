# PARA-HUMANO — juan-pablos-first-project

> VIVO. Lo que SOLO Juan Pablo puede hacer o decidir. El agente agrega aquí en vez
> de atorarse; JP revisa cada mañana y tacha lo resuelto.

| Fecha | Qué necesito de ti | Para desbloquear | Urgencia |
|---|---|---|---|
| 2026-07-01 | **Decidir la siguiente fase.** El AUDIT quedó saldado y el backlog vacío. Opciones que veo (elige o propón): (a) más componentes de la librería con Luis; (b) empezar la **app real de Klokk** (backend/WhatsApp — implicaría Supabase); (c) auditoría fresca del repo para descubrir la deuda nueva; (d) pulir el portal (contacto, analytics, dominio propio). | El siguiente loop necesita backlog | P1 |
| 2026-07-02 | **¿Reemplazo el chat a mano de la página Klokk por el componente WhatsAppCheckinCard?** Menos código, un solo origen de verdad, la página gana estados. Es cambio visible de página → tu veto (AP-006). | recomendación del loop 4 | P2 |
| 2026-07-09 | **Conectar la GitHub App de Vercel** (para deploy-en-push automático). El proyecto ya existe y ya deployé a prod por CLI; falta enganchar el repo. Ve a vercel.com → proyecto `juan-pablos-first-project` → Settings → Git → **Connect Git Repository** → autoriza la app de Vercel en tu GitHub → elige `juanpablofibo5/juan-pablos-first-project`. Es autorización de una app en TU cuenta → solo tú puedes. Después de eso, cada `git push` a `main` redeploya solo. | deploy automático real | P1 |
| 2026-07-09 | **Agregar el dominio + DNS.** En Vercel: proyecto → Settings → **Domains** → Add → escribe tu dominio → Vercel te muestra los registros EXACTOS. En Hostinger (DNS del dominio) los capturas: apex `@` → **A** `76.76.21.21`; `www` → **CNAME** `cname.vercel-dns.com`. Vercel emite el SSL solo cuando el DNS propaga (minutos a ~1 h). Cambiar DNS/dominio es tu territorio (credenciales de Hostinger). Dime el dominio y te lo pre-agrego al proyecto para que solo pegues los registros. | publicar en dominio propio | P1 |
