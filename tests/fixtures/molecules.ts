import type { SkeletalMoleculeDefinition } from "@/components/chemistry/skeletal/types";

export const triangleMolecule: SkeletalMoleculeDefinition = {
  id: "triangle",
  name: "Three-membered ring",
  atoms: [
    { id: "a", element: "C", position: { x: 0, y: 0 } },
    { id: "b", element: "C", position: { x: 40, y: 0 } },
    { id: "c", element: "C", position: { x: 20, y: 35 } },
  ],
  bonds: [
    { id: "ab", from: "a", to: "b", type: "single" },
    { id: "bc", from: "b", to: "c", type: "single" },
    { id: "ca", from: "c", to: "a", type: "single" },
  ],
};

export const invalidMolecule: SkeletalMoleculeDefinition = {
  id: "invalid",
  name: "Invalid molecule",
  atoms: [
    { id: "a", element: "C", position: { x: 0, y: 0 } },
    { id: "a", element: "C", position: { x: 20, y: 0 } },
  ],
  bonds: [{ id: "broken", from: "a", to: "missing", type: "single" }],
};
