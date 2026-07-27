type AtomProps = {
  x: number;
  y: number;
  element: string;
  charge?: string;
  radius?: number;
  tone?: "default" | "oxygen" | "nitrogen" | "halogen";
};

const toneStyles = {
  default: { fill: "#ffffff", stroke: "#cbd5e1", text: "#0f172a" },
  oxygen: { fill: "#fff7f7", stroke: "#fca5a5", text: "#b91c1c" },
  nitrogen: { fill: "#eff6ff", stroke: "#93c5fd", text: "#1d4ed8" },
  halogen: { fill: "#f0fdf4", stroke: "#86efac", text: "#15803d" },
} as const;

export default function Atom({
  x,
  y,
  element,
  charge,
  radius = 31,
  tone = "default",
}: AtomProps) {
  const style = toneStyles[tone];

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth="2"
      />
      <text
        x={x}
        y={y + 9}
        textAnchor="middle"
        fontSize="28"
        fontWeight="700"
        fill={style.text}
      >
        {element}
      </text>
      {charge ? (
        <text
          x={x + radius * 0.78}
          y={y - radius * 0.72}
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill="#7c3aed"
        >
          {charge}
        </text>
      ) : null}
    </g>
  );
}
