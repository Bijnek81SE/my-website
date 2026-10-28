import type { Metadata } from 'next';
export const metadata: Metadata = { title: { default: 'موبایل ترونیک', template: '%s' }, description: 'بررسی و استعلام تجهیزات ارتباطی برای خرید شخصی و سازمانی.', robots: { index: false, follow: false } };
export default function Layout({ children }: {
    children: React.ReactNode;
}) { return <div className="mt" dir="rtl" lang="fa">{children}</div>; }
