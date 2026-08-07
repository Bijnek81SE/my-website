import Link from "next/link";
import { getMoleculeKnowledge, type MoleculeDefinition } from "@/content/molecules";
import MoleculeStructureDiagram from "./MoleculeStructureDiagram";

function LinkCollection({ title, items }: { title: string; items: readonly { id: string; label: string; href: string; description: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link key={`${item.id}-${item.href}`} href={item.href} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:bg-emerald-50/40">
            <span className="font-bold text-slate-950">{item.label}</span>
            <span className="mt-1 block text-sm leading-6 text-slate-600">{item.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function MoleculeReferencePage({ molecule }: { molecule: MoleculeDefinition }) {
  const knowledge = getMoleculeKnowledge(molecule);

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Link href="/molecules" className="font-semibold text-emerald-700 hover:text-emerald-900">← Molecule library</Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Canonical molecule</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{molecule.name}</h1>
            <p className="mt-3 text-xl text-slate-600">{molecule.displayFormula} · {molecule.condensedFormula}</p>
            {molecule.aliases.length > 0 ? <p className="mt-2 text-sm text-slate-500">Also known as {molecule.aliases.join(", ")}</p> : null}
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{molecule.workspace?.summary ?? knowledge.functionalGroup.description}</p>
          </div>
          <MoleculeStructureDiagram molecule={molecule} />
        </div>

        <section className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">Primary functional group</p>
          <Link href={knowledge.functionalGroup.href} className="mt-2 inline-flex text-2xl font-bold text-emerald-950 hover:underline">{knowledge.functionalGroup.label}</Link>
          <p className="mt-2 max-w-3xl leading-7 text-emerald-950/80">{knowledge.functionalGroup.description}</p>
        </section>

        <div className="mt-10 space-y-10">
          <LinkCollection title="Common reactions" items={knowledge.reactions} />
          <LinkCollection title="Relevant reagents" items={knowledge.reagents} />
          <LinkCollection title="Mechanisms and practice" items={knowledge.labs} />
          <LinkCollection title="Learning pathway" items={knowledge.lessons} />
        </div>

        {molecule.capabilities.workspace ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-slate-950">Continue in Workspace</h2>
            <p className="mt-2 leading-7 text-slate-600">Use the Workspace to connect this molecule with reaction planning, calculations, notes, and available chemistry tools.</p>
            <Link href="/workspace" className="mt-4 inline-flex rounded-xl bg-slate-950 px-4 py-2.5 font-semibold text-white">Open Workspace →</Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}
