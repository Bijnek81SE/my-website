import Link from "next/link";

function AtomIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="5" fill="currentColor" />
      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="2.5" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="2.5" transform="rotate(120 24 24)" />
    </svg>
  );
}

function ArrowReactionIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
      <circle cx="9" cy="24" r="6" fill="currentColor" />
      <path d="M18 24H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 17L37 24L30 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M19 6H29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M21 6V18L10 38C9 40 10.5 42 13 42H35C37.5 42 39 40 38 38L27 18V6" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 30H34" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function BondIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
      <circle cx="12" cy="14" r="6" fill="currentColor" />
      <circle cx="36" cy="34" r="6" fill="currentColor" />
      <path d="M17 18L31 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
      <rect x="10" y="6" width="28" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <rect x="15" y="11" width="18" height="8" rx="1.5" fill="currentColor" />
      <circle cx="16" cy="27" r="2" fill="currentColor" />
      <circle cx="24" cy="27" r="2" fill="currentColor" />
      <circle cx="32" cy="27" r="2" fill="currentColor" />
      <circle cx="16" cy="35" r="2" fill="currentColor" />
      <circle cx="24" cy="35" r="2" fill="currentColor" />
      <circle cx="32" cy="35" r="2" fill="currentColor" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M8 10C8 8.5 9.5 7 12 7H24V38H12C9.5 38 8 39.5 8 41V10Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M40 10C40 8.5 38.5 7 36 7H24V38H36C38.5 38 40 39.5 40 41V10Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

const categories = [
  {
    title: "Fundamentals",
    href: "/learn",
    description: "Build your organic chemistry foundation.",
    Icon: AtomIcon
  },
  {
    title: "Named Reactions",
    href: "/named-reactions",
    description: "Browse important organic reactions.",
    Icon: ArrowReactionIcon
  },
  {
    title: "Reagents",
    href: "/reagents",
    description: "Learn common laboratory reagents.",
    Icon: FlaskIcon
  },
  {
    title: "Functional Groups",
    href: "/functional-groups",
    description: "Explore functional group chemistry.",
    Icon: BondIcon
  },
  {
    title: "Calculators",
    href: "/calculators",
    description: "Useful chemistry tools.",
    Icon: CalculatorIcon
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Study guides and references.",
    Icon: BookIcon
  }
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-3xl font-bold">
        Browse Topics
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group rounded-xl border p-6 transition hover:border-blue-600 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-100">
              <category.Icon />
            </div>

            <h3 className="mt-4 text-xl font-semibold">
              {category.title}
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}