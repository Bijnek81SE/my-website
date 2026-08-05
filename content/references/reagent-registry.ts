import type { ReagentDefinition } from "./reference-types";

export const reagents: readonly ReagentDefinition[] = [
  {
    kind: "reagent", slug: "hydroxide", name: "Hydroxide", formula: "HO⁻", category: "Base",
    summary: "A strong base and useful oxygen nucleophile.", purpose: "Promotes substitution or elimination depending on substrate, solvent, and temperature.",
    selectivity: "Primary substrates often favour SN2; hindered substrates and heat favour elimination.", conditions: ["Aqueous or alcoholic solvent", "Temperature controls substitution/elimination balance"],
    limitations: ["Can cause competing elimination", "Not compatible with strongly acidic functionality"], safety: "Corrosive; avoid skin and eye contact.", alternatives: ["Alkoxides", "Water for milder nucleophilicity"],
    relatedReactions: [{ label: "SN2", href: "/lab/sn2-mechanism" }, { label: "E2", href: "/lab/e2-mechanism" }], keywords: ["base", "nucleophile", "OH", "substitution"],
  },
  {
    kind: "reagent", slug: "sulfuric-acid", name: "Sulfuric acid", formula: "H₂SO₄", category: "Acid",
    summary: "A strong Brønsted acid used to activate alkenes and oxygen-containing groups.", purpose: "Catalyses hydration and dehydration by proton transfer.",
    selectivity: "Acid-catalysed alkene hydration is usually Markovnikov and can rearrange.", conditions: ["Dilute aqueous acid for hydration", "Heat and concentrated acid for dehydration"],
    limitations: ["Carbocation rearrangements", "Strongly acidic conditions may damage sensitive groups"], safety: "Highly corrosive and strongly dehydrating.", alternatives: ["Phosphoric acid", "Oxymercuration for hydration without rearrangement"],
    relatedReactions: [{ label: "Hydration", href: "/lab/hydration" }], keywords: ["acid", "protonation", "hydration", "dehydration"],
  },
  {
    kind: "reagent", slug: "bromine", name: "Bromine", formula: "Br₂", category: "Electrophile",
    summary: "An electrophilic halogen source for alkene halogenation.", purpose: "Converts an alkene into a vicinal dibromide through a bromonium ion.",
    selectivity: "Anti addition with no carbocation rearrangement.", conditions: ["Inert solvent", "Avoid radical conditions unless desired"], limitations: ["Reactive toward many nucleophiles", "Poor selectivity in complex mixtures"],
    safety: "Toxic, corrosive, and volatile; use appropriate containment.", alternatives: ["NBS for allylic bromination", "Cl₂ for chlorination"],
    relatedReactions: [{ label: "Alkene halogenation", href: "/lab/halogenation" }], keywords: ["halogen", "bromonium", "anti addition", "alkene"],
  },
  {
    kind: "reagent", slug: "hydrogen-palladium", name: "Hydrogen with palladium", formula: "H₂, Pd", category: "Reducing agent",
    summary: "A catalytic system that reduces carbon–carbon multiple bonds.", purpose: "Hydrogenates alkenes to alkanes on a metal surface.",
    selectivity: "Typically syn delivery of hydrogen; other reducible groups may also react.", conditions: ["Hydrogen atmosphere", "Pd/C or related catalyst"], limitations: ["Catalyst poisoning", "May reduce multiple functional groups"],
    safety: "Hydrogen is flammable; catalysts can ignite when dry.", alternatives: ["Pt or Ni catalysts", "Diimide for metal-free alkene reduction"],
    relatedReactions: [{ label: "Hydrogenation", href: "/lab/hydrogenation" }], keywords: ["reduction", "catalyst", "hydrogenation", "syn"],
  },
  {
    kind: "reagent", slug: "borane-peroxide", name: "Borane / peroxide workup", formula: "1. BH₃  2. H₂O₂, OH⁻", category: "Electrophile",
    summary: "A two-stage system for anti-Markovnikov hydration of alkenes.", purpose: "Installs OH at the less substituted alkene carbon.",
    selectivity: "Anti-Markovnikov, syn addition, and no carbocation rearrangement.", conditions: ["Anhydrous hydroboration", "Basic peroxide oxidation"], limitations: ["Borane is moisture-sensitive", "Oxidative workup must be controlled"],
    safety: "Borane reagents can be pyrophoric; concentrated peroxide is hazardous.", alternatives: ["9-BBN for improved selectivity", "Oxymercuration for Markovnikov hydration"],
    relatedReactions: [{ label: "Hydroboration–oxidation", href: "/lab/hydroboration-oxidation" }], keywords: ["anti markovnikov", "syn", "alcohol", "alkene"],
  },
  {
    kind: "reagent", slug: "hbr-peroxide", name: "HBr with peroxide", formula: "HBr, ROOR", category: "Radical initiator",
    summary: "A radical-chain system for anti-Markovnikov addition of HBr to alkenes.", purpose: "Forms the less substituted alkyl bromide from an unsymmetrical alkene.",
    selectivity: "Anti-Markovnikov; not generally stereospecific.", conditions: ["Peroxide initiator", "Heat or light"], limitations: ["The peroxide effect is reliable for HBr, not HCl or HI", "Radical-sensitive groups may interfere"],
    safety: "Peroxides can be shock-sensitive; HBr is corrosive.", alternatives: ["Hydrohalogenation without peroxide for Markovnikov addition"],
    relatedReactions: [{ label: "Radical HBr addition", href: "/lab/radical-hbr-addition" }], keywords: ["radical", "peroxide", "anti markovnikov", "bromide"],
  },
];

const bySlug = new Map(reagents.map((entry) => [entry.slug, entry]));
export function getReagent(slug: string) { return bySlug.get(slug); }
