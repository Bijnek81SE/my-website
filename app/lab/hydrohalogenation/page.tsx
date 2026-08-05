import type { Metadata } from "next";
import { HydrohalogenationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Hydrohalogenation Mechanism',
  description: 'Explore Markovnikov addition of HCl to an alkene with an interactive mechanism player, practice questions, and exam mode.',
  path: '/lab/hydrohalogenation',
});

export default function HydrohalogenationPage() {
  return (
    <MechanismLabShell title="Hydrohalogenation" accent="cyan">
      <HydrohalogenationMechanismPlayer />
    </MechanismLabShell>
  );
}
