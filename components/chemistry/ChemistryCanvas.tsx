import type { ReactNode, SVGProps } from "react";

type ChemistryCanvasProps = SVGProps<SVGSVGElement> & {
  children: ReactNode;
  title: string;
  description: string;
  viewBox?: string;
};

export default function ChemistryCanvas({
  children,
  title,
  description,
  viewBox = "0 0 860 300",
  className = "h-auto w-full",
  ...props
}: ChemistryCanvasProps) {
  const titleId = `${props.id ?? "chemistry"}-title`;
  const descriptionId = `${props.id ?? "chemistry"}-description`;

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
