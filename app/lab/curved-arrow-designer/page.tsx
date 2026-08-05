import type { Metadata } from "next";
import { CurvedArrowDesigner } from "@/components/chemistry";
import { LabWorkspaceShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Curved Arrow Designer | Organic Chemistry Hub",
  description:
    "Design and export precise electron-pair and fishhook curved-arrow coordinates for organic reaction mechanisms.",
};

export default function CurvedArrowDesignerPage() {
  return (
    <LabWorkspaceShell accent="violet" maxWidth="7xl">
      <CurvedArrowDesigner />
    </LabWorkspaceShell>
  );
}
