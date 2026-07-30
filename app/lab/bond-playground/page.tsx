"use client";

import { useState, type ReactNode } from "react";
import {
  Bond,
  type BondOrder,
  type BondPolarity,
  type BondType,
} from "@/components/chemistry/bonds";

const atomStyle = "fill-white stroke-slate-300 [stroke-width:2]";

const bondTypes: Array<{
  value: BondType;
  label: string;
  description: string;
}> = [
  {
    value: "line",
    label: "Line",
    description: "A standard bond drawn in the plane of the page.",
  },
  {
    value: "wedge",
    label: "Solid wedge",
    description: "A bond projecting out of the page towards the viewer.",
  },
  {
    value: "dash",
    label: "Hashed wedge",
    description: "A bond projecting behind the plane of the page.",
  },
  {
    value: "aromatic",
    label: "Aromatic",
    description: "A dashed representation used for delocalised bonding.",
  },
];

const polarityOptions: Array<{
  value: BondPolarity;
  label: string;
}> = [
  { value: "none", label: "None" },
  { value: "forward", label: "C → O" },
  { value: "reverse", label: "O → C" },
];

function supportsMultipleBondOrders(type: BondType) {
  return type === "line" || type === "aromatic";
}

export default function BondPlaygroundPage() {
  const [order, setOrder] = useState<BondOrder>(1);
  const [type, setType] = useState<BondType>("line");
  const [polarity, setPolarity] = useState<BondPolarity>("none");
  const [selected, setSelected] = useState(false);
  const [animated, setAnimated] = useState(false);

  const activeType =
    bondTypes.find((bondType) => bondType.value === type) ?? bondTypes[0];

  function chooseType(nextType: BondType) {
    setType(nextType);

    if (!supportsMultipleBondOrders(nextType)) {
      setOrder(1);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            Chemistry component library
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Bond playground
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Test bond order, stereochemistry, polarity, animation, and
            interaction before reusing the Bond Engine in lessons and
            mechanisms.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
                <svg
                  viewBox="0 0 640 360"
                  className="h-auto w-full"
                  role="img"
                  aria-labelledby="bond-preview-title bond-preview-description"
                >
                  <title id="bond-preview-title">
                    Interactive chemical bond preview
                  </title>

                  <desc id="bond-preview-description">
                    A carbon atom and oxygen atom connected by the currently
                    selected bond style.
                  </desc>

                  <defs>
                    <radialGradient
                      id="preview-bg"
                      cx="50%"
                      cy="50%"
                      r="70%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#1e3a8a"
                        stopOpacity="0.34"
                      />
                      <stop
                        offset="100%"
                        stopColor="#020617"
                        stopOpacity="0"
                      />
                    </radialGradient>
                  </defs>

                  <rect width="640" height="360" fill="#020617" />
                  <rect
                    width="640"
                    height="360"
                    fill="url(#preview-bg)"
                  />

                  <Bond
                    start={{ x: 194, y: 180 }}
                    end={{ x: 446, y: 180 }}
                    order={order}
                    type={type}
                    polarity={polarity}
                    selected={selected}
                    animated={animated}
                    interactive
                    colour="#cbd5e1"
                    selectedColour="#60a5fa"
                    strokeWidth={5}
                    spacing={13}
                    ariaLabel="Preview bond. Activate to toggle selection."
                    onClick={() =>
                      setSelected((current) => !current)
                    }
                  />

                  <circle
                    cx="160"
                    cy="180"
                    r="34"
                    className={atomStyle}
                  />

                  <circle
                    cx="480"
                    cy="180"
                    r="34"
                    className={atomStyle}
                  />

                  <text
                    x="160"
                    y="190"
                    textAnchor="middle"
                    className="fill-slate-900 text-2xl font-bold"
                    pointerEvents="none"
                  >
                    C
                  </text>

                  <text
                    x="480"
                    y="190"
                    textAnchor="middle"
                    className="fill-slate-900 text-2xl font-bold"
                    pointerEvents="none"
                  >
                    O
                  </text>
                </svg>
              </div>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="font-semibold text-blue-950">
                  {activeType.label}
                </p>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                  {activeType.description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Control
                label="Bond order"
                description={
                  supportsMultipleBondOrders(type)
                    ? "Choose the number of bond lines."
                    : "Stereochemical wedge bonds use a single bond."
                }
              >
                <div className="grid grid-cols-3 gap-2">
                  {([1, 2, 3] as BondOrder[]).map((value) => {
                    const disabled =
                      !supportsMultipleBondOrders(type) && value !== 1;

                    return (
                      <Choice
                        key={value}
                        active={order === value}
                        disabled={disabled}
                        onClick={() => setOrder(value)}
                      >
                        {value}
                      </Choice>
                    );
                  })}
                </div>
              </Control>

              <Control
                label="Bond type"
                description="Choose the geometric representation."
              >
                <div className="grid grid-cols-2 gap-2">
                  {bondTypes.map((bondType) => (
                    <Choice
                      key={bondType.value}
                      active={type === bondType.value}
                      onClick={() => chooseType(bondType.value)}
                    >
                      {bondType.label}
                    </Choice>
                  ))}
                </div>
              </Control>

              <Control
                label="Dipole"
                description="Show the direction of bond polarisation."
              >
                <div className="grid grid-cols-3 gap-2">
                  {polarityOptions.map((option) => (
                    <Choice
                      key={option.value}
                      active={polarity === option.value}
                      onClick={() => setPolarity(option.value)}
                    >
                      {option.label}
                    </Choice>
                  ))}
                </div>
              </Control>

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300">
                Animated highlight

                <input
                  type="checkbox"
                  checked={animated}
                  onChange={(event) =>
                    setAnimated(event.target.checked)
                  }
                  className="h-5 w-5 accent-blue-600"
                />
              </label>

              <button
                type="button"
                onClick={() =>
                  setSelected((current) => !current)
                }
                className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                {selected ? "Clear selection" : "Select bond"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setOrder(1);
                  setType("line");
                  setPolarity("none");
                  setSelected(false);
                  setAnimated(false);
                }}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Reset playground
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-3xl bg-slate-100 p-5 font-mono text-sm leading-7 text-slate-800">
            <pre>{`<Bond
  start={{ x: 194, y: 180 }}
  end={{ x: 446, y: 180 }}
  order={${order}}
  type="${type}"
  polarity="${polarity}"
  selected={${selected}}
  animated={${animated}}
/>`}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}

type ControlProps = {
  label: string;
  description: string;
  children: ReactNode;
};

function Control({
  label,
  description,
  children,
}: ControlProps) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-950">
        {label}
      </legend>

      <p className="mb-3 mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

      {children}
    </fieldset>
  );
}

type ChoiceProps = {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

function Choice({
  active,
  disabled = false,
  onClick,
  children,
}: ChoiceProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
        active
          ? "border-blue-600 bg-blue-50 text-blue-800"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
      } disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300 disabled:hover:border-slate-100`}
    >
      {children}
    </button>
  );
}