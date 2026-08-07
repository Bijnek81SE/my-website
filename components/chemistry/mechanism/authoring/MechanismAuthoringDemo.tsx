"use client";

import Link from "next/link";
import { useState } from "react";
import { mechanismAuthoringExamples } from "@/content/mechanisms/authoring";
import GeneratedMechanismPlayer from "./GeneratedMechanismPlayer";

const demoOptions = [
  {
    id: "sn2",
    label: "Generated SN2",
  },
  {
    id: "e2",
    label: "Generated E2",
  },
] as const;

type DemoId =
  (typeof demoOptions)[number]["id"];

export default function MechanismAuthoringDemo() {
  const [active, setActive] =
    useState<DemoId>("sn2");

  const definition =
    mechanismAuthoringExamples[active];

  if (!definition) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-800">
          Experimental · old mechanism system remains untouched
        </p>

        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          These mechanisms are generated through the experimental
          authoring and family-geometry layer, then rendered through
          the existing high-quality mechanism player and reaction
          canvases. Compare them directly with the original SN2 and
          E2 pages before deciding whether to adopt the authoring
          system.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <span className="font-semibold text-slate-700">
          Compare against the untouched originals:
        </span>

        <Link
          href="/lab/sn2-mechanism"
          className="font-semibold text-blue-700 hover:text-blue-900"
        >
          Original SN2
        </Link>

        <Link
          href="/lab/e2-mechanism"
          className="font-semibold text-orange-700 hover:text-orange-900"
        >
          Original E2
        </Link>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Generated mechanism example"
      >
        {demoOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={active === option.id}
            onClick={() =>
              setActive(option.id)
            }
            className={`rounded-xl border px-4 py-2 font-semibold transition ${
              active === option.id
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <GeneratedMechanismPlayer
        key={active}
        definition={definition}
      />
    </div>
  );
}