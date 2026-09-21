export function GET() {
  const base = (import.meta.env.SITE || "https://mundo-gamer.vercel.app").replace(
    /\/$/,
    ""
  );
  const cuerpo = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml`;

  return new Response(cuerpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}