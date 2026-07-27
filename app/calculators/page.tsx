import type { Metadata } from 'next';
import SectionLanding from '@/components/ui/SectionLanding';
import CalculatorsDiagram from '@/components/diagrams/CalculatorsDiagram';

export const metadata: Metadata = { title: 'Chemistry Calculators', description: 'Practical chemistry calculators and interactive learning tools for solution preparation, structures, stoichiometry, yield, and laboratory planning.' };

export default function CalculatorsPage() {
  return <SectionLanding eyebrow="Practical tools" title="Calculate, build, and practise chemistry concepts" description="Use validated calculators alongside guided interactive tools that explain each result." heroContent={<CalculatorsDiagram />} heroCaption="Quick formulas and interactive tools in this section." items={[
    { title: 'Lewis structure builder', description: 'Change bond orders, place lone pairs, check octets, and calculate formal charges with instant feedback.', href: '/calculators/lewis-structure-builder' },
    { title: 'Molecular weight calculator', description: 'Calculate molar mass from a molecular formula.' },
    { title: 'Molarity and solution preparation', description: 'Determine solute mass, concentration, or final volume.' },
    { title: 'Dilution calculator', description: 'Plan dilutions using initial and final concentration and volume.' },
    { title: 'Stoichiometry calculator', description: 'Convert between mass, moles, equivalents, and reaction scale.' },
    { title: 'Limiting reagent calculator', description: 'Identify the limiting reactant and theoretical product amount.' },
    { title: 'Percent yield calculator', description: 'Compare isolated yield with theoretical yield.' },
  ]} />;
}
