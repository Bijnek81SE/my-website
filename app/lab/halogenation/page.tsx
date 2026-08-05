import type { Metadata } from "next";
import { HalogenationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Halogenation of Alkenes | Organic Chemistry Hub",
  description:
    "Explore bromonium-ion formation and anti addition of bromine to cyclohexene with an interactive mechanism player.",
};

export default function HalogenationPage() {
  return (
    <MechanismLabShell title="Halogenation" accent="violet">
      <HalogenationMechanismPlayer />
    </MechanismLabShell>
  );
}
