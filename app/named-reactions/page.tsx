import type { Metadata } from 'next';
import SectionLanding from '@/components/ui/SectionLanding';

export const metadata: Metadata = { title: 'Named Reactions', description: 'Explore organic named reactions by transformation, mechanism, and synthetic purpose.' };

export default function NamedReactionsPage() {
  return <SectionLanding eyebrow="Reaction reference" title="Named reactions, explained with purpose" description="Each entry will cover the transformation, mechanism, conditions, scope, limitations, and related alternatives." items={[
    { title: 'Carbon–carbon bond formation', description: 'Aldol, Claisen, Michael, Wittig, Grignard, and related reactions.' },
    { title: 'Cross-coupling reactions', description: 'Suzuki, Heck, Sonogashira, Negishi, Stille, Buchwald–Hartwig, and more.' },
    { title: 'Cycloadditions and pericyclic reactions', description: 'Diels–Alder, electrocyclic reactions, sigmatropic rearrangements, and related chemistry.' },
    { title: 'Oxidations and reductions', description: 'Named transformations that change oxidation state with useful selectivity.' },
    { title: 'Rearrangements', description: 'Beckmann, Baeyer–Villiger, Claisen, Cope, Pinacol, Wagner–Meerwein, and others.' },
    { title: 'A–Z index', description: 'A complete alphabetical index will grow as reaction pages are published.' },
  ]} />;
}
