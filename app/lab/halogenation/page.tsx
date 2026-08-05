import type { Metadata } from "next";
import { HalogenationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Halogenation of Alkenes',
  description: 'Explore bromonium-ion formation and anti addition of bromine to cyclohexene with an interactive mechanism player.',
  path: '/lab/halogenation',
});

export default function HalogenationPage() {
  return (
    <MechanismLabShell title="Halogenation" accent="violet">
      <HalogenationMechanismPlayer />
    </MechanismLabShell>
  );
}
