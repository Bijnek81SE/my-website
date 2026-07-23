import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">
              Organic Chemistry Hub
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              Free, high-quality organic chemistry lessons, reaction references,
              reagent guides, and practical tools.
            </p>
          </div>

          <div className="flex gap-8 text-sm">
            <Link href="/about">About</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Organic Chemistry Hub
        </div>
      </div>
    </footer>
  );
}