import type { Metadata } from "next";
import { HydroborationOxidationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Hydroboration–Oxidation Mechanism | Organic Chemistry Hub",
  description:
    "Explore anti-Markovnikov, syn hydration of an alkene through hydroboration and oxidation.",
};

export default function HydroborationOxidationPage() {
  return (
    <MechanismLabShell title="Hydroboration–oxidation" accent="cyan">
      <HydroborationOxidationMechanismPlayer />
    </MechanismLabShell>
  );
}
