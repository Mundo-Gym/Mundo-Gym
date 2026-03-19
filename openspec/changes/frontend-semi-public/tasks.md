# Tasks / Sprints — Frontend Semi-Público

## Sprint 0 — Preparación (1 day)
- Crear rama `feat/frontend-semi-public`.
- Añadir `openspec/changes/frontend-semi-public/design.md` (este archivo).

## Sprint 1 — Quick wins (3 days)
1. Normalizar producto payload
   - File: `frontend/redux/actions/actionProduct.js`
   - Goal: mapear { id, title, image, categoryName, visible }.
   - Acceptance: `Home` muestra títulos legibles y `ProductCard` no muestra ids.

2. Imagen fallback y next.config
   - Files: `frontend/components/ui/ProductCard.js`, `frontend/next.config.js`
   - Goal: imágenes rotas usan `/assets/upload.png`; configurar `images.domains`.
   - Acceptance: no hay runtime error `next/image` y todas las tarjetas muestran imagen (placeholder si hace falta).

3. Cliente API y logs
   - File: `frontend/lib/api.js`
   - Goal: revisar `baseURL`, `withCredentials` y centralizar error handling.

## Sprint 2 — Public Listing + SSR/ISR (1 week)
1. SSG/ISR para `/home` y `/category/[name]`
   - Files: `frontend/pages/home.js`, `frontend/pages/category/[name].js`
   - Goal: `getStaticProps` con `revalidate: 60`.
   - Acceptance: página sirve contenido pre-render y tiempo al primer byte mejora.

2. Mapear category id→nombre en server-side render
   - Files: `frontend/pages/* getStaticProps` + `actionProduct.js`

## Sprint 3 — Auth + Cart protections (2 weeks)
1. Backend middleware cookie auth (server)
   - Files: `backend/src/middlewares/auth.ts`, `backend/src/routes/cartRoutes.ts`
2. Client cart flow + merge on login
   - Files: `frontend/components/cart/*`, `frontend/pages/login.js`

## Sprint 4 — Feature flags + experiments (2 weeks)
1. Minimal flags (env-driven) with server evaluation
   - Files: `frontend/lib/featureFlags.js`, `backend/src/config/featureFlags.ts`
2. Add A/B hook to SSR pages

## Sprint 5 — Polish, tests & observability (2–4 weeks)
- Unit & integration tests (Vitest + Playwright).
- Integrar Sentry, métricas básicas y dashboards.

---
Each task should be a focused PR. Start with Sprint 1 tasks to unblock quality of product listing UX.
