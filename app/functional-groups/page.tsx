import type { Metadata } from 'next';
import SectionLanding from '@/components/ui/SectionLanding';

export const metadata: Metadata = { title: 'Functional Groups', description: 'Learn organic functional groups, their properties, reactions, spectroscopy, and synthesis.' };

export default function FunctionalGroupsPage() {
  return <SectionLanding eyebrow="Structure and reactivity" title="Functional groups organize organic chemistry" description="Use this section to connect structure, physical properties, spectroscopy, synthesis, and characteristic reactions." items={[
    { title: 'Hydrocarbons', description: 'Alkanes, alkenes, alkynes, aromatic compounds, and their characteristic reactions.' },
    { title: 'Oxygen-containing groups', description: 'Alcohols, ethers, epoxides, aldehydes, ketones, acids, esters, and anhydrides.' },
    { title: 'Nitrogen-containing groups', description: 'Amines, amides, imines, nitriles, nitro compounds, and related functionality.' },
    { title: 'Halogen-containing groups', description: 'Alkyl halides, aryl halides, acyl halides, and their synthetic behavior.' },
    { title: 'Sulfur and phosphorus groups', description: 'Thiols, sulfides, sulfoxides, sulfones, phosphines, and phosphate derivatives.' },
    { title: 'Heterocycles', description: 'Important aromatic and saturated rings containing nitrogen, oxygen, or sulfur.' },
  ]} />;
}
