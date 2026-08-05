import type { Metadata } from "next";
import { OxymercurationDemercurationMechanismPlayer } from "@/components/chemistry/mechanism";
import { MechanismLabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Oxymercuration–Demercuration Mechanism | Organic Chemistry Hub",
  description:
    "Explore Markovnikov hydration of an alkene through a bridged mercurinium ion and reductive demercuration.",
};

export default function OxymercurationDemercurationPage() {
  return (
    <MechanismLabShell title="Oxymercuration–demercuration" accent="violet">
      <OxymercurationDemercurationMechanismPlayer />
    </MechanismLabShell>
  );
}
