import type { Metadata } from "next";
import { HydroborationOxidationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Hydroboration–Oxidation Mechanism',
  description: 'Explore anti-Markovnikov, syn hydration of an alkene through hydroboration and oxidation.',
  path: '/lab/hydroboration-oxidation',
});

export default function HydroborationOxidationPage() {
  return (
    <MechanismLabShell title="Hydroboration–oxidation" accent="cyan">
      <HydroborationOxidationMechanismPlayer />
    </MechanismLabShell>
  );
}
