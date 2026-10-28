import type { Metadata } from 'next';
type Props = {
    params: Promise<{
        slug?: string[];
    }>;
};
const publicPreviewHost = 'bijan.se';
export async function generateMetadata({ params }: Props): Promise<Metadata> { const path = (await params).slug ?? []; return { title: path.length ? 'موبایل ترونیک' : 'خانه موبایل ترونیک', robots: { index: false, follow: false }, alternates: { canonical: `https://${publicPreviewHost}/mobiltronic/${path.join('/')}` } }; }
export default async function Page({ params }: Props) {
    const path = (await params).slug ?? [];
    const sourcePath = path.length ? `/${path.join('/')}` : '/';
    return <iframe title="وب‌سایت موبایل ترونیک" src={`https://mobiltronic.ir${sourcePath}`} style={{ display: 'block', width: '100%', height: '100vh', minHeight: '100vh', border: 0 }} />;
}
