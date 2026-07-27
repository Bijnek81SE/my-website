import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      {title ? <h3 className="text-xl font-semibold text-slate-950">{title}</h3> : null}
      <div className={title ? "mt-3" : ""}>{children}</div>
    </div>
  );
}
