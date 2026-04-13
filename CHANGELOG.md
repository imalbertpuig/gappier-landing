# Changelog

Todos los cambios notables de Gappier Landing se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [1.0.0] — 2026-04-13

### Added

- Landing page multiidioma con 10 idiomas: inglés, catalán, español, francés, italiano, portugués, alemán, polaco, turco y vietnamita
- Detección automática del idioma del navegador con redirección a la ruta correspondiente (una sola vez por sesión via `sessionStorage`)
- Selector de idioma manual en el header
- Dark/light mode con persistencia en `localStorage` y respeto a `prefers-color-scheme` en la primera visita
- Botón de alternancia de tema en el header con iconos de sol y luna
- Compilación de estilos con Tailwind CSS v4 CLI (sin CDN)
- `npm run dev` con Tailwind en modo watch y servidor estático en paralelo via `concurrently`
- Secciones: hero con formulario de URL de YouTube, características, cómo funciona, casos de uso y CTA
- hreflang alternates para SEO multiidioma
- Pipeline SSG: `src/template.html` + `src/translations.json` → `src/build.js` genera los ficheros HTML estáticos en tiempo de build
- Selector de idioma en el header con el idioma activo resaltado en cada página generada
- Deploy en Firebase Hosting (proyecto `getgappier`, URL `getgappier.web.app`)
- `firebase.json` con `public: "dist"`, rewrites por idioma y cabeceras de caché
- `.firebaserc` con el project ID `getgappier`
- `npm run deploy` — ejecuta build completo y publica en Firebase Hosting
- `robots.txt` y `sitemap.xml`
