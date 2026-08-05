import type { Metadata } from "next";
import { HydrationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Acid-Catalysed Hydration Mechanism',
  description: 'Explore Markovnikov hydration of propene with an interactive mechanism player, practice questions, and exam mode.',
  path: '/lab/hydration',
});

export default function HydrationPage() {
  return (
    <MechanismLabShell title="Acid-catalysed hydration" accent="blue">
      <HydrationMechanismPlayer />
    </MechanismLabShell>
  );
}
