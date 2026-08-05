"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Learn", href: "/learn" },
  { name: "Lab", href: "/lab" },
  { name: "Named Reactions", href: "/named-reactions" },
  { name: "Reagents", href: "/reagents" },
  { name: "Functional Groups", href: "/functional-groups" },
  { name: "Calculators", href: "/calculators" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
] as const;

function isRouteActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({
    pathname,
    open: false,
  });

  const open =
    menuState.pathname === pathname && menuState.open;

  function closeMenu() {
    setMenuState({ pathname, open: false });
  }

  function toggleMenu() {
    setMenuState({ pathname, open: !open });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg font-semibold tracking-tight text-slate-950 focus-visible:outline-none"
          aria-label="Organic Chemistry Hub home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-sm font-bold text-white shadow-sm">
            OC
          </span>
          <span className="text-base sm:text-lg">Organic Chemistry Hub</span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navigation.map((item) => {
            const active = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none ${
                  active
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none xl:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={toggleMenu}
        >
          <span aria-hidden="true" className="text-xl leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-5 py-4 xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
            {navigation.map((item) => {
              const active = isRouteActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-3 text-sm font-medium focus-visible:outline-none ${
                    active
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
