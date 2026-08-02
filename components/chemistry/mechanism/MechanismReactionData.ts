import type { ElectrophilicAdditionPracticeTarget } from "./ElectrophilicAdditionReactionCanvas";
import type { HydrohalogenationPracticeTarget } from "./HydrohalogenationReactionCanvas";
import type { HydrationPracticeTarget } from "./HydrationReactionCanvas";
import type { HalogenationPracticeTarget } from "./HalogenationReactionCanvas";
import type { HydrogenationPracticeTarget } from "./HydrogenationReactionCanvas";
import type { E1PracticeTarget } from "./E1ReactionCanvas";
import type { E2PracticeTarget } from "./E2ReactionCanvas";
import type { Sn1PracticeTarget } from "./Sn1ReactionCanvas";
import type { Sn2PracticeTarget } from "./Sn2ReactionCanvas";
import { defineReactionData } from "./ReactionDataEngine";

export const sn2ReactionData = defineReactionData<Sn2PracticeTarget>({
  id: "sn2",
  focusClassName:
    "cursor-pointer outline-none focus-visible:stroke-blue-600 focus-visible:stroke-[4]",
  hotspots: [
    { id: "sn2-oxygen", target: "oxygen", label: "Select the hydroxide oxygen", scenes: ["reactants"], geometry: { shape: "circle", cx: 118, cy: 198, r: 58 } },
    { id: "sn2-carbon", target: "carbon", label: "Select the electrophilic carbon", scenes: ["reactants"], geometry: { shape: "circle", cx: 338, cy: 208, r: 54 } },
    { id: "sn2-cbr", target: "carbon-bromine-bond", label: "Select the carbon bromine bond", scenes: ["reactants"], geometry: { shape: "line", x1: 374, y1: 208, x2: 488, y2: 208, strokeWidth: 34 } },
    { id: "sn2-bromine", target: "bromine", label: "Select the bromine leaving group", scenes: ["reactants"], geometry: { shape: "circle", cx: 535, cy: 208, r: 54 } },
    { id: "sn2-product-bromide", target: "product-bromide", label: "Select the bromide product", scenes: ["products"], geometry: { shape: "rect", x: 445, y: 165, width: 115, height: 80, rx: 18 } },
  ],
});

export const sn1ReactionData = defineReactionData<Sn1PracticeTarget>({
  id: "sn1",
  focusClassName:
    "cursor-pointer outline-none focus-visible:stroke-violet-600 focus-visible:stroke-[4]",
  hotspots: [
    { id: "sn1-substrate", target: "tertiary-substrate", label: "Select the tertiary substrate", scenes: ["substrate"], geometry: { shape: "rect", x: 250, y: 160, width: 215, height: 95, rx: 18 } },
    { id: "sn1-cbr", target: "carbon-bromine-bond", label: "Select the carbon bromine bond", scenes: ["substrate"], geometry: { shape: "line", x1: 430, y1: 205, x2: 505, y2: 205, strokeWidth: 34 } },
    { id: "sn1-carbocation", target: "carbocation", label: "Select the tertiary carbocation", scenes: ["carbocation"], geometry: { shape: "rect", x: 280, y: 160, width: 230, height: 90, rx: 18 } },
    { id: "sn1-water-nucleophile", target: "water-nucleophile", label: "Select the water nucleophile", scenes: ["nucleophile"], geometry: { shape: "circle", cx: 120, cy: 190, r: 62 } },
    { id: "sn1-base-water", target: "base-water", label: "Select the water acting as a base", scenes: ["deprotonation"], geometry: { shape: "circle", cx: 120, cy: 270, r: 58 } },
    { id: "sn1-alcohol-product", target: "alcohol-product", label: "Select the tert-butanol product", scenes: ["products"], geometry: { shape: "rect", x: 170, y: 165, width: 245, height: 85, rx: 18 } },
    { id: "sn1-bromide-product", target: "bromide-product", label: "Select the bromide product", scenes: ["products"], geometry: { shape: "rect", x: 485, y: 170, width: 105, height: 75, rx: 18 } },
  ],
});

export const e2ReactionData = defineReactionData<E2PracticeTarget>({
  id: "e2",
  focusClassName:
    "cursor-pointer outline-none focus-visible:stroke-orange-600 focus-visible:stroke-[4]",
  hotspots: [
    { id: "e2-base", target: "base", label: "Select the hydroxide base", scenes: ["reactants"], geometry: { shape: "circle", cx: 170, cy: 190, r: 58 } },
    { id: "e2-beta-h", target: "beta-hydrogen", label: "Select the beta hydrogen", scenes: ["reactants"], geometry: { shape: "circle", cx: 315, cy: 172, r: 38 } },
    { id: "e2-ch", target: "carbon-hydrogen-bond", label: "Select the beta carbon hydrogen bond", scenes: ["reactants"], geometry: { shape: "line", x1: 331, y1: 180, x2: 385, y2: 200, strokeWidth: 32 } },
    { id: "e2-cc", target: "carbon-carbon-bond", label: "Select the carbon carbon bond", scenes: ["reactants"], geometry: { shape: "line", x1: 445, y1: 202, x2: 510, y2: 202, strokeWidth: 34 } },
    { id: "e2-cbr", target: "carbon-bromine-bond", label: "Select the carbon bromine bond", scenes: ["reactants"], geometry: { shape: "line", x1: 590, y1: 202, x2: 645, y2: 202, strokeWidth: 34 } },
    { id: "e2-water", target: "water-product", label: "Select the water product", scenes: ["products"], geometry: { shape: "rect", x: 100, y: 165, width: 145, height: 80, rx: 18 } },
    { id: "e2-alkene", target: "alkene-product", label: "Select the alkene product", scenes: ["products"], geometry: { shape: "rect", x: 315, y: 165, width: 245, height: 80, rx: 18 } },
    { id: "e2-bromide", target: "bromide-product", label: "Select the bromide product", scenes: ["products"], geometry: { shape: "rect", x: 625, y: 165, width: 105, height: 80, rx: 18 } },
  ],
});

export const e1ReactionData = defineReactionData<E1PracticeTarget>({
  id: "e1",
  focusClassName:
    "cursor-pointer outline-none focus-visible:stroke-emerald-600 focus-visible:stroke-[4]",
  hotspots: [
    { id: "e1-water", target: "water-base", label: "Select the water molecule acting as a base", scenes: ["deprotonation"], geometry: { shape: "rect", x: 50, y: 75, width: 100, height: 65, rx: 16 } },
    { id: "e1-substrate", target: "tertiary-substrate", label: "Select the tertiary substrate", scenes: ["substrate"], geometry: { shape: "rect", x: 225, y: 125, width: 420, height: 175, rx: 16 } },
    { id: "e1-cbr", target: "carbon-bromine-bond", label: "Select the carbon bromine bond", scenes: ["substrate"], geometry: { shape: "rect", x: 450, y: 178, width: 115, height: 55, rx: 16 } },
    { id: "e1-beta-h", target: "beta-hydrogen", label: "Select the beta hydrogen", scenes: ["deprotonation"], geometry: { shape: "rect", x: 335, y: 70, width: 85, height: 70, rx: 16 } },
    { id: "e1-carbocation", target: "carbocation", label: "Select the carbocation intermediate", scenes: ["carbocation"], geometry: { shape: "rect", x: 375, y: 170, width: 100, height: 85, rx: 16 } },
    { id: "e1-alkene", target: "alkene-product", label: "Select the alkene product", scenes: ["products"], geometry: { shape: "rect", x: 90, y: 160, width: 250, height: 85, rx: 16 } },
    { id: "e1-bromide", target: "bromide-product", label: "Select the bromide product", scenes: ["products"], geometry: { shape: "rect", x: 590, y: 160, width: 100, height: 85, rx: 16 } },
  ],
});

export const electrophilicAdditionReactionData =
  defineReactionData<ElectrophilicAdditionPracticeTarget>({
    id: "electrophilic-addition",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-rose-600 focus-visible:stroke-[4]",
    hotspots: [
      { id: "electrophilic-addition-pi", target: "pi-bond", label: "Select the alkene pi bond", scenes: ["reactants"], geometry: { shape: "rect", x: 280, y: 170, width: 105, height: 90, rx: 18 } },
      { id: "electrophilic-addition-internal-carbon", target: "internal-carbon", label: "Select the internal alkene carbon", scenes: ["reactants"], geometry: { shape: "circle", cx: 285, cy: 198, r: 48 } },
      { id: "electrophilic-addition-attack-carbon", target: "internal-carbon", label: "Select the positively charged internal carbon", scenes: ["bromide-attack"], geometry: { shape: "circle", cx: 345, cy: 198, r: 68 } },
      { id: "electrophilic-addition-terminal-carbon", target: "terminal-carbon", label: "Select the terminal alkene carbon", scenes: ["reactants"], geometry: { shape: "circle", cx: 368, cy: 220, r: 48 } },
      { id: "electrophilic-addition-hydrogen", target: "electrophilic-hydrogen", label: "Select the electrophilic hydrogen", scenes: ["reactants"], geometry: { shape: "circle", cx: 548, cy: 198, r: 40 } },
      { id: "electrophilic-addition-carbocation", target: "internal-carbocation", label: "Select the secondary carbocation center", scenes: ["carbocation"], geometry: { shape: "circle", cx: 345, cy: 198, r: 68 } },
      { id: "electrophilic-addition-bromide", target: "bromide", label: "Select the bromide ion", scenes: ["carbocation", "bromide-attack"], geometry: { shape: "circle", cx: 575, cy: 198, r: 55 } },
      { id: "electrophilic-addition-product", target: "markovnikov-product", label: "Select 2-bromopropane, the Markovnikov product", scenes: ["products"], geometry: { shape: "rect", x: 35, y: 115, width: 330, height: 150, rx: 22 } },
      { id: "electrophilic-addition-wrong-product", target: "anti-markovnikov-product", label: "Select 1-bromopropane", scenes: ["products"], geometry: { shape: "rect", x: 395, y: 115, width: 330, height: 150, rx: 22 } },
    ],
  });

export const hydrohalogenationReactionData =
  defineReactionData<HydrohalogenationPracticeTarget>({
    id: "hydrohalogenation",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-cyan-600 focus-visible:stroke-[4]",
    hotspots: [
      { id: "hydrohalogenation-pi", target: "pi-bond", label: "Select the alkene pi bond", scenes: ["reactants"], geometry: { shape: "rect", x: 305, y: 160, width: 140, height: 72, rx: 18 } },
      { id: "hydrohalogenation-terminal", target: "terminal-carbon", label: "Select the terminal alkene carbon", scenes: ["reactants"], geometry: { shape: "circle", cx: 465, cy: 198, r: 52 } },
      { id: "hydrohalogenation-hydrogen", target: "electrophilic-hydrogen", label: "Select the electrophilic hydrogen", scenes: ["reactants"], geometry: { shape: "circle", cx: 545, cy: 198, r: 38 } },
      { id: "hydrohalogenation-carbocation", target: "tertiary-carbocation", label: "Select the tertiary carbocation", scenes: ["carbocation"], geometry: { shape: "circle", cx: 350, cy: 198, r: 90 } },
      { id: "hydrohalogenation-chloride", target: "chloride", label: "Select the chloride ion", scenes: ["carbocation", "halide-attack"], geometry: { shape: "circle", cx: 575, cy: 198, r: 58 } },
      { id: "hydrohalogenation-product", target: "markovnikov-product", label: "Select 2-chloro-2-methylpropane", scenes: ["products"], geometry: { shape: "rect", x: 35, y: 110, width: 330, height: 160, rx: 22 } },
      { id: "hydrohalogenation-wrong-product", target: "wrong-product", label: "Select 1-chloro-2-methylpropane", scenes: ["products"], geometry: { shape: "rect", x: 395, y: 110, width: 330, height: 160, rx: 22 } },
    ],
  });


export const hydrationReactionData =
  defineReactionData<HydrationPracticeTarget>({
    id: "hydration",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-blue-600 focus-visible:stroke-[4]",
    hotspots: [
      { id: "hydration-pi", target: "pi-bond", label: "Select the alkene pi bond", scenes: ["reactants"], geometry: { shape: "rect", x: 215, y: 170, width: 110, height: 90, rx: 18 } },
      { id: "hydration-terminal", target: "terminal-carbon", label: "Select the terminal alkene carbon", scenes: ["reactants"], geometry: { shape: "circle", cx: 308, cy: 220, r: 50 } },
      { id: "hydration-carbocation", target: "secondary-carbocation", label: "Select the secondary carbocation", scenes: ["carbocation"], geometry: { shape: "circle", cx: 355, cy: 198, r: 92 } },
      { id: "hydration-water-nucleophile", target: "water-nucleophile", label: "Select the water nucleophile", scenes: ["water-attack"], geometry: { shape: "circle", cx: 585, cy: 198, r: 62 } },
      { id: "hydration-oxonium", target: "oxonium-ion", label: "Select the oxonium ion", scenes: ["oxonium"], geometry: { shape: "rect", x: 235, y: 145, width: 275, height: 110, rx: 20 } },
      { id: "hydration-water-base", target: "water-base", label: "Select the water molecule acting as a base", scenes: ["deprotonation"], geometry: { shape: "circle", cx: 105, cy: 198, r: 58 } },
      { id: "hydration-product", target: "markovnikov-alcohol", label: "Select 2-propanol", scenes: ["products"], geometry: { shape: "rect", x: 35, y: 108, width: 330, height: 165, rx: 22 } },
      { id: "hydration-wrong-product", target: "wrong-alcohol", label: "Select 1-propanol", scenes: ["products"], geometry: { shape: "rect", x: 395, y: 108, width: 330, height: 165, rx: 22 } },
    ],
  });


export const halogenationReactionData =
  defineReactionData<HalogenationPracticeTarget>({
    id: "halogenation",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-violet-600 focus-visible:stroke-[4]",
    hotspots: [
      { id: "halogenation-pi", target: "pi-bond", label: "Select the alkene pi bond", scenes: ["reactants"], geometry: { shape: "rect", x: 270, y: 158, width: 135, height: 72, rx: 18 } },
      { id: "halogenation-electrophilic-br", target: "electrophilic-bromine", label: "Select the electrophilic bromine", scenes: ["reactants"], geometry: { shape: "circle", cx: 520, cy: 198, r: 46 } },
      { id: "halogenation-bromonium", target: "bromonium-ion", label: "Select the bromonium ion", scenes: ["bromonium"], geometry: { shape: "rect", x: 175, y: 105, width: 170, height: 150, rx: 22 } },
      { id: "halogenation-bromide", target: "bromide", label: "Select the bromide ion", scenes: ["bromonium", "bromide-attack"], geometry: { shape: "circle", cx: 575, cy: 198, r: 58 } },
      { id: "halogenation-backside", target: "backside-carbon", label: "Select the carbon attacked from the backside", scenes: ["bromide-attack"], geometry: { shape: "circle", cx: 300, cy: 215, r: 52 } },
      { id: "halogenation-anti-product", target: "anti-product", label: "Select the anti addition product", scenes: ["products"], geometry: { shape: "rect", x: 35, y: 100, width: 330, height: 180, rx: 22 } },
      { id: "halogenation-syn-product", target: "syn-product", label: "Select the syn addition product", scenes: ["products"], geometry: { shape: "rect", x: 395, y: 100, width: 330, height: 180, rx: 22 } },
    ],
  });

export const hydrogenationReactionData =
  defineReactionData<HydrogenationPracticeTarget>({
    id: "hydrogenation",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-emerald-600 focus-visible:stroke-[4]",
    hotspots: [
      { id: "hydrogenation-pi", target: "pi-bond", label: "Select the alkene pi bond", scenes: ["reactants"], geometry: { shape: "rect", x: 155, y: 125, width: 105, height: 95, rx: 18 } },
      { id: "hydrogenation-h2", target: "hydrogen-molecule", label: "Select the hydrogen molecule", scenes: ["reactants"], geometry: { shape: "rect", x: 500, y: 165, width: 120, height: 70, rx: 18 } },
      { id: "hydrogenation-catalyst", target: "catalyst-surface", label: "Select the platinum catalyst surface", scenes: ["activated-hydrogen"], geometry: { shape: "line", x1: 85, y1: 300, x2: 675, y2: 300, strokeWidth: 34 } },
      { id: "hydrogenation-syn-hydrogens", target: "same-face-hydrogens", label: "Select the two hydrogens delivered from the same face", scenes: ["syn-addition"], geometry: { shape: "rect", x: 250, y: 220, width: 260, height: 75, rx: 18 } },
      { id: "hydrogenation-product", target: "alkane-product", label: "Select cyclohexane, the saturated product", scenes: ["products"], geometry: { shape: "rect", x: 35, y: 105, width: 330, height: 170, rx: 22 } },
      { id: "hydrogenation-unchanged", target: "unchanged-alkene", label: "Select the unchanged cyclohexene", scenes: ["products"], geometry: { shape: "rect", x: 395, y: 105, width: 330, height: 170, rx: 22 } },
    ],
  });
