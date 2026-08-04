"use client";

import type { ReactNode } from "react";
import Bond from "../bonds/Bond";
import type {
  BondOrder,
  BondType,
} from "../bonds/Bond";
import type {
  SkeletalAtom,
  SkeletalBond,
  SkeletalMoleculeDefinition,
  SkeletalPoint,
} from "./types";

const DEFAULT_STROKE = "#0f172a";

function stableCoordinate(
  value: number,
): number {
  return Math.round(value * 10_000) / 10_000;
}

function atomShowsLabel(
  atom: SkeletalAtom,
  showCarbons: boolean,
): boolean {
  const label =
    atom.label ?? atom.element ?? "C";

  return (
    atom.showLabel ??
    (label !== "C" || showCarbons)
  );
}

function trimEndpoint(
  atom: SkeletalAtom,
  other: SkeletalAtom,
  showCarbons: boolean,
): SkeletalPoint {
  if (!atomShowsLabel(atom, showCarbons)) {
    return {
      x: stableCoordinate(
        atom.position.x,
      ),
      y: stableCoordinate(
        atom.position.y,
      ),
    };
  }

  const dx =
    other.position.x - atom.position.x;

  const dy =
    other.position.y - atom.position.y;

  const length =
    Math.hypot(dx, dy) || 1;

  const label =
    atom.label ?? atom.element ?? "C";

  const inset = Math.max(
    16,
    label.length * 8,
  );

  return {
    x: stableCoordinate(
      atom.position.x +
        (dx / length) * inset,
    ),
    y: stableCoordinate(
      atom.position.y +
        (dy / length) * inset,
    ),
  };
}

function getBondRendering(
  bond: SkeletalBond,
): {
  type: BondType;
  order: BondOrder;
} {
  switch (bond.type) {
    case "double":
      return {
        type: "line",
        order: 2,
      };

    case "triple":
      return {
        type: "line",
        order: 3,
      };

    case "wedge":
      return {
        type: "wedge",
        order: 1,
      };

    case "dash":
      return {
        type: "dash",
        order: 1,
      };

    case "aromatic":
      return {
        type: "aromatic",
        order: 1,
      };

    case "wavy":
      return {
        type: "wavy",
        order: 1,
      };

    case "single":
    default:
      return {
        type: "line",
        order: 1,
      };
  }
}

function chargeLabel(
  charge: number,
): string {
  if (charge === 1) {
    return "+";
  }

  if (charge === -1) {
    return "−";
  }

  return charge > 0
    ? `${charge}+`
    : `${Math.abs(charge)}−`;
}

function SkeletalAtomNode({
  atom,
  showCarbons,
}: {
  atom: SkeletalAtom;
  showCarbons: boolean;
}) {
  const label =
    atom.label ?? atom.element ?? "C";

  const visible =
    atom.showLabel ??
    (label !== "C" || showCarbons);

  const offset =
    atom.labelOffset ?? {
      x: 0,
      y: 0,
    };

  const x = stableCoordinate(
    atom.position.x + offset.x,
  );

  const y = stableCoordinate(
    atom.position.y + offset.y,
  );

  return (
    <g pointerEvents="none">
      {visible ? (
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={
            atom.fontSize ?? 27
          }
          fontWeight="700"
          fill={
            atom.colour ??
            DEFAULT_STROKE
          }
        >
          {label}
        </text>
      ) : null}

      {atom.charge ? (
        <text
          x={stableCoordinate(x + 17)}
          y={stableCoordinate(y - 17)}
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="#dc2626"
        >
          {chargeLabel(atom.charge)}
        </text>
      ) : null}

      {atom.radical ? (
        <circle
          cx={stableCoordinate(x + 16)}
          cy={stableCoordinate(y - 16)}
          r="4.5"
          fill={
            atom.colour ??
            "#e11d48"
          }
        />
      ) : null}
    </g>
  );
}

export type SkeletalMoleculeEngineProps = {
  molecule: SkeletalMoleculeDefinition;
  x?: number;
  y?: number;
  scale?: number;
  stroke?: string;
  strokeWidth?: number;
  showCarbons?: boolean;
  className?: string;
  children?: ReactNode;

  interactiveBonds?: boolean;
  selectedBondId?: string | null;
  highlightedBondId?: string | null;

  onBondClick?: (
    bond: SkeletalBond,
  ) => void;
};

export default function SkeletalMoleculeEngine({
  molecule,
  x = 0,
  y = 0,
  scale = 1,
  stroke = DEFAULT_STROKE,
  strokeWidth = 5,
  showCarbons = false,
  className,
  children,
  interactiveBonds = false,
  selectedBondId = null,
  highlightedBondId = null,
  onBondClick,
}: SkeletalMoleculeEngineProps) {
  const atomsById = new Map(
    molecule.atoms.map((atom) => [
      atom.id,
      atom,
    ]),
  );

  return (
    <g
      transform={`translate(${stableCoordinate(
        x,
      )} ${stableCoordinate(
        y,
      )}) scale(${stableCoordinate(
        scale,
      )})`}
      className={className}
      role="img"
      aria-label={molecule.name}
    >
      <g aria-label="Bonds">
        {molecule.bonds.map((bond) => {
          const from = atomsById.get(
            bond.from,
          );

          const to = atomsById.get(
            bond.to,
          );

          if (!from || !to) {
            return null;
          }

          const start = trimEndpoint(
            from,
            to,
            showCarbons,
          );

          const end = trimEndpoint(
            to,
            from,
            showCarbons,
          );

          const rendering =
            getBondRendering(bond);

          const selected =
            bond.selected ||
            selectedBondId === bond.id;

          const highlighted =
            bond.highlighted ||
            highlightedBondId === bond.id;

          const interactive =
            bond.interactive ||
            interactiveBonds ||
            Boolean(onBondClick);

          return (
            <Bond
              key={bond.id}
              id={`bond-${molecule.id}-${bond.id}`}
              start={start}
              end={end}
              type={rendering.type}
              order={rendering.order}
              polarity={
                bond.polarity ?? "none"
              }
              colour={
                bond.colour ?? stroke
              }
              strokeWidth={
                bond.strokeWidth ??
                strokeWidth
              }
              spacing={
                bond.spacing ?? 10
              }
              parallelOffset={
                bond.parallelOffset
              }
              highlighted={
                highlighted
              }
              selected={selected}
              muted={
                bond.muted ?? false
              }
              animated={
                bond.animated ?? false
              }
              interactive={interactive}
              ariaLabel={
                bond.ariaLabel ??
                `${molecule.name}: bond from ${bond.from} to ${bond.to}`
              }
              onClick={
                onBondClick
                  ? () =>
                      onBondClick(bond)
                  : undefined
              }
            />
          );
        })}
      </g>

      <g aria-label="Atoms">
        {molecule.atoms.map((atom) => (
          <SkeletalAtomNode
            key={atom.id}
            atom={atom}
            showCarbons={
              showCarbons
            }
          />
        ))}
      </g>

      {molecule.annotations?.map(
        (annotation) => (
          <text
            key={annotation.id}
            x={stableCoordinate(
              annotation.position.x,
            )}
            y={stableCoordinate(
              annotation.position.y,
            )}
            textAnchor={
              annotation.anchor ??
              "middle"
            }
            dominantBaseline="middle"
            fontSize={
              annotation.fontSize ?? 16
            }
            fontWeight={
              annotation.fontWeight ??
              700
            }
            fill={
              annotation.colour ??
              "#475569"
            }
            pointerEvents="none"
          >
            {annotation.text}
          </text>
        ),
      )}

      {children}
    </g>
  );
}