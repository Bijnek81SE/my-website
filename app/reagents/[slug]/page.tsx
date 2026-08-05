import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ReferenceDetails } from "@/components/references";
import { reagents, getReagent } from "@/content/references";
import { createPageMetadata } from "@/lib/seo";
export function generateStaticParams(){ return reagents.map(({slug}) => ({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{ const {slug}=await params; const entry=getReagent(slug); if(!entry) return {}; return createPageMetadata({title:`${entry.name} Reagent Guide`,description:entry.summary,path:`/reagents/${slug}`,keywords:entry.keywords}); }
export default async function Page({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const entry=getReagent(slug); if(!entry) notFound(); return <ReferenceDetails entry={entry}/>; }
