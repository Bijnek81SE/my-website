# Organic Chemistry Workspace

The workspace is a browser-local, persistent workbench at `/workspace` that keeps one molecule active while the learner moves through structure, spectroscopy, reaction planning, calculations, references, and notes.

## Design

- Curated molecule registry provides stable identities and links to existing engines.
- Workspace state is stored under `organic-chemistry-hub:workspace:v1`.
- Every meaningful edit is added to a bounded undo history.
- The workspace does not duplicate the flagship engines; it provides synchronized context and explicit handoffs to them.

## Published panels

- Overview: formula, condensed structure, functional group, molar mass, references.
- Spectra: linked curated spectroscopy dataset.
- Reaction: prediction/synthesis and mechanism handoffs.
- Calculations: amount-to-mass scaling with calculator links.
- Notes: automatically saved browser-local notebook.
