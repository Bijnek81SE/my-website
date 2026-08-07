import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MoleculeReferencePage from "@/components/molecules/MoleculeReferencePage";
import { getMolecule, molecules } from "@/content/molecules";
import { createPageMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return molecules.map((molecule) => ({ slug: molecule.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const molecule = getMolecule(slug);
  if (!molecule) return {};
  return createPageMetadata({
    title: molecule.name,
    description: molecule.workspace?.summary ?? `${molecule.name} organic chemistry reference.`,
    path: `/molecules/${molecule.id}`,
    keywords: [molecule.formula, molecule.condensedFormula, ...molecule.aliases, ...molecule.functionalGroupIds],
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const molecule = getMolecule(slug);
  if (!molecule) notFound();
  return <MoleculeReferencePage molecule={molecule} />;
}
