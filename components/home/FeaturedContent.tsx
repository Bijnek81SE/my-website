import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';

const groups = [
  {
    title: 'First lessons',
    description: 'Start with the concepts that support every later topic.',
    href: '/learn',
    items: ['What is organic chemistry?', 'Atomic structure and bonding', 'Hybridization and molecular shape'],
  },
  {
    title: 'Core reactions',
    description: 'Build mechanism knowledge through high-value transformations.',
    href: '/named-reactions',
    items: ['Aldol reaction', 'Diels–Alder reaction', 'Suzuki coupling'],
  },
  {
    title: 'Essential reagents',
    description: 'Learn what common reagents do—and when not to use them.',
    href: '/reagents',
    items: ['Sodium borohydride', 'Lithium aluminium hydride', 'mCPBA'],
  },
];

export default function FeaturedContent() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Coming first"
          title="The opening collection"
          description="We are building the library in a deliberate sequence, starting with the most useful foundational material."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <article key={group.title} className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-950">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={group.href} className="mt-7 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-900">
                Explore section →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
