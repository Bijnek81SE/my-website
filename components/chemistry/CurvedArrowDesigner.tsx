"use client";

import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import CurvedArrow from "./CurvedArrow";
import type {
  CurvedArrowHead,
  CurvedArrowTone,
  Point,
} from "./CurvedArrow/types";

type HandleName = "start" | "control" | "end";
type BackgroundPreset = "blank" | "grid" | "sn2" | "radical";

type ArrowState = {
  start: Point;
  control: Point;
  end: Point;
};

const VIEWBOX_WIDTH = 760;
const VIEWBOX_HEIGHT = 420;

const initialArrow: ArrowState = {
  start: { x: 190, y: 250 },
  control: { x: 355, y: 80 },
  end: { x: 545, y: 230 },
};

const toneOptions: { value: CurvedArrowTone; label: string }[] = [
  { value: "default", label: "Slate" },
  { value: "accent", label: "Blue" },
  { value: "success", label: "Green" },
  { value: "danger", label: "Red" },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundPoint(point: Point): Point {
  return {
    x: Math.round(point.x),
    y: Math.round(point.y),
  };
}

function coordinateSnippet(
  arrow: ArrowState,
  head: CurvedArrowHead,
  tone: CurvedArrowTone,
  width: number,
  animated: boolean,
): string {
  return `{
  start: { x: ${Math.round(arrow.start.x)}, y: ${Math.round(arrow.start.y)} },
  control: { x: ${Math.round(arrow.control.x)}, y: ${Math.round(arrow.control.y)} },
  end: { x: ${Math.round(arrow.end.x)}, y: ${Math.round(arrow.end.y)} },
  head: "${head}",
  tone: "${tone}",
  width: ${width},
  animated: ${animated},
}`;
}

export default function CurvedArrowDesigner() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [arrow, setArrow] = useState<ArrowState>(initialArrow);
  const [activeHandle, setActiveHandle] = useState<HandleName | null>(null);
  const [head, setHead] = useState<CurvedArrowHead>("pair");
  const [tone, setTone] = useState<CurvedArrowTone>("accent");
  const [width, setWidth] = useState(4);
  const [headSize, setHeadSize] = useState(12);
  const [animated, setAnimated] = useState(false);
  const [dashed, setDashed] = useState(false);
  const [background, setBackground] = useState<BackgroundPreset>("grid");
  const [copyStatus, setCopyStatus] = useState("Copy TypeScript");

  const snippet = useMemo(
    () => coordinateSnippet(arrow, head, tone, width, animated),
    [animated, arrow, head, tone, width],
  );

  function pointFromPointer(event: ReactPointerEvent<SVGSVGElement>): Point {
    const svg = svgRef.current;

    if (!svg) {
      return { x: 0, y: 0 };
    }

    const rect = svg.getBoundingClientRect();

    return {
      x: clamp(
        ((event.clientX - rect.left) / rect.width) * VIEWBOX_WIDTH,
        0,
        VIEWBOX_WIDTH,
      ),
      y: clamp(
        ((event.clientY - rect.top) / rect.height) * VIEWBOX_HEIGHT,
        0,
        VIEWBOX_HEIGHT,
      ),
    };
  }

  function updateHandle(handle: HandleName, point: Point) {
    setArrow((current) => ({
      ...current,
      [handle]: roundPoint(point),
    }));
  }

  function beginDrag(
    event: ReactPointerEvent<SVGCircleElement>,
    handle: HandleName,
  ) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setActiveHandle(handle);
  }

  function handlePointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    if (!activeHandle) {
      return;
    }

    updateHandle(activeHandle, pointFromPointer(event));
  }

  function stopDrag() {
    setActiveHandle(null);
  }

  function nudgeHandle(
    event: KeyboardEvent<SVGCircleElement>,
    handle: HandleName,
  ) {
    const distance = event.shiftKey ? 10 : 1;
    let deltaX = 0;
    let deltaY = 0;

    if (event.key === "ArrowLeft") {
      deltaX = -distance;
    } else if (event.key === "ArrowRight") {
      deltaX = distance;
    } else if (event.key === "ArrowUp") {
      deltaY = -distance;
    } else if (event.key === "ArrowDown") {
      deltaY = distance;
    } else {
      return;
    }

    event.preventDefault();

    setArrow((current) => ({
      ...current,
      [handle]: {
        x: clamp(current[handle].x + deltaX, 0, VIEWBOX_WIDTH),
        y: clamp(current[handle].y + deltaY, 0, VIEWBOX_HEIGHT),
      },
    }));
  }

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopyStatus("Copied!");
      window.setTimeout(() => setCopyStatus("Copy TypeScript"), 1400);
    } catch {
      setCopyStatus("Copy failed");
      window.setTimeout(() => setCopyStatus("Copy TypeScript"), 1400);
    }
  }

  function resetArrow() {
    setArrow(initialArrow);
    setActiveHandle(null);
  }

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">
            Developer chemistry tool
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
            Curved Arrow Designer
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Drag the start, control, and end handles to compose a textbook-style
            electron-movement arrow. Use arrow keys for one-pixel adjustments
            and Shift + arrow keys for ten-pixel adjustments.
          </p>
        </div>

        <button
          type="button"
          onClick={resetArrow}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-400 hover:text-violet-800"
        >
          Reset arrow
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            className="h-auto w-full touch-none select-none"
            role="img"
            aria-label="Interactive curved arrow design canvas"
            onPointerMove={handlePointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            onPointerLeave={stopDrag}
          >
            <rect width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="#f8fafc" />
            <DesignerBackground preset={background} />

            <line
              x1={arrow.start.x}
              y1={arrow.start.y}
              x2={arrow.control.x}
              y2={arrow.control.y}
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="7 7"
              pointerEvents="none"
            />
            <line
              x1={arrow.control.x}
              y1={arrow.control.y}
              x2={arrow.end.x}
              y2={arrow.end.y}
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="7 7"
              pointerEvents="none"
            />

            <CurvedArrow
              start={arrow.start}
              control={arrow.control}
              end={arrow.end}
              tone={tone}
              head={head}
              width={width}
              headSize={headSize}
              animated={animated}
              dashed={dashed}
              ariaLabel="Arrow under design"
            />

            <DragHandle
              name="start"
              point={arrow.start}
              active={activeHandle === "start"}
              fill="#2563eb"
              onPointerDown={beginDrag}
              onKeyDown={nudgeHandle}
            />
            <DragHandle
              name="control"
              point={arrow.control}
              active={activeHandle === "control"}
              fill="#7c3aed"
              onPointerDown={beginDrag}
              onKeyDown={nudgeHandle}
            />
            <DragHandle
              name="end"
              point={arrow.end}
              active={activeHandle === "end"}
              fill="#dc2626"
              onPointerDown={beginDrag}
              onKeyDown={nudgeHandle}
            />

            <text x="24" y="390" fontSize="15" fill="#475569">
              Blue = start · Violet = control · Red = end
            </text>
          </svg>
        </div>

        <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <ControlGroup label="Background">
            <select
              value={background}
              onChange={(event) =>
                setBackground(event.target.value as BackgroundPreset)
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
            >
              <option value="grid">Coordinate grid</option>
              <option value="sn2">SN2 reference</option>
              <option value="radical">Radical HBr reference</option>
              <option value="blank">Blank canvas</option>
            </select>
          </ControlGroup>

          <ControlGroup label="Arrowhead">
            <div className="grid grid-cols-2 gap-2">
              <ChoiceButton active={head === "pair"} onClick={() => setHead("pair")}>
                Pair
              </ChoiceButton>
              <ChoiceButton
                active={head === "fishhook"}
                onClick={() => setHead("fishhook")}
              >
                Fishhook
              </ChoiceButton>
            </div>
          </ControlGroup>

          <ControlGroup label="Tone">
            <div className="grid grid-cols-2 gap-2">
              {toneOptions.map((option) => (
                <ChoiceButton
                  key={option.value}
                  active={tone === option.value}
                  onClick={() => setTone(option.value)}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
          </ControlGroup>

          <RangeControl
            label="Stroke width"
            value={width}
            min={2}
            max={8}
            onChange={setWidth}
          />
          <RangeControl
            label="Arrowhead size"
            value={headSize}
            min={7}
            max={18}
            onChange={setHeadSize}
          />

          <div className="grid grid-cols-2 gap-2">
            <ToggleButton active={animated} onClick={() => setAnimated((value) => !value)}>
              Animated
            </ToggleButton>
            <ToggleButton active={dashed} onClick={() => setDashed((value) => !value)}>
              Dashed
            </ToggleButton>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <CoordinateCard label="Start" point={arrow.start} tone="blue" />
        <CoordinateCard label="Control" point={arrow.control} tone="violet" />
        <CoordinateCard label="End" point={arrow.end} tone="rose" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-4 py-3">
          <p className="text-sm font-semibold text-slate-200">Generated TypeScript</p>
          <button
            type="button"
            onClick={copySnippet}
            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-violet-100"
          >
            {copyStatus}
          </button>
        </div>
        <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-200">
          {snippet}
        </pre>
      </div>
    </div>
  );
}

function DesignerBackground({ preset }: { preset: BackgroundPreset }) {
  if (preset === "blank") {
    return null;
  }

  if (preset === "sn2") {
    return (
      <g opacity="0.8" pointerEvents="none">
        <text x="92" y="260" fontSize="42" fontWeight="700" fill="#2563eb">
          ⁻OH
        </text>
        <text x="390" y="250" fontSize="42" fontWeight="700" fill="#0f172a">
          CH₃
        </text>
        <line x1="474" y1="235" x2="555" y2="235" stroke="#0f172a" strokeWidth="5" />
        <text x="570" y="250" fontSize="42" fontWeight="700" fill="#dc2626">
          Br
        </text>
      </g>
    );
  }

  if (preset === "radical") {
    return (
      <g opacity="0.82" pointerEvents="none">
        <polyline
          points="120,250 210,198 305,250"
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="210" cy="178" r="7" fill="#e11d48" />
        <text x="520" y="250" fontSize="40" fontWeight="700" fill="#0f172a">
          H–Br
        </text>
      </g>
    );
  }

  return (
    <g opacity="0.48" pointerEvents="none">
      {Array.from({ length: 16 }, (_, index) => (
        <line
          key={`vertical-${index}`}
          x1={index * 50}
          y1="0"
          x2={index * 50}
          y2={VIEWBOX_HEIGHT}
          stroke="#cbd5e1"
          strokeWidth={index % 2 === 0 ? 1.5 : 1}
        />
      ))}
      {Array.from({ length: 9 }, (_, index) => (
        <line
          key={`horizontal-${index}`}
          x1="0"
          y1={index * 50}
          x2={VIEWBOX_WIDTH}
          y2={index * 50}
          stroke="#cbd5e1"
          strokeWidth={index % 2 === 0 ? 1.5 : 1}
        />
      ))}
    </g>
  );
}

type DragHandleProps = {
  name: HandleName;
  point: Point;
  active: boolean;
  fill: string;
  onPointerDown: (
    event: ReactPointerEvent<SVGCircleElement>,
    handle: HandleName,
  ) => void;
  onKeyDown: (
    event: KeyboardEvent<SVGCircleElement>,
    handle: HandleName,
  ) => void;
};

function DragHandle({
  name,
  point,
  active,
  fill,
  onPointerDown,
  onKeyDown,
}: DragHandleProps) {
  return (
    <g>
      <circle
        cx={point.x}
        cy={point.y}
        r={active ? 13 : 11}
        fill="#ffffff"
        stroke={fill}
        strokeWidth={active ? 5 : 4}
        role="slider"
        aria-label={`${name} handle at x ${point.x}, y ${point.y}`}
        aria-valuetext={`x ${point.x}, y ${point.y}`}
        tabIndex={0}
        className="cursor-grab outline-none focus-visible:stroke-slate-950"
        onPointerDown={(event) => onPointerDown(event, name)}
        onKeyDown={(event) => onKeyDown(event, name)}
      />
      <text
        x={point.x}
        y={point.y - 19}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={fill}
        pointerEvents="none"
      >
        {name}
      </text>
    </g>
  );
}

function ControlGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold text-slate-900">{label}</legend>
      {children}
    </fieldset>
  );
}

function ChoiceButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
        active
          ? "border-violet-600 bg-violet-50 text-violet-800"
          : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
      }`}
    >
      {children}
    </button>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
        active
          ? "border-emerald-600 bg-emerald-50 text-emerald-800"
          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
      }`}
    >
      {children}: {active ? "On" : "Off"}
    </button>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800">
      <span className="flex items-center justify-between gap-3">
        {label}
        <span className="rounded-md bg-white px-2 py-1 text-xs text-slate-600">
          {value}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full accent-violet-600"
      />
    </label>
  );
}

function CoordinateCard({
  label,
  point,
  tone,
}: {
  label: string;
  point: Point;
  tone: "blue" | "violet" | "rose";
}) {
  const classes = {
    blue: "border-blue-200 bg-blue-50 text-blue-900",
    violet: "border-violet-200 bg-violet-50 text-violet-900",
    rose: "border-rose-200 bg-rose-50 text-rose-900",
  }[tone];

  return (
    <div className={`rounded-2xl border p-4 ${classes}`}>
      <p className="text-sm font-bold uppercase tracking-[0.12em]">{label}</p>
      <p className="mt-2 font-mono text-sm">
        x: {Math.round(point.x)} · y: {Math.round(point.y)}
      </p>
    </div>
  );
}
