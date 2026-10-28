import { createHash } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://mobiltronic.ir';
const publicOrigin = 'https://bijan.se';
const root = process.cwd();
const mirrorRoot = path.join(root, 'public', 'mobiltronic-mirror');
const assetRoot = path.join(mirrorRoot, 'assets');
const manifestFile = path.join(root, 'lib', 'mobiltronic', 'generated-mirror.json');
const maxPages = Number(process.env.MOBILTRONIC_MIRROR_MAX_PAGES || 300);
const maxAssetBytes = 40 * 1024 * 1024;
const maxTotalAssetBytes = 600 * 1024 * 1024;
const ignoredRoute = /\/(?:admin|dashboard|site\/(?:admin|api|payment|cart|signin|signup|checkout|orders?))(?:\/|$)/i;
const assetPath = /\.(?:avif|css|gif|ico|jpe?g|js|m4v|mp3|mp4|otf|pdf|png|svg|ttf|webm|webp|woff2?|eot)(?:$)/i;
const backendPaths = ['/site/cart', '/site/signin', '/site/signup', '/site/checkout'];
const pages = new Map();
const scheduledPages = new Set();
const assetMap = new Map();
const assetQueue = [];
const failedRoutes = [];
const failedAssets = [];
let downloadedBytes = 0;

function cleanRoute(url) {
  const pathname = decodeURIComponent(url.pathname).replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
  const pairs = [...url.searchParams.entries()].filter(([key]) => key === 'page').sort(([a], [b]) => a.localeCompare(b));
  const search = new URLSearchParams(pairs).toString();
  return `${pathname}${search ? `?${search}` : ''}`;
}
function assetName(url, contentType = '') {
  const digest = createHash('sha256').update(url.href).digest('hex').slice(0, 24);
  let ext = path.extname(url.pathname).toLowerCase();
  if (!ext || ext.length > 8) {
    const type = contentType.split(';')[0].trim().toLowerCase();
    ext = ({ 'text/css': '.css', 'image/svg+xml': '.svg', 'font/woff2': '.woff2', 'font/woff': '.woff', 'image/webp': '.webp', 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif', 'image/avif': '.avif', 'video/mp4': '.mp4' })[type] || '.bin';
  }
  return `${digest}${ext}`;
}
function resolveUrl(value, base) {
  if (!value || /^(?:data:|blob:|javascript:|mailto:|tel:|#)/i.test(value.trim())) return null;
  try { return new URL(value.trim().replace(/&amp;/gi, '&'), base); } catch { return null; }
}
function sourcePageUrl(value, base = origin) {
  const url = resolveUrl(value, base);
  if (!url || !['http:', 'https:'].includes(url.protocol) || url.hostname.replace(/^www\./, '') !== 'mobiltronic.ir') return null;
  if (/%7b%7b|%7d%7d/i.test(url.pathname) || url.pathname.includes('{{') || url.pathname.includes('}}')) return null;
  if (ignoredRoute.test(url.pathname) || assetPath.test(url.pathname) || /\/(?:uploads|themes|site\/resources)\//i.test(url.pathname)) return null;
  for (const key of [...url.searchParams.keys()]) if (key !== 'page') url.searchParams.delete(key);
  return url;
}
function addAsset(value, base) {
  const url = resolveUrl(value, base);
  if (!url || !['http:', 'https:'].includes(url.protocol)) return;
  if (!assetMap.has(url.href)) {
    const local = `/mobiltronic-mirror/assets/${assetName(url)}`;
    assetMap.set(url.href, local);
    assetQueue.push({ url, local });
  }
}
function matches(html, re, callback) { for (const match of html.matchAll(re)) callback(...match.slice(1)); }
function collectAssets(html, baseUrl) {
  matches(html, /<(?:img|source|video|audio|track|input)\b[^>]*?\b(?:src|poster)\s*=\s*(["'])(.*?)\1/gi, (_quote, value) => addAsset(value, baseUrl));
  matches(html, /\bhref\s*=\s*(["'])(.*?)\1/gi, (_quote, value) => {
    const url = resolveUrl(value, baseUrl);
    if (url && (assetPath.test(url.pathname) || /\/(?:uploads|themes|site\/resources)\//i.test(url.pathname))) addAsset(value, baseUrl);
  });
  matches(html, /\bsrcset\s*=\s*(["'])(.*?)\1/gi, (_quote, value) => {
    for (const candidate of value.split(',')) addAsset(candidate.trim().split(/\s+/)[0], baseUrl);
  });
  matches(html, /url\(\s*(["']?)(.*?)\1\s*\)/gi, (_quote, value) => addAsset(value, baseUrl));
}
function extractAnchors(html, baseUrl) {
  const urls = [];
  matches(html, /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi, (_quote, value) => {
    const url = sourcePageUrl(value, baseUrl);
    if (url) urls.push(url);
  });
  return urls;
}
function extractBody(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/i);
  return (body ? body[1] : html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe\s*>/gi, '<div class="mirror-unavailable">محتوای جاسازی‌شده در نسخه محلی نمایش داده نمی‌شود.</div>')
    .replace(/<(?:object|embed|applet)\b[^>]*>[\s\S]*?<\/(?:object|embed|applet)\s*>/gi, '')
    .replace(/<base\b[^>]*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s+ng-[\w-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s+data-ng-[\w-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s+(?:href|src|action|formaction)\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi, '')
    .replace(/<form\b([^>]*)>([\s\S]*?)<\/form\s*>/gi, (all, attrs, content) => {
      const action = attrs.match(/\baction\s*=\s*(["'])(.*?)\1/i)?.[2] || '';
      if (/\/site\/search\b/i.test(action)) return `<form action="${publicOrigin}/mobiltronic/site/search" method="get">${content}</form>`;
      return '<div class="mirror-backend-form" role="note">فرم این بخش به سامانه اصلی وابسته است و در نسخه محلی ارسال نمی‌شود.</div>';
    });
}
function localAssetUrl(value, baseUrl) {
  const url = resolveUrl(value, baseUrl);
  if (!url) return null;
  return assetMap.get(url.href) || assetMap.get(new URL(url.pathname, url.origin).href) || null;
}
function rewriteHtml(html, baseUrl) {
  return html
    .replace(/\b(src|poster|href|action)\s*=\s*(["'])(.*?)\2/gi, (all, attr, quote, value) => {
      const url = resolveUrl(value, baseUrl);
      if (!url) return all;
      if (attr.toLowerCase() === 'action' || attr.toLowerCase() === 'formaction') {
        if (url.hostname.replace(/^www\./, '') === 'mobiltronic.ir') return `${attr}=${quote}${publicOrigin}/mobiltronic${url.pathname}${url.search}${quote}`;
        return all;
      }
      const isAnchor = attr.toLowerCase() === 'href' && !assetPath.test(url.pathname) && !/\/(?:uploads|themes|site\/resources)\//i.test(url.pathname);
      if (isAnchor && url.hostname.replace(/^www\./, '') === 'mobiltronic.ir') {
        return `${attr}=${quote}${publicOrigin}/mobiltronic${url.pathname}${url.search}${url.hash}${quote}`;
      }
      const local = localAssetUrl(value, baseUrl);
      return local ? `${attr}=${quote}${local}${quote}` : all;
    })
    .replace(/\bsrcset\s*=\s*(["'])(.*?)\1/gi, (_all, quote, value) => `srcset=${quote}${value.split(',').map((item) => { const [url, ...rest] = item.trim().split(/\s+/); return `${localAssetUrl(url, baseUrl) || url}${rest.length ? ` ${rest.join(' ')}` : ''}`; }).join(', ')}${quote}`)
    .replace(/url\(\s*(["']?)(.*?)\1\s*\)/gi, (all, quote, value) => `url(${quote}${localAssetUrl(value, baseUrl) || value}${quote})`);
}
function titleFrom(html) { return (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
function descriptionFrom(html) { return html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)/i)?.[1] || html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description/i)?.[1] || ''; }
function parseLocations(xml) { return [...xml.matchAll(/<loc\b[^>]*>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].replace(/&amp;/g, '&')); }
async function fetchResponse(url, accept = '*/*') {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'Mobiltronic-public-copy/1.0 (+https://bijan.se/mobiltronic)', accept }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
      if (response.status === 429) {
        lastError = new Error(`HTTP 429 for ${url}`);
        const retryAfter = Number(response.headers.get('retry-after'));
        const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter * 1000, 30000) : Math.min(30000, 10000 * (attempt + 1));
        console.warn(`[Mobiltronic mirror] Rate limited; retrying ${url} in ${delay}ms.`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < 4) await new Promise((resolve) => setTimeout(resolve, Math.min(5000, 1000 * (attempt + 1))));
    }
  }
  throw lastError;
}
async function enqueueSitemap(url, sitemapQueue, seen) {
  if (seen.has(url)) return;
  seen.add(url);
  const response = await fetchResponse(url, 'application/xml,text/xml,text/plain,*/*');
  const xml = await response.text();
  const locs = parseLocations(xml);
  if (/<sitemapindex\b/i.test(xml)) {
    for (const loc of locs) await enqueueSitemap(loc, sitemapQueue, seen);
    return;
  }
  for (const loc of locs) {
    const page = sourcePageUrl(loc);
    if (page) sitemapQueue.push(page);
  }
}
async function capturePage(url) {
  const response = await fetchResponse(url.href, 'text/html,application/xhtml+xml,*/*');
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html') && !type.includes('application/xhtml+xml')) throw new Error(`Not HTML: ${url.href}`);
  let html = await response.text();
  if (url.pathname === '/services/consulting-and-network-design') {
    html = html.replaceAll('https://ecf92b.portal.ir/uploads/editor/d2023c.jpg', 'https://bijan.se/mobiltronic/network-design-coverage.webp');
  }
  collectAssets(html, url);
  const styles = [];
  matches(html, /<link\b[^>]*>/gi, (tag) => {
    if (!/\bstylesheet\b/i.test(tag)) return;
    const href = tag.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (!href) return;
    const resolved = resolveUrl(href, url);
    if (resolved) { addAsset(href, url); styles.push(resolved.href); }
  });
  return { route: cleanRoute(url), html, title: titleFrom(html), description: descriptionFrom(html), styles: [...new Set(styles)], links: extractAnchors(html, url), sourceUrl: url.href };
}
async function fetchAsset(entry) {
  try {
    const response = await fetchResponse(entry.url.href);
    const type = response.headers.get('content-type') || 'application/octet-stream';
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > maxAssetBytes) throw new Error(`Asset too large (${buffer.byteLength} bytes)`);
    downloadedBytes += buffer.byteLength;
    if (downloadedBytes > maxTotalAssetBytes) {
      downloadedBytes -= buffer.byteLength;
      throw new Error(`Asset copy exceeded ${maxTotalAssetBytes} bytes`);
    }
    const filename = assetName(entry.url, type);
    await writeFile(path.join(assetRoot, filename), buffer);
    const local = `/mobiltronic-mirror/assets/${filename}`;
    assetMap.set(entry.url.href, local);
    if (type.toLowerCase().includes('text/css') || entry.url.pathname.toLowerCase().endsWith('.css')) {
      const css = buffer.toString('utf8');
      matches(css, /url\(\s*(["']?)(.*?)\1\s*\)/gi, (_quote, value) => addAsset(value, entry.url));
      matches(css, /@import\s+(?:url\()?\s*(["'])(.*?)\1/gi, (_quote, value) => addAsset(value, entry.url));
      const updated = css.replace(/url\(\s*(["']?)(.*?)\1\s*\)/gi, (all, quote, value) => `url(${quote}${localAssetUrl(value, entry.url) || value}${quote})`).replace(/@import\s+(?:url\()?\s*(["'])(.*?)\1/gi, (all, quote, value) => all.replace(value, localAssetUrl(value, entry.url) || value));
      await writeFile(path.join(assetRoot, filename), updated);
    }
    return true;
  } catch (error) {
    assetMap.delete(entry.url.href);
    failedAssets.push({ url: entry.url.href, error: String(error.message || error) });
    console.warn(`[Mobiltronic mirror] Asset skipped: ${entry.url.href} — ${error.message}`);
    return false;
  }
}
function normalizeSearchText(text) { return text.toLowerCase().replaceAll('ي', 'ی').replaceAll('ك', 'ک').replace(/\s+/g, ' ').trim(); }

await rm(mirrorRoot, { recursive: true, force: true });
await mkdir(assetRoot, { recursive: true });
await mkdir(path.dirname(manifestFile), { recursive: true });

const sitemapSeeds = [];
const seenSitemaps = new Set();
const robotsResponse = await fetchResponse(`${origin}/robots.txt`, 'text/plain,*/*');
const robots = await robotsResponse.text();
const sitemapUrl = robots.match(/^\s*Sitemap:\s*(\S+)/im)?.[1] || `${origin}/site/sitemap`;
await enqueueSitemap(sitemapUrl, sitemapSeeds, seenSitemaps);
const home = new URL('/', origin);
const queue = [];
function enqueuePage(url) {
  const route = cleanRoute(url);
  if (!scheduledPages.has(route) && !pages.has(route)) {
    scheduledPages.add(route);
    queue.push(url);
  }
}
enqueuePage(home);
for (const url of sitemapSeeds) enqueuePage(url);
const backendHtml = '<main class="mirror-backend-notice" dir="rtl" lang="fa"><h1>این بخش به سامانه فروش اصلی وابسته است</h1><p>نسخه محلی، کاتالوگ و اطلاعات عمومی را نمایش می‌دهد. ورود، سبد سفارش، پرداخت و ثبت سفارش آنلاین به اتصال و دسترسی به سامانه اصلی نیاز دارند و در این نسخه فعال نیستند.</p><a href="https://bijan.se/mobiltronic/contact">راه‌های تماس</a></main>';
for (const route of backendPaths) pages.set(route, { route, title: 'بخش نیازمند سامانه فروش', description: 'این مسیر به سامانه اصلی فروش وابسته است.', body: backendHtml, styles: [], sourceUrl: null, localOnly: true });

while (queue.length && pages.size < maxPages) {
  const url = queue.shift();
  if (!url) continue;
  const route = cleanRoute(url);
  if (pages.has(route)) continue;
  try {
    await new Promise((resolve) => setTimeout(resolve, 650));
    const record = await capturePage(url);
    pages.set(record.route, record);
    for (const link of record.links) enqueuePage(link);
    if (pages.size % 25 === 0) console.log(`[Mobiltronic mirror] Captured ${pages.size} pages; ${queue.length} queued.`);
  } catch (error) {
    failedRoutes.push({ route, error: String(error.message || error) });
    console.warn(`[Mobiltronic mirror] Page skipped: ${route} — ${error.message}`);
  }
}
if (pages.size < 20) throw new Error(`Only captured ${pages.size} public pages; refusing to build an incomplete mirror.`);

while (assetQueue.length) {
  const batch = assetQueue.splice(0, 12);
  await Promise.all(batch.map(fetchAsset));
}

const manifest = { source: origin, capturedAt: new Date().toISOString(), pageCount: pages.size, assetCount: assetMap.size, pages: {}, searchIndex: [] };
for (const [route, record] of pages) {
  let body = extractBody(record.html || record.body || '');
  body = rewriteHtml(body, record.sourceUrl ? new URL(record.sourceUrl) : new URL(origin));
  const styles = (record.styles || []).map((href) => assetMap.get(href)).filter(Boolean);
  const text = body.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|amp|lt|gt|quot|#\d+);/gi, ' ').replace(/\s+/g, ' ').trim();
  manifest.pages[route] = { body, title: record.title || 'موبایل ترونیک', description: record.description || '', styles, localOnly: !!record.localOnly };
  manifest.searchIndex.push({ route, title: record.title || 'موبایل ترونیک', text: text.slice(0, 4000) });
}
await writeFile(manifestFile, JSON.stringify(manifest));
const report = `# Mobiltronic public copy build report\n\n- Captured at: ${manifest.capturedAt}\n- HTML pages: ${manifest.pageCount}\n- Local assets: ${manifest.assetCount}\n- Asset bytes: ${downloadedBytes}\n- Routes that failed capture: ${failedRoutes.length}\n- Assets that failed download: ${failedAssets.length}\n\n## Routes needing an original backend\n\nCart, sign-in, sign-up, and checkout paths are preserved with a clear notice. Their CMS, customer account, inventory, payment, and order APIs were not copied.\n\n${failedRoutes.length ? `## Routes that did not load\n\n${failedRoutes.map((item) => `- \`${item.route}\`: ${item.error}`).join('\n')}\n` : ''}${failedAssets.length ? `## Assets that did not download\n\n${failedAssets.map((item) => `- ${item.url}: ${item.error}`).join('\n')}\n` : ''}`;
await writeFile(path.join(root, 'MOBILTRONIC-MIRROR-REPORT.md'), report);
console.log(`[Mobiltronic mirror] Complete: ${manifest.pageCount} pages, ${assetMap.size} local assets (${downloadedBytes} bytes).`);
