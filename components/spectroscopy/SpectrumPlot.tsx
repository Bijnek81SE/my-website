"use client";

import { useMemo, useState } from "react";
import {
  getSpectrumAxis,
  getTraceForKind,
  type SpectralAssignment,
  type SpectroscopyCompound,
  type SpectrumKind,
} from "@/components/chemistry/spectroscopy";

type Props = {
  compound: SpectroscopyCompound;
  kind: SpectrumKind;
  selectedAssignmentId?: string;
  highlightedAtomIds: readonly string[];
  onAssignmentSelect: (assignment: SpectralAssignment) => void;
};

const labels: Record<SpectrumKind, string> = {
  "proton-nmr": "¹H NMR",
  "carbon-nmr": "¹³C NMR",
  ir: "IR",
  mass: "Mass spectrum",
};

function assignmentsFor(
  compound: SpectroscopyCompound,
  kind: SpectrumKind,
): readonly SpectralAssignment[] {
  if (kind === "proton-nmr") {
    return compound.protonNmr;
  }

  if (kind === "carbon-nmr") {
    return compound.carbonNmr;
  }

  if (kind === "ir") {
    return compound.ir;
  }

  return compound.mass;
}

function hasNumericProperty<Key extends string>(
  value: object,
  key: Key,
): value is Record<Key, number> {
  return key in value && typeof (value as Record<string, unknown>)[key] === "number";
}

function getAssignmentPosition(
  assignment: SpectralAssignment,
  kind: SpectrumKind,
): number | null {
  if (
    (kind === "proton-nmr" || kind === "carbon-nmr") &&
    hasNumericProperty(assignment, "shift")
  ) {
    return assignment.shift;
  }

  if (kind === "ir" && hasNumericProperty(assignment, "center")) {
    return assignment.center;
  }

  if (kind === "mass" && hasNumericProperty(assignment, "mz")) {
    return assignment.mz;
  }

  return null;
}

export default function SpectrumPlot({
  compound,
  kind,
  selectedAssignmentId,
  highlightedAtomIds,
  onAssignmentSelect,
}: Props) {
  const [zoom, setZoom] = useState<[number, number] | null>(null);

  const axis = getSpectrumAxis(kind);

  const trace = useMemo(
    () => getTraceForKind(kind, compound),
    [compound, kind],
  );

  const assignments = assignmentsFor(compound, kind);

  const domainMin = zoom?.[0] ?? axis.min;
  const domainMax = zoom?.[1] ?? axis.max;

  const width = 900;
  const height = 330;
  const left = 55;
  const right = 24;
  const top = 28;
  const bottom = 48;

  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const xToPx = (x: number) => {
    const fraction = (x - domainMin) / (domainMax - domainMin);

    return (
      left +
      (axis.reversed ? 1 - fraction : fraction) * plotWidth
    );
  };

  const yToPx = (y: number) =>
    top + (1 - y / 100) * plotHeight;

  const visibleTrace = trace.filter(
    (point) =>
      point.x >= domainMin &&
      point.x <= domainMax,
  );

  const path = visibleTrace
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"}${xToPx(point.x).toFixed(
          2,
        )},${yToPx(point.y).toFixed(2)}`,
    )
    .join(" ");

  const ticks = Array.from(
    { length: 9 },
    (_, index) =>
      domainMin +
      ((domainMax - domainMin) * index) / 8,
  );

  function toggleDiagnosticZoom() {
    if (zoom) {
      setZoom(null);
      return;
    }

    if (kind === "proton-nmr") {
      setZoom([0, 5]);
      return;
    }

    if (kind === "carbon-nmr") {
      setZoom([0, 80]);
      return;
    }

    setZoom([900, 1900]);
  }

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      aria-labelledby="spectrum-heading"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
            Realistic simulated trace
          </p>

          <h2
            id="spectrum-heading"
            className="mt-1 text-lg font-bold text-slate-950"
          >
            {labels[kind]} — {compound.name}
          </h2>
        </div>

        {kind !== "mass" ? (
          <button
            type="button"
            onClick={toggleDiagnosticZoom}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            {zoom
              ? "Reset zoom"
              : "Zoom diagnostic region"}
          </button>
        ) : null}
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="min-w-[720px] w-full"
          role="img"
          aria-label={`${labels[kind]} simulated spectrum for ${compound.name}`}
        >
          <rect
            x={left}
            y={top}
            width={plotWidth}
            height={plotHeight}
            fill="#ffffff"
            stroke="#cbd5e1"
          />

          {[0, 25, 50, 75, 100].map((value) => (
            <line
              key={value}
              x1={left}
              x2={width - right}
              y1={yToPx(value)}
              y2={yToPx(value)}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          {kind === "mass" ? (
            visibleTrace.map((point) => (
              <line
                key={`${point.x}-${point.y}`}
                x1={xToPx(point.x)}
                x2={xToPx(point.x)}
                y1={yToPx(0)}
                y2={yToPx(point.y)}
                stroke="#0f172a"
                strokeWidth="3"
              />
            ))
          ) : (
            <path
              d={path}
              fill="none"
              stroke="#0f172a"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          )}

          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={xToPx(tick)}
                x2={xToPx(tick)}
                y1={height - bottom}
                y2={height - bottom + 7}
                stroke="#475569"
              />

              <text
                x={xToPx(tick)}
                y={height - 20}
                textAnchor="middle"
                fontSize="12"
                fill="#475569"
              >
                {tick >= 100
                  ? tick.toFixed(0)
                  : tick.toFixed(1)}
              </text>
            </g>
          ))}

          <text
            x={left + plotWidth / 2}
            y={height - 3}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#334155"
          >
            {axis.label} ({axis.unit})
          </text>

          {assignments.map((assignment) => {
            const value = getAssignmentPosition(
              assignment,
              kind,
            );

            if (
              value === null ||
              value < domainMin ||
              value > domainMax
            ) {
              return null;
            }

            const linked =
              highlightedAtomIds.length > 0 &&
              assignment.atomIds.some((atomId) =>
                highlightedAtomIds.includes(atomId),
              );

            const selected =
              selectedAssignmentId === assignment.id;

            return (
              <g key={assignment.id}>
                <line
                  x1={xToPx(value)}
                  x2={xToPx(value)}
                  y1={top}
                  y2={height - bottom}
                  stroke={
                    selected || linked
                      ? "#7c3aed"
                      : "transparent"
                  }
                  strokeWidth={selected ? 3 : 2}
                  strokeDasharray="5 4"
                />

                <rect
                  x={xToPx(value) - 12}
                  y={top}
                  width={24}
                  height={plotHeight}
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={`${assignment.label}: select assignment`}
                  onClick={() =>
                    onAssignmentSelect(assignment)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      onAssignmentSelect(assignment);
                    }
                  }}
                  className="cursor-pointer outline-none"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div
        className="mt-3 flex flex-wrap gap-2"
        aria-label="Spectrum assignments"
      >
        {assignments.map((assignment) => {
          const linked =
            highlightedAtomIds.length > 0 &&
            assignment.atomIds.some((atomId) =>
              highlightedAtomIds.includes(atomId),
            );

          const active =
            selectedAssignmentId === assignment.id ||
            linked;

          return (
            <button
              key={assignment.id}
              type="button"
              onClick={() =>
                onAssignmentSelect(assignment)
              }
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? "border-violet-400 bg-violet-100 text-violet-950"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-300"
              }`}
            >
              {assignment.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}