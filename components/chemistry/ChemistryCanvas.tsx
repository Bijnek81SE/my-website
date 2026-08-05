import type { ReactNode, SVGProps } from "react";

type ChemistryCanvasProps = SVGProps<SVGSVGElement> & {
  children: ReactNode;
  title: string;
  description: string;
  viewBox?: string;
};

function accessibleId(value: string): string {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "chemistry-graphic";
}

export default function ChemistryCanvas({
  children,
  title,
  description,
  viewBox = "0 0 860 300",
  className = "h-auto w-full",
  ...props
}: ChemistryCanvasProps) {
  const baseId = props.id ?? accessibleId(title);
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
      className={className}
      {...props}
    >
      <title id={titleId}>{title}</title>
      <desc id={descriptionId}>{description}</desc>
      {children}
    </svg>
  );
}
