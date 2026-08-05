export const chemistryGraphicTokens = {
  colours: {
    ink: "#0f172a",
    mutedInk: "#475569",
    bond: "#334155",
    subtleBond: "#94a3b8",
    selected: "#2563eb",
    highlighted: "#7c3aed",
    electronFlow: "#0891b2",
    invalid: "#dc2626",
    canvas: "#ffffff",
  },
  atom: {
    radius: 25,
    compactRadius: 6.5,
    labelSize: 18,
  },
  bond: {
    length: 72,
    strokeWidth: 3,
    compactStrokeWidth: 1.4,
    spacing: 6,
    wedgeWidth: 10,
    hashCount: 5,
  },
  arrow: {
    strokeWidth: 4,
    headLength: 14,
    headWidth: 7,
    fishhookLength: 11,
    fishhookWidth: 4.5,
  },
  label: {
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
  },
} as const;

export type ChemistryGraphicTokens = typeof chemistryGraphicTokens;
