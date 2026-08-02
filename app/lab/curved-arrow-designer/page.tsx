import type { Metadata } from "next";
import Link from "next/link";
import CurvedArrowDesigner from "@/components/chemistry/CurvedArrowDesigner";

export const metadata: Metadata = {
  title: "Curved Arrow Designer | Organic Chemistry Hub",
  description:
    "Design and export precise electron-pair and fishhook curved-arrow coordinates for organic reaction mechanisms.",
};

export default function CurvedArrowDesignerPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/lab"
          className="font-semibold text-violet-700 transition hover:text-violet-900"
        >
          ← Back to Lab
        </Link>

        <div className="mt-6">
          <CurvedArrowDesigner />
        </div>
      </div>
    </main>
  );
}
