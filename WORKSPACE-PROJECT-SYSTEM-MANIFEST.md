# Workspace Project System

Phase 9 upgrades the Organic Chemistry Workspace from one browser-local snapshot to a persistent multi-project environment.

## Capabilities

- Multiple named projects
- Project switching, renaming, and deletion
- Project-scoped molecule, tool, calculations, and notes state
- Project-scoped undo and redo history
- Automatic migration from the version-one Workspace document
- JSON project export and import
- Defensive parsing and normalization
- Browser-local persistence under `organic-chemistry-hub:workspace:v2`

## Extension boundary

Workspace tools remain plugin-registered. Project storage contains generic snapshots, so adding a new tool does not require changing project-management UI. Tool-specific persistent data can be added later through versioned project document extensions and migrations.
