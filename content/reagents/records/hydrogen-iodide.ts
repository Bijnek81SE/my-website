import { defineReagent } from "../reagent-types";

export const hydrogenIodide = defineReagent({
  kind: "reagent",
  id: "hydrogen-iodide",
  slug: "hydrogen-iodide",
  name: "Hydrogen iodide",
  aliases: ["HI", "hydroiodic acid"],
  formula: "HI",
  category: "Acid",
  summary: "A very strong hydrogen halide that adds to alkenes by the classical ionic Markovnikov pathway.",
  purpose: "Protonates the alkene and supplies iodide to capture the carbocation intermediate.",
  selectivity: "Markovnikov with possible carbocation rearrangement; the peroxide effect is not a useful synthetic anti-Markovnikov pathway for HI.",
  conditions: ["Ionic hydrohalogenation conditions"],
  limitations: ["Iodide products can be reactive", "Peroxide does not provide the useful radical-chain regiochemical reversal observed with HBr"],
  safety: "Corrosive strong acid and reducing reagent; handle under appropriate containment.",
  alternativeNames: ["HBr", "HCl"],
  reactionIds: ["hydrohalogenation"],
  mechanismIds: ["hydrohalogenation"],
  moleculeIds: ["ethene", "propene", "2-methylpropene"],
  lessonIds: ["resonance", "formal-charge"],
  keywords: ["HI", "hydrohalogenation", "Markovnikov", "iodide", "carbocation"],
  capabilities: { reference: true, workspace: true, reactionExplorer: true, prediction: true, retrosynthesis: true },
});
