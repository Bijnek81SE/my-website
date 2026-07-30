"use client";

import { useState } from "react";
import CurvedArrow from "./CurvedArrow";
import type { CurvedArrowHead } from "./CurvedArrow/types";

type SelectedArrow = "nucleophile" | "leaving" | null;

export default function CurvedArrowPlayground() {
  const [selected, setSelected] = useState<SelectedArrow>(null);
  const [animated, setAnimated] = useState(true);
  const [head, setHead] = useState<CurvedArrowHead>("pair");

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Chemistry engine
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            Curved-arrow playground
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Compare electron-pair arrows with single-electron fishhook arrows.
          </p>
        </div>

        <button
          type="button"
          aria-pressed={animated}
          onClick={() => setAnimated((value) => !value)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Animation: {animated ? "On" : "Off"}
        </button>
      </div>

      <fieldset>
        <legend className="text-sm font-bold text-slate-950">
          Arrowhead type
        </legend>

        <p className="mb-3 mt-1 text-sm leading-6 text-slate-600">
          Electron-pair arrows move two electrons. Fishhook arrows move one
          electron.
        </p>

        <div className="grid max-w-md grid-cols-2 gap-2">
          <ArrowHeadChoice
            active={head === "pair"}
            onClick={() => setHead("pair")}
          >
            Electron pair
          </ArrowHeadChoice>

          <ArrowHeadChoice
            active={head === "fishhook"}
            onClick={() => setHead("fishhook")}
          >
            Fishhook
          </ArrowHeadChoice>
        </div>
      </fieldset>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        <svg
          viewBox="0 0 720 360"
          className="h-auto w-full"
          role="img"
          aria-labelledby="curved-arrow-title curved-arrow-description"
        >
          <title id="curved-arrow-title">
            Curved-arrow reaction preview
          </title>

          <desc id="curved-arrow-description">
            Two selectable curved arrows show electron movement between
            hydroxide, methyl carbon, and bromine.
          </desc>

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

          <CurvedArrow
            start={{ x: 120, y: 165 }}
            control={{ x: 230, y: 52 }}
            end={{ x: 342, y: 168 }}
            tone="accent"
            head={head}
            animated={animated}
            selected={selected === "nucleophile"}
            interactive
            ariaLabel={
              head === "fishhook"
                ? "A single electron moves towards the methyl carbon"
                : "An electron pair attacks the methyl carbon"
            }
            onClick={() => setSelected("nucleophile")}
          />

          <CurvedArrow
            start={{ x: 426, y: 171 }}
            control={{ x: 500, y: 86 }}
            end={{ x: 520, y: 160 }}
            tone="danger"
            head={head}
            animated={animated}
            selected={selected === "leaving"}
            interactive
            ariaLabel={
              head === "fishhook"
                ? "A single electron moves from the carbon bromine bond towards bromine"
                : "The carbon bromine bond electron pair moves towards bromine"
            }
            onClick={() => setSelected("leaving")}
          />

          <text
            x="360"
            y="310"
            textAnchor="middle"
            fontSize="17"
            fill="#475569"
          >
            Select either arrow to inspect the electron movement.
          </text>
        </svg>
      </div>

      <div
        className="rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-200"
        aria-live="polite"
      >
        {selected === null &&
          `Select an arrow. Current arrowhead: ${
            head === "pair" ? "electron pair" : "fishhook"
          }.`}

        {selected === "nucleophile" &&
          (head === "pair"
            ? "The hydroxide lone pair attacks the electrophilic carbon."
            : "The fishhook arrow represents one electron moving towards the carbon.")}

        {selected === "leaving" &&
          (head === "pair"
            ? "The C–Br bond electron pair moves onto bromine as the leaving group departs."
            : "The fishhook arrow represents one electron moving from the C–Br bond towards bromine.")}
      </div>

      <div className="overflow-x-auto rounded-2xl bg-slate-100 p-4">
        <pre className="text-sm leading-6 text-slate-800">
          {`<CurvedArrow
  start={{ x: 120, y: 165 }}
  control={{ x: 230, y: 52 }}
  end={{ x: 342, y: 168 }}
  head="${head}"
  animated={${animated}}
/>`}
        </pre>
      </div>
    </div>
  );
}

type ArrowHeadChoiceProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ArrowHeadChoice({
  active,
  onClick,
  children,
}: ArrowHeadChoiceProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
        active
          ? "border-blue-600 bg-blue-50 text-blue-800"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
      }`}
    >
      {children}
    </button>
  );
}