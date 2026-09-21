# Mundo Gamer

E-commerce de hardware y tecnología gaming construido como **demostración de capacidades (portfolio)**. Sitio 100% estático generado con **Astro** + **Sass**, con interacción en cliente mediante scripts embebidos: carousel, carrito persistente y checkout simulado, validación de formularios y autenticación demo.

Todos los datos, precios, imágenes y medios de contacto son **ficticios a propósito**: el proyecto es una muestra de lo que se puede construir, no una tienda real.

Repo original del curso: [repo-clases-de-coderhouse](https://github.com/NachoUrbanoBJJ/repo-clases-de-coderhouse). El estado anterior (sitio en HTML a mano) está etiquetado como `v0-antes`.

## 🚀 Comandos

| Comando          | Acción                                     |
| :--------------- | :----------------------------------------- |
| `npm install`    | Instala dependencias                       |
| `npm run dev`    | Servidor de desarrollo en `localhost:4321` |
| `npm run build`  | Build de producción en `./dist/`           |
| `npm run preview`| Previsualiza el build antes de deployar    |

## 📁 Estructura del proyecto

```text
/
├── public/
│   ├── assets/img/   # Imágenes (incl. banners del carousel, 1920×576)
│   ├── favicon.svg / favicon.ico
├── img/              # Fotos fuente usadas para regenerar los banners del carousel
├── src/
│   ├── components/
│   │   ├── Header.astro      # Header + menú responsive accesible
│   │   ├── Footer.astro
│   │   ├── Carousel.astro    # Carousel propio con JS (dots, autoplay, ARIA)
│   │   ├── Marquesina.astro
│   │   ├── CategoriaCard.astro
│   │   └── ProductCard.astro
│   ├── layouts/Base.astro    # Layout común: metas SEO · OG · carrito y checkout
│   ├── data/
│   │   ├── catalogo.js       # Fuente única del catálogo (categorías/productos)
│   │   └── productos-extra.js # Descripciones y specs por producto
│   ├── pages/                # Cada archivo = una ruta
│   │   ├── index.astro
│   │   ├── productos.astro
│   │   ├── productos/[slug].astro          # 6 categorías (rutas generadas)
│   │   ├── productos/[slug]/[producto].astro # Detalle de producto (21 páginas)
│   │   ├── nosotros.astro
│   │   ├── ingresar.astro
│   │   ├── 404.astro
│   │   ├── robots.txt.js
│   │   └── sitemap.xml.js
│   ├── scripts/              # Interacción en cliente
│   │   ├── carrito.js        # Carrito + checkout simulado (localStorage)
│   │   └── formularios.js    # Validación de formularios
│   └── styles/               # Sass modular (partials + main.scss)
└── package.json
```

## 🎨 Sistema de diseño

- **Sass modular**: variables de tema, mixins y partials por sección (`_variables`, `_mixins`, `_base`, `_botones`, `_forms`...).
- **Design tokens**: paleta (fondo, texto, acento), tipografía *Inter*, radios, sombras y breakpoints centralizados.
- **Grid responsive propio** (sin frameworks): `repeat(auto-fill, minmax(...))` con breakpoints `sm/md/lg`.

## 🛒 Funcionalidades demostradas

- **Carousel** a mano: autoplay con pausa en hover, flechas, dots con ARIA y slides `inert` fuera de la activa.
- **Carrito real en cliente**: persistencia en `localStorage`, contador, stepper de cantidades, toast con `aria-live`, focus trap, cierre con `Esc`.
- **Checkout simulado**: métodos de pago con descuento 10% por transferencia, pantalla de confirmación y nota de que no se procesan pagos.
- **Autenticación demo** en `/ingresar` (tabs accesibles, validación de contraseñas).
- **Validación de formularios** con mensajes de error accesibles.

## 🔧 Cómo agregar un producto

El catálogo vive en `src/data/catalogo.js`. Agregar una entrada es suficiente: las páginas de categoría y detalle se generan en el build.

```js
{
  id: "placa-rtx5080",
  nombre: "Zotac Gaming GeForce RTX 5080",
  categoria: "placas",
  precio: "$2.199.999",
  imagen: "/assets/img/placa-rtx5080.jpg",
  alt: "Placa de video Zotac Gaming GeForce RTX 5080",
  etiqueta: "Nuevo",
}
```

## 🖼️ Banners del carousel

Las fotos fuente viven en `img/`. Para regenerar los `banner-*.jpg` (1920×576, cover centrado + overlay oscuro) se usa un script de `System.Drawing` (PowerShell) que escala sobre el ancho y recorta la banda central; así el contenedor 10:3 no se deforma en PC ni en mobile.

## 🏗️ Antes → Después

| Aspecto                | Antes (`v0-antes`)                     | Ahora                          |
| :--------------------- | :------------------------------------- | :----------------------------- |
| Generación de páginas  | HTML copiado a mano (11 archivos)      | Layout + componentes (1 fuente de datos) |
| Header/Footer          | Duplicados en cada archivo             | Componentes compartidos        |
| CSS                    | CSS duplicado + Bootstrap              | Sass modular compilado a un solo CSS |
| Interacción            | Sin JS (función de costos rota)        | Carousel, carrito+checkout, validación, login demo |
| Accesibilidad          | `lang="en"`, inputs sin label          | `lang="es"`, labels, ARIA, foco por teclado |
| SEO/Perf               | Metas incompletas                      | Metas por página, OG, sitemap/robots, `favicon` SVG |

## 🚢 Deploy

Build estático: `npm run build` → carpeta `dist/` (funciona en Vercel, Netlify, Cloudflare Pages o GH Pages).

> **Antes de publicar un dominio real**: actualizá `site` en `astro.config.mjs` (hoy apunta a `https://mundo-gamer.example.com` como placeholder) para que canonical, sitemap y Open Graph usen la URL real.