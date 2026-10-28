import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Store from '@/components/mobiltronic/Store';
import { categories, findProduct, pageTitles } from '@/lib/mobiltronic/catalog';
type Props = {
    params: Promise<{
        slug?: string[];
    }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> { const path = (await params).slug ?? []; const product = path[0] === 'products' ? findProduct(path[1]) : undefined; return { title: product?.seo.title ?? pageTitles[path[0] ?? ''] ?? 'محصولات', alternates: { canonical: `https://mobiltronic.bijan.se/${path.join('/')}` }, description: product?.seo.description }; }
export default async function Page({ params }: Props) {
    const path = (await params).slug ?? [];
    const route = path.join('/');
    const valid = path.length <= 1 && Object.hasOwn(pageTitles, route) || path.length === 2 && (path[0] === 'products' && !!findProduct(path[1]) || path[0] === 'categories' && categories.some(c => c.id === path[1]));
    if (!valid)
        notFound();
    const host = (await headers()).get('host')?.split(':')[0];
    const product = path[0] === 'products' ? findProduct(path[1]) : undefined;
    return <>{product && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: `Hytera ${product.model}`, sku: product.sku, model: product.model, brand: { '@type': 'Brand', name: product.brand }, description: product.description, url: `https://mobiltronic.bijan.se/products/${product.id}` }).replaceAll('<', '\\u003c') }}/>}<Store route={route} base={host === 'mobiltronic.bijan.se' ? '' : '/mobiltronic'}/></>;
}
