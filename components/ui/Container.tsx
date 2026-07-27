import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
};

const sizes = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export default function Container({
  as: Component = "div",
  children,
  className = "",
  size = "wide",
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full px-5 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}
    >
      {children}
    </Component>
  );
}
