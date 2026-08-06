import Link from "next/link";
import { requireMechanism } from "@/content/mechanisms";
import { MechanismPlayerRenderer } from "./MechanismPlayerRegistry";

export default function MechanismLabPage({ mechanismId }: { mechanismId: string }) {
  const mechanism = requireMechanism(mechanismId);
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Link href="/lab" className="inline-flex font-semibold text-blue-700 transition hover:text-blue-900">
          ← Back to Lab
        </Link>
        <div className="mt-7">
          <MechanismPlayerRenderer playerId={mechanism.playerId} />
        </div>
      </div>
    </main>
  );
}
