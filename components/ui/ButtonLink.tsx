import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-emerald-700 text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-800",
  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:border-emerald-300 hover:bg-emerald-50",
  ghost: "text-emerald-800 hover:bg-emerald-50",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
