# Phase 12.1 Alkene mechanism graphics

Merge this overlay into the repository root.

This adds graphical electron-flow canvases to the five Phase 12.1 alkene oxidation mechanism labs:

- /lab/epoxidation
- /lab/syn-dihydroxylation
- /lab/anti-dihydroxylation
- /lab/ozonolysis
- /lab/oxidative-cleavage

The pre-existing SN1, SN2, E1, E2, electrophilic-addition, hydrohalogenation, hydration, halogenation, hydrogenation, hydroboration-oxidation, oxymercuration-demercuration, and radical-HBr players were audited and already use graphical reaction canvases.

After merging, run:

npm run lint
npm run test
npm run build
npm run test:e2e
