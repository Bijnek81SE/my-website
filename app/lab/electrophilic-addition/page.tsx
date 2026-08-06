import type { Metadata } from "next";
import { MechanismLabPage } from "@/components/chemistry/mechanism";
import { requireMechanism } from "@/content/mechanisms";
import { createPageMetadata } from "@/lib/seo";

const mechanism = requireMechanism("electrophilic-addition");

export const metadata: Metadata = createPageMetadata({
  title: mechanism.title,
  description: mechanism.description,
  path: mechanism.href,
});

export default function Page() {
  return <MechanismLabPage mechanismId="electrophilic-addition" />;
}
