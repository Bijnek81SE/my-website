import type { Metadata } from "next";
import { RadicalHBrMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Radical HBr Addition Mechanism | Organic Chemistry Hub",
  description:
    "Explore anti-Markovnikov addition of HBr to an alkene through a peroxide-initiated radical chain mechanism.",
};

export default function RadicalHBrAdditionPage() {
  return (
    <MechanismLabShell title="Radical HBr addition" accent="rose">
      <RadicalHBrMechanismPlayer />
    </MechanismLabShell>
  );
}
