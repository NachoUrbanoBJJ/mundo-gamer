import { categorias, productosDeCategoria } from "../data/catalogo.js";

export function GET() {
  const base = (import.meta.env.SITE || "https://mundo-gamer.vercel.app").replace(
    /\/$/,
    ""
  );
  const hoy = new Date().toISOString().slice(0, 10);

  const urls = [
    { loc: `${base}/`, lastmod: hoy },
    { loc: `${base}/productos`, lastmod: hoy },
    { loc: `${base}/nosotros`, lastmod: hoy },
    { loc: `${base}/ingresar`, lastmod: hoy },
  ];

  for (const categoria of categorias) {
    urls.push({ loc: `${base}/productos/${categoria.slug}`, lastmod: hoy });
    for (const producto of productosDeCategoria(categoria.slug)) {
      urls.push({
        loc: `${base}/productos/${categoria.slug}/${producto.id}`,
        lastmod: hoy,
      });
    }
  }

  urls.push({
    loc: `${base}/productos/armado/destacado-armado-pc`,
    lastmod: hoy,
  });

  const cuerpo = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(cuerpo, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}