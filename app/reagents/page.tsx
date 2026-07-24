import type { Metadata } from 'next';
import SectionLanding from '@/components/ui/SectionLanding';

export const metadata: Metadata = { title: 'Organic Chemistry Reagents', description: 'Practical reagent guides covering uses, selectivity, handling, limitations, and alternatives.' };

export default function ReagentsPage() {
  return <SectionLanding eyebrow="Practical reference" title="Understand what a reagent does—and why" description="Reagent pages will connect chemical behavior with selectivity, reaction conditions, safety, storage, and useful alternatives." items={[
    { title: 'Oxidizing agents', description: 'PCC, DMP, Swern reagents, mCPBA, osmium tetroxide, and related oxidants.' },
    { title: 'Reducing agents', description: 'NaBH₄, LiAlH₄, DIBAL-H, borane, catalytic hydrogenation, and selective hydrides.' },
    { title: 'Acids and bases', description: 'Common Brønsted and Lewis acids and bases used in synthesis.' },
    { title: 'Organometallic reagents', description: 'Grignard, organolithium, organozinc, organoboron, and organocopper chemistry.' },
    { title: 'Coupling reagents and catalysts', description: 'Palladium catalysts, ligands, peptide coupling reagents, and activation systems.' },
    { title: 'Solvents and additives', description: 'Solvent properties, drying, compatibility, and common reaction additives.' },
  ]} />;
}
