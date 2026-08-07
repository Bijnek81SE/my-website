# Workspace Project System

The Workspace Project System stores multiple independent chemistry work contexts in the browser. Each project owns its selected molecule, active registered tool, quantitative amount, notes, timestamps, and undo/redo history.

## Storage versions

- Version 1: one legacy Workspace document.
- Version 2: a collection with an active project and multiple project records.

The hydration layer migrates a stored version-one document into one version-two project automatically.

## Adding Workspace tools

Project management is independent of tool rendering. Add tools through the canonical Workspace tool registry and renderer registry. The project system stores the active tool ID without requiring a new project-manager branch.

## Import and export

A project export uses the format identifier `organic-chemistry-hub-workspace` and version `1`. Imported data is normalized against current molecule and Workspace tool registries, receives a new local ID, and cannot overwrite an existing project.
