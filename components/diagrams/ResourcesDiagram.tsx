const books = [
  { color: "#059669", label: "Cheat sheets" },
  { color: "#2563EB", label: "Reading list" },
  { color: "#EF4444", label: "Practice sets" },
  { color: "#7C3AED", label: "Templates" },
  { color: "#F59E0B", label: "Reaction maps" },
];

export default function ResourcesDiagram() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end gap-2">
        {books.map((b, i) => (
          <div key={b.label} className="group/book flex flex-col items-center">
            <div
              className="w-9 rounded-t-sm shadow-sm transition-transform duration-300 group-hover/book:-translate-y-3"
              style={{ height: `${64 + (i % 3) * 14}px`, backgroundColor: b.color }}
            />
            <span className="pointer-events-none mt-2 max-w-[4.5rem] text-center text-[10px] leading-tight text-slate-500 opacity-0 transition-opacity duration-300 group-hover/book:opacity-100">
              {b.label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-2 w-56 rounded-full bg-slate-900" />

      <svg viewBox="0 0 160 60" className="h-14 w-40" aria-hidden="true">
        <path
          d="M20 40 L80 20 L140 45"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="200"
          style={{ ["--draw-length" as string]: 200 }}
          className="animate-draw-in"
        />
        <circle cx="20" cy="40" r="6" fill="#059669" className="animate-soft-pulse" />
        <circle cx="80" cy="20" r="6" fill="#2563EB" className="animate-soft-pulse" style={{ animationDelay: "0.4s" }} />
        <circle cx="140" cy="45" r="6" fill="#EF4444" className="animate-soft-pulse" style={{ animationDelay: "0.8s" }} />
      </svg>
      <p className="text-xs font-medium text-slate-500">Reaction map: hover a book to see what it covers</p>
    </div>
  );
}
