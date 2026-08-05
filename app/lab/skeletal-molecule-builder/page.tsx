import type { Metadata } from "next";
import { SkeletalMoleculePlayground } from "@/components/chemistry";
import { LabWorkspaceShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Skeletal Molecule Builder | Organic Chemistry Hub",
  description:
    "Preview reusable line-angle molecule definitions with consistent bonds, rings, stereochemistry, charges, and radicals.",
};

export default function SkeletalMoleculeBuilderPage() {
  return (
    <LabWorkspaceShell accent="emerald" maxWidth="7xl">
      <SkeletalMoleculePlayground />
    </LabWorkspaceShell>
  );
}
