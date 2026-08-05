"use client";

import { useMemo } from "react";
import CurvedArrow from "../arrows/CurvedArrow";
import { createCurvedArrows } from "../arrows/CurvedArrowEngine";
import { createMolecularGraph } from "../graph/MolecularGraph";
import SkeletalMoleculeEngine from "../skeletal/SkeletalMoleculeEngine";
import type { SkeletalMoleculeDefinition } from "../skeletal/types";
import {
  executeMechanismStep,
  type MechanismExecutionOptions,
  type MechanismExecutionResult,
} from "./MechanismExecutor";
import {
  mechanismStepToCurvedArrowInputs,
  type MechanismStepDefinition,
} from "./MechanismStep";

export type MechanismCanvasPhase =
  | "before"
  | "during"
  | "after";

export type MechanismCanvasProps = {
  molecule: SkeletalMoleculeDefinition;
  step: MechanismStepDefinition;
  phase?: MechanismCanvasPhase;
  executionOptions?: MechanismExecutionOptions;

  width?: number | string;
  height?: number | string;
  viewBox?: string;
  x?: number;
  y?: number;
  scale?: number;
  stroke?: string;
  strokeWidth?: number;
  showCarbons?: boolean;

  showElectronMoves?: boolean;
  animatedArrows?: boolean;
  arrowColour?: string;
  arrowStrokeWidth?: number;

  className?: string;
  ariaLabel?: string;

  onExecutionResult?: (
    result: MechanismExecutionResult,
  ) => void;
};

function displayedMolecule(
  molecule: SkeletalMoleculeDefinition,
  result: MechanismExecutionResult,
  phase: MechanismCanvasPhase,
): SkeletalMoleculeDefinition {
  if (
    phase === "after" &&
    result.success
  ) {
    return result.molecule;
  }

  return molecule;
}

export default function MechanismCanvas({
  molecule,
  step,
  phase = "during",
  executionOptions,
  width = "100%",
  height = 360,
  viewBox = "0 0 800 360",
  x = 0,
  y = 0,
  scale = 1,
  stroke,
  strokeWidth,
  showCarbons = false,
  showElectronMoves = true,
  animatedArrows = false,
  arrowColour,
  arrowStrokeWidth,
  className,
  ariaLabel,
  onExecutionResult,
}: MechanismCanvasProps) {
  const executionResult = useMemo(
    () =>
      executeMechanismStep(
        molecule,
        step,
        executionOptions,
      ),
    [executionOptions, molecule, step],
  );

  const renderedMolecule = useMemo(
    () =>
      displayedMolecule(
        molecule,
        executionResult,
        phase,
      ),
    [executionResult, molecule, phase],
  );

  const graph = useMemo(
    () =>
      createMolecularGraph(
        phase === "after"
          ? renderedMolecule
          : molecule,
      ),
    [molecule, phase, renderedMolecule],
  );

  const arrows = useMemo(() => {
    if (
      !showElectronMoves ||
      phase === "after"
    ) {
      return [];
    }

    return createCurvedArrows(
      graph,
      mechanismStepToCurvedArrowInputs(
        step,
      ),
    );
  }, [graph, phase, showElectronMoves, step]);

  useMemo(() => {
    onExecutionResult?.(executionResult);
  }, [executionResult, onExecutionResult]);

  const label =
    ariaLabel ??
    `${step.title}: ${renderedMolecule.name}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{label}</title>

      <SkeletalMoleculeEngine
        molecule={renderedMolecule}
        x={x}
        y={y}
        scale={scale}
        stroke={stroke}
        strokeWidth={strokeWidth}
        showCarbons={showCarbons}
      >
        {arrows.map((arrow) => (
          <CurvedArrow
            key={arrow.id}
            arrow={arrow}
            graph={graph}
            colour={arrowColour}
            strokeWidth={arrowStrokeWidth}
            animated={animatedArrows}
            ariaLabel={`Electron movement: ${arrow.id}`}
          />
        ))}

        {step.annotations.map(
          (annotation) =>
            annotation.position ? (
              <text
                key={annotation.id}
                x={annotation.position.x}
                y={annotation.position.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={
                  annotation.fontSize ?? 16
                }
                fontWeight="700"
                fill={
                  annotation.colour ??
                  "#475569"
                }
                pointerEvents="none"
              >
                {annotation.text}
              </text>
            ) : null,
        )}
      </SkeletalMoleculeEngine>
    </svg>
  );
}