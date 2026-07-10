# AI-NOVA Labs — Sitio web corporativo

Sitio estático construido con [Astro 5](https://astro.build) + [Tailwind CSS 4](https://tailwindcss.com). Genera HTML puro: se puede alojar en cualquier hosting (Vercel, Cloudflare Pages, Netlify, un servidor propio) sin dependencias de plataforma.

## Comandos

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo en http://localhost:4321
npm run build   # genera el sitio estático en dist/
npm run preview # sirve dist/ localmente para revisar el build
```

## Cómo editar el contenido (sin tocar código)

**Todo el texto del sitio** vive en dos archivos:

| Archivo | Qué contiene |
|---|---|
| `src/content/i18n/es.json` | Textos de todas las páginas y secciones (hero, métricas, servicios, footer, etc.) |
| `src/content/site.json` | Datos de la empresa: email, teléfonos, dirección, redes sociales, endpoint del formulario |

Editar un texto = editar el JSON y guardar. Nada más.

- **Métricas de la home:** `stats.items` en `es.json` (valor numérico + sufijo + etiqueta).
- **Secciones "Lo que hacemos":** `pillars.items` (título, texto, imagen, enlace).
- **Páginas interiores** (`/servicios`, `/robotica`, `/enerlabsq`, `/nosotros`): bloque `pages` en `es.json`. Agregar una clave nueva en `pages` crea automáticamente una página nueva en esa ruta.
- **Imágenes:** carpeta `public/images/`. Las de las tarjetas de la home son `pillar-*.jpg` (hoy son placeholders de Unsplash — reemplazar por fotos reales manteniendo el nombre).

## Cómo cambiar colores y tipografía

Un solo lugar: el bloque `@theme` de `src/styles/global.css`. Ahí están la paleta azul (`navy-*`, `accent-*`, `cyan-*`), los colores oficiales del logo (`brand-*`) y las fuentes.

## Logo

`src/components/Logo.astro` — recreación SVG del logo oficial (isotipo "AI" con degradado turquesa→azul + wordmark "AI-NOVA" en Days One). Prop `tone="light"` para fondos claros (wordmark azul marino #003E6C). Si se prefiere el archivo original en vez del SVG, reemplazar el contenido del componente por un `<img>` apuntando a `public/images/`.

## Formulario de contacto

`site.json → formEndpoint`:
- Vacío (por defecto): el formulario abre el cliente de correo del visitante con el mensaje precargado.
- Con una URL de [Formspree](https://formspree.io) u otro servicio: el envío se hace vía POST a ese endpoint.

## Idiomas

El sitio está preparado para ES/EN (config `i18n` en `astro.config.mjs`). El español vive en `src/content/i18n/es.json`; para activar inglés, crear `en.json` con la misma estructura y duplicar las páginas bajo `src/pages/en/`.

## Deploy (GitHub + Vercel)

1. Repo en GitHub, conectado a Vercel (framework preset: **Astro** — lo detecta solo).
2. Cada `git push` a `main` publica automáticamente.
3. Dominio propio: Vercel → Settings → Domains → agregar `www.ainovalabs.cl` y seguir las instrucciones de DNS (registro CNAME `www` → `cname.vercel-dns.com` y redirección del dominio raíz).

## Estructura

```
src/
├── content/        ← TODO el contenido editable (JSON)
├── components/     ← secciones reutilizables (Hero, Stats, Pillars, ...)
├── layouts/        ← plantilla base (SEO, fuentes, nav, footer)
├── pages/          ← rutas del sitio
└── styles/         ← tokens de diseño (colores, fuentes)
public/             ← imágenes, favicon
```
