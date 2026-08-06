import type { Metadata } from "next";
import { WorkspaceShell } from "@/components/workspace";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Organic Chemistry Workspace",
  description: "Use one persistent workbench to connect molecules, spectra, reaction prediction, synthesis, calculations, references, and notes.",
  path: "/workspace",
  keywords: ["organic chemistry workspace", "chemistry workbench", "molecule analysis", "synthesis planning", "spectroscopy"],
});

export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">Unified chemistry application</p>
          <h1 className="mt-3 max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl">Organic Chemistry Workspace</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Keep one molecule in context while moving between structure, spectra, reaction planning, quantitative calculations, references, and your own notes.</p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"><WorkspaceShell /></div>
    </main>
  );
}
