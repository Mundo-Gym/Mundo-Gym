# Design: Rediseño Frontend — Modo Semi-Público

**Propósito**
- Permitir navegación pública y rápida del catálogo (SSG/ISR) mientras se protegen las funciones sensibles (carrito, checkout, perfil) detrás de auth por cookies. Soportar experimentos UI mediante feature flags para despliegues incrementales.

**Dirección visual**
- Tono: "Luxury Athletic" — contraste oscuro, acento cálido, tipografía con carácter. Mejora de percepciones de calidad y conversión.

## Resumen técnico
- Frontend: Next.js (actual) con pages + Tailwind. Migrar listados a SSG/ISR; usar SSR opcional para variantes personalizadas. Centralizar cliente HTTP en `frontend/lib/api.js` y añadir `frontend/lib/featureFlags.js`.
- Backend: Express/Mongoose mantiene API; exponer endpoints públicos `/api/products` y proteger `/api/carts` con middleware de cookies `auth`.
- Feature flags: inicio con env-driven toggles; luego integrar LaunchDarkly o similar.

## Arquitectura (alto nivel)

Browser -> Next.js (SSG/ISR or SSR) -> Backend API (cookie auth) -> MongoDB
                ↳ Flag Service (server/client)

## Data flow (productos)
1. Build/ISR: Next.js solicita `/api/products` o lee un cache en backend; genera HTML pre-render.
2. Cliente hidrata y usa `frontend/lib/api.js` para fetches posteriores (con `withCredentials` si requiere). 

## Cambios de archivos (resumen)
- `frontend/next.config.js`: dominios imágenes + optimizaciones.
- `frontend/pages/home.js`, `frontend/pages/index.js`, `frontend/pages/category/[name].js`: usar `getStaticProps`/ISR o `getServerSideProps` según necesidad.
- `frontend/components/ui/ProductCard.js`, `components/card/Card.js`: imagen, accesibilidad, badge, micro-interacciones.
- `frontend/redux/actions/actionProduct.js`: normalizar respuesta (id, title, image, categoryName) y mapear category id→nombre.
- `frontend/lib/api.js`, `frontend/lib/featureFlags.js`: cliente unificado y flags.
- `frontend/pages/_app.js`: inicializar provider de flags y auth context.
- `backend/src/middlewares/auth.ts`: validar cookie httpOnly y exponer user en request.

## Migración / Fases
- Fase 1 — Quick wins (1–2 semanas)
  - Normalizar productos en `actionProduct.js` (ya implementado). Centralizar fallback imagen local (placeholder).
  - Configurar `next.config.js` con dominios externos.
  - Hacer `ProductCard` robusto (placeholder, resolvedCategoryName).

- Fase 2 — Mid-term (2–6 semanas)
  - Implementar SSG/ISR en páginas de listado y product detail.
  - Añadir feature flags env-driven y evaluar A/B en server-side.
  - Protecciones server-side para carrito/checkout; endpoint merge-cart.

- Fase 3 — Full redesign (6–12 semanas)
  - Integrar flag service, migrar a React Query/SWR, refactor de componentes, pruebas E2E, observabilidad (Sentry, Prometheus).

## Testing
- Unit: Vitest para actions y componentes clave.
- Integration: Playwright para SSR/ISR y flujos (browse→add→login→checkout).
- E2E: Cypress/Playwright en staging con flags activadas/desactivadas.

## Entregables inmediatos
1. PR: normalizar productos + fallback imágenes + next.config.js (pequeño, ya aplicado parcialmente).
2. PR: SSG/ISR para `/home` y `/category/[name]` con revalidate.
3. Inicializar `frontend/lib/featureFlags.js` (env-driven).

---
_Documento generado automáticamente por el orquestador. Siguiente: desglosar en tareas (sprints) y producir issues/PR scopes._
