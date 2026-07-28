import type { ReactNode } from "react";

type ExerciseCardProps = {
  title: string;
  instructions?: string;
  number?: number;
  children: ReactNode;
  footer?: ReactNode;
};

export default function ExerciseCard({
  title,
  instructions,
  number,
  children,
  footer,
}: ExerciseCardProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-7">
        <div className="flex items-start gap-4">
          {number ? (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
              {number}
            </span>
          ) : null}
          <div>
            <h2 className="text-xl font-bold text-slate-950">{title}</h2>
            {instructions ? (
              <p className="mt-1 text-sm leading-6 text-slate-600">{instructions}</p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-7">{children}</div>
      {footer ? <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">{footer}</div> : null}
    </section>
  );
}
