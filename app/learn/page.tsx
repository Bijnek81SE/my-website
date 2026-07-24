import type { Metadata } from 'next';
import SectionLanding from '@/components/ui/SectionLanding';

export const metadata: Metadata = {
  title: 'Learn Organic Chemistry',
  description: 'Follow a structured organic chemistry curriculum from fundamentals to synthesis.',
};

export default function LearnPage() {
  return (
    <SectionLanding
      eyebrow="Structured curriculum"
      title="Learn organic chemistry in the right order"
      description="Begin with bonding and structure, then progress through reactivity, mechanisms, functional groups, spectroscopy, and synthesis."
      items={[
        { title: 'Fundamentals', description: 'Atomic structure, bonding, Lewis structures, formal charge, resonance, acids, bases, and functional groups.' },
        { title: 'Stereochemistry', description: 'Chirality, enantiomers, diastereomers, conformations, and stereochemical nomenclature.' },
        { title: 'Reaction Mechanisms', description: 'Curved arrows, intermediates, transition states, substitution, elimination, addition, and rearrangement.' },
        { title: 'Carbonyl Chemistry', description: 'Aldehydes, ketones, carboxylic-acid derivatives, enolates, and condensation reactions.' },
        { title: 'Spectroscopy', description: 'IR, NMR, mass spectrometry, and practical structure elucidation.' },
        { title: 'Organic Synthesis', description: 'Retrosynthesis, selectivity, protecting groups, route design, and multistep planning.' },
      ]}
    />
  );
}
