import type { Metadata } from 'next';
type Props = {
    params: Promise<{
        slug?: string[];
    }>;
};
const publicPreviewHost = 'bijan.se';
export async function generateMetadata({ params }: Props): Promise<Metadata> { const path = (await params).slug ?? []; return { title: path.length ? 'موبایل ترونیک' : 'خانه موبایل ترونیک', robots: { index: false, follow: false }, alternates: { canonical: `https://${publicPreviewHost}/mobiltronic/${path.join('/')}` } }; }
function rewriteInternalLinks(html: string, sourceUrl: string) {
    return html.replace(/<a\b[^>]*>/gi, tag => {
        const href = tag.match(/\shref\s*=\s*(["'])(.*?)\1/i);
        if (!href || href[2].startsWith('#') || href[2].includes('{{')) return tag;
        let url: URL;
        try { url = new URL(href[2].replace(/&amp;/gi, '&'), sourceUrl); }
        catch { return tag; }
        if (!['http:', 'https:'].includes(url.protocol) || url.hostname.replace(/^www\./, '') !== 'mobiltronic.ir') return tag;
        const destination = `https://${publicPreviewHost}/mobiltronic${url.pathname}${url.search}${url.hash}`.replace(/&/g, '&amp;');
        const linked = tag.replace(href[0], ` href="${destination}"`);
        return /\starget\s*=\s*(["']).*?\1/i.test(linked)
            ? linked.replace(/\starget\s*=\s*(["']).*?\1/i, ' target="_top"')
            : linked.replace(/>$/, ' target="_top">');
    });
}
export default async function Page({ params }: Props) {
    const path = (await params).slug ?? [];
    const sourcePath = path.length ? `/${path.join('/')}` : '/';
    let mirrorHtml: string | undefined;
    try {
        const response = await fetch(`https://mobiltronic.ir${sourcePath}`, { next: { revalidate: 3600 } });
        if (response.ok && response.headers.get('content-type')?.includes('text/html')) {
            const source = (await response.text()).replaceAll('https://ecf92b.portal.ir/uploads/editor/d2023c.jpg', 'https://bijan.se/mobiltronic/network-design-coverage.webp');
            const bridge = `<script>document.addEventListener('click',function(event){var link=event.target.closest('a[href]');if(!link)return;var url=new URL(link.getAttribute('href'),document.baseURI);if(url.hostname.replace(/^www\\./,'')==='mobiltronic.ir'){event.preventDefault();window.top.location.href='https://bijan.se/mobiltronic'+url.pathname+url.search+url.hash;}},true);</script>`;
            mirrorHtml = rewriteInternalLinks(source, `https://mobiltronic.ir${sourcePath}`)
                .replace(/<head([^>]*)>/i, `<head$1><base href="https://mobiltronic.ir${sourcePath}">`)
                .replace(/<\/body>/i, `${bridge}</body>`);
        }
    } catch {
        // Keep the original iframe available if the source site is unavailable.
    }
    if (mirrorHtml) return <iframe title="وب‌سایت موبایل ترونیک" srcDoc={mirrorHtml} sandbox="allow-scripts allow-forms allow-top-navigation-by-user-activation allow-popups" style={{ display: 'block', width: '100%', height: '100vh', minHeight: '100vh', border: 0 }} />;
    return <iframe title="وب‌سایت موبایل ترونیک" src={`https://mobiltronic.ir${sourcePath}`} style={{ display: 'block', width: '100%', height: '100vh', minHeight: '100vh', border: 0 }} />;
}

