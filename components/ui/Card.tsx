import type { ReactNode } from "react";

type CardTone = "default" | "muted" | "dark";

type CardProps = {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  tone?: CardTone;
  padded?: boolean;
  contentClassName?: string;
};

const tones: Record<CardTone, string> = {
  default: "border-slate-200 bg-white text-slate-900",
  muted: "border-slate-200 bg-slate-50 text-slate-900",
  dark: "border-slate-800 bg-slate-950 text-white",
};

export default function Card({
  title,
  eyebrow,
  children,
  className = "",
  tone = "default",
  padded = true,
  contentClassName = "",
}: CardProps) {
  return (
    <article
      className={`rounded-2xl border shadow-sm ${tones[tone]} ${
        padded ? "p-5 sm:p-6" : ""
      } ${className}`}
    >
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h3 className={`${eyebrow ? "mt-2" : ""} text-xl font-semibold`}>
          {title}
        </h3>
      ) : null}
      <div className={`${title || eyebrow ? "mt-3" : ""} ${contentClassName}`}>
        {children}
      </div>
    </article>
  );
}
