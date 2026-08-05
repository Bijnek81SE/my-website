import type { Metadata } from "next";
import { SkeletalMoleculePlayground } from "@/components/chemistry";
import { LabWorkspaceShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Skeletal Molecule Builder',
  description: 'Preview reusable line-angle molecule definitions with consistent bonds, rings, stereochemistry, charges, and radicals.',
  path: '/lab/skeletal-molecule-builder',
});

export default function SkeletalMoleculeBuilderPage() {
  return (
    <LabWorkspaceShell accent="emerald" maxWidth="7xl">
      <SkeletalMoleculePlayground />
    </LabWorkspaceShell>
  );
}
