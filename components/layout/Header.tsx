'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Learn', href: '/learn' },
  { name: 'Named Reactions', href: '/named-reactions' },
  { name: 'Reagents', href: '/reagents' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          Organic Chemistry Hub
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition hover:text-blue-700 ${
                pathname === item.href
                  ? 'text-blue-700'
                  : 'text-slate-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}