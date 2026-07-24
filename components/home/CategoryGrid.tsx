import Link from "next/link";

const categories = [
  {
    title: "Fundamentals",
    href: "/learn",
    description: "Build your organic chemistry foundation."
  },
  {
    title: "Named Reactions",
    href: "/named-reactions",
    description: "Browse important organic reactions."
  },
  {
    title: "Reagents",
    href: "/reagents",
    description: "Learn common laboratory reagents."
  },
  {
    title: "Functional Groups",
    href: "/functional-groups",
    description: "Explore functional group chemistry."
  },
  {
    title: "Calculators",
    href: "/calculators",
    description: "Useful chemistry tools."
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Study guides and references."
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
            className="rounded-xl border p-6 transition hover:border-blue-600 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">
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