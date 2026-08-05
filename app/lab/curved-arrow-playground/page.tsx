import type { Metadata } from "next";
import { CurvedArrowPlayground } from "@/components/chemistry";
import { LabWorkspaceShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Curved Arrow Playground | Organic Chemistry Hub",
  description:
    "Explore reusable curved electron-movement arrows for reaction mechanisms.",
};

export default function CurvedArrowPlaygroundPage() {
  return (
    <LabWorkspaceShell accent="blue" maxWidth="5xl">
      <CurvedArrowPlayground />
    </LabWorkspaceShell>
  );
}
