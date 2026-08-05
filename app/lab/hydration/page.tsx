import type { Metadata } from "next";
import { HydrationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Acid-Catalysed Hydration Mechanism | Organic Chemistry Hub",
  description:
    "Explore Markovnikov hydration of propene with an interactive mechanism player, practice questions, and exam mode.",
};

export default function HydrationPage() {
  return (
    <MechanismLabShell title="Acid-catalysed hydration" accent="blue">
      <HydrationMechanismPlayer />
    </MechanismLabShell>
  );
}
