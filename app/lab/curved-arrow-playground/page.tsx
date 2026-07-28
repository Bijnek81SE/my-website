import type { Metadata } from "next";
import Link from "next/link";
import CurvedArrowPlayground from "@/components/chemistry/CurvedArrowPlayground";

export const metadata: Metadata = {
  title: "Curved Arrow Playground | Organic Chemistry Hub",
  description: "Explore reusable curved electron-movement arrows for reaction mechanisms.",
};

export default function CurvedArrowPlaygroundPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link href="/lab" className="font-semibold text-blue-700 hover:text-blue-900">
          ← Back to Lab
        </Link>
        <div className="mt-6">
          <CurvedArrowPlayground />
        </div>
      </div>
    </main>
  );
}
