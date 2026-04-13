# Gappier Landing

Landing page estática de [gappier.app](https://gappier.app). Multiidioma (9 idiomas), dark/light mode, y generación estática de páginas (SSG) a partir de una única plantilla y un fichero de traducciones. Desplegada en Netlify.

## Servicios

| Servicio | Uso | URL |
|---|---|---|
| **Netlify** | Hosting y deploy continuo desde `main` | [gappier.app](https://gappier.app) |
| **Gappier App** | Aplicación Angular a la que apunta la landing | [gappier.web.app](https://gappier.web.app) |

## Requisitos previos

- Node.js 22 LTS
- npm

## Correr en local

```bash
npm install
npm run dev
```

Esto lanza en paralelo el compilador de Tailwind en modo watch y un servidor estático en `http://localhost:3000`.

## Build

```bash
npm run build
```

Ejecuta dos pasos en orden:

1. `node src/build.js` — genera los 9 ficheros HTML estáticos a partir de `src/template.html` y `src/translations.json`.
2. `tailwindcss -i src/input.css -o styles.css --minify` — compila y minifica los estilos.

## Deploy

El deploy es automático: cualquier push a `main` dispara el pipeline de Netlify, que ejecuta `npm run build` y publica el directorio raíz.

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
| `vi` | `/vi/` | `vi/index.html` |

La detección de idioma se hace en el cliente (primera visita): si el idioma del navegador coincide con alguno de los soportados, el usuario es redirigido automáticamente. La redirección se hace solo una vez por sesión (`sessionStorage`).

## Añadir o editar contenido

Editar únicamente estos dos ficheros:

- **`src/template.html`** — estructura HTML y estilos. Usa `{{placeholders}}` para el texto traducible.
- **`src/translations.json`** — textos para los 9 idiomas. Cada idioma tiene las mismas claves.

Después de cualquier cambio, ejecutar `npm run build` para regenerar los HTML.

## Añadir un nuevo idioma

1. Añadir la nueva entrada en `src/translations.json` con todas las claves requeridas.
2. Añadir el idioma al array `LANGUAGES` en `src/build.js` con su código, etiqueta y ruta.
3. Ejecutar `npm run build`.

## Estructura del proyecto

```
src/
  template.html        # Plantilla HTML única con {{placeholders}}
  translations.json    # Traducciones de los 9 idiomas
  build.js             # Script de generación de páginas estáticas
  input.css            # Entrada de Tailwind CSS v4

index.html             # Generado por build.js (en)
es/index.html          # Generado por build.js
fr/index.html          # Generado por build.js
...

styles.css             # Generado por Tailwind CLI
netlify.toml           # Configuración de Netlify
```

## Stack

- HTML5 + Tailwind CSS v4.2.2
- Node.js (build script, sin framework)
- Netlify (hosting y CI/CD)

## Pendiente

- [ ] **`og-image.png`** — imagen 1200×630px en el root para previews en redes sociales
- [ ] **Google Search Console** — verificar dominio y enviar `sitemap.xml` tras el primer deploy
- [ ] **Analytics** — añadir script de [Plausible](https://plausible.io) (sin cookies, sin banner GDPR)
