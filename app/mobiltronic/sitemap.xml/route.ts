import mirror from '@/lib/mobiltronic/generated-mirror.json';

const base = 'https://bijan.se/mobiltronic';
const data = mirror as unknown as { pages: Record<string, { localOnly?: boolean }> };
const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export function GET() {
  const urls = Object.entries(data.pages)
    .filter(([, page]) => !page.localOnly)
    .map(([route]) => `${base}${route === '/' ? '/' : route}`)
    .map((url) => `<url><loc>${escapeXml(url)}</loc></url>`)
    .join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
