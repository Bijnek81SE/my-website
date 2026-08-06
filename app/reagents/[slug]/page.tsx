import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReferenceDetails } from "@/components/references";
import { getReagent, reagents } from "@/content/reagents";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return reagents.filter((reagent) => reagent.capabilities.reference).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getReagent(slug);
  if (!entry) return {};
  return createPageMetadata({
    title: `${entry.name} Reagent Guide`,
    description: entry.summary,
    path: `/reagents/${entry.slug}`,
    keywords: [...entry.aliases, ...entry.keywords],
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getReagent(slug);
  if (!entry || !entry.capabilities.reference) notFound();
  return <ReferenceDetails entry={entry} />;
}
