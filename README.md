# Gappier Landing

Landing page estática para [gappier.app](https://gappier.app). HTML + Tailwind CDN, sin build step. Deploy en Netlify.

## Estructura

```
gappier-landing/
├── index.html        # Landing en inglés (idioma principal)
├── es/
│   └── index.html   # Landing en español
├── favicon.svg
├── og-image.png      # ⚠️ Pendiente de crear (1200×630px)
├── robots.txt
├── sitemap.xml
└── netlify.toml
```

## Correr en local

No hay build. Solo necesitas un servidor HTTP local (para que la detección de idioma y las rutas `/es/` funcionen correctamente con `sessionStorage` y los paths relativos).

```bash
npx serve .
```

Abre [http://localhost:3000](http://localhost:3000)

> **Nota:** Abrir `index.html` directamente con `file://` en el navegador también funciona para ver el contenido, pero la redirección de idioma no funcionará correctamente porque `window.location.replace('/es/')` requiere un servidor HTTP.

## Detección de idioma

- Navegador con idioma `es-*` → redirige automáticamente a `/es/`
- Todos los demás → se quedan en `/` (inglés)
- La redirección se hace una sola vez por sesión (via `sessionStorage`)
- El switcher `EN` / `ES` del header permite cambio manual en cualquier momento

## Deploy (Netlify)

El repositorio está configurado para deploy directo en Netlify (`netlify.toml` con `publish = "."`).

1. Conecta este repositorio en [app.netlify.com](https://app.netlify.com)
2. Build command: *(dejar vacío)*
3. Publish directory: `.`
4. Deploy

## Pendiente antes de publicar

- [ ] **`og-image.png`** — imagen 1200×630px en el root para previews de redes sociales (Twitter, LinkedIn, WhatsApp)
- [ ] **Google Search Console** — tras el primer deploy, verificar el dominio y enviar `sitemap.xml` manualmente
- [ ] **Analytics** — añadir script de [Plausible](https://plausible.io) (1 KB, sin cookies, sin banner GDPR)
