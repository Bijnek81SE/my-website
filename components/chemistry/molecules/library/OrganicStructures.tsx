import type { ReactNode } from "react";
import SkeletalMoleculeEngine from "../../skeletal/SkeletalMoleculeEngine";
import {
  but2eneMolecule,
  carbonRadicalIntermediateMolecule,
  cisDibromocyclohexaneMolecule,
  cyclohexaneMolecule,
  cyclohexeneMolecule,
  e1BetaHydrogenCarbocationMolecule,
  e2AntiPeriplanarMolecule,
  hydroxideMolecule,
  isobutylChlorideMolecule,
  mercuriniumIonMolecule,
  methanolMolecule,
  methylBromideMolecule,
  oneBromopropaneMolecule,
  onePropanolMolecule,
  organoboraneMolecule,
  organomercuryAlcoholMolecule,
  propeneMolecule,
  tertButanolMolecule,
  tertButylBromideMolecule,
  tertButylCarbocationMolecule,
  tertButylChlorideMolecule,
  tertButylOxoniumMolecule,
  transDibromocyclohexaneMolecule,
  twoBromopropaneMolecule,
  twoMethylpropeneMolecule,
  twoPropanolMolecule,
} from "../../skeletal";
import type { SkeletalMoleculeDefinition } from "../../skeletal/types";

type StructureProps = {
  x: number;
  y: number;
  scale?: number;
  stroke?: string;
  highlightBond?: boolean;
  children?: ReactNode;
};

const defaultStroke = "#0f172a";

function withBondColour(
  molecule: SkeletalMoleculeDefinition,
  bondId: string,
  colour: string,
  strokeWidth?: number,
): SkeletalMoleculeDefinition {
  return {
    ...molecule,
    bonds: molecule.bonds.map((bond) =>
      bond.id === bondId
        ? {
            ...bond,
            colour,
            strokeWidth,
          }
        : bond,
    ),
  };
}

function withAtomColour(
  molecule: SkeletalMoleculeDefinition,
  atomId: string,
  colour: string,
): SkeletalMoleculeDefinition {
  return {
    ...molecule,
    atoms: molecule.atoms.map((atom) =>
      atom.id === atomId
        ? {
            ...atom,
            colour,
          }
        : atom,
    ),
  };
}

function SimpleStructure({
  molecule,
  x,
  y,
  scale = 1,
  stroke = defaultStroke,
  children,
  className,
}: StructureProps & {
  molecule: SkeletalMoleculeDefinition;
  className?: string;
}) {
  return (
    <SkeletalMoleculeEngine
      molecule={molecule}
      x={x}
      y={y}
      scale={scale}
      stroke={stroke}
      className={className}
    >
      {children}
    </SkeletalMoleculeEngine>
  );
}

export function CyclohexeneStructure({
  x,
  y,
  scale = 1,
  stroke = defaultStroke,
  highlightBond = false,
  children,
}: StructureProps) {
  const molecule = highlightBond
    ? withBondColour(
        cyclohexeneMolecule,
        "b4",
        "#059669",
        7,
      )
    : cyclohexeneMolecule;

  return (
    <SimpleStructure
      molecule={molecule}
      x={x}
      y={y}
      scale={scale}
      stroke={stroke}
    >
      {children}
    </SimpleStructure>
  );
}

export function CyclohexaneStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={cyclohexaneMolecule}
      {...props}
    />
  );
}

export function MethylBromideStructure(
  props: StructureProps & {
    highlightBond?: boolean;
  },
) {
  const molecule = props.highlightBond
    ? withBondColour(
        methylBromideMolecule,
        "c-br",
        "#2563eb",
        7,
      )
    : methylBromideMolecule;

  return (
    <SimpleStructure
      molecule={molecule}
      {...props}
    />
  );
}

export function MethanolStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={methanolMolecule}
      {...props}
    />
  );
}

export function HydroxideStructure({
  x,
  y,
  scale = 1,
  children,
}: StructureProps) {
  return (
    <SimpleStructure
      molecule={hydroxideMolecule}
      x={x}
      y={y}
      scale={scale}
    >
      {children}
    </SimpleStructure>
  );
}

export function TertButylBromideStructure(
  props: StructureProps & {
    highlightBond?: boolean;
  },
) {
  const molecule = props.highlightBond
    ? withBondColour(
        tertButylBromideMolecule,
        "c-x",
        "#dc2626",
        7,
      )
    : tertButylBromideMolecule;

  return (
    <SimpleStructure
      molecule={molecule}
      {...props}
    />
  );
}

export function TertButylChlorideStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={tertButylChlorideMolecule}
      {...props}
    />
  );
}

export function IsobutylChlorideStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={isobutylChlorideMolecule}
      {...props}
    />
  );
}

export function TertButylCarbocationStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={tertButylCarbocationMolecule}
      {...props}
    />
  );
}

export function E1BetaHydrogenCarbocationStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={e1BetaHydrogenCarbocationMolecule}
      {...props}
    />
  );
}

export function TertButanolStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={tertButanolMolecule}
      {...props}
    />
  );
}

export function TertButylOxoniumStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={tertButylOxoniumMolecule}
      {...props}
    />
  );
}

export function TwoMethylpropeneStructure({
  x,
  y,
  scale = 1,
  stroke = defaultStroke,
  highlightBond = false,
  children,
}: StructureProps) {
  const molecule = highlightBond
    ? withBondColour(
        twoMethylpropeneMolecule,
        "c1-c2",
        "#0891b2",
        7,
      )
    : twoMethylpropeneMolecule;

  return (
    <SimpleStructure
      molecule={molecule}
      x={x}
      y={y}
      scale={scale}
      stroke={stroke}
    >
      {children}
    </SimpleStructure>
  );
}

export function E2AntiPeriplanarSubstrate({
  x = 0,
  y = 0,
  scale = 1,
  stroke = defaultStroke,
  highlightBreakingBonds = false,
  highlightFormingBond = false,
  showLabels = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  stroke?: string;
  highlightBreakingBonds?: boolean;
  highlightFormingBond?: boolean;
  showLabels?: boolean;
}) {
  let molecule = e2AntiPeriplanarMolecule;

  if (highlightBreakingBonds) {
    molecule = withBondColour(
      molecule,
      "beta-h",
      "#2563eb",
      7,
    );

    molecule = withBondColour(
      molecule,
      "alpha-br",
      "#dc2626",
      7,
    );
  }

  if (highlightFormingBond) {
    molecule = withBondColour(
      molecule,
      "beta-alpha",
      "#7c3aed",
      7,
    );
  }

  return (
    <SimpleStructure
      molecule={molecule}
      x={x + 415}
      y={y + 205}
      scale={scale}
      stroke={stroke}
    >
      {showLabels ? (
        <>
          <text
            x="-55"
            y="57"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#64748b"
          >
            β-carbon
          </text>

          <text
            x="40"
            y="57"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#64748b"
          >
            α-carbon
          </text>
        </>
      ) : null}
    </SimpleStructure>
  );
}

export function But2EneStructure({
  x,
  y,
  scale = 1,
  stroke = defaultStroke,
  piStroke,
}: {
  x: number;
  y: number;
  scale?: number;
  stroke?: string;
  piStroke?: string;
}) {
  const molecule = piStroke
    ? withBondColour(
        but2eneMolecule,
        "c2-c3",
        piStroke,
      )
    : but2eneMolecule;

  return (
    <SimpleStructure
      molecule={molecule}
      x={x}
      y={y}
      scale={scale}
      stroke={stroke}
    />
  );
}

export function PropeneStructure({
  x,
  y,
  scale = 1,
  stroke = defaultStroke,
  piStroke,
  showCarbonLabels = false,
}: {
  x: number;
  y: number;
  scale?: number;
  stroke?: string;
  piStroke?: string;
  showCarbonLabels?: boolean;
}) {
  const molecule = piStroke
    ? withBondColour(
        propeneMolecule,
        "c2-c3",
        piStroke,
      )
    : propeneMolecule;

  return (
    <SimpleStructure
      molecule={molecule}
      x={x}
      y={y}
      scale={scale}
      stroke={stroke}
    >
      {showCarbonLabels ? (
        <>
          <text
            x="-35"
            y="-30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="#64748b"
          >
            internal C
          </text>

          <text
            x="30"
            y="58"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="#64748b"
          >
            terminal C
          </text>
        </>
      ) : null}
    </SimpleStructure>
  );
}

type SubstitutedPropaneProps = {
  x: number;
  y: number;
  substituent: "Br" | "OH";
  scale?: number;
  substituentStroke?: string;
};

export function MarkovnikovPropaneStructure({
  x,
  y,
  substituent,
  scale = 1,
  substituentStroke =
    substituent === "Br"
      ? "#dc2626"
      : "#2563eb",
}: SubstitutedPropaneProps) {
  const base =
    substituent === "Br"
      ? twoBromopropaneMolecule
      : twoPropanolMolecule;

  return (
    <SimpleStructure
      molecule={withAtomColour(
        base,
        "x",
        substituentStroke,
      )}
      x={x}
      y={y}
      scale={scale}
    />
  );
}

export function AntiMarkovnikovPropaneStructure({
  x,
  y,
  substituent,
  scale = 1,
  substituentStroke =
    substituent === "Br"
      ? "#dc2626"
      : "#2563eb",
}: SubstitutedPropaneProps) {
  const base =
    substituent === "Br"
      ? oneBromopropaneMolecule
      : onePropanolMolecule;

  return (
    <SimpleStructure
      molecule={withAtomColour(
        base,
        "x",
        substituentStroke,
      )}
      x={x}
      y={y}
      scale={scale}
    />
  );
}

export function OrganoboraneStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={organoboraneMolecule}
      {...props}
    />
  );
}

export function CarbonRadicalIntermediateStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={carbonRadicalIntermediateMolecule}
      {...props}
    />
  );
}

export function MercuriniumIonStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={mercuriniumIonMolecule}
      {...props}
    />
  );
}

export function OrganomercuryAlcoholStructure(
  props: StructureProps,
) {
  return (
    <SimpleStructure
      molecule={organomercuryAlcoholMolecule}
      {...props}
    />
  );
}

export function DibromocyclohexaneStructure({
  x,
  y,
  scale = 1,
  stereochemistry,
  muted = false,
}: {
  x: number;
  y: number;
  scale?: number;
  stereochemistry: "trans" | "cis";
  muted?: boolean;
}) {
  const base =
    stereochemistry === "trans"
      ? transDibromocyclohexaneMolecule
      : cisDibromocyclohexaneMolecule;

  const molecule = muted
    ? {
        ...base,
        atoms: base.atoms.map((atom) => ({
          ...atom,
          colour: atom.colour
            ? "#64748b"
            : atom.colour,
        })),
        bonds: base.bonds.map((bond) => ({
          ...bond,
          colour: bond.colour
            ? "#64748b"
            : bond.colour,
        })),
      }
    : base;

  return (
    <SimpleStructure
      molecule={molecule}
      x={x}
      y={y}
      scale={scale}
    />
  );
}