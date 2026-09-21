# Mundo Gamer

E-commerce de hardware y tecnología gaming. Sitio estático construido con **Astro** y **Sass**, sin JavaScript en el cliente salvo pequeñas islas de interacción (carousel, calculadora de envíos, validación de formularios).

Repositorio original: [repo-clases-de-coderhouse](https://github.com/NachoUrbanoBJJ/repo-clases-de-coderhouse) — primer proyecto de curso. El estado anterior a la reestructuración está etiquetado en git como `v0-antes`.

## 🚀 Comandos

| Comando                  | Acción                                        |
| :----------------------- | :-------------------------------------------- |
| `npm install`            | Instala dependencias                          |
| `npm run dev`            | Servidor de desarrollo en `localhost:4321`    |
| `npm run build`          | Build de producción en `./dist/`              |
| `npm run preview`        | Previsualiza el build antes de deployar       |

## 📁 Estructura del proyecto

```text
/
├── public/
│   ├── assets/img/          # Imágenes del sitio
│   └── favicon.svg
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── NavBar.astro     # Header + menú responsive
│   │   ├── Footer.astro     # Footer con datos y redes
│   │   ├── ProductCard.astro
│   │   ├── CategoriaCard.astro
│   │   └── Carousel.astro   # Carousel propio + JS
│   ├── layouts/
│   │   └── Base.astro       # Layout común (head, nav, footer)
│   ├── data/
│   │   └── catalogo.js      # Fuente única del catálogo (productos/categorías)
│   ├── pages/               # Cada archivo = una ruta
│   │   ├── index.astro
│   │   ├── productos.astro
│   │   ├── productos/[slug].astro  # 6 páginas dinámicas estáticas
│   │   ├── nosotros.astro
│   │   ├── contactos.astro
│   │   ├── envios.astro
│   │   └── donde-estamos.astro
│   ├── scripts/             # JS de interacción
│   └── styles/              # Sass por módulos (partials + main.scss)
└── package.json
```

## 🎨 Sistema de diseño

- **Sass modular**: variables, mixins y partials (`_variables`, `_mixins`, `_base`, `_navbar`, `_cards`, `_forms`, `_paginas`...).
- **Design tokens**: paleta (fondo, texto, acento verde), tipografía *Inter*, radios, sombras y breakpoints en un solo archivo.
- **Grid responsive propio** (sin Bootstrap): `repeat(auto-fill, minmax(...))` con breakpoints `sm/md/lg`.

## 🔧 Cómo agregar un producto

El catálogo vive en `src/data/catalogo.js`. Agregar una entrada basta para que aparezca en su categoría (las páginas se generan en build):

```js
{
  id: "placa-rtx5080",
  nombre: "Zotac Gaming GeForce RTX 5080",
  categoria: "placas",
  precio: "$2.199.999",
  imagen: "/assets/img/placa-rtx5080.webp",
  alt: "Placa de video Zotac Gaming GeForce RTX 5080",
  etiqueta: "Nuevo",
}
```

Cuando exista un backend/CMS, este archivo se reemplaza por una fuente de datos sin tocar los componentes.

## 🏗️ Antes → Después

| Aspecto                | Antes (`v0-antes`)                    | Ahora                          |
| :--------------------- | :------------------------------------ | :----------------------------- |
| Generación de páginas  | 11 HTML copiados a mano               | Layout + componentes (1 fuente)|
| Header/Footer          | Duplicados en los 11 archivos         | `NavBar` y `Footer` compartidos|
| CSS                    | CSS compilado duplicado + Bootstrap   | Sass modular, ~10 KB final     |
| Interacción            | Cero JS (función de envíos rota)      | Carousel, costos y validación  |
| Accesibilidad          | `lang="en"`, inputs sin label         | `lang="es"`, labels, ARIA      |
| SEO/Perf               | Sin metas en varias páginas           | Metas por página, favor SVG    |

## 🚢 Deploy

Deploy estático en cualquier plataforma (Vercel, Netlify, GitHub Pages). Build: `npm run build` → carpeta `dist/`.