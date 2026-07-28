"use client";

import { useState } from "react";
import CurvedArrow from "./CurvedArrow";

type SelectedArrow = "nucleophile" | "leaving" | null;

export default function CurvedArrowPlayground() {
  const [selected, setSelected] = useState<SelectedArrow>(null);
  const [animated, setAnimated] = useState(true);

  function handleKeyboardSelect(
    event: React.KeyboardEvent<SVGGElement>,
    value: Exclude<SelectedArrow, null>,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelected(value);
    }
  }

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Chemistry engine
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            Curved-arrow playground
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setAnimated((value) => !value)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-400"
        >
          Animation: {animated ? "On" : "Off"}
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        <svg
          viewBox="0 0 720 360"
          className="h-auto w-full"
          role="img"
          aria-label="SN2 curved-arrow example"
        >
          <rect width="720" height="360" fill="#f8fafc" />

          <text
            x="72"
            y="205"
            fontSize="38"
            fontWeight="700"
            fill="#2563eb"
          >
            ⁻OH
          </text>

          <text
            x="315"
            y="205"
            fontSize="38"
            fontWeight="700"
            fill="#0f172a"
          >
            CH₃
          </text>

          <line
            x1="392"
            y1="190"
            x2="470"
            y2="190"
            stroke="#0f172a"
            strokeWidth="4"
          />

          <text
            x="484"
            y="205"
            fontSize="38"
            fontWeight="700"
            fill="#dc2626"
          >
            Br
          </text>

          {/* Nucleophile attack arrow */}
          <g
            role="button"
            tabIndex={0}
            aria-label="Electron pair attacks the methyl carbon"
            onClick={() => setSelected("nucleophile")}
            onKeyDown={(event) =>
              handleKeyboardSelect(event, "nucleophile")
            }
            style={{ cursor: "pointer" }}
          >
            <CurvedArrow
              start={{ x: 120, y: 165 }}
              control={{ x: 230, y: 52 }}
              end={{ x: 342, y: 168 }}
              tone="accent"
              animated={animated}
              selected={selected === "nucleophile"}
              interactive
              ariaLabel="Electron pair attacks the methyl carbon"
            />

            {/* Invisible wide hit area */}
            <path
              d="M 120 165 Q 230 52 342 168"
              fill="none"
              stroke="transparent"
              strokeWidth="30"
              pointerEvents="stroke"
            />
          </g>

          {/* Leaving-group arrow */}
          <g
            role="button"
            tabIndex={0}
            aria-label="Carbon bromine bond electrons move to bromine"
            onClick={() => setSelected("leaving")}
            onKeyDown={(event) =>
              handleKeyboardSelect(event, "leaving")
            }
            style={{ cursor: "pointer" }}
          >
            <CurvedArrow
              start={{ x: 426, y: 171 }}
              control={{ x: 500, y: 86 }}
              end={{ x: 520, y: 160 }}
              tone="danger"
              animated={animated}
              selected={selected === "leaving"}
              interactive
              ariaLabel="Carbon bromine bond electrons move to bromine"
            />

            {/* Invisible wide hit area */}
            <path
              d="M 426 171 Q 500 86 520 160"
              fill="none"
              stroke="transparent"
              strokeWidth="30"
              pointerEvents="stroke"
            />
          </g>

          <text
            x="360"
            y="310"
            textAnchor="middle"
            fontSize="17"
            fill="#475569"
          >
            Click either arrow to select the electron movement step.
          </text>
        </svg>
      </div>

      <div
        className="rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-200"
        aria-live="polite"
      >
        {selected === null && "Select an arrow."}

        {selected === "nucleophile" &&
          "The hydroxide lone pair attacks the electrophilic carbon."}

        {selected === "leaving" &&
          "The C–Br bond electrons move onto bromine as the leaving group departs."}
      </div>
    </div>
  );
}