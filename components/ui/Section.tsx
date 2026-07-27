import type { ReactNode } from "react";
import Container from "./Container";

type SectionTone = "white" | "muted" | "dark";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: SectionTone;
  id?: string;
};

const tones: Record<SectionTone, string> = {
  white: "bg-white",
  muted: "bg-slate-50",
  dark: "bg-slate-950 text-white",
};

export default function Section({
  children,
  className = "",
  containerClassName = "",
  tone = "white",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <Container className={`py-16 sm:py-20 lg:py-24 ${containerClassName}`}>
        {children}
      </Container>
    </section>
  );
}
