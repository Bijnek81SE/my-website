import Link from 'next/link';

type Item = {
  title: string;
  description: string;
  href?: string;
};

type SectionLandingProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
};

export default function SectionLanding({ eyebrow, title, description, items }: SectionLandingProps) {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const card = (
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
                <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                {item.href && <span className="mt-6 inline-flex text-sm font-semibold text-emerald-700">Open section →</span>}
              </div>
            );
            return item.href ? <Link key={item.title} href={item.href}>{card}</Link> : <div key={item.title}>{card}</div>;
          })}
        </div>
      </section>
    </div>
  );
}
