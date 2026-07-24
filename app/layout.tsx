import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bijan.se'),
  title: {
    default: 'Organic Chemistry Hub',
    template: '%s | Organic Chemistry Hub',
  },
  description:
    'Clear organic chemistry lessons, named reaction references, reagent guides, functional-group resources, and practical calculators.',
  openGraph: {
    title: 'Organic Chemistry Hub',
    description:
      'Learn organic chemistry through structured lessons, trusted references, and practical tools.',
    url: 'https://bijan.se',
    siteName: 'Organic Chemistry Hub',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
