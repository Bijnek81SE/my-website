import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';

const categories = [
  {
    title: 'Learn',
    description: 'Follow a structured curriculum from bonding fundamentals to advanced synthesis.',
    href: '/learn',
    label: '01',
  },
  {
    title: 'Named Reactions',
    description: 'Understand mechanisms, scope, limitations, and practical applications.',
    href: '/named-reactions',
    label: '02',
  },
  {
    title: 'Reagents',
    description: 'Compare uses, selectivity, handling, alternatives, and reaction context.',
    href: '/reagents',
    label: '03',
  },
  {
    title: 'Functional Groups',
    description: 'Review characteristic structures, properties, reactions, and identification.',
    href: '/functional-groups',
    label: '04',
  },
  {
    title: 'Calculators',
    description: 'Use practical tools for solution preparation, yield, stoichiometry, and more.',
    href: '/calculators',
    label: '05',
  },
  {
    title: 'Resources',
    description: 'Find study guides, reaction maps, recommended references, and templates.',
    href: '/resources',
    label: '06',
  },
];

export default function CategoryGrid() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Browse the hub"
          title="One connected place for organic chemistry"
          description="Explore the subject by learning path, reaction, reagent, functional group, or practical task."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-700">{category.label}</span>
                <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-700">→</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-slate-950">{category.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
