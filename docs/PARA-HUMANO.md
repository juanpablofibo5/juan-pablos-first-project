# PARA-HUMANO — juan-pablos-first-project

> VIVO. Lo que SOLO Juan Pablo puede hacer o decidir. El agente agrega aquí en vez
> de atorarse; JP revisa cada mañana y tacha lo resuelto.

| Fecha | Qué necesito de ti | Para desbloquear | Urgencia |
|---|---|---|---|
| 2026-07-01 | **Decidir la siguiente fase.** El AUDIT quedó saldado y el backlog vacío. Opciones que veo (elige o propón): (a) más componentes de la librería con Luis; (b) empezar la **app real de Klokk** (backend/WhatsApp — implicaría Supabase); (c) auditoría fresca del repo para descubrir la deuda nueva; (d) pulir el portal (contacto, analytics, dominio propio). | El siguiente loop necesita backlog | P1 |
| 2026-07-02 | **¿Reemplazo el chat a mano de la página Klokk por el componente WhatsAppCheckinCard?** Menos código, un solo origen de verdad, la página gana estados. Es cambio visible de página → tu veto (AP-006). | recomendación del loop 4 | P2 |
| ~~2026-07-09~~ ✅ | ~~**Conectar la GitHub App de Vercel.**~~ **RESUELTO 2026-07-09:** JP conectó la GitHub App; el proyecto quedó ligado a `juanpablofibo5/juan-pablos-first-project` (rama prod `main`). Probado con un push vacío (`c29b4cc`) → deploy `source=git` a `READY` sin CLI. **Deploy automático en push activo.** | — | hecho |
| ~~2026-07-09~~ ✅ | ~~**Agregar el dominio + DNS.**~~ **RESUELTO 2026-07-09:** JP autorizó mover `jpfigueroa.com` (estaba sirviendo el proyecto `casa-confianza`). El agente lo quitó de casa-confianza y lo pasó al portafolio (apex + `www` con redirect 308). El DNS ya apuntaba a Vercel → `verified: True` sin tocar Hostinger. **LIVE:** https://jpfigueroa.com (HTTP 200, SSL, deep links ok). | — | hecho |
