import type { Metadata } from "next";
import { RadicalHBrMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Radical HBr Addition Mechanism',
  description: 'Explore anti-Markovnikov addition of HBr to an alkene through a peroxide-initiated radical chain mechanism.',
  path: '/lab/radical-hbr-addition',
});

export default function RadicalHBrAdditionPage() {
  return (
    <MechanismLabShell title="Radical HBr addition" accent="rose">
      <RadicalHBrMechanismPlayer />
    </MechanismLabShell>
  );
}
