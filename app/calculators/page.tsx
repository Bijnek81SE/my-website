import type { Metadata } from 'next';
import SectionLanding from '@/components/ui/SectionLanding';

export const metadata: Metadata = { title: 'Chemistry Calculators', description: 'Practical chemistry calculators for solution preparation, stoichiometry, yield, and laboratory planning.' };

export default function CalculatorsPage() {
  return <SectionLanding eyebrow="Practical tools" title="Calculate common laboratory quantities quickly" description="Interactive tools will be added one at a time and validated before publication." items={[
    { title: 'Molecular weight calculator', description: 'Calculate molar mass from a molecular formula.' },
    { title: 'Molarity and solution preparation', description: 'Determine solute mass, concentration, or final volume.' },
    { title: 'Dilution calculator', description: 'Plan dilutions using initial and final concentration and volume.' },
    { title: 'Stoichiometry calculator', description: 'Convert between mass, moles, equivalents, and reaction scale.' },
    { title: 'Limiting reagent calculator', description: 'Identify the limiting reactant and theoretical product amount.' },
    { title: 'Percent yield calculator', description: 'Compare isolated yield with theoretical yield.' },
  ]} />;
}
