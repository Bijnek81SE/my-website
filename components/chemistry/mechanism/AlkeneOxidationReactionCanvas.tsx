"use client";

import type { ReactNode } from "react";
import { CyclohexeneStructure } from "../molecules";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import type { MechanismArrow } from "./types";

export type AlkeneOxidationMechanismId =
  | "epoxidation"
  | "syn-dihydroxylation"
  | "anti-dihydroxylation"
  | "ozonolysis"
  | "oxidative-cleavage";

type Props = {
  mechanismId: AlkeneOxidationMechanismId;
  stepIndex: number;
  stepTitle: string;
  animated?: boolean;
};

const ink = "#0f172a";
const muted = "#64748b";
const oxygen = "#dc2626";
const manganese = "#7c3aed";
const osmium = "#0f766e";
const highlight = "#059669";

function Bond({ x1, y1, x2, y2, width = 4, stroke = ink, dash }: { x1: number; y1: number; x2: number; y2: number; width?: number; stroke?: string; dash?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />;
}

function Label({ x, y, children, fill = ink, size = 18, weight = 700 }: { x: number; y: number; children: ReactNode; fill?: string; size?: number; weight?: number }) {
  return <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={weight} fill={fill}>{children}</text>;
}

function Plus({ x, y }: { x: number; y: number }) {
  return <Label x={x} y={y} size={28} fill={muted}>+</Label>;
}

function ReactionArrowGlyph({ x1, x2, y, label }: { x1: number; x2: number; y: number; label?: string }) {
  return (
    <g>
      <Bond x1={x1} y1={y} x2={x2 - 14} y2={y} width={3} stroke={muted} />
      <path d={`M ${x2 - 18} ${y - 8} L ${x2} ${y} L ${x2 - 18} ${y + 8}`} fill="none" stroke={muted} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {label ? <Label x={(x1 + x2) / 2} y={y - 14} size={13} fill={muted} weight={600}>{label}</Label> : null}
    </g>
  );
}

function Epoxide({ x, y, scale = 1, protonated = false }: { x: number; y: number; scale?: number; protonated?: boolean }) {
  const p = (value: number) => value * scale;
  return (
    <g transform={`translate(${x} ${y})`}>
      <Bond x1={p(-42)} y1={p(24)} x2={p(42)} y2={p(24)} />
      <Bond x1={p(-42)} y1={p(24)} x2={0} y2={p(-42)} />
      <Bond x1={p(42)} y1={p(24)} x2={0} y2={p(-42)} />
      <Label x={0} y={p(-51)} size={p(19)} fill={oxygen}>O{protonated ? "H⁺" : ""}</Label>
      <Bond x1={p(-42)} y1={p(24)} x2={p(-82)} y2={p(55)} />
      <Bond x1={p(42)} y1={p(24)} x2={p(82)} y2={p(55)} />
    </g>
  );
}

function VicinalDiol({ x, y, anti = false }: { x: number; y: number; anti?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Bond x1={-50} y1={20} x2={50} y2={20} />
      <Bond x1={-50} y1={20} x2={-95} y2={50} />
      <Bond x1={50} y1={20} x2={95} y2={50} />
      <Bond x1={-50} y1={20} x2={-50} y2={-42} stroke={oxygen} />
      <Label x={-50} y={-56} fill={oxygen}>OH</Label>
      {anti ? (
        <>
          <Bond x1={50} y1={20} x2={50} y2={78} stroke={oxygen} dash="7 5" />
          <Label x={50} y={101} fill={oxygen}>OH</Label>
          <Label x={0} y={132} size={14} fill={muted}>anti / trans relationship</Label>
        </>
      ) : (
        <>
          <Bond x1={50} y1={20} x2={50} y2={-42} stroke={oxygen} />
          <Label x={50} y={-56} fill={oxygen}>OH</Label>
          <Label x={0} y={100} size={14} fill={muted}>syn / cis relationship</Label>
        </>
      )}
    </g>
  );
}

function OsmateEster({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Bond x1={-55} y1={35} x2={55} y2={35} />
      <Bond x1={-55} y1={35} x2={-35} y2={-35} stroke={oxygen} />
      <Bond x1={55} y1={35} x2={35} y2={-35} stroke={oxygen} />
      <Label x={-35} y={-48} fill={oxygen}>O</Label>
      <Label x={35} y={-48} fill={oxygen}>O</Label>
      <Bond x1={-24} y1={-55} x2={-6} y2={-85} stroke={osmium} />
      <Bond x1={24} y1={-55} x2={6} y2={-85} stroke={osmium} />
      <Label x={0} y={-98} fill={osmium} size={21}>OsO₂</Label>
      <Label x={0} y={88} size={14} fill={muted}>cyclic osmate ester</Label>
    </g>
  );
}

function OzonideRing({ x, y, primary = false }: { x: number; y: number; primary?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M -62 20 L -30 -52 L 30 -52 L 62 20 L 0 64 Z" fill="#fff" stroke={ink} strokeWidth="4" strokeLinejoin="round" />
      <Label x={-31} y={-61} fill={oxygen}>O</Label>
      <Label x={31} y={-61} fill={oxygen}>O</Label>
      <Label x={0} y={82} fill={oxygen}>O</Label>
      <Label x={0} y={112} size={14} fill={muted}>{primary ? "molozonide" : "ozonide"}</Label>
    </g>
  );
}

function Carbonyl({ x, y, left = "R", right = "R", acid = false }: { x: number; y: number; left?: string; right?: string; acid?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Label x={0} y={8}>C</Label>
      <Bond x1={6} y1={-10} x2={6} y2={-68} stroke={oxygen} />
      <Bond x1={-4} y1={-10} x2={-4} y2={-68} stroke={oxygen} width={2.5} />
      <Label x={2} y={-83} fill={oxygen}>O</Label>
      <Bond x1={-15} y1={4} x2={-66} y2={36} />
      <Label x={-80} y={47} size={16}>{left}</Label>
      {acid ? (
        <>
          <Bond x1={17} y1={4} x2={64} y2={34} stroke={oxygen} />
          <Label x={84} y={46} fill={oxygen} size={16}>OH</Label>
        </>
      ) : (
        <>
          <Bond x1={17} y1={4} x2={64} y2={34} />
          <Label x={81} y={47} size={16}>{right}</Label>
        </>
      )}
    </g>
  );
}

function GenericAlkene({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Bond x1={-48} y1={6} x2={48} y2={6} />
      <Bond x1={-48} y1={-6} x2={48} y2={-6} width={2.5} stroke={highlight} />
      <Bond x1={-48} y1={0} x2={-94} y2={-38} />
      <Bond x1={-48} y1={0} x2={-94} y2={38} />
      <Bond x1={48} y1={0} x2={94} y2={-38} />
      <Bond x1={48} y1={0} x2={94} y2={38} />
      <Label x={-110} y={-44} size={15}>R¹</Label>
      <Label x={-110} y={50} size={15}>R²</Label>
      <Label x={111} y={-44} size={15}>R³</Label>
      <Label x={109} y={50} size={15}>H</Label>
    </g>
  );
}

function PermanganateEster({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Bond x1={-50} y1={30} x2={50} y2={30} />
      <Bond x1={-50} y1={30} x2={-30} y2={-35} stroke={oxygen} />
      <Bond x1={50} y1={30} x2={30} y2={-35} stroke={oxygen} />
      <Label x={-30} y={-48} fill={oxygen}>O</Label>
      <Label x={30} y={-48} fill={oxygen}>O</Label>
      <Bond x1={-18} y1={-57} x2={-5} y2={-82} stroke={manganese} />
      <Bond x1={18} y1={-57} x2={5} y2={-82} stroke={manganese} />
      <Label x={0} y={-96} fill={manganese}>MnO₂</Label>
      <Label x={0} y={82} size={14} fill={muted}>cyclic manganate-type intermediate</Label>
    </g>
  );
}

function EpoxidationScene({ stepIndex }: { stepIndex: number }) {
  const arrows: MechanismArrow[] = stepIndex === 0 ? [
    { id: "epox-pi-o", start: { x: 315, y: 190 }, control: { x: 380, y: 110 }, end: { x: 468, y: 170 }, colour: highlight, label: "π electrons attack electrophilic peroxide oxygen" },
    { id: "epox-oo", start: { x: 500, y: 178 }, control: { x: 545, y: 130 }, end: { x: 575, y: 182 }, colour: oxygen, label: "O–O bond breaks during concerted transfer" },
  ] : stepIndex === 1 ? [
    { id: "epox-close", start: { x: 375, y: 190 }, control: { x: 425, y: 105 }, end: { x: 455, y: 180 }, colour: highlight, label: "second carbon–oxygen bond closes the epoxide" },
  ] : [];

  return (
    <ReactionCanvasEngine viewBox="0 0 760 360" ariaLabel={`Epoxidation graphical mechanism, step ${stepIndex + 1}`} arrows={arrows}>
      {stepIndex === 0 ? <>
        <CyclohexeneStructure x={210} y={185} scale={0.95} highlightBond />
        <Plus x={370} y={190} />
        <g transform="translate(525 185)">
          <Label x={0} y={-12} fill={oxygen}>O–O</Label>
          <Label x={0} y={18} size={15}>mCPBA</Label>
          <Label x={0} y={44} size={13} fill={muted}>R–C(=O)–O–OH</Label>
        </g>
        <Label x={380} y={322} size={14} fill={muted}>Concerted oxygen transfer: no free carbocation</Label>
      </> : stepIndex === 1 ? <>
        <CyclohexeneStructure x={190} y={185} scale={0.88} highlightBond />
        <g opacity="0.85">
          <Bond x1={280} y1={160} x2={380} y2={110} stroke={oxygen} dash="8 6" />
          <Bond x1={280} y1={210} x2={380} y2={110} stroke={oxygen} dash="8 6" />
          <Label x={390} y={105} fill={oxygen}>O</Label>
        </g>
        <ReactionArrowGlyph x1={455} x2={540} y={185} label="single transition state" />
        <Epoxide x={625} y={180} scale={0.8} />
        <Label x={380} y={322} size={14} fill={muted}>Both C–O bonds form in the same stereospecific event</Label>
      </> : <>
        <Epoxide x={265} y={170} scale={1.05} />
        <Plus x={410} y={180} />
        <Carbonyl x={545} y={185} left="Ar" acid />
        <Label x={380} y={318} size={15} fill={highlight}>Epoxide + carboxylic acid</Label>
      </>}
    </ReactionCanvasEngine>
  );
}

function SynDihydroxylationScene({ stepIndex }: { stepIndex: number }) {
  const arrows: MechanismArrow[] = stepIndex === 0 ? [
    { id: "os-pi", start: { x: 310, y: 190 }, control: { x: 385, y: 105 }, end: { x: 475, y: 165 }, colour: highlight, label: "alkene π bond engages osmium–oxygen unit" },
  ] : stepIndex === 1 ? [
    { id: "water-hydrolysis", start: { x: 590, y: 125 }, control: { x: 525, y: 80 }, end: { x: 455, y: 145 }, colour: "#2563eb", label: "water hydrolyses the osmate ester" },
  ] : [];

  return (
    <ReactionCanvasEngine viewBox="0 0 760 360" ariaLabel={`Syn dihydroxylation graphical mechanism, step ${stepIndex + 1}`} arrows={arrows}>
      {stepIndex === 0 ? <>
        <CyclohexeneStructure x={215} y={190} scale={0.95} highlightBond />
        <Plus x={380} y={190} />
        <g transform="translate(525 180)"><Label x={0} y={0} fill={osmium} size={23}>OsO₄</Label><Label x={0} y={30} size={13} fill={muted}>same-face addition</Label></g>
        <Label x={380} y={320} size={14} fill={muted}>Two C–O bonds are established from one face of the alkene</Label>
      </> : stepIndex === 1 ? <>
        <OsmateEster x={300} y={195} />
        <Plus x={470} y={180} />
        <Label x={585} y={175} fill="#2563eb">H₂O</Label>
        <Label x={380} y={320} size={14} fill={muted}>Hydrolysis releases the stereochemistry already fixed in the cyclic ester</Label>
      </> : <>
        <VicinalDiol x={300} y={180} />
        <ReactionArrowGlyph x1={455} x2={555} y={180} label="co-oxidant" />
        <Label x={635} y={178} fill={osmium}>OsO₄</Label>
        <Label x={380} y={320} size={15} fill={highlight}>Syn vicinal diol; catalyst regenerated</Label>
      </>}
    </ReactionCanvasEngine>
  );
}

function AntiDihydroxylationScene({ stepIndex }: { stepIndex: number }) {
  const arrows: MechanismArrow[] = stepIndex === 1 ? [
    { id: "epox-protonate", start: { x: 365, y: 130 }, control: { x: 440, y: 70 }, end: { x: 515, y: 120 }, colour: oxygen, label: "epoxide oxygen lone pair takes H+" },
  ] : stepIndex === 2 ? [
    { id: "water-backside", start: { x: 180, y: 220 }, control: { x: 270, y: 110 }, end: { x: 355, y: 175 }, colour: "#2563eb", label: "water attacks from the backside" },
    { id: "co-break", start: { x: 400, y: 165 }, control: { x: 445, y: 100 }, end: { x: 420, y: 122 }, colour: oxygen, label: "C–O bond opens back to oxygen" },
  ] : [];

  return (
    <ReactionCanvasEngine viewBox="0 0 760 360" ariaLabel={`Anti dihydroxylation graphical mechanism, step ${stepIndex + 1}`} arrows={arrows}>
      {stepIndex === 0 ? <>
        <CyclohexeneStructure x={210} y={185} scale={0.95} highlightBond />
        <ReactionArrowGlyph x1={350} x2={455} y={185} label="mCPBA" />
        <Epoxide x={600} y={180} scale={0.9} />
        <Label x={380} y={320} size={14} fill={muted}>First make the stereospecific epoxide</Label>
      </> : stepIndex === 1 ? <>
        <Epoxide x={310} y={185} scale={1} />
        <Plus x={475} y={180} />
        <Label x={565} y={178} fill="#2563eb">H₃O⁺</Label>
        <ReactionArrowGlyph x1={600} x2={670} y={180} />
        <Label x={380} y={320} size={14} fill={muted}>Protonation activates the strained ring for nucleophilic opening</Label>
      </> : <>
        <Label x={120} y={210} fill="#2563eb">H₂O</Label>
        <Epoxide x={390} y={185} scale={0.95} protonated />
        <ReactionArrowGlyph x1={505} x2={565} y={185} />
        <VicinalDiol x={635} y={175} anti />
        <Label x={380} y={330} size={14} fill={muted}>Backside opening inverts the attacked carbon and gives anti OH groups</Label>
      </>}
    </ReactionCanvasEngine>
  );
}

function OzonolysisScene({ stepIndex }: { stepIndex: number }) {
  const arrows: MechanismArrow[] = stepIndex === 0 ? [
    { id: "ozone-add", start: { x: 300, y: 180 }, control: { x: 380, y: 100 }, end: { x: 470, y: 165 }, colour: highlight, label: "π bond reacts with ozone in a 1,3-dipolar cycloaddition" },
  ] : [];

  return (
    <ReactionCanvasEngine viewBox="0 0 760 360" ariaLabel={`Ozonolysis graphical mechanism, step ${stepIndex + 1}`} arrows={arrows}>
      {stepIndex === 0 ? <>
        <GenericAlkene x={215} y={185} />
        <Plus x={385} y={185} />
        <Label x={505} y={175} fill={oxygen} size={23}>O₃</Label>
        <ReactionArrowGlyph x1={555} x2={635} y={185} />
        <OzonideRing x={665} y={175} primary />
        <Label x={380} y={325} size={14} fill={muted}>The alkene is trapped as an unstable peroxide-rich molozonide</Label>
      </> : stepIndex === 1 ? <>
        <OzonideRing x={210} y={175} primary />
        <ReactionArrowGlyph x1={315} x2={430} y={180} label="fragment + recombine" />
        <OzonideRing x={565} y={175} />
        <Label x={380} y={325} size={14} fill={muted}>Molozonide fragmentation and recombination gives the more stable ozonide</Label>
      </> : <>
        <OzonideRing x={180} y={170} />
        <ReactionArrowGlyph x1={285} x2={405} y={180} label="Zn / H₂O" />
        <Carbonyl x={500} y={185} left="R¹" right="R²" />
        <Plus x={610} y={185} />
        <Carbonyl x={685} y={185} left="R³" right="H" />
        <Label x={380} y={325} size={14} fill={highlight}>Cut the C=C: each alkene carbon becomes a carbonyl carbon</Label>
      </>}
    </ReactionCanvasEngine>
  );
}

function OxidativeCleavageScene({ stepIndex }: { stepIndex: number }) {
  const arrows: MechanismArrow[] = stepIndex === 0 ? [
    { id: "mno4-add", start: { x: 300, y: 180 }, control: { x: 375, y: 100 }, end: { x: 465, y: 160 }, colour: manganese, label: "permanganate oxidises the alkene through cyclic C–O bond formation" },
  ] : [];

  return (
    <ReactionCanvasEngine viewBox="0 0 760 360" ariaLabel={`Oxidative cleavage graphical mechanism, step ${stepIndex + 1}`} arrows={arrows}>
      {stepIndex === 0 ? <>
        <GenericAlkene x={210} y={185} />
        <Plus x={385} y={185} />
        <Label x={515} y={175} fill={manganese} size={21}>MnO₄⁻</Label>
        <ReactionArrowGlyph x1={570} x2={650} y={185} />
        <PermanganateEster x={665} y={188} />
        <Label x={380} y={325} size={14} fill={muted}>Strong oxidation first creates oxygenated vicinal carbon centres</Label>
      </> : stepIndex === 1 ? <>
        <PermanganateEster x={190} y={190} />
        <ReactionArrowGlyph x1={320} x2={440} y={185} label="further oxidation" />
        <Carbonyl x={520} y={190} left="R¹" right="R²" />
        <Plus x={620} y={185} />
        <Carbonyl x={690} y={190} left="R³" right="H" />
        <Label x={380} y={325} size={14} fill={muted}>C–C cleavage initially reaches the carbonyl oxidation level</Label>
      </> : <>
        <Carbonyl x={220} y={190} left="R¹" right="R²" />
        <Plus x={365} y={185} />
        <Carbonyl x={505} y={190} left="R³" acid />
        <Label x={380} y={292} size={16} fill={highlight}>ketone + carboxylic acid</Label>
        <Label x={380} y={323} size={14} fill={muted}>A carbonyl fragment that still bears H is oxidised beyond the aldehyde stage</Label>
      </>}
    </ReactionCanvasEngine>
  );
}

export default function AlkeneOxidationReactionCanvas({ mechanismId, stepIndex, stepTitle, animated = true }: Props) {
  const scene = mechanismId === "epoxidation"
    ? <EpoxidationScene stepIndex={stepIndex} />
    : mechanismId === "syn-dihydroxylation"
      ? <SynDihydroxylationScene stepIndex={stepIndex} />
      : mechanismId === "anti-dihydroxylation"
        ? <AntiDihydroxylationScene stepIndex={stepIndex} />
        : mechanismId === "ozonolysis"
          ? <OzonolysisScene stepIndex={stepIndex} />
          : <OxidativeCleavageScene stepIndex={stepIndex} />;

  return (
    <figure className="mt-6" aria-labelledby={`${mechanismId}-graphic-caption`}>
      {scene}
      <figcaption id={`${mechanismId}-graphic-caption`} className="mt-3 text-sm leading-6 text-slate-600">
        <span className="font-semibold text-slate-900">Graphical electron-flow view:</span> {stepTitle}. Curved arrows show electron-pair movement; dashed bonds indicate bonds being formed or broken in the depicted step.
        {!animated ? " Animation is paused." : ""}
      </figcaption>
    </figure>
  );
}
