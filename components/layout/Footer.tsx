import Link from "next/link";

const columns = [
  {
    title: "Learn and practise",
    links: [
      ["Learn", "/learn"],
      ["Interactive Lab", "/lab"],
      ["Functional Groups", "/functional-groups"],
      ["Calculators", "/calculators"],
    ],
  },
  {
    title: "Reference",
    links: [
      ["Named Reactions", "/named-reactions"],
      ["Reagents", "/reagents"],
      ["Resources", "/resources"],
      ["Editorial Policy", "/editorial-policy"],
    ],
  },
  {
    title: "Project",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr] lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none"
            aria-label="Organic Chemistry Hub home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
              OC
            </span>
            <span className="font-semibold text-white">Organic Chemistry Hub</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Connected lessons, interactive mechanism practice, trusted reaction references,
            and practical chemistry tools.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold text-white">{column.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {column.links.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="rounded transition hover:text-white focus-visible:outline-none"
                  >
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
          <p>
            Educational information only. Always follow approved laboratory safety
            procedures and current institutional guidance.
          </p>
        </div>
      </div>
    </footer>
  );
}
