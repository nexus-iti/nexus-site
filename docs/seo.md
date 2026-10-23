# SEO, Open Graph y llms.txt

Todo lo que descubre buscadores, previews de redes y agentes LLM sale de `index.html` y de `public/`. Vite copia `public/` tal cual a `dist/`, y el deploy publica `dist/` completo.

## Archivos

| Archivo              | Qué hace                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `index.html`         | `<title>`, `description`, `robots`, `canonical`, Open Graph, Twitter Cards y JSON-LD (WebSite + Organization). |
| `public/robots.txt`  | Permite todo el sitio y apunta al sitemap.                                                                     |
| `public/sitemap.xml` | Única URL: `https://nexus.wefaber.net/`. Actualizar `lastmod` al cambiar el contenido.                         |
| `public/llms.txt`    | Resumen del sitio para LLMs, en formato [llmstxt.org](https://llmstxt.org).                                    |
| `public/og.jpg`      | Imagen de Open Graph / Twitter, 1200x630 JPEG.                                                                 |

## Reglas

- Las URLs absolutas apuntan a `https://nexus.wefaber.net`. Preview o staging comparten esos valores: no sirven para validar previews de redes con URLs de otro host.
- El sitio es una SPA de Vite: los crawlers que no ejecutan JavaScript solo ven `index.html`. Por eso los metadatos van estáticos en el HTML y no se setean con JS.
- `llms.txt` describe contenido de `src/content.ts` y de `src/sections/`. Si cambia el copy, actualizar también `llms.txt`.
- Si se agrega una ruta o página nueva: sumarla a `sitemap.xml` y a `llms.txt`, y dar a cada una `canonical` y `og:url` propios.

## Verificar

```sh
bun run build
bun run preview
curl -s http://localhost:4173/robots.txt
curl -s http://localhost:4173/llms.txt | head -5
curl -s http://localhost:4173/sitemap.xml
```

Después del deploy, validar en producción:

- `https://nexus.wefaber.net/robots.txt`, `/sitemap.xml` y `/llms.txt` responden 200.
- Previews: Facebook Sharing Debugger, LinkedIn Post Inspector, Twitter/X Card Validator y Rich Results Test (JSON-LD).
