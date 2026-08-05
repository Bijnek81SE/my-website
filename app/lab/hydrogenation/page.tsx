import type { Metadata } from "next";
import { HydrogenationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Catalytic Hydrogenation of Alkenes | Organic Chemistry Hub",
  description:
    "Explore syn addition of hydrogen to cyclohexene on a metal catalyst with an interactive mechanism player.",
};

export default function HydrogenationPage() {
  return (
    <MechanismLabShell title="Catalytic hydrogenation" accent="emerald">
      <HydrogenationMechanismPlayer />
    </MechanismLabShell>
  );
}
