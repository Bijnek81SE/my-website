import type { ReactNode } from "react";

type AccessibleChemistryFigureProps = {
  title: string;
  description: string;
  children: ReactNode;
  caption?: ReactNode;
  className?: string;
  graphicClassName?: string;
};

export default function AccessibleChemistryFigure({
  title,
  description,
  children,
  caption,
  className = "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
  graphicClassName,
}: AccessibleChemistryFigureProps) {
  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={`${title}. ${description}`}
        className={graphicClassName}
      >
        {children}
      </div>
      {caption ? (
        <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
