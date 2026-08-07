# Mechanism Authoring System Experiment

This experiment deliberately does **not** replace the existing mechanism players.

The goal is to prove a safer architecture:

1. A small structured reaction request is resolved to a supported mechanism family.
2. A family recipe compiles the pedagogical step sequence and electron-flow arrows.
3. The compiled definition is rendered by the existing `MechanismPlayerEngine`.
4. The existing trusted family canvases (`Sn2ReactionCanvas`, `E2ReactionCanvas`) remain responsible for visual chemistry quality.

The comparison route is:

`/lab/mechanism-system-2-demo`

Current proof families:

- SN2
- E2

The old production routes remain unchanged. The experiment should only be adopted if the generated versions preserve the visual and pedagogical quality of the originals.
