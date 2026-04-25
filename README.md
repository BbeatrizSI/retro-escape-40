# Escape Console 4.0

Aplicación web tipo escape room, con estética retro terminal y retos desbloqueados por horario.  
Está pensada para jugarse en móvil, instalarse como PWA y usarse como experiencia sorpresa (cumpleaños/aniversario).

## Demo

- Producción (GitHub Pages): [https://bbeatrizsi.github.io/retro-escape-40/](https://bbeatrizsi.github.io/retro-escape-40/)

## Características

- Flujo narrativo en estilo consola retro con secuencia de arranque (`BOOT_MESSAGES`).
- Retos de varios tipos:
  - Estado de ánimo con botones de color (`mood`).
  - Preguntas de texto con control de intentos (`text`).
  - Serie lógica con opciones (`sequence`).
  - Sudoku 6x6 contrarreloj (`sudoku`).
- Desbloqueo por horas locales del dispositivo.
- Persistencia de progreso en `localStorage` (reanudación al reabrir la app).
- Diseño responsive móvil con acción principal fija al pie y contenido con scroll.
- PWA instalable con `vite-plugin-pwa` (manifest + service worker).

## Stack técnico

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- vite-plugin-pwa
- GitHub Actions para despliegue automático en GitHub Pages

## Requisitos

- Node.js 20+ recomendado
- npm 10+ recomendado

## Instalación y ejecución local

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Scripts disponibles

- `npm run dev`: servidor de desarrollo.
- `npm run build`: build de producción (`tsc -b && vite build`).
- `npm run preview`: sirve localmente el build generado.

## Build de producción

```bash
npm run build
npm run preview
```

Los artefactos se generan en `dist/`.

## Despliegue (GitHub Pages)

El proyecto incluye workflow en `.github/workflows/deploy-pages.yml`:

- Se dispara en push a `main`.
- Construye con Node 20.
- Publica `dist/` en GitHub Pages.

### Configuración necesaria en GitHub

1. Ir a **Settings > Pages** del repositorio.
2. En **Build and deployment > Source**, seleccionar **GitHub Actions**.

## PWA

La configuración está en `vite.config.ts` mediante `VitePWA`:

- `manifest` (nombre, iconos, colores, modo standalone).
- `registerType: "autoUpdate"`.
- Iconos en `public/pwa-192.png` y `public/pwa-512.png`.

Para instalar:

- Android/Chrome: menú del navegador > **Añadir a pantalla de inicio**.
- iOS/Safari: compartir > **Añadir a pantalla de inicio** (con limitaciones propias de iOS).

## Configuración del juego

### Retos y contenido

Se editan en `src/game/constants.ts`:

- `CHALLENGES`: orden y definición de retos.
- `BOOT_MESSAGES`: mensajes de secuencia de arranque.
- Datos de sudoku (`SUDOKU_INITIAL`, `SUDOKU_SOLUTION`).

### Horarios de desbloqueo

Se editan en `src/game/schedule.ts`:

- `STEP_UNLOCK_LOCAL`: array de horas (`"HH:mm"`) en hora local del móvil.
- Debe tener la misma longitud que `CHALLENGES`.

## Arquitectura (resumen)

- `src/hooks/useEscapeRoomGame.ts`: estado principal, validaciones, progreso, feedback y persistencia.
- `src/components/EscapeRoomApp.tsx`: orquestación de pantallas.
- `src/components/GamePlayScreen.tsx`: render de retos + zona de acción fija inferior.
- `src/components/*ChallengePanel.tsx`: UI específica por tipo de reto.
- `src/game/types.ts`: modelo tipado de retos.

## Estado y persistencia

El progreso se guarda en `localStorage` con la clave:

- `retro_escape_game_state_v1`

Incluye paso actual, feedback, estado de boot y progreso de sudoku.

## Notas de UX móvil

- Layout basado en `100dvh` para evitar scroll global del documento.
- Scroll interno en la zona de contenido.
- Área de acción anclada abajo para no perder el botón principal.

## Licencia

Proyecto privado/personal.