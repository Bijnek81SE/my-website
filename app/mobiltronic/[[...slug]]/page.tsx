import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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

function SnapshotNotice() {
  const date = data.capturedAt?.slice(0, 10) || 'نامشخص';
  return <aside role="note" dir="rtl" lang="fa" style={{ padding: '10px 16px', textAlign: 'center', background: '#fff3cd', color: '#664d03', fontSize: 14, borderBottom: '1px solid #ffecb5' }}>
    نسخهٔ اطلاعات عمومی ثبت‌شده در {date}. قیمت و موجودی لحظه‌ای، ثبت سفارش و پرداخت در این نسخه قابل تأیید نیست؛ برای استعلام از <Link href="/mobiltronic/contact-us" style={{ color: 'inherit', fontWeight: 700 }}>راه‌های تماس</Link> استفاده کنید.{data.unavailableFontCount ? ' قلم اختصاصی سایت در دسترس نبود و قلم جایگزین به کار می‌رود.' : ''}
  </aside>;
}

function LocalSearch({ query }: { query: string }) {
  const normalized = query.toLowerCase().replaceAll('ي', 'ی').replaceAll('ك', 'ک').trim();
  const results = normalized ? data.searchIndex.filter((item) => `${item.title} ${item.text}`.toLowerCase().replaceAll('ي', 'ی').replaceAll('ك', 'ک').includes(normalized)).slice(0, 60) : [];
  return <main dir="rtl" lang="fa" className="mobiltronic-search-results">
    <SnapshotNotice />
    <h1>نتایج جستجو</h1><p>جستجو برای: <strong>{query}</strong></p>
    {results.length ? <ul>{results.map((item) => <li key={item.route}><h2><Link href={`${basePath}${item.route === '/' ? '/' : item.route}`}>{item.title}</Link></h2><p>{item.text.slice(0, 220)}</p></li>)}</ul> : <p>موردی پیدا نشد. عبارت دیگری را جستجو کنید.</p>}
  </main>;
}

function BackendNotice() {
  return <main dir="rtl" lang="fa" className="mobiltronic-backend-notice"><h1>این بخش به سامانه فروش اصلی وابسته است</h1><p>نسخه محلی، کاتالوگ و اطلاعات عمومی را نمایش می‌دهد. ورود، سبد سفارش، موجودی زنده، پرداخت و ثبت سفارش آنلاین به اتصال و دسترسی به سامانه اصلی نیاز دارند و در این نسخه فعال نیستند.</p><Link href="/mobiltronic/contact">مشاهده راه‌های تماس</Link></main>;
}

export default async function MobiltronicPage({ params, searchParams }: PageProps) {
  const route = routeFor((await params).slug);
  const query = await searchParams;
  if (route === '/site/search') return <LocalSearch query={typeof query.q === 'string' ? query.q : ''} />;
  if (['/site/cart', '/site/signin', '/site/signup', '/site/checkout'].includes(route)) return <BackendNotice />;

  const search = queryString(query);
  const page = lookup(route, search);
  if (!page) notFound();
  return <>
    <SnapshotNotice />
    {page.styles.map((href) => <link key={href} rel="stylesheet" href={href} />)}
    <style>{`.mobiltronic-source-copy, .mobiltronic-source-copy * { font-family: Tahoma, Arial, sans-serif !important; }`}</style>
    <div className="mobiltronic-source-copy" dir="rtl" lang="fa" dangerouslySetInnerHTML={{ __html: page.body }} />
  </>;
}
