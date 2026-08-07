# Mechanism Authoring System — Semantic Geometry Experiment

This experiment is additive only. It does not replace or edit the existing SN1, SN2, E1, E2, halogenation, or other mechanism players.

## Goal

Prove that electron-flow arrows can be derived from semantic chemistry anchors and family-specific geometry rules while preserving the existing polished canvases and `MechanismPlayerEngine`.

## Implemented proof families

- SN2: hydroxide lone pair -> electrophilic carbon; C-Br bond -> bromine; backside-attack geometry contract.
- E2: base lone pair -> beta-H; C-H bond -> C-C bond; C-Br bond -> bromine; anti-periplanar geometry contract.
- Alkene halogenation: alkene pi bond -> electrophilic bromine; Br-Br bond -> bromide; bromide lone pair -> bromonium carbon; bridge C-Br bond -> bridging bromine; anti-addition stereochemical contract.

The halogenation proof deliberately reuses the existing `HalogenationReactionCanvas`, `halogenationQuestions`, and `halogenationReactionData`. Its generated five-step sequence mirrors the trusted bromonium-ion mechanism rather than introducing a new renderer.

## Geometry calibration

Semantic anchors are derived from the same skeletal molecule definitions or explicit family scene anchors used by the trusted mechanism canvases. Family-specific curve tuning is stored as relative control-point offsets, so arrow endpoints remain chemically semantic while the rendered curves can match the established visual reference.

The geometry tests require generated arrow start/end/control points to remain within approximately one pixel of the trusted SN2, E2, and halogenation implementations.

## Safety rule

The generated version is experimental and lives at `/lab/mechanism-authoring-demo`. Existing mechanism routes remain the source of truth until generated output matches or exceeds their chemistry, geometry, visuals, interaction, and tests. No proven mechanism player is replaced merely because an authoring family exists.
