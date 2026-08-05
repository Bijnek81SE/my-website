import type { Metadata } from "next";
import { CurvedArrowDesigner } from "@/components/chemistry";
import { LabWorkspaceShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Curved Arrow Designer',
  description: 'Design and export precise electron-pair and fishhook curved-arrow coordinates for organic reaction mechanisms.',
  path: '/lab/curved-arrow-designer',
});

export default function CurvedArrowDesignerPage() {
  return (
    <LabWorkspaceShell accent="violet" maxWidth="7xl">
      <CurvedArrowDesigner />
    </LabWorkspaceShell>
  );
}
