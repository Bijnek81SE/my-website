import Link from 'next/link';

const columns = [
  {
    title: 'Explore',
    links: [
      ['Learn', '/learn'],
      ['Named Reactions', '/named-reactions'],
      ['Reagents', '/reagents'],
      ['Calculators', '/calculators'],
    ],
  },
  {
    title: 'About',
    links: [
      ['About the Hub', '/about'],
      ['Editorial Policy', '/editorial-policy'],
      ['Resources', '/resources'],
      ['Contact', '/contact'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
              OC
            </span>
            <span className="font-semibold text-white">Organic Chemistry Hub</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Clear lessons, trusted reaction references, practical reagent guides,
            and useful tools for students and working chemists.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold text-white">{column.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {column.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Organic Chemistry Hub.</p>
          <p>Educational information only. Always follow approved laboratory safety procedures.</p>
        </div>
      </div>
    </footer>
  );
}
