<h1 align="center">Mundo GYM API</h1>
<h3 align="center">Dream without fear, train without limits </h3>

This api was made for a gym products distributor. 
Has a simple clean style with video in landingpage, full ecommerce functions, admin dashbord, user dashboard and more.   

- <a href="https://youtu.be/pxO8H87gOpA" target="blank"><img align="center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDWqqZ0wDQEe7LL0a36KLgVySbyH3XaSbWkcnnYNvk-guIQ5EPaOIS9osmubtdxNw7zg&usqp=CAU" alt="https://www.linkedin.com/in/maximilianocassol/" alt="www.youtube.com/@maximilianocassol" height="30" width="40" /></a>

## Feature flags

Se utilizan banderas de feature para activar/desactivar comportamientos en runtime sin desplegar código.

Cómo usarlas localmente:

- Frontend: añade o copia las variables a tu `.env.local` en la carpeta `frontend/`. Las variables de frontend deben empezar por `NEXT_PUBLIC_` para exponerse al bundle.
- Backend: añade o copia las variables a `.env` en la carpeta `backend/` o al entorno del proceso del servidor.

Ejemplo (CART_MERGE):

- Frontend: `NEXT_PUBLIC_FLAG_CART_MERGE=true` — habilita la lógica de merge del carrito en el cliente.
- Backend: `FEATURE_ENABLE_CART_MERGE=true` — habilita la lógica de merge del carrito en el servidor.

Hemos añadido ejemplos en:

- [frontend/.env.example](frontend/.env.example)
- [backend/.env.example](backend/.env.example)
- Script de verificación: `scripts/check-flags.sh` — imprime el valor actual de las variables (útil para CI).

Para desactivar una bandera localmente, cámbiala a `false` o elimínala del entorno.

