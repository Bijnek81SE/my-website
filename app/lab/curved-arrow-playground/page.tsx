import type { Metadata } from "next";
import { CurvedArrowPlayground } from "@/components/chemistry";
import { LabWorkspaceShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Curved Arrow Playground',
  description: 'Explore reusable curved electron-movement arrows for reaction mechanisms.',
  path: '/lab/curved-arrow-playground',
});

export default function CurvedArrowPlaygroundPage() {
  return (
    <LabWorkspaceShell accent="blue" maxWidth="5xl">
      <CurvedArrowPlayground />
    </LabWorkspaceShell>
  );
}
