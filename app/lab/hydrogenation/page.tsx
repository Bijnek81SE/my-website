import type { Metadata } from "next";
import { HydrogenationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Catalytic Hydrogenation of Alkenes',
  description: 'Explore syn addition of hydrogen to cyclohexene on a metal catalyst with an interactive mechanism player.',
  path: '/lab/hydrogenation',
});

export default function HydrogenationPage() {
  return (
    <MechanismLabShell title="Catalytic hydrogenation" accent="emerald">
      <HydrogenationMechanismPlayer />
    </MechanismLabShell>
  );
}
