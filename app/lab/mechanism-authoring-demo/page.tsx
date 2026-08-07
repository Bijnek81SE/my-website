import Link from "next/link";
import { GeneratedMechanismPlayer } from "@/components/chemistry/mechanism/authoring";
import {
  compileAlkeneHalogenationMechanism,
  compileE2Mechanism,
  compileSn2Mechanism,
} from "@/content/mechanisms/authoring";

export default function MechanismAuthoringDemoPage() {
  const sn2 = compileSn2Mechanism();
  const e2 = compileE2Mechanism();
  const halogenation = compileAlkeneHalogenationMechanism();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Safe architecture experiment
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Mechanism Authoring System · semantic geometry proof
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          These generated mechanisms use semantic atom, bond, and lone-pair anchors to compile electron-flow arrows, then render through the existing trusted SN2, E2, and alkene-halogenation canvases and MechanismPlayerEngine. The original mechanism pages are unchanged.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-white px-4 py-2 font-semibold text-emerald-800 shadow-sm" href="/lab/sn2-mechanism">
            Open original SN2
          </Link>
          <Link className="rounded-xl bg-white px-4 py-2 font-semibold text-emerald-800 shadow-sm" href="/lab/e2-mechanism">
            Open original E2
          </Link>
          <Link className="rounded-xl bg-white px-4 py-2 font-semibold text-emerald-800 shadow-sm" href="/lab/halogenation">
            Open original halogenation
          </Link>
        </div>
      </section>

      <div className="mt-10 space-y-12">
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-950">Generated SN2</h2>
            <p className="mt-1 text-slate-600">Arrow endpoints are compiled from the hydroxide lone pair, methyl carbon, C–Br bond midpoint, and bromine atom.</p>
          </div>
          <GeneratedMechanismPlayer definition={sn2} />
        </section>

        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-950">Generated E2</h2>
            <p className="mt-1 text-slate-600">Arrow endpoints are compiled from the base lone pair, β-H, C–H bond, C–C bond, C–Br bond, and bromine atom.</p>
          </div>
          <GeneratedMechanismPlayer definition={e2} />
        </section>

        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-950">Generated alkene halogenation</h2>
            <p className="mt-1 text-slate-600">Arrow geometry is compiled from the alkene π bond, Br–Br bond, bromide lone pair, bromonium carbon, and bridge bond, then rendered by the untouched halogenation canvas.</p>
          </div>
          <GeneratedMechanismPlayer definition={halogenation} />
        </section>
      </div>
    </main>
  );
}
