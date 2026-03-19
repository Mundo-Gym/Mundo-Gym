# PR: feat/sprint2-backend

## Resumen
Este PR introduce la fusión del carrito del cliente con el servidor (`client-cart-sync`) y normaliza el payload de productos (incluye `categoryName` y `subcategoryName`). Además se habilitan feature flags para desplegar la funcionalidad de forma controlada.

Cambios clave:
- backend: `listProducts()` (service) ahora incluye `categoryName`/`subcategoryName` y normaliza shape para consumers.
- backend: `POST /api/cart/merge` en `shoppingCarController` y `cartRoutes` (ruta protegida con `requireAuth`).
- frontend: soporte opcional de `client-cart-sync` al hacer login; SSG/ISR en `Home` para evitar estado vacío inicial.
- feature flags: `featureFlags.clientCartSync` y `featureFlags.productShapeV2` (consultar `backend/src/config/featureFlags.ts`).

## Motivo
- Sincronizar carrito local tras login para no perder items (mejora conversión).
- Evitar romper vistas/front al estandarizar el shape de productos.
- Desplegar la funcionalidad por flags para mitigar riesgos en staging/production.

## Checklist de QA (antes de merge)
- [ ] Ejecutar tests unitarios y de integración del backend: `cd backend && npm ci && npm test`.
- [ ] Ejecutar linter: `cd backend && npm run lint`.
- [ ] Smoke en staging: levantar backend+frontend contra staging DB y validar `GET /api/products` y `POST /api/cart/merge`.
- [ ] Prueba de flujo end-to-end: crear usuario, añadir items localmente, loguear y confirmar que items se fusionan correctamente.
- [ ] Verificar que `featureFlags.clientCartSync=false` desactiva la fusión y no altera flujo existente.
- [ ] Verificar contract con frontend: revisar reducers/normalizers (`actionProduct`) y actualizaciones en `initialProducts`.
- [ ] Ejecutar seed y comprobación rápida de datos: `node backend/scripts/seeders/seedProducts.js` y validar conteo.
- [ ] Revisar logs y métricas de errores en staging tras desplegar con flag ON durante 1 hora.

## Pasos de rollback (si algo sale mal)
1. Desactivar feature flag: poner `featureFlags.clientCartSync=false` en la config de deploy (canary/feature toggle).
2. Revertir el despliegue: `git revert <merge_commit>` y redeploy si la desactivación por flag no es posible o urgente.
3. Restaurar datos (si hubo corrupción): restaurar snapshot DB desde backup más reciente (documentar backup usado).
4. Si se aplicaron migraciones, ejecutar el proceso de rollback de migrations (según la herramienta usada).

Comandos útiles de rollback (ejemplo):
```bash
# desactivar flag rápidamente (depende del sistema de flags)
# editar config y redeploy
kubectl set env deployment/backend FEATURE_FLAGS_CLIENT_CART_SYNC=false -n staging

# revert local del merge (si es necesario)
git checkout main
git revert <merge_commit_hash>
git push origin main
```

## Comandos finales de prueba
- Levantar backend: `cd backend && npm ci && npm run dev`
- Ejecutar tests: `cd backend && npm test`
- Ejecutar seed: `node backend/scripts/seeders/seedProducts.js`
- Comprobar endpoint products:
```bash
curl -sS http://localhost:3001/api/products | jq '.[0] | {id: ._id, name: .name, categoryName: .categoryName, subcategoryName: .subcategoryName}'
```
- Comprobar merge cart (ejemplo):
```bash
# obtener cookie auth / token según flujo
curl -X POST http://localhost:3001/api/cart/merge \
  -H "Content-Type: application/json" \
  --cookie "token=<tu_cookie_jwt>" \
  -d '{ "items": [{"productId":"<id>","quantity":2}] }'
```

### Pruebas manuales (ejemplos curl)

1) POST /api/carts/merge (fusionar carrito local -> servidor)

```bash
# ejemplo: fusionar items del carrito local hacia el carrito del usuario autenticado
curl -v -X POST http://localhost:3001/api/carts/merge \
  -H "Content-Type: application/json" \
  --cookie "connect.sid=<tu_cookie_de_sesion>; token=<tu_cookie_jwt>" \
  -d '{ "items": [{"productId":"<productId>","quantity":2}] }'
```

2) GET /api/carts (obtener carritos — buscar el cart del usuario para validar)

```bash
# obtiene lista de carts; localizar el cart del usuario (userId)
curl -sS http://localhost:3001/api/carts --cookie "token=<tu_cookie_jwt>" | jq '.'
```

Nota: el frontend usa `/api/carts/merge` y luego solicita el carrito del servidor; si tu entorno expone los endpoints sin el prefijo `/api`, ajustá `http://localhost:3001` según corresponda.

## Reviewers sugeridos
- @maintainer
- @frontend-dev

## Notas / Riesgos
- Cambios en el shape de productos pueden romper consumidores; validar mappings en frontend.
- Si la fusión de carrito presenta duplicados, revisar idempotencia en `mergeCart`.

---

Archivo actualizado: `PR_FEAT_SPRINT2_BACKEND.md`
