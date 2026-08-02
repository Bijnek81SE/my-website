import type { ElectrophilicAdditionPracticeTarget } from "./ElectrophilicAdditionReactionCanvas";
import type { HydrohalogenationPracticeTarget } from "./HydrohalogenationReactionCanvas";
import type { E1PracticeTarget } from "./E1ReactionCanvas";
import type { E2PracticeTarget } from "./E2ReactionCanvas";
import type { Sn1PracticeTarget } from "./Sn1ReactionCanvas";
import type { Sn2PracticeTarget } from "./Sn2ReactionCanvas";
import { defineMechanismQuestions } from "./QuestionEngine";

export const sn2Questions =
  defineMechanismQuestions<Sn2PracticeTarget>([
    {
      id: "identify-nucleophile",
      title: "Which species is the nucleophile?",
      description:
        "Identify the electron-rich species that donates an electron pair to the electrophilic carbon.",
      instruction:
        "Click the atom that belongs to the nucleophile.",
      correctTarget: "oxygen",
      incorrectFeedback:
        "Not quite. The nucleophile must be able to donate an electron pair.",
      correctExplanation:
        "Hydroxide is the nucleophile because oxygen donates a lone pair to the electrophilic carbon.",
      topic: "Nucleophiles and bases",
    },
    {
      id: "identify-arrow-source",
      title: "Where does the first curved arrow start?",
      description:
        "Curved arrows begin at electrons, such as a lone pair or a bond.",
      instruction:
        "Click the atom whose lone pair supplies the electrons.",
      correctTarget: "oxygen",
      incorrectFeedback:
        "Not quite. Look for the atom that owns the donating lone pair.",
      correctExplanation:
        "The first curved arrow starts at the oxygen lone pair. Those electrons form the new carbon–oxygen bond.",
      topic: "Curved arrows",
    },
    {
      id: "identify-breaking-bond",
      title: "Which bond breaks during the reaction?",
      description:
        "SN2 bond formation and bond breaking happen together in one concerted step.",
      instruction:
        "Click the bond whose electrons move onto the leaving group.",
      correctTarget: "carbon-bromine-bond",
      incorrectFeedback:
        "Not quite. Identify the bond connecting the electrophilic carbon to the leaving group.",
      correctExplanation:
        "The carbon–bromine bond breaks, and its electron pair moves onto bromine.",
      topic: "Bond changes",
    },
    {
      id: "identify-leaving-group-product",
      title: "Which product is the leaving group?",
      description:
        "The leaving group departs with the electron pair from its original bond.",
      instruction: "Click the leaving-group product.",
      correctTarget: "product-bromide",
      incorrectFeedback:
        "Not quite. The leaving group is the species that departed from carbon with the bonding electron pair.",
      correctExplanation:
        "Bromide is the leaving-group product. It leaves with the electron pair from the original C–Br bond.",
      topic: "Leaving groups",
    },
  ]);

export const sn1Questions =
  defineMechanismQuestions<Sn1PracticeTarget>([
    {
      id: "identify-tertiary-substrate",
      title: "Which structure is the tertiary substrate?",
      description:
        "Identify the carbon skeleton containing the carbon bonded to bromine.",
      instruction:
        "Click the tert-butyl portion of the substrate.",
      correctTarget: "tertiary-substrate",
      incorrectFeedback:
        "Not quite. Look for the carbon attached to three methyl groups and the leaving group.",
      correctExplanation:
        "tert-Butyl bromide is a tertiary substrate because the carbon bonded to bromine is attached to three carbon groups.",
      topic: "Mechanism fundamentals",
    },
    {
      id: "identify-ionising-bond",
      title: "Which bond breaks during ionisation?",
      description:
        "The rate-determining step begins when the leaving-group bond breaks heterolytically.",
      instruction:
        "Click the bond whose electrons move onto bromine.",
      correctTarget: "carbon-bromine-bond",
      incorrectFeedback:
        "Not quite. Select the bond between the tertiary carbon and bromine.",
      correctExplanation:
        "The carbon–bromine bond breaks heterolytically, and both bonding electrons move onto bromine.",
      topic: "Bond changes",
    },
    {
      id: "identify-carbocation",
      title: "Which species is the reaction intermediate?",
      description:
        "SN1 reactions contain a discrete, positively charged intermediate.",
      instruction: "Click the carbocation intermediate.",
      correctTarget: "carbocation",
      incorrectFeedback:
        "Not quite. Look for the positively charged carbon species.",
      correctExplanation:
        "The tertiary carbocation is the intermediate formed after bromide leaves.",
      topic: "Reaction intermediates",
    },
    {
      id: "identify-nucleophile",
      title: "Which species attacks the carbocation?",
      description:
        "The nucleophile donates a lone pair to the electron-deficient carbon.",
      instruction:
        "Click the water molecule acting as the nucleophile.",
      correctTarget: "water-nucleophile",
      incorrectFeedback:
        "Not quite. Look for the neutral species with a lone pair that can attack the carbocation.",
      correctExplanation:
        "Water acts as the nucleophile by donating a lone pair to the carbocation.",
      topic: "Nucleophiles and bases",
    },
    {
      id: "identify-base",
      title: "Which species removes the proton?",
      description:
        "The oxonium intermediate must lose a proton to form the neutral alcohol.",
      instruction:
        "Click the water molecule acting as a base.",
      correctTarget: "base-water",
      incorrectFeedback:
        "Not quite. Select the second water molecule that accepts the proton.",
      correctExplanation:
        "A second water molecule acts as a base and removes a proton from the oxonium intermediate.",
      topic: "Nucleophiles and bases",
    },
    {
      id: "identify-product",
      title: "Which species is the substitution product?",
      description:
        "Identify the neutral alcohol formed after deprotonation.",
      instruction: "Click the tert-butanol product.",
      correctTarget: "alcohol-product",
      incorrectFeedback:
        "Not quite. The substitution product is the alcohol formed when OH replaces bromine.",
      correctExplanation:
        "tert-Butanol is the substitution product because the hydroxyl group has replaced bromine.",
      topic: "Products",
    },
  ]);

export const e2Questions =
  defineMechanismQuestions<E2PracticeTarget>([
    {
      id: "identify-beta-hydrogen",
      title: "Which hydrogen can the base remove?",
      description:
        "The removable hydrogen must be on the β-carbon and anti-periplanar to the leaving group.",
      instruction:
        "Click the correctly aligned β-hydrogen.",
      correctTarget: "beta-hydrogen",
      incorrectFeedback:
        "Not quite. Look for the hydrogen on the carbon adjacent to the carbon bearing bromine.",
      correctExplanation:
        "This β-hydrogen is anti-periplanar to bromine, allowing the required orbital overlap for E2 elimination.",
      topic: "Mechanism fundamentals",
    },
    {
      id: "identify-base",
      title: "Which species removes the β-hydrogen?",
      description:
        "E2 reactions require a base that can abstract the β-hydrogen.",
      instruction: "Click the species acting as the base.",
      correctTarget: "base",
      incorrectFeedback:
        "Not quite. Select the electron-rich species that accepts the proton.",
      correctExplanation:
        "Hydroxide acts as the base by donating a lone pair to the β-hydrogen.",
      topic: "Nucleophiles and bases",
    },
    {
      id: "identify-alkene-product",
      title: "Which product contains the new π bond?",
      description:
        "The E2 reaction forms an alkene as the β-hydrogen and leaving group are removed.",
      instruction: "Click the alkene product.",
      correctTarget: "alkene-product",
      incorrectFeedback:
        "Not quite. Look for the product containing a carbon–carbon double bond.",
      correctExplanation:
        "The alkene is the elimination product formed when the new carbon–carbon π bond is created.",
      topic: "Products",
    },
  ]);

export const e1Questions =
  defineMechanismQuestions<E1PracticeTarget>([
    {
      id: "identify-tertiary-substrate",
      title: "Which structure is the tertiary substrate?",
      description:
        "Identify the alkyl halide whose carbon bearing bromine is attached to three carbon groups.",
      instruction: "Click the tertiary substrate.",
      correctTarget: "tertiary-substrate",
      incorrectFeedback:
        "Not quite. Look for the carbon bonded to bromine and three methyl groups.",
      correctExplanation:
        "tert-Butyl bromide is tertiary, so ionisation produces a relatively stable tertiary carbocation.",
      topic: "Mechanism fundamentals",
    },
    {
      id: "identify-ionising-bond",
      title: "Which bond breaks during ionisation?",
      description:
        "The slow first step forms the carbocation and the leaving-group anion.",
      instruction: "Click the bond that breaks heterolytically.",
      correctTarget: "carbon-bromine-bond",
      incorrectFeedback:
        "Not quite. Select the bond between the tertiary carbon and bromine.",
      correctExplanation:
        "The carbon–bromine bond breaks, and both bonding electrons move onto bromine.",
      topic: "Bond changes",
    },
    {
      id: "identify-carbocation",
      title: "Which species is the E1 intermediate?",
      description:
        "E1 elimination proceeds through a discrete positively charged intermediate.",
      instruction: "Click the carbocation intermediate.",
      correctTarget: "carbocation",
      incorrectFeedback:
        "Not quite. Look for the positively charged carbon after bromide leaves.",
      correctExplanation:
        "The tertiary carbocation is the intermediate shared by competing E1 and SN1 pathways.",
      topic: "Reaction intermediates",
    },
    {
      id: "identify-beta-hydrogen",
      title: "Which hydrogen is removed?",
      description:
        "The base removes a hydrogen from a carbon adjacent to the carbocation.",
      instruction: "Click the β-hydrogen.",
      correctTarget: "beta-hydrogen",
      incorrectFeedback:
        "Not quite. Choose a hydrogen on a carbon next to the positively charged carbon.",
      correctExplanation:
        "Removal of the β-hydrogen allows the C–H bond electrons to form the alkene π bond.",
      topic: "Nucleophiles and bases",
    },
    {
      id: "identify-alkene-product",
      title: "Which species is the elimination product?",
      description:
        "Identify the product containing the new carbon–carbon double bond.",
      instruction: "Click the alkene product.",
      correctTarget: "alkene-product",
      incorrectFeedback:
        "Not quite. Look for the neutral product containing a C=C bond.",
      correctExplanation:
        "2-Methylpropene is the E1 product formed after β-deprotonation of the carbocation.",
      topic: "Products",
    },
  ]);

export const electrophilicAdditionQuestions =
  defineMechanismQuestions<ElectrophilicAdditionPracticeTarget>([
    {
      id: "identify-pi-bond",
      title: "Which bond acts as the nucleophile?",
      description:
        "The electron-rich part of the alkene begins the electrophilic addition mechanism.",
      instruction: "Click the alkene π bond.",
      correctTarget: "pi-bond",
      incorrectFeedback:
        "Not quite. Look for the electron-rich carbon–carbon double bond.",
      correctExplanation:
        "The alkene π bond is the nucleophile because its electrons form the first new bond.",
      topic: "Nucleophiles and bases",
    },
    {
      id: "predict-protonation-carbon",
      title: "Which alkene carbon receives hydrogen?",
      description:
        "Choose the protonation direction that produces the more stable carbocation.",
      instruction: "Click the terminal carbon of the double bond.",
      correctTarget: "terminal-carbon",
      incorrectFeedback:
        "Not quite. Hydrogen should add so the positive charge forms on the more substituted carbon.",
      correctExplanation:
        "Hydrogen adds to the terminal carbon, leaving a secondary carbocation on the internal carbon.",
      topic: "Mechanism fundamentals",
    },
    {
      id: "predict-carbocation-location",
      title: "Which carbon bears the positive charge?",
      description:
        "Protonation of propene can formally place the positive charge on either alkene carbon, but one carbocation is more stable.",
      instruction: "Click the internal secondary carbocation center.",
      correctTarget: "internal-carbocation",
      incorrectFeedback:
        "Not quite. Choose the more substituted carbon, which gives the more stable secondary carbocation.",
      correctExplanation:
        "The positive charge is on the internal carbon, producing a secondary carbocation rather than a primary carbocation.",
      topic: "Reaction intermediates",
    },
    {
      id: "predict-bromide-attachment",
      title: "Where does bromide form the new bond?",
      description:
        "Bromide attacks the electron-deficient center of the carbocation intermediate.",
      instruction: "Click the internal carbon that receives bromide.",
      correctTarget: "internal-carbon",
      incorrectFeedback:
        "Not quite. Bromide attacks the carbon that carries the positive charge.",
      correctExplanation:
        "Bromide attaches to the internal carbon because that carbon is the carbocation center.",
      topic: "Bond changes",
    },
    {
      id: "predict-markovnikov-product",
      title: "Which product follows Markovnikov addition?",
      description:
        "Use the protonation direction and carbocation location to predict the final constitutional isomer.",
      instruction: "Click the product with bromine on the internal carbon.",
      correctTarget: "markovnikov-product",
      incorrectFeedback:
        "Not quite. Bromine should be on the more substituted carbon of the original double bond.",
      correctExplanation:
        "2-Bromopropane is the Markovnikov product because H adds to the terminal carbon and Br adds to the internal carbon.",
      topic: "Products",
    },
  ]);

export const hydrohalogenationQuestions =
  defineMechanismQuestions<HydrohalogenationPracticeTarget>([
    {
      id: "identify-pi-bond",
      title: "Which bond begins the reaction?",
      description:
        "Hydrohalogenation starts when the electron-rich alkene interacts with the acidic hydrogen of HX.",
      instruction: "Click the alkene π bond.",
      correctTarget: "pi-bond",
      incorrectFeedback:
        "Not quite. Look for the carbon–carbon double bond that can donate electrons.",
      correctExplanation:
        "The π bond is the nucleophile. Its electrons form the first new bond to hydrogen.",
      topic: "Nucleophiles and bases",
    },
    {
      id: "predict-protonation-carbon",
      title: "Which carbon receives hydrogen?",
      description:
        "Choose the protonation direction that produces the more stable carbocation intermediate.",
      instruction: "Click the terminal CH₂ carbon.",
      correctTarget: "terminal-carbon",
      incorrectFeedback:
        "Not quite. Hydrogen should add so the positive charge forms on the highly substituted carbon.",
      correctExplanation:
        "Hydrogen adds to the terminal carbon, leaving a tertiary carbocation on the internal carbon.",
      topic: "Mechanism fundamentals",
    },
    {
      id: "identify-tertiary-carbocation",
      title: "Which intermediate forms?",
      description:
        "The preferred protonation pathway gives the most stable carbocation available.",
      instruction: "Click the tertiary carbocation.",
      correctTarget: "tertiary-carbocation",
      incorrectFeedback:
        "Not quite. Look for the positively charged carbon bonded to three methyl groups.",
      correctExplanation:
        "The tert-butyl carbocation is tertiary and therefore much more stable than the alternative primary carbocation.",
      topic: "Reaction intermediates",
    },
    {
      id: "identify-halide-nucleophile",
      title: "Which species attacks the carbocation?",
      description:
        "After H–Cl bond cleavage, the halide ion attacks the electron-deficient carbon.",
      instruction: "Click the chloride ion.",
      correctTarget: "chloride",
      incorrectFeedback:
        "Not quite. Choose the negatively charged halide produced when the H–Cl bond breaks.",
      correctExplanation:
        "Chloride is the nucleophile. It donates a lone pair to the tertiary carbocation.",
      topic: "Nucleophiles and bases",
    },
    {
      id: "predict-markovnikov-product",
      title: "Which chloroalkane is formed?",
      description:
        "Use the protonation direction and carbocation stability to identify the major constitutional product.",
      instruction: "Click the Markovnikov product.",
      correctTarget: "markovnikov-product",
      incorrectFeedback:
        "Not quite. Chlorine should attach to the more substituted carbon of the original double bond.",
      correctExplanation:
        "2-Chloro-2-methylpropane is the Markovnikov product formed through the tertiary carbocation.",
      topic: "Products",
    },
  ]);
