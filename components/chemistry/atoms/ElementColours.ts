import type { ElementSymbol } from "./types";

export type ElementColour = {
  fill: string;
  stroke: string;
  text: string;
};

const defaultColour: ElementColour = {
  fill: "#ffffff",
  stroke: "#cbd5e1",
  text: "#0f172a",
};

export const elementColours: Record<ElementSymbol, ElementColour> = {
  H: { fill: "#f8fafc", stroke: "#cbd5e1", text: "#0f172a" },
  B: { fill: "#fef3c7", stroke: "#f59e0b", text: "#78350f" },
  C: { fill: "#e2e8f0", stroke: "#64748b", text: "#0f172a" },
  N: { fill: "#dbeafe", stroke: "#3b82f6", text: "#1e3a8a" },
  O: { fill: "#fee2e2", stroke: "#ef4444", text: "#7f1d1d" },
  F: { fill: "#dcfce7", stroke: "#22c55e", text: "#14532d" },
  Si: { fill: "#f3e8ff", stroke: "#a855f7", text: "#581c87" },
  P: { fill: "#ffedd5", stroke: "#f97316", text: "#7c2d12" },
  S: { fill: "#fef9c3", stroke: "#eab308", text: "#713f12" },
  Cl: { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d" },
  Br: { fill: "#ffedd5", stroke: "#c2410c", text: "#7c2d12" },
  I: { fill: "#f3e8ff", stroke: "#9333ea", text: "#581c87" },
};

export function getElementColour(element: string): ElementColour {
  return elementColours[element as ElementSymbol] ?? defaultColour;
}