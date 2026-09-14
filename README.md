# Kibo — Prototipo de MVP

Prototipo navegable del MVP de Kibo. No hay backend: todo el estado (sesión, disponibilidad, incidentes, cola de espera) se simula con `localStorage` a través de [js/data.js](js/data.js).

## Cómo verlo

Al ser HTML/CSS/JS estático sin `fetch()` entre páginas, puedes simplemente abrir [index.html](index.html) en el navegador.

## Estructura

```
index.html               Landing (estilo de referencia)
registro.html             RF-01, RF-02 — alta de paciente / psicólogo
login.html                RF-03 — autenticación (con accesos rápidos de demo)
buscar.html                RF-07…RF-16 — listado en vivo, filtros, mapa, cola de espera
perfil-psicologo.html      RF-04, RF-06 — perfil público, reseñas, contador de sesiones
conectando.html             RF-17, RF-23, RF-24 — solicitud, retención de pago, cobro, conexión
videollamada.html           RF-18…RF-21 — videollamada, chat, demo de moderación en tiempo real
valoracion.html             RF-22 — calificación y reseña post-sesión
panel-psicologo.html        RF-06, RF-07, RF-17, RF-25 — disponibilidad, solicitudes, liquidación
panel-admin.html            RF-27, RF-28, RF-29 — validación, incidentes, métricas
css/styles.css              Sistema de diseño (tokens, claro/oscuro, componentes)
js/data.js                  Datos simulados + helpers de estado (localStorage)
js/theme.js                 Toggle de tema claro/oscuro e idioma
```

## Flujo recomendado para revisar

1. **index.html** → "Buscar un psicólogo".
2. **buscar.html** → prueba los filtros, cambia "Mostrar", observa que la disponibilidad cambia sola cada pocos segundos (simulación de tiempo real).
3. Click en una tarjeta → **perfil-psicologo.html** → "Solicitar sesión ahora".
4. **conectando.html** → espera la aceptación simulada, paga con cualquier dato, observa la barra de progreso de conexión.
5. **videollamada.html** → prueba mute/cámara/chat, y el botón **"⚠️ Simular intento de contacto"** para ver el protocolo de moderación pausando la llamada.
6. Cuelga → **valoracion.html** → califica.
7. Desde login.html usa los accesos de demo "🩺 Psicólogo" y "🛠️ Admin" para ver **panel-psicologo.html** (con una solicitud entrante simulada a los 3s) y **panel-admin.html** (verás el incidente que generaste en el paso 5, y las postulaciones pendientes de validación).

## Qué es real vs. simulado

- **Real (funcional en el navegador):** navegación completa, filtros, formularios, estado de tema, persistencia de sesión/rol y de incidentes entre páginas vía `localStorage`.
- **Simulado (sin backend):** geolocalización, videollamada, transcripción/NLP de moderación, pagos, liquidaciones, envío de SMS/correo, y la base de datos de usuarios/psicólogos.
