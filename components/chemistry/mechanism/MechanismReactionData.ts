import type { ElectrophilicAdditionPracticeTarget } from "./ElectrophilicAdditionReactionCanvas";
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
      { id: "electrophilic-addition-pi", target: "pi-bond", label: "Select the alkene pi bond", scenes: ["reactants"], geometry: { shape: "rect", x: 285, y: 165, width: 120, height: 70, rx: 18 } },
      { id: "electrophilic-addition-hydrogen", target: "electrophilic-hydrogen", label: "Select the electrophilic hydrogen", scenes: ["reactants"], geometry: { shape: "circle", cx: 548, cy: 198, r: 40 } },
      { id: "electrophilic-addition-carbocation", target: "carbocation", label: "Select the secondary carbocation", scenes: ["carbocation"], geometry: { shape: "rect", x: 170, y: 160, width: 300, height: 90, rx: 18 } },
      { id: "electrophilic-addition-bromide", target: "bromide", label: "Select the bromide ion", scenes: ["carbocation"], geometry: { shape: "circle", cx: 575, cy: 198, r: 55 } },
      { id: "electrophilic-addition-product", target: "markovnikov-product", label: "Select the Markovnikov product", scenes: ["products"], geometry: { shape: "rect", x: 190, y: 160, width: 380, height: 90, rx: 18 } },
    ],
  });
