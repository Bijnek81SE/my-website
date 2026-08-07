"use client";

import type { ComponentType } from "react";
import {
  AntiDihydroxylationMechanismPlayer,
  EpoxidationMechanismPlayer,
  OxidativeCleavageMechanismPlayer,
  OzonolysisMechanismPlayer,
  SynDihydroxylationMechanismPlayer,
} from "./AlkeneOxidationMechanismPlayer";
import E1MechanismPlayer from "./E1MechanismPlayer";
import E2MechanismPlayer from "./E2MechanismPlayer";
import ElectrophilicAdditionMechanismPlayer from "./ElectrophilicAdditionMechanismPlayer";
import HalogenationMechanismPlayer from "./HalogenationMechanismPlayer";
import HydrationMechanismPlayer from "./HydrationMechanismPlayer";
import HydroborationOxidationMechanismPlayer from "./HydroborationOxidationMechanismPlayer";
import HydrogenationMechanismPlayer from "./HydrogenationMechanismPlayer";
import HydrohalogenationMechanismPlayer from "./HydrohalogenationMechanismPlayer";
import OxymercurationDemercurationMechanismPlayer from "./OxymercurationDemercurationMechanismPlayer";
import RadicalHBrMechanismPlayer from "./RadicalHBrMechanismPlayer";
import Sn1MechanismPlayer from "./Sn1MechanismPlayer";
import Sn2MechanismPlayer from "./Sn2MechanismPlayer";

const mechanismPlayers: Readonly<Record<string, ComponentType>> = {
  sn1: Sn1MechanismPlayer,
  sn2: Sn2MechanismPlayer,
  e1: E1MechanismPlayer,
  e2: E2MechanismPlayer,
  "electrophilic-addition": ElectrophilicAdditionMechanismPlayer,
  hydrohalogenation: HydrohalogenationMechanismPlayer,
  hydration: HydrationMechanismPlayer,
  halogenation: HalogenationMechanismPlayer,
  hydrogenation: HydrogenationMechanismPlayer,
  "hydroboration-oxidation": HydroborationOxidationMechanismPlayer,
  "oxymercuration-demercuration": OxymercurationDemercurationMechanismPlayer,
  "radical-hbr": RadicalHBrMechanismPlayer,
  epoxidation: EpoxidationMechanismPlayer,
  "syn-dihydroxylation": SynDihydroxylationMechanismPlayer,
  "anti-dihydroxylation": AntiDihydroxylationMechanismPlayer,
  ozonolysis: OzonolysisMechanismPlayer,
  "oxidative-cleavage": OxidativeCleavageMechanismPlayer,
};

export function hasMechanismPlayer(playerId: string): boolean {
  return playerId in mechanismPlayers;
}

export function MechanismPlayerRenderer({ playerId }: { playerId: string }) {
  const Player = mechanismPlayers[playerId];
  if (!Player) throw new Error(`No mechanism player registered for: ${playerId}`);
  return <Player />;
}
