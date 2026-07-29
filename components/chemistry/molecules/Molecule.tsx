"use client";

import type {
  KeyboardEvent,
  MouseEvent,
} from "react";
import MoleculeCanvas from "./MoleculeCanvas";
import { MoleculeProvider } from "./MoleculeContext";
import type {
  MoleculeAtom,
  MoleculeBond,
  MoleculeProps,
} from "./MoleculeTypes";

function getAtomLabel(atom: MoleculeAtom) {
  return atom.label ?? atom.element;
}

function getChargeLabel(charge?: number) {
  if (!charge) return "";

  if (charge === 1) return "+";
  if (charge === -1) return "−";

  return charge > 0 ? `${charge}+` : `${Math.abs(charge)}−`;
}

function getBondEndpoints(
  from: MoleculeAtom,
  to: MoleculeAtom,
) {
  const dx = to.position.x - from.position.x;
  const dy = to.position.y - from.position.y;
  const distance = Math.hypot(dx, dy) || 1;

  const ux = dx / distance;
  const uy = dy / distance;

  const fromRadius = from.radius ?? 28;
  const toRadius = to.radius ?? 28;

  return {
    x1: from.position.x + ux * fromRadius,
    y1: from.position.y + uy * fromRadius,
    x2: to.position.x - ux * toRadius,
    y2: to.position.y - uy * toRadius,
    perpendicularX: -uy,
    perpendicularY: ux,
  };
}

function BondLines({
  bond,
  from,
  to,
  selected,
  interactive,
  onSelect,
}: {
  bond: MoleculeBond;
  from: MoleculeAtom;
  to: MoleculeAtom;
  selected: boolean;
  interactive: boolean;
  onSelect?: (bond: MoleculeBond) => void;
}) {
  const {
    x1,
    y1,
    x2,
    y2,
    perpendicularX,
    perpendicularY,
  } = getBondEndpoints(from, to);

  const order = bond.order ?? 1;
  const offsets =
    order === 2
      ? [-5, 5]
      : order === 3
        ? [-8, 0, 8]
        : [0];

  const stroke = selected
    ? "#2563eb"
    : bond.highlighted
      ? "#7c3aed"
      : "#0f172a";

  const opacity = bond.muted ? 0.3 : 1;

  function select() {
    if (interactive) {
      onSelect?.(bond);
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<SVGGElement>,
  ) {
    if (
      interactive &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      select();
    }
  }

  return (
    <g
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`Bond from ${from.id} to ${to.id}`}
      onClick={select}
      onKeyDown={handleKeyDown}
      style={{
        cursor: interactive ? "pointer" : "default",
        opacity,
      }}
    >
      {interactive && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="transparent"
          strokeWidth="24"
          pointerEvents="stroke"
        />
      )}

      {offsets.map((offset) => (
        <line
          key={offset}
          x1={x1 + perpendicularX * offset}
          y1={y1 + perpendicularY * offset}
          x2={x2 + perpendicularX * offset}
          y2={y2 + perpendicularY * offset}
          stroke={stroke}
          strokeWidth={selected ? 5 : 4}
          strokeLinecap="round"
          strokeDasharray={
            bond.type === "dash" ||
            bond.type === "aromatic"
              ? "8 6"
              : undefined
          }
          pointerEvents="none"
        />
      ))}
    </g>
  );
}

function AtomNode({
  atom,
  selected,
  interactive,
  onSelect,
}: {
  atom: MoleculeAtom;
  selected: boolean;
  interactive: boolean;
  onSelect?: (atom: MoleculeAtom) => void;
}) {
  const radius = atom.radius ?? 28;

  function select(
    event?: MouseEvent<SVGGElement>,
  ) {
    event?.stopPropagation();

    if (interactive) {
      onSelect?.(atom);
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<SVGGElement>,
  ) {
    if (
      interactive &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      onSelect?.(atom);
    }
  }

  return (
    <g
      transform={`translate(${atom.position.x} ${atom.position.y})`}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${getAtomLabel(atom)} atom`}
      onClick={select}
      onKeyDown={handleKeyDown}
      style={{
        cursor: interactive ? "pointer" : "default",
        opacity: atom.muted ? 0.35 : 1,
      }}
    >
      <circle
        r={radius}
        fill={
          selected
            ? "#dbeafe"
            : atom.highlighted
              ? "#ede9fe"
              : "#ffffff"
        }
        stroke={
          selected
            ? "#2563eb"
            : atom.highlighted
              ? "#7c3aed"
              : "#cbd5e1"
        }
        strokeWidth={selected ? 4 : 2}
      />

      <text
        x="0"
        y="1"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="24"
        fontWeight="700"
        fill="#0f172a"
        pointerEvents="none"
      >
        {getAtomLabel(atom)}
      </text>

      {atom.charge ? (
        <text
          x={radius - 2}
          y={-radius + 4}
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill="#dc2626"
          pointerEvents="none"
        >
          {getChargeLabel(atom.charge)}
        </text>
      ) : null}
    </g>
  );
}

export default function Molecule({
  molecule,
  width = 720,
  height = 360,
  className,
  interactive = false,
  selectedAtomId = null,
  selectedBondId = null,
  onAtomSelect,
  onBondSelect,
  children,
}: MoleculeProps) {
  return (
    <MoleculeProvider molecule={molecule}>
      <MoleculeCanvas
        width={width}
        height={height}
        className={className}
        label={molecule.name ?? "Molecule"}
      >
        <rect
          width={width}
          height={height}
          fill="#f8fafc"
        />

        <g aria-label="Bonds">
          {molecule.bonds.map((bond) => {
            const from = molecule.atoms.find(
              (atom) => atom.id === bond.from,
            );

            const to = molecule.atoms.find(
              (atom) => atom.id === bond.to,
            );

            if (!from || !to) {
              console.warn(
                `Bond "${bond.id}" references a missing atom.`,
              );

              return null;
            }

            return (
              <BondLines
                key={bond.id}
                bond={bond}
                from={from}
                to={to}
                selected={selectedBondId === bond.id}
                interactive={interactive}
                onSelect={onBondSelect}
              />
            );
          })}
        </g>

        <g aria-label="Atoms">
          {molecule.atoms.map((atom) => (
            <AtomNode
              key={atom.id}
              atom={atom}
              selected={selectedAtomId === atom.id}
              interactive={interactive}
              onSelect={onAtomSelect}
            />
          ))}
        </g>

        {children}
      </MoleculeCanvas>
    </MoleculeProvider>
  );
}