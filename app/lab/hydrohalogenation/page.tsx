import type { Metadata } from "next";
import { HydrohalogenationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Hydrohalogenation Mechanism | Organic Chemistry Hub",
  description:
    "Explore Markovnikov addition of HCl to an alkene with an interactive mechanism player, practice questions, and exam mode.",
};

export default function HydrohalogenationPage() {
  return (
    <MechanismLabShell title="Hydrohalogenation" accent="cyan">
      <HydrohalogenationMechanismPlayer />
    </MechanismLabShell>
  );
}
