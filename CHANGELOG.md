# Changelog

Todos los cambios notables de Gappier Landing se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [1.1.0] — 2026-04-13

### Added

- Pipeline SSG: `src/template.html` + `src/translations.json` → `src/build.js` genera los 9 ficheros HTML estáticos en tiempo de build
- Selector de idioma en el header con el idioma activo resaltado en cada página generada
- `npm run build` ejecuta primero `node src/build.js` y luego Tailwind CLI

### Changed

- Los 9 ficheros HTML dejan de mantenerse manualmente: ahora son artefactos de build

---

## [1.0.0] — 2026-04-13

### Added

- Landing page multiidioma con 9 idiomas: inglés, español, francés, italiano, portugués, alemán, polaco, turco y vietnamita
- Detección automática del idioma del navegador con redirección a la ruta correspondiente (una sola vez por sesión via `sessionStorage`)
- Selector de idioma manual en el header
- Dark/light mode con persistencia en `localStorage` y respeto a `prefers-color-scheme` en la primera visita
- Botón de alternancia de tema en el header con iconos de sol y luna
- Compilación de estilos con Tailwind CSS v4 CLI (sin CDN)
- `npm run dev` con Tailwind en modo watch y servidor estático en paralelo via `concurrently`
- Secciones: hero con formulario de URL de YouTube, características, cómo funciona, casos de uso y CTA
- hreflang alternates para SEO multiidioma
- `netlify.toml` con comando de build y directorio de publicación
- `robots.txt` y `sitemap.xml`
- `cursor-pointer` en el botón de tema y en el botón de inicio (play)
