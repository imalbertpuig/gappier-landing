# Gappier Landing

Landing page estática de Gappier. Multiidioma (10 idiomas), dark/light mode, y generación estática de páginas (SSG) a partir de una única plantilla y un fichero de traducciones. Desplegada en Firebase Hosting.

## Servicios

| Servicio | Uso | URL |
|---|---|---|
| **Firebase Hosting** | Hosting y deploy manual (`npm run deploy`) | [getgappier.web.app](https://getgappier.web.app) |
| **Gappier App** | Aplicación Angular a la que apunta la landing | [gappier.web.app](https://gappier.web.app) |

## Requisitos previos

- Node.js 22 LTS
- npm

## Correr en local

```bash
npm install
npm run dev
```

Genera primero los HTML estáticos y luego lanza en paralelo el compilador de Tailwind en modo watch y un servidor estático en `http://localhost:3000`.

## Build

```bash
npm run build
```

Ejecuta dos pasos en orden:

1. `node src/build.js` — genera los 10 ficheros HTML estáticos a partir de `src/template.html` y `src/translations.json`.
2. `tailwindcss -i src/input.css -o dist/styles.css --minify` — compila y minifica los estilos.

## Deploy

```bash
npm run deploy
```

Ejecuta `npm run build` y luego `firebase deploy --only hosting`. Requiere tener la Firebase CLI instalada y estar autenticado (`firebase login`).

## Idiomas

| Código | Ruta | Fichero generado |
|---|---|---|
| `en` | `/` | `index.html` |
| `es` | `/es/` | `es/index.html` |
| `fr` | `/fr/` | `fr/index.html` |
| `it` | `/it/` | `it/index.html` |
| `pt` | `/pt/` | `pt/index.html` |
| `de` | `/de/` | `de/index.html` |
| `pl` | `/pl/` | `pl/index.html` |
| `tr` | `/tr/` | `tr/index.html` |
| `ca` | `/ca/` | `ca/index.html` |
| `vi` | `/vi/` | `vi/index.html` |

La detección de idioma se hace en el cliente (primera visita): si el idioma del navegador coincide con alguno de los soportados, el usuario es redirigido automáticamente. La redirección se hace solo una vez por sesión (`sessionStorage`).

## Añadir o editar contenido

Editar únicamente estos dos ficheros:

- **`src/template.html`** — estructura HTML y estilos. Usa `{{placeholders}}` para el texto traducible.
- **`src/translations.json`** — textos para los 10 idiomas. Cada idioma tiene las mismas claves.

Después de cualquier cambio, ejecutar `npm run build` para regenerar los HTML.

## Añadir un nuevo idioma

1. Añadir la nueva entrada en `src/translations.json` con todas las claves requeridas.
2. Añadir el idioma al array `LANGUAGES` en `src/build.js` con su código, etiqueta y ruta.
3. Ejecutar `npm run build`.

## Estructura del proyecto

```
src/
  template.html        # Plantilla HTML única con {{placeholders}}
  translations.json    # Traducciones de los 10 idiomas
  build.js             # Script de generación de páginas estáticas
  input.css            # Entrada de Tailwind CSS v4

dist/                  # Generado por `npm run build` (no versionado)
  index.html           # Página en inglés
  ca/index.html
  es/index.html
  ...
  styles.css           # Generado por Tailwind CLI

firebase.json          # Configuración de Firebase Hosting
.firebaserc            # Project ID de Firebase
```

## Stack

- HTML5 + Tailwind CSS v4.2.2
- Node.js (build script, sin framework)
- Firebase Hosting

## Pendiente

- [ ] **`og-image.png`** — imagen 1200×630px en el root para previews en redes sociales
- [ ] **Google Search Console** — verificar dominio y enviar `sitemap.xml` tras el primer deploy
- [ ] **Analytics** — añadir script de [Plausible](https://plausible.io) (sin cookies, sin banner GDPR)
