type HeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  level?: "h1" | "h2";
  className?: string;
};

export default function Heading({
  eyebrow,
  title,
  description,
  align = "left",
  level = "h2",
  className = "",
}: HeadingProps) {
  const Title = level;
  const centred = align === "center";

  return (
    <div
      className={`${centred ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      <Title
        className={`${eyebrow ? "mt-3" : ""} font-bold tracking-tight text-slate-950 ${
          level === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </Title>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
