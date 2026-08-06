import type { Metadata } from "next";
import { ReactionPredictionLab } from "@/components/prediction";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Reaction Prediction & Synthesis Lab",
  description:
    "Predict organic reaction products, justify selectivity with mechanisms, and plan multi-step syntheses interactively.",
  path: "/lab/reaction-prediction",
  keywords: [
    "reaction prediction",
    "organic synthesis planner",
    "major product",
    "regioselectivity",
    "stereochemistry",
  ],
});

export default function ReactionPredictionPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">
            Interactive chemistry lab
          </p>
          <h1 className="mt-3 max-w-5xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Reaction Prediction &amp; Synthesis
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Move beyond memorising reagent tables: connect conditions to mechanisms, predict the major product, and construct viable synthetic routes.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <ReactionPredictionLab />
      </div>
    </main>
  );
}
