import type { Metadata } from "next";
import { ReferenceExplorer } from "@/components/references";
import { functionalGroups } from "@/content/references";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata({ title: "Functional Groups", description: "Searchable organic functional-group reference with recognition, bonding, polarity, and reaction links.", path: "/functional-groups", keywords: ["functional groups", "organic chemistry reference"] });
export default function Page(){ return <ReferenceExplorer entries={functionalGroups} title="Functional-group library" />; }
