"use client";

import { useMemo, useState } from "react";
import AlkeneOxidationReactionCanvas, {
  type AlkeneOxidationMechanismId,
} from "./AlkeneOxidationReactionCanvas";

type MechanismStep = {
  title: string;
  electronFlow: string;
  structuralChange: string;
  selectivity: string;
};

type MechanismProfile = {
  title: string;
  subtitle: string;
  reagents: string;
  overall: string;
  examFocus: string;
  steps: readonly MechanismStep[];
};

const profiles = {
  epoxidation: {
    title: "Alkene epoxidation with a peracid",
    subtitle: "Concerted oxygen transfer explains stereospecific epoxide formation without carbocation rearrangement.",
    reagents: "mCPBA (or another peracid)",
    overall: "C=C + RCO3H → epoxide + RCO2H",
    examFocus: "Preserve the alkene's relative stereochemistry: cis substituents remain cis in the epoxide and trans substituents remain trans.",
    steps: [
      {
        title: "Align the alkene π bond with the electrophilic peroxide oxygen",
        electronFlow: "The alkene π electrons attack the terminal peracid oxygen while the O–O bond begins to break.",
        structuralChange: "The first C–O bond begins forming as the oxidant accepts electron density from the alkene.",
        selectivity: "Both alkene carbons participate in the same transition state, so no free carbocation can rearrange.",
      },
      {
        title: "Complete the cyclic electron shift",
        electronFlow: "At the same time, the peroxide O–O bond breaks, the carbonyl oxygen accepts the acidic proton, and the second C–O bond forms.",
        structuralChange: "The C=C π bond is replaced by two C–O σ bonds that close the three-membered epoxide ring.",
        selectivity: "The concerted geometry preserves the starting alkene's relative stereochemistry.",
      },
      {
        title: "Separate epoxide and carboxylic acid products",
        electronFlow: "No further electron transfer is required after the single concerted oxygen-transfer event.",
        structuralChange: "The alkene has become an epoxide and the peracid has become the corresponding carboxylic acid.",
        selectivity: "No Markovnikov question applies because one oxygen bridges both alkene carbons.",
      },
    ],
  },
  "syn-dihydroxylation": {
    title: "Syn dihydroxylation with osmium tetroxide",
    subtitle: "Cyclic osmate-ester formation places both oxygen substituents on the same face of the alkene.",
    reagents: "OsO4, usually catalytic with a co-oxidant; aqueous workup",
    overall: "C=C → syn vicinal diol",
    examFocus: "Draw both OH groups on the same face. For cyclic alkenes this gives a cis-1,2-diol relationship.",
    steps: [
      {
        title: "The π bond engages OsO4 in a concerted addition",
        electronFlow: "The alkene donates into an osmium-oxygen unit while two Os–O bonds reorganize to form two new C–O bonds.",
        structuralChange: "Both alkene carbons become bonded to oxygen within a five-membered cyclic osmate ester.",
        selectivity: "Both C–O bonds form from the same face, locking in syn stereochemistry.",
      },
      {
        title: "Hydrolyse the cyclic osmate ester",
        electronFlow: "Water cleaves the C–O–Os connections and proton transfers convert the bound oxygens into alcohol groups.",
        structuralChange: "The cyclic intermediate opens to release the vicinal diol.",
        selectivity: "Hydrolysis does not scramble the stereochemistry established during cyclic addition.",
      },
      {
        title: "Regenerate osmium in catalytic variants",
        electronFlow: "A co-oxidant returns reduced osmium to the active oxidation state.",
        structuralChange: "Catalyst turnover allows a small amount of OsO4 to functionalise more than one equivalent of alkene.",
        selectivity: "The key stereochemical event remains the initial syn cyclic addition.",
      },
    ],
  },
  "anti-dihydroxylation": {
    title: "Anti dihydroxylation through an epoxide",
    subtitle: "Epoxidation followed by acid-catalysed backside ring opening produces an anti vicinal diol.",
    reagents: "1. mCPBA  2. H3O+, H2O",
    overall: "C=C → epoxide → anti vicinal diol",
    examFocus: "Separate the sequence into two ideas: stereospecific epoxide formation, then backside opening of the protonated epoxide.",
    steps: [
      {
        title: "Form the epoxide",
        electronFlow: "A peracid transfers oxygen to the alkene in the concerted epoxidation step.",
        structuralChange: "The planar alkene becomes a three-membered cyclic ether.",
        selectivity: "The epoxide preserves the starting alkene's relative stereochemistry.",
      },
      {
        title: "Protonate the epoxide oxygen",
        electronFlow: "The epoxide oxygen uses a lone pair to take a proton from hydronium.",
        structuralChange: "Protonation increases electrophilicity at both ring carbons and prepares the strained C–O bond for opening.",
        selectivity: "In an unsymmetrical protonated epoxide, nucleophilic attack commonly favours the more substituted carbon because positive character is better stabilised there.",
      },
      {
        title: "Water attacks from the backside",
        electronFlow: "Water attacks a ring carbon opposite the C–O bond while that C–O bond breaks back to oxygen.",
        structuralChange: "Backside opening places the incoming OH-derived group opposite the original epoxide oxygen substituent.",
        selectivity: "The attacked centre inverts, producing the anti relationship between the two OH groups after deprotonation.",
      },
    ],
  },
  ozonolysis: {
    title: "Reductive ozonolysis of an alkene",
    subtitle: "Ozone converts the double bond into peroxide-rich cyclic intermediates that are ultimately reduced to carbonyl fragments.",
    reagents: "1. O3  2. Zn/H2O (or another reductive workup)",
    overall: "C=C → two carbonyl fragments",
    examFocus: "For product prediction, cut the C=C and turn each alkene carbon into C=O; then ask whether each carbonyl is an aldehyde or ketone.",
    steps: [
      {
        title: "Ozone adds across the alkene",
        electronFlow: "The alkene and ozone undergo a 1,3-dipolar cycloaddition that forms an unstable primary ozonide (molozonide).",
        structuralChange: "The original C=C bond is incorporated into a five-membered peroxide-rich ring.",
        selectivity: "This step consumes the alkene geometry; E/Z information will not survive cleavage.",
      },
      {
        title: "The molozonide fragments and recombines",
        electronFlow: "The unstable primary ozonide breaks into a carbonyl fragment and a carbonyl oxide, which recombine to form the more stable ozonide.",
        structuralChange: "The carbon-carbon connectivity of the original double bond is prepared for complete cleavage.",
        selectivity: "Each alkene carbon is destined to become a carbonyl carbon.",
      },
      {
        title: "Reductive workup reveals aldehydes and ketones",
        electronFlow: "Zinc/water reduces peroxide bonds in the ozonide-derived intermediates.",
        structuralChange: "The original C=C bond is fully cleaved and each alkene carbon becomes C=O.",
        selectivity: "An alkene carbon bearing H gives an aldehyde under reductive workup; one bearing only carbon substituents gives a ketone.",
      },
    ],
  },
  "oxidative-cleavage": {
    title: "Oxidative cleavage with hot permanganate",
    subtitle: "Strong oxidation cleaves the alkene and then pushes oxidisable carbonyl fragments to higher oxidation states.",
    reagents: "Hot, concentrated KMnO4 followed by workup",
    overall: "C=C → ketones and/or carboxylic-acid oxidation products",
    examFocus: "After cutting the double bond, count hydrogens on each alkene carbon: none usually gives a ketone; one gives a carboxylic acid; terminal CH2 can be oxidised ultimately to CO2.",
    steps: [
      {
        title: "Permanganate oxidises the π bond",
        electronFlow: "The alkene transfers electron density to high-valent manganese while C–O bonds form through a cyclic manganate-type intermediate.",
        structuralChange: "The double bond is converted into highly oxidised vicinal carbon centres.",
        selectivity: "This is an oxidation pathway rather than a carbocation pathway, so classical rearrangements are not expected.",
      },
      {
        title: "The carbon-carbon bond is cleaved",
        electronFlow: "Further oxidation breaks the bond between the two former alkene carbons and generates carbonyl-level fragments.",
        structuralChange: "The two carbons that formed the alkene become separate oxidation products.",
        selectivity: "A fully substituted alkene carbon cannot be oxidised beyond the ketone without breaking additional C–C bonds.",
      },
      {
        title: "Oxidise fragments that still carry hydrogen",
        electronFlow: "Aldehyde-level fragments formed from alkene carbons bearing hydrogen are rapidly oxidised further under the vigorous conditions.",
        structuralChange: "Those fragments become carboxylic acids; terminal-formaldehyde-type fragments can continue to carbon dioxide.",
        selectivity: "The oxidation state of the final product reports how many hydrogens were attached to each starting alkene carbon.",
      },
    ],
  },
} as const satisfies Readonly<Record<string, MechanismProfile>>;

export default function AlkeneOxidationMechanismPlayer({
  mechanismId,
}: {
  mechanismId: AlkeneOxidationMechanismId;
}) {
  const profile = profiles[mechanismId];
  const [activeStep, setActiveStep] = useState(0);
  const step = profile.steps[activeStep];
  const progress = useMemo(
    () => `${activeStep + 1} of ${profile.steps.length}`,
    [activeStep, profile.steps.length],
  );

  return (
    <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl" aria-labelledby={`${mechanismId}-player-heading`}>
      <div className="border-b border-emerald-100 bg-emerald-50 p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Alkene mechanism player</p>
        <h1 id={`${mechanismId}-player-heading`} className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{profile.title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">{profile.subtitle}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Reagents</p>
            <p className="mt-1 font-semibold text-slate-900">{profile.reagents}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Overall transformation</p>
            <p className="mt-1 font-semibold text-slate-900">{profile.overall}</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">Mechanistic sequence</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">Step {progress}: {step.title}</h2>
          </div>
          <div className="flex gap-2" aria-label="Mechanism steps">
            {profile.steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-current={index === activeStep ? "step" : undefined}
                onClick={() => setActiveStep(index)}
                className={`h-10 min-w-10 rounded-full border px-3 text-sm font-bold transition ${index === activeStep ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-emerald-400"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <AlkeneOxidationReactionCanvas
          mechanismId={mechanismId}
          stepIndex={activeStep}
          stepTitle={step.title}
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">Electron flow</p>
            <p className="mt-2 leading-7 text-slate-700">{step.electronFlow}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-700">Structural change</p>
            <p className="mt-2 leading-7 text-slate-700">{step.structuralChange}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">Selectivity consequence</p>
            <p className="mt-2 leading-7 text-slate-700">{step.selectivity}</p>
          </article>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveStep((current) => Math.max(0, current - 1))}
            disabled={activeStep === 0}
            className="rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 disabled:opacity-40"
          >
            Previous step
          </button>
          <button
            type="button"
            onClick={() => setActiveStep((current) => Math.min(profile.steps.length - 1, current + 1))}
            disabled={activeStep === profile.steps.length - 1}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white disabled:opacity-40"
          >
            Next step
          </button>
        </div>

        <aside className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-800">Exam focus</p>
          <p className="mt-2 leading-7 text-amber-950">{profile.examFocus}</p>
        </aside>
      </div>
    </section>
  );
}

export function EpoxidationMechanismPlayer() {
  return <AlkeneOxidationMechanismPlayer mechanismId="epoxidation" />;
}

export function SynDihydroxylationMechanismPlayer() {
  return <AlkeneOxidationMechanismPlayer mechanismId="syn-dihydroxylation" />;
}

export function AntiDihydroxylationMechanismPlayer() {
  return <AlkeneOxidationMechanismPlayer mechanismId="anti-dihydroxylation" />;
}

export function OzonolysisMechanismPlayer() {
  return <AlkeneOxidationMechanismPlayer mechanismId="ozonolysis" />;
}

export function OxidativeCleavageMechanismPlayer() {
  return <AlkeneOxidationMechanismPlayer mechanismId="oxidative-cleavage" />;
}
