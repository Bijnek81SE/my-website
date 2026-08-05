import type { Metadata } from "next";
import { OxymercurationDemercurationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Oxymercuration–Demercuration Mechanism',
  description: 'Explore Markovnikov hydration of an alkene through a bridged mercurinium ion and reductive demercuration.',
  path: '/lab/oxymercuration-demercuration',
});

export default function OxymercurationDemercurationPage() {
  return (
    <MechanismLabShell title="Oxymercuration–demercuration" accent="violet">
      <OxymercurationDemercurationMechanismPlayer />
    </MechanismLabShell>
  );
}
