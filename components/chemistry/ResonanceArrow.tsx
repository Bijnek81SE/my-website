type ResonanceArrowProps = {
  x: number;
  y: number;
  width?: number;
};

export default function ResonanceArrow({ x, y, width = 74 }: ResonanceArrowProps) {
  const half = width / 2;

  return (
    <g transform={`translate(${x} ${y})`} stroke="#475569" strokeWidth="3" fill="none" aria-hidden="true">
      <line x1={-half} y1="-6" x2={half - 8} y2="-6" />
      <path d={`M ${half - 16} -14 L ${half} -6 L ${half - 16} 2`} />
      <line x1={half} y1="6" x2={-half + 8} y2="6" />
      <path d={`M ${-half + 16} -2 L ${-half} 6 L ${-half + 16} 14`} />
    </g>
  );
}
