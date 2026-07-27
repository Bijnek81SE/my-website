import type { ReactNode } from "react";

type RememberBoxProps = {
  children: ReactNode;
  title?: string;
};

export default function RememberBox({
  children,
  title = "Remember",
}: RememberBoxProps) {
  return (
    <aside className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 sm:p-6">
      <div className="flex gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-700 text-lg font-bold text-white"
        >
          !
        </span>
        <div>
          <h3 className="font-bold text-slate-950">{title}</h3>
          <div className="mt-2 text-base leading-7 text-slate-700">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
