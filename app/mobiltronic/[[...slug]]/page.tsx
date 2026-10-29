import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroCarouselEnhancer from '../HeroCarouselEnhancer';
import mirror from '@/lib/mobiltronic/generated-mirror.json';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
type Snapshot = { body: string; title: string; description: string; styles: string[]; localOnly?: boolean };
type SearchEntry = { route: string; title: string; text: string };
const data = mirror as unknown as { pages: Record<string, Snapshot>; searchIndex: SearchEntry[]; capturedAt: string; pageCount: number; assetCount: number; unavailableFontCount?: number };
const publicOrigin = 'https://bijan.se';
const basePath = '/mobiltronic';

function routeFor(slug?: string[]) { return `/${(slug ?? []).join('/')}`.replace(/\/{2,}/g, '/') || '/'; }
function queryString(values: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams();
  for (const key of Object.keys(values).sort()) {
    if (key === 'q') continue;
    const value = values[key];
    if (Array.isArray(value)) for (const item of value) params.append(key, item);
    else if (typeof value === 'string') params.append(key, value);
  }
  return params.toString();
}
function canonical(route: string, search: string) { return `${publicOrigin}${basePath}${route === '/' ? '/' : route}${search ? `?${search}` : ''}`; }
function lookup(route: string, search: string): Snapshot | undefined { return data.pages[`${route}${search ? `?${search}` : ''}`] || data.pages[route]; }

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const route = routeFor((await params).slug);
  const search = queryString(await searchParams);
  const page = lookup(route, search);
  return {
    title: page?.title || 'موبایل ترونیک',
    description: page?.description || 'نسخه محلی وب‌سایت موبایل ترونیک در Bijan.se.',
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: { canonical: canonical(route, search) },
  };
}

function LocalSearch({ query }: { query: string }) {
  const normalized = query.toLowerCase().replaceAll('ي', 'ی').replaceAll('ك', 'ک').trim();
  const results = normalized ? data.searchIndex.filter((item) => `${item.title} ${item.text}`.toLowerCase().replaceAll('ي', 'ی').replaceAll('ك', 'ک').includes(normalized)).slice(0, 60) : [];
  return <main dir="rtl" lang="fa" className="mobiltronic-search-results">
    <h1>نتایج جستجو</h1><p>جستجو برای: <strong>{query}</strong></p>
    {results.length ? <ul>{results.map((item) => <li key={item.route}><h2><Link href={`${basePath}${item.route === '/' ? '/' : item.route}`}>{item.title}</Link></h2><p>{item.text.slice(0, 220)}</p></li>)}</ul> : <p>موردی پیدا نشد. عبارت دیگری را جستجو کنید.</p>}
  </main>;
}

function BackendNotice() {
  return <main dir="rtl" lang="fa" className="mobiltronic-backend-notice"><h1>این بخش به سامانه فروش اصلی وابسته است</h1><p>نسخه محلی، کاتالوگ و اطلاعات عمومی را نمایش می‌دهد. ورود، سبد سفارش، موجودی زنده، پرداخت و ثبت سفارش آنلاین به اتصال و دسترسی به سامانه اصلی نیاز دارند و در این نسخه فعال نیستند.</p><Link href="/mobiltronic/contact">مشاهده راه‌های تماس</Link></main>;
}

function desktopNavigationFromBody(body: string) {
  const rootList = /<ul\b[^>]*class=["'][^"']*(?:\boffcanvas-nav\b|\bnavbar-nav\b)[^"']*["'][^>]*>/i.exec(body);
  if (!rootList || rootList.index === undefined) return '';

  const start = rootList.index;
  const listTags = /<\/?ul\b[^>]*>/gi;
  listTags.lastIndex = start;
  let depth = 0;
  let end = -1;
  for (let match = listTags.exec(body); match; match = listTags.exec(body)) {
    if (/^<\//.test(match[0])) depth -= 1;
    else depth += 1;
    if (depth === 0) {
      end = listTags.lastIndex;
      break;
    }
  }
  if (end < 0) return '';

  let menu = body.slice(start, end)
    .replace(/\s*<button\b(?=[^>]*\boffcanvas-nav-toggle\b)[^>]*>[\s\S]*?<\/button>/gi, '')
    .replaceAll('offcanvas-nav-subset', 'nav-subset');

  let listDepth = 0;
  menu = menu.replace(/<\/?ul\b[^>]*>|<li\b[^>]*\boffcanvas-nav-item\b[^>]*>|<a\b[^>]*\boffcanvas-nav-link\b[^>]*>/gi, (tag) => {
    if (/^<\//.test(tag)) {
      listDepth -= 1;
      return tag;
    }
    if (/^<ul\b/i.test(tag)) {
      listDepth += 1;
      return tag;
    }
    if (/^<li\b/i.test(tag)) return tag.replace('offcanvas-nav-item', listDepth === 1 ? 'nav-item' : 'nav-subset-item');
    return tag.replace('offcanvas-nav-link', listDepth === 1 ? 'nav-link' : 'nav-subset-link');
  });
  menu = menu.replace(/(<ul\b[^>]*class=["'])offcanvas-nav(["'])/i, '$1navbar-nav$2');

  return `<nav class="mobiltronic-desktop-navigation" dir="rtl" aria-label="منوی اصلی"><div class="container">${menu}</div></nav>`;
}


function addHomeCategoryArtwork(body: string) {
  const artworks = [
    ['3362ed10c3961914d205dbd3.png', 'analyzer.webp'],
    ['21632ce07abaa7eb8a564bf0.png', 'cable-connectors.webp'],
    ['9a27114c7cbfbc8a048104d7.png', 'power-supply.webp'],
    ['38d74ca2ca786ce70e25db03.png', 'walkie-talkie.webp'],
  ] as const;

  for (const [source, artwork] of artworks) {
    const imageMatch = new RegExp(`<img\\b(?=[^>]*\\bsrc=(["'])[^"']*${source}\\1)[^>]*>`, 'i').exec(body);
    if (!imageMatch || imageMatch.index === undefined) continue;
    const imageIndex = imageMatch.index;
    const anchorStart = body.lastIndexOf('<a', imageIndex);
    const anchorOpenEnd = body.indexOf('>', anchorStart);
    const anchorCloseEnd = body.indexOf('</a>', imageIndex);
    if (anchorStart < 0 || anchorOpenEnd < 0 || anchorCloseEnd < 0) continue;

    let anchor = body.slice(anchorStart, anchorOpenEnd + 1);
    const title = /\\btitle=(["'])(.*?)\\1/i.exec(anchor)?.[2] || /\\balt=(["'])(.*?)\\1/i.exec(imageMatch[0])?.[2] || '';
    anchor = /\\bclass=(["'])(.*?)\\1/i.test(anchor)
      ? anchor.replace(/\\bclass=(["'])(.*?)\\1/i, (_match, quote: string, value: string) => `class=${quote}${value} mobiltronic-category-card${quote}`)
      : anchor.replace('<a', '<a class="mobiltronic-category-card"');
    const image = imageMatch[0]
      .replace(/\\bsrc=(["'])[^"']*\\1/i, `src="/mobiltronic-artwork/categories/${artwork}"`)
      .replace(/\\bclass=(["'])(.*?)\\1/i, (_match, quote: string, value: string) => `class=${quote}${value} mobiltronic-category-generated-image${quote}`);
    const inner = `${image}<span class="mobiltronic-category-label">${title}</span>`;
    body = body.slice(0, anchorStart) + anchor + inner + body.slice(anchorCloseEnd);
  }
  return body;
}

export default async function MobiltronicPage({ params, searchParams }: PageProps) {
  const route = routeFor((await params).slug);
  const query = await searchParams;
  if (route === '/site/search') return <LocalSearch query={typeof query.q === 'string' ? query.q : ''} />;
  if (['/site/cart', '/site/signin', '/site/signup', '/site/checkout'].includes(route)) return <BackendNotice />;

  const search = queryString(query);
  const page = lookup(route, search);
  if (!page) notFound();
  const renderedBody = route === '/' ? addHomeCategoryArtwork(page.body) : page.body;
  return <>
    {page.styles.map((href) => <link key={href} rel="stylesheet" href={href} />)}
    <style>{`@font-face{font-family:FontAwesome;src:url('/mobiltronic/fontawesome-webfont.woff2') format('woff2');font-weight:normal;font-style:normal;font-display:swap}
      .mobiltronic-source-copy .fa,.mobiltronic-source-copy .fa:before{font-family:FontAwesome!important}
      .mobiltronic-desktop-navigation{background:#fafafa;border-bottom:1px solid #e8e8e8;margin-top:-30px;margin-bottom:30px;position:relative;z-index:20}
      .mobiltronic-desktop-navigation>.container{max-width:1140px;margin:auto;display:flex;justify-content:flex-start;padding:0 15px}
      .mobiltronic-desktop-navigation .navbar-nav{display:flex;flex-direction:row;margin:0;padding:0}
      .mobiltronic-desktop-navigation .nav-item{position:relative;list-style:none}
      .mobiltronic-desktop-navigation .nav-subset{display:none;min-width:250px;list-style:none;position:absolute;top:100%;right:0;background:#fff;padding:10px;white-space:nowrap;z-index:21;box-shadow:0 5px 35px rgba(0,0,0,.07);border-radius:.3125rem}
      .mobiltronic-desktop-navigation .nav-subset-item{position:relative;list-style:none}
      .mobiltronic-desktop-navigation .nav-subset-item>.nav-subset{top:-1px;right:100%}
      .mobiltronic-desktop-navigation .nav-subset-link{display:block;padding:9px 15px 9px 30px;color:#6e6e75;font-size:14px;text-decoration:none}
      .mobiltronic-desktop-navigation .nav-subset-link:after{content:'\\f053';font-family:FontAwesome;position:absolute;left:10px;font-size:.7em;top:1px;bottom:0;height:1em;line-height:1em;margin:auto 0}
      .mobiltronic-desktop-navigation .nav-subset-item[data-subset="0"]>.nav-subset-link:after{content:''}
      .mobiltronic-desktop-navigation .nav-item:hover>.nav-subset,
      .mobiltronic-desktop-navigation .nav-item:focus-within>.nav-subset,
      .mobiltronic-desktop-navigation .nav-subset-item:hover>.nav-subset,
      .mobiltronic-desktop-navigation .nav-subset-item:focus-within>.nav-subset{display:block!important}
      .mobiltronic-desktop-navigation a:focus-visible{outline:2px solid #f9a233;outline-offset:2px}
      .mobiltronic-source-copy .index-slider .owl-carousel{display:block;overflow:hidden}
      .mobiltronic-source-copy .index-slider .owl-carousel:not(.mobiltronic-hero-carousel)>a:not(:first-child){display:none}
      .mobiltronic-source-copy .index-slider .mobiltronic-hero-carousel{position:relative;display:grid;grid-template-areas:'slide';overflow:hidden}
      .mobiltronic-source-copy .mobiltronic-hero-slide{grid-area:slide;opacity:0;visibility:hidden;transition:opacity .5s ease;pointer-events:none}
      .mobiltronic-source-copy .mobiltronic-hero-slide.is-active{opacity:1;visibility:visible;pointer-events:auto}
      .mobiltronic-source-copy .mobiltronic-hero-dots{position:absolute;z-index:2;left:0;right:0;bottom:10px;display:flex;justify-content:center;gap:7px;pointer-events:none}
      .mobiltronic-source-copy .mobiltronic-hero-dots button{pointer-events:auto;width:12px;height:12px;min-width:12px;padding:0;border:0;border-radius:50%;background:#5d6265;cursor:pointer}
      .mobiltronic-source-copy .mobiltronic-hero-dots button.is-active{background:#ffa332}
      .mobiltronic-source-copy .mobiltronic-hero-dots button:focus-visible{outline:2px solid #4a246f;outline-offset:3px}
      @media(prefers-reduced-motion:reduce){.mobiltronic-source-copy .mobiltronic-hero-slide{transition:none}}
      .mobiltronic-source-copy .index-products-carousel.owl-carousel{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));overflow:hidden}
      .mobiltronic-source-copy .index-products-carousel.owl-carousel>.index-products-carousel-item:nth-child(n+5){display:none}
      @media(max-width:991px){.mobiltronic-desktop-navigation{display:none}.mobiltronic-source-copy .index-products-carousel.owl-carousel{grid-template-columns:repeat(2,minmax(0,1fr))}.mobiltronic-source-copy .index-products-carousel.owl-carousel>.index-products-carousel-item:nth-child(n+3){display:none}}
      @media(max-width:575px){.mobiltronic-source-copy .index-products-carousel.owl-carousel{grid-template-columns:1fr}.mobiltronic-source-copy .index-products-carousel.owl-carousel>.index-products-carousel-item:nth-child(n+2){display:none}}`}</style>
    <link rel="stylesheet" href="/mobiltronic-polish.css" />
    <div className="mobiltronic-source-copy" dir="rtl" lang="fa" dangerouslySetInnerHTML={{ __html: renderedBody.replace('<!--/navigation-->', `<!--/navigation-->${desktopNavigationFromBody(renderedBody)}`) }} />
    <HeroCarouselEnhancer route={route} />
  </>;
}
