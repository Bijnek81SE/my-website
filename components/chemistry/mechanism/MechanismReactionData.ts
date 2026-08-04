import type { ElectrophilicAdditionPracticeTarget } from "./ElectrophilicAdditionReactionCanvas";
import type { HydrohalogenationPracticeTarget } from "./HydrohalogenationReactionCanvas";
import type { HydrationPracticeTarget } from "./HydrationReactionCanvas";
import type { HalogenationPracticeTarget } from "./HalogenationReactionCanvas";
import type { HydrogenationPracticeTarget } from "./HydrogenationReactionCanvas";
import type { HydroborationOxidationPracticeTarget } from "./HydroborationOxidationReactionCanvas";
import type { OxymercurationDemercurationPracticeTarget } from "./OxymercurationDemercurationReactionCanvas";
import type { RadicalHBrPracticeTarget } from "./RadicalHBrReactionCanvas";
import type { E1PracticeTarget } from "./E1ReactionCanvas";
import type { E2PracticeTarget } from "./E2ReactionCanvas";
import type { Sn1PracticeTarget } from "./Sn1ReactionCanvas";
import type { Sn2PracticeTarget } from "./Sn2ReactionCanvas";
import { defineReactionData } from "./ReactionDataEngine";

export const sn2ReactionData =
  defineReactionData<Sn2PracticeTarget>({
    id: "sn2",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-blue-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "sn2-oxygen",
        target: "oxygen",
        label: "Select the hydroxide oxygen",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 170,
          cy: 198,
          r: 48,
        },
      },
      {
        id: "sn2-carbon",
        target: "carbon",
        label: "Select the electrophilic carbon",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 386,
          cy: 198,
          r: 46,
        },
      },
      {
        id: "sn2-cbr",
        target: "carbon-bromine-bond",
        label: "Select the carbon bromine bond",
        scenes: ["reactants"],
        geometry: {
          shape: "line",
          x1: 410,
          y1: 198,
          x2: 472,
          y2: 198,
          strokeWidth: 34,
        },
      },
      {
        id: "sn2-bromine",
        target: "bromine",
        label: "Select the bromine leaving group",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 495,
          cy: 198,
          r: 44,
        },
      },
      {
        id: "sn2-product-bromide",
        target: "product-bromide",
        label: "Select the bromide product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 455,
          y: 155,
          width: 95,
          height: 85,
          rx: 18,
        },
      },
    ],
  });

export const sn1ReactionData =
  defineReactionData<Sn1PracticeTarget>({
    id: "sn1",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-violet-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "sn1-substrate",
        target: "tertiary-substrate",
        label: "Select the tertiary substrate",
        scenes: ["substrate"],
        geometry: {
          shape: "rect",
          x: 270,
          y: 118,
          width: 270,
          height: 174,
          rx: 20,
        },
      },
      {
        id: "sn1-cbr",
        target: "carbon-bromine-bond",
        label: "Select the carbon bromine bond",
        scenes: ["substrate"],
        geometry: {
          shape: "line",
          x1: 410,
          y1: 205,
          x2: 482,
          y2: 205,
          strokeWidth: 38,
        },
      },
      {
        id: "sn1-carbocation",
        target: "carbocation",
        label: "Select the tertiary carbocation",
        scenes: ["carbocation"],
        geometry: {
          shape: "rect",
          x: 250,
          y: 118,
          width: 235,
          height: 174,
          rx: 20,
        },
      },
      {
        id: "sn1-water-nucleophile",
        target: "water-nucleophile",
        label: "Select the water nucleophile",
        scenes: ["nucleophile"],
        geometry: {
          shape: "circle",
          cx: 122,
          cy: 195,
          r: 54,
        },
      },
      {
        id: "sn1-base-water",
        target: "base-water",
        label: "Select the water acting as a base",
        scenes: ["deprotonation"],
        geometry: {
          shape: "circle",
          cx: 118,
          cy: 274,
          r: 52,
        },
      },
      {
        id: "sn1-alcohol-product",
        target: "alcohol-product",
        label: "Select the tert-butanol product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 155,
          y: 120,
          width: 245,
          height: 175,
          rx: 20,
        },
      },
      {
        id: "sn1-bromide-product",
        target: "bromide-product",
        label: "Select the bromide product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 595,
          y: 165,
          width: 90,
          height: 82,
          rx: 18,
        },
      },
    ],
  });

export const e2ReactionData =
  defineReactionData<E2PracticeTarget>({
    id: "e2",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-orange-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "e2-base",
        target: "base",
        label: "Select the hydroxide base",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 125,
          cy: 190,
          r: 62,
        },
      },
      {
        id: "e2-beta-h",
        target: "beta-hydrogen",
        label: "Select the beta hydrogen",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 338,
          cy: 118,
          r: 38,
        },
      },
      {
        id: "e2-ch",
        target: "carbon-hydrogen-bond",
        label: "Select the beta carbon hydrogen bond",
        scenes: ["reactants"],
        geometry: {
          shape: "line",
          x1: 338,
          y1: 126,
          x2: 360,
          y2: 205,
          strokeWidth: 36,
        },
      },
      {
        id: "e2-cc",
        target: "carbon-carbon-bond",
        label: "Select the carbon carbon bond",
        scenes: ["reactants"],
        geometry: {
          shape: "line",
          x1: 360,
          y1: 205,
          x2: 455,
          y2: 205,
          strokeWidth: 36,
        },
      },
      {
        id: "e2-cbr",
        target: "carbon-bromine-bond",
        label: "Select the carbon bromine bond",
        scenes: ["reactants"],
        geometry: {
          shape: "line",
          x1: 455,
          y1: 205,
          x2: 486,
          y2: 294,
          strokeWidth: 38,
        },
      },
      {
        id: "e2-water",
        target: "water-product",
        label: "Select the water product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 65,
          y: 165,
          width: 120,
          height: 75,
          rx: 18,
        },
      },
      {
        id: "e2-alkene",
        target: "alkene-product",
        label: "Select the alkene product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 275,
          y: 115,
          width: 270,
          height: 175,
          rx: 18,
        },
      },
      {
        id: "e2-bromide",
        target: "bromide-product",
        label: "Select the bromide product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 610,
          y: 165,
          width: 105,
          height: 80,
          rx: 18,
        },
      },
    ],
  });

export const e1ReactionData =
  defineReactionData<E1PracticeTarget>({
    id: "e1",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-emerald-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "e1-substrate",
        target: "tertiary-substrate",
        label: "Select the tertiary substrate",
        scenes: ["substrate"],
        geometry: {
          shape: "rect",
          x: 265,
          y: 120,
          width: 275,
          height: 172,
          rx: 20,
        },
      },
      {
        id: "e1-cbr",
        target: "carbon-bromine-bond",
        label: "Select the carbon bromine bond",
        scenes: ["substrate"],
        geometry: {
          shape: "line",
          x1: 410,
          y1: 205,
          x2: 482,
          y2: 205,
          strokeWidth: 38,
        },
      },
      {
        id: "e1-carbocation",
        target: "carbocation",
        label: "Select the carbocation intermediate",
        scenes: ["carbocation"],
        geometry: {
          shape: "rect",
          x: 270,
          y: 120,
          width: 235,
          height: 172,
          rx: 20,
        },
      },
      {
        id: "e1-water",
        target: "water-base",
        label: "Select the water molecule acting as a base",
        scenes: ["deprotonation"],
        geometry: {
          shape: "circle",
          cx: 315,
          cy: 125,
          r: 48,
        },
      },
      {
        id: "e1-beta-h",
        target: "beta-hydrogen",
        label: "Select the beta hydrogen",
        scenes: ["deprotonation"],
        geometry: {
          shape: "circle",
          cx: 508,
          cy: 102,
          r: 40,
        },
      },
      {
        id: "e1-alkene",
        target: "alkene-product",
        label: "Select the alkene product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 105,
          y: 125,
          width: 285,
          height: 155,
          rx: 20,
        },
      },
      {
        id: "e1-bromide",
        target: "bromide-product",
        label: "Select the bromide product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 585,
          y: 160,
          width: 92,
          height: 85,
          rx: 18,
        },
      },
    ],
  });

export const electrophilicAdditionReactionData =
  defineReactionData<ElectrophilicAdditionPracticeTarget>({
    id: "electrophilic-addition",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-rose-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "electrophilic-addition-pi",
        target: "pi-bond",
        label: "Select the alkene pi bond",
        scenes: ["reactants"],
        geometry: {
          shape: "rect",
          x: 225,
          y: 148,
          width: 125,
          height: 100,
          rx: 18,
        },
      },
      {
        id: "electrophilic-addition-internal-carbon",
        target: "internal-carbon",
        label: "Select the internal alkene carbon",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 253,
          cy: 184,
          r: 46,
        },
      },
      {
        id: "electrophilic-addition-terminal-carbon",
        target: "terminal-carbon",
        label: "Select the terminal alkene carbon",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 339,
          cy: 227,
          r: 48,
        },
      },
      {
        id: "electrophilic-addition-hydrogen",
        target: "electrophilic-hydrogen",
        label: "Select the electrophilic hydrogen",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 550,
          cy: 198,
          r: 40,
        },
      },
      {
        id: "electrophilic-addition-carbocation",
        target: "internal-carbocation",
        label: "Select the secondary carbocation center",
        scenes: ["carbocation"],
        geometry: {
          shape: "circle",
          cx: 350,
          cy: 195,
          r: 92,
        },
      },
      {
        id: "electrophilic-addition-attack-carbon",
        target: "internal-carbon",
        label: "Select the positively charged internal carbon",
        scenes: ["bromide-attack"],
        geometry: {
          shape: "circle",
          cx: 350,
          cy: 195,
          r: 92,
        },
      },
      {
        id: "electrophilic-addition-bromide",
        target: "bromide",
        label: "Select the bromide ion",
        scenes: ["carbocation", "bromide-attack"],
        geometry: {
          shape: "circle",
          cx: 585,
          cy: 198,
          r: 58,
        },
      },
      {
        id: "electrophilic-addition-product",
        target: "markovnikov-product",
        label: "Select 2-bromopropane, the Markovnikov product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 35,
          y: 105,
          width: 330,
          height: 175,
          rx: 22,
        },
      },
      {
        id: "electrophilic-addition-wrong-product",
        target: "anti-markovnikov-product",
        label: "Select 1-bromopropane",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 395,
          y: 105,
          width: 330,
          height: 175,
          rx: 22,
        },
      },
    ],
  });

export const hydrohalogenationReactionData =
  defineReactionData<HydrohalogenationPracticeTarget>({
    id: "hydrohalogenation",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-cyan-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "hydrohalogenation-pi",
        target: "pi-bond",
        label: "Select the alkene pi bond",
        scenes: ["reactants"],
        geometry: {
          shape: "rect",
          x: 315,
          y: 158,
          width: 125,
          height: 82,
          rx: 18,
        },
      },
      {
        id: "hydrohalogenation-terminal",
        target: "terminal-carbon",
        label: "Select the terminal alkene carbon",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 406,
          cy: 195,
          r: 48,
        },
      },
      {
        id: "hydrohalogenation-hydrogen",
        target: "electrophilic-hydrogen",
        label: "Select the electrophilic hydrogen",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 550,
          cy: 198,
          r: 40,
        },
      },
      {
        id: "hydrohalogenation-carbocation",
        target: "tertiary-carbocation",
        label: "Select the tertiary carbocation",
        scenes: ["carbocation"],
        geometry: {
          shape: "circle",
          cx: 350,
          cy: 198,
          r: 108,
        },
      },
      {
        id: "hydrohalogenation-chloride",
        target: "chloride",
        label: "Select the chloride ion",
        scenes: ["carbocation", "halide-attack"],
        geometry: {
          shape: "circle",
          cx: 585,
          cy: 198,
          r: 58,
        },
      },
      {
        id: "hydrohalogenation-product",
        target: "markovnikov-product",
        label: "Select 2-chloro-2-methylpropane",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 35,
          y: 92,
          width: 330,
          height: 200,
          rx: 22,
        },
      },
      {
        id: "hydrohalogenation-wrong-product",
        target: "wrong-product",
        label: "Select 1-chloro-2-methylpropane",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 395,
          y: 92,
          width: 330,
          height: 200,
          rx: 22,
        },
      },
    ],
  });

export const hydrationReactionData =
  defineReactionData<HydrationPracticeTarget>({
    id: "hydration",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-blue-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "hydration-pi",
        target: "pi-bond",
        label: "Select the alkene pi bond",
        scenes: ["reactants"],
        geometry: {
          shape: "rect",
          x: 205,
          y: 148,
          width: 130,
          height: 102,
          rx: 18,
        },
      },
      {
        id: "hydration-terminal",
        target: "terminal-carbon",
        label: "Select the terminal alkene carbon",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 310,
          cy: 226,
          r: 48,
        },
      },
      {
        id: "hydration-carbocation",
        target: "secondary-carbocation",
        label: "Select the secondary carbocation",
        scenes: ["carbocation"],
        geometry: {
          shape: "circle",
          cx: 350,
          cy: 195,
          r: 94,
        },
      },
      {
        id: "hydration-water-nucleophile",
        target: "water-nucleophile",
        label: "Select the water nucleophile",
        scenes: ["water-attack"],
        geometry: {
          shape: "circle",
          cx: 585,
          cy: 195,
          r: 54,
        },
      },
      {
        id: "hydration-oxonium",
        target: "oxonium-ion",
        label: "Select the oxonium ion",
        scenes: ["oxonium"],
        geometry: {
          shape: "rect",
          x: 265,
          y: 120,
          width: 250,
          height: 155,
          rx: 22,
        },
      },
      {
        id: "hydration-water-base",
        target: "water-base",
        label: "Select the water molecule acting as a base",
        scenes: ["deprotonation"],
        geometry: {
          shape: "circle",
          cx: 112,
          cy: 205,
          r: 52,
        },
      },
      {
        id: "hydration-product",
        target: "markovnikov-alcohol",
        label: "Select 2-propanol",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 35,
          y: 100,
          width: 330,
          height: 185,
          rx: 22,
        },
      },
      {
        id: "hydration-wrong-product",
        target: "wrong-alcohol",
        label: "Select 1-propanol",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 395,
          y: 100,
          width: 330,
          height: 185,
          rx: 22,
        },
      },
    ],
  });

export const halogenationReactionData =
  defineReactionData<HalogenationPracticeTarget>({
    id: "halogenation",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-violet-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "halogenation-pi",
        target: "pi-bond",
        label: "Select the alkene pi bond",
        scenes: ["reactants"],
        geometry: {
          shape: "rect",
          x: 180,
          y: 125,
          width: 140,
          height: 130,
          rx: 20,
        },
      },
      {
        id: "halogenation-electrophilic-br",
        target: "electrophilic-bromine",
        label: "Select the electrophilic bromine",
        scenes: ["reactants"],
        geometry: {
          shape: "circle",
          cx: 515,
          cy: 194,
          r: 48,
        },
      },
      {
        id: "halogenation-bromonium",
        target: "bromonium-ion",
        label: "Select the bromonium ion",
        scenes: ["bromonium"],
        geometry: {
          shape: "circle",
          cx: 285,
          cy: 195,
          r: 108,
        },
      },
      {
        id: "halogenation-bromide",
        target: "bromide",
        label: "Select the bromide ion",
        scenes: ["bromonium", "bromide-attack"],
        geometry: {
          shape: "circle",
          cx: 585,
          cy: 198,
          r: 58,
        },
      },
      {
        id: "halogenation-backside",
        target: "backside-carbon",
        label: "Select the carbon attacked from the backside",
        scenes: ["bromide-attack"],
        geometry: {
          shape: "circle",
          cx: 345,
          cy: 220,
          r: 48,
        },
      },
      {
        id: "halogenation-anti-product",
        target: "anti-product",
        label: "Select the anti addition product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 35,
          y: 78,
          width: 330,
          height: 220,
          rx: 22,
        },
      },
      {
        id: "halogenation-syn-product",
        target: "syn-product",
        label: "Select the syn addition product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 395,
          y: 78,
          width: 330,
          height: 220,
          rx: 22,
        },
      },
    ],
  });

export const hydrogenationReactionData =
  defineReactionData<HydrogenationPracticeTarget>({
    id: "hydrogenation",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-emerald-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "hydrogenation-pi",
        target: "pi-bond",
        label: "Select the alkene pi bond",
        scenes: ["reactants"],
        geometry: {
          shape: "rect",
          x: 165,
          y: 125,
          width: 135,
          height: 130,
          rx: 20,
        },
      },
      {
        id: "hydrogenation-h2",
        target: "hydrogen-molecule",
        label: "Select the hydrogen molecule",
        scenes: ["reactants"],
        geometry: {
          shape: "rect",
          x: 460,
          y: 155,
          width: 125,
          height: 85,
          rx: 18,
        },
      },
      {
        id: "hydrogenation-catalyst",
        target: "catalyst-surface",
        label: "Select the platinum catalyst surface",
        scenes: ["activated-hydrogen"],
        geometry: {
          shape: "line",
          x1: 70,
          y1: 310,
          x2: 690,
          y2: 310,
          strokeWidth: 38,
        },
      },
      {
        id: "hydrogenation-syn-hydrogens",
        target: "same-face-hydrogens",
        label:
          "Select the two hydrogens delivered from the same face",
        scenes: ["syn-addition"],
        geometry: {
          shape: "rect",
          x: 270,
          y: 225,
          width: 220,
          height: 80,
          rx: 18,
        },
      },
      {
        id: "hydrogenation-product",
        target: "alkane-product",
        label: "Select cyclohexane, the saturated product",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 35,
          y: 80,
          width: 330,
          height: 215,
          rx: 22,
        },
      },
      {
        id: "hydrogenation-unchanged",
        target: "unchanged-alkene",
        label: "Select the unchanged cyclohexene",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 395,
          y: 80,
          width: 330,
          height: 215,
          rx: 22,
        },
      },
    ],
  });

export const hydroborationOxidationReactionData =
  defineReactionData<HydroborationOxidationPracticeTarget>({
    id: "hydroboration-oxidation",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-cyan-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "hydroboration-pi",
        target: "pi-bond",
        label: "Select the alkene pi bond",
        scenes: ["reactants"],
        geometry: {
          shape: "rect",
          x: 190,
          y: 142,
          width: 140,
          height: 108,
          rx: 18,
        },
      },
      {
        id: "hydroboration-terminal",
        target: "terminal-carbon",
        label: "Select the terminal carbon that receives boron",
        scenes: ["hydroboration"],
        geometry: {
          shape: "circle",
          cx: 294,
          cy: 226,
          r: 48,
        },
      },
      {
        id: "hydroboration-organoborane",
        target: "organoborane-intermediate",
        label: "Select the organoborane intermediate",
        scenes: ["organoborane"],
        geometry: {
          shape: "circle",
          cx: 380,
          cy: 192,
          r: 120,
        },
      },
      {
        id: "hydroboration-cb",
        target: "carbon-boron-bond",
        label: "Select the carbon boron bond replaced during oxidation",
        scenes: ["oxidation"],
        geometry: {
          shape: "line",
          x1: 347,
          y1: 221,
          x2: 410,
          y2: 184,
          strokeWidth: 38,
        },
      },
      {
        id: "hydroboration-anti-product",
        target: "anti-markovnikov-alcohol",
        label: "Select the anti-Markovnikov alcohol",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 35,
          y: 88,
          width: 330,
          height: 205,
          rx: 22,
        },
      },
      {
        id: "hydroboration-mark-product",
        target: "markovnikov-alcohol",
        label: "Select the Markovnikov alcohol",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 395,
          y: 88,
          width: 330,
          height: 205,
          rx: 22,
        },
      },
    ],
  });

export const oxymercurationDemercurationReactionData =
  defineReactionData<OxymercurationDemercurationPracticeTarget>({
    id: "oxymercuration-demercuration",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-violet-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "oxymercuration-pi",
        target: "pi-bond",
        label: "Select the alkene pi bond",
        scenes: ["reactants"],
        geometry: {
          shape: "rect",
          x: 245,
          y: 150,
          width: 120,
          height: 100,
          rx: 18,
        },
      },
      {
        id: "oxymercuration-mercurinium",
        target: "mercurinium-ion",
        label: "Select the bridged mercurinium ion",
        scenes: ["mercurinium"],
        geometry: {
          shape: "rect",
          x: 250,
          y: 95,
          width: 220,
          height: 190,
          rx: 22,
        },
      },
      {
        id: "oxymercuration-water",
        target: "water-nucleophile",
        label: "Select the water nucleophile",
        scenes: ["water-attack"],
        geometry: {
          shape: "circle",
          cx: 575,
          cy: 182,
          r: 60,
        },
      },
      {
        id: "oxymercuration-internal-carbon",
        target: "internal-carbon",
        label: "Select the more substituted carbon",
        scenes: ["water-attack"],
        geometry: {
          shape: "circle",
          cx: 350,
          cy: 185,
          r: 52,
        },
      },
      {
        id: "oxymercuration-organomercury-internal-carbon",
        target: "internal-carbon",
        label: "Select the carbon bearing hydroxyl",
        scenes: ["organomercury"],
        geometry: {
          shape: "circle",
          cx: 305,
          cy: 185,
          r: 48,
        },
      },
      {
        id: "oxymercuration-c-hg",
        target: "carbon-mercury-bond",
        label: "Select the carbon mercury bond",
        scenes: ["demercuration"],
        geometry: {
          shape: "line",
          x1: 395,
          y1: 230,
          x2: 455,
          y2: 195,
          strokeWidth: 38,
        },
      },
      {
        id: "oxymercuration-markovnikov-product",
        target: "markovnikov-alcohol",
        label: "Select the Markovnikov alcohol",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 35,
          y: 92,
          width: 330,
          height: 190,
          rx: 22,
        },
      },
      {
        id: "oxymercuration-anti-product",
        target: "anti-markovnikov-alcohol",
        label: "Select the anti-Markovnikov alcohol",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 395,
          y: 92,
          width: 330,
          height: 190,
          rx: 22,
        },
      },
    ],
  });

export const radicalHBrReactionData =
  defineReactionData<RadicalHBrPracticeTarget>({
    id: "radical-hbr-addition",
    focusClassName:
      "cursor-pointer outline-none focus-visible:stroke-rose-600 focus-visible:stroke-[4]",
    hotspots: [
      {
        id: "radical-hbr-peroxide",
        target: "peroxide-bond",
        label: "Select the peroxide oxygen oxygen bond",
        scenes: ["initiation"],
        geometry: {
          shape: "line",
          x1: 300,
          y1: 190,
          x2: 460,
          y2: 190,
          strokeWidth: 34,
        },
      },
      {
        id: "radical-hbr-bromine-radical",
        target: "bromine-radical",
        label: "Select the bromine radical",
        scenes: ["bromine-radical"],
        geometry: {
          shape: "circle",
          cx: 620,
          cy: 190,
          r: 58,
        },
      },
      {
        id: "radical-hbr-terminal-carbon",
        target: "terminal-carbon",
        label: "Select the terminal alkene carbon",
        scenes: ["propagation-one"],
        geometry: {
          shape: "circle",
          cx: 345,
          cy: 220,
          r: 48,
        },
      },
      {
        id: "radical-hbr-carbon-radical",
        target: "carbon-radical",
        label: "Select the secondary carbon radical",
        scenes: ["radical-intermediate"],
        geometry: {
          shape: "circle",
          cx: 320,
          cy: 160,
          r: 62,
        },
      },
      {
        id: "radical-hbr-hbr",
        target: "hbr",
        label: "Select hydrogen bromide",
        scenes: ["propagation-two"],
        geometry: {
          shape: "rect",
          x: 560,
          y: 145,
          width: 150,
          height: 90,
          rx: 18,
        },
      },
      {
        id: "radical-hbr-anti-product",
        target: "anti-markovnikov-bromide",
        label: "Select the anti Markovnikov bromide",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 35,
          y: 92,
          width: 330,
          height: 190,
          rx: 22,
        },
      },
      {
        id: "radical-hbr-markovnikov-product",
        target: "markovnikov-bromide",
        label: "Select the Markovnikov bromide",
        scenes: ["products"],
        geometry: {
          shape: "rect",
          x: 395,
          y: 92,
          width: 330,
          height: 190,
          rx: 22,
        },
      },
    ],
  });