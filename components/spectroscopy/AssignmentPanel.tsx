import type { SpectralAssignment } from "@/components/chemistry/spectroscopy";

type Props = { assignment?: SpectralAssignment; atomLabels: readonly string[] };

export default function AssignmentPanel({ assignment, atomLabels }: Props) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-live="polite">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Assignment inspector</p>
      {assignment ? (
        <>
          <h2 className="mt-2 text-lg font-bold text-slate-950">{assignment.label}</h2>
          <p className="mt-3 leading-7 text-slate-600">{assignment.explanation}</p>
          <div className="mt-4 rounded-xl bg-emerald-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">Linked structure environment</p>
            <p className="mt-1 font-semibold text-slate-950">{atomLabels.join(", ") || "Structural feature"}</p>
          </div>
        </>
      ) : (
        <p className="mt-3 leading-7 text-slate-600">Select a peak, band, fragment, or atom environment to see the structure–spectrum connection.</p>
      )}
    </aside>
  );
}
