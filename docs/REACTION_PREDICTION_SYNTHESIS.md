# Reaction Prediction & Synthesis Engine

## Purpose

The Reaction Prediction & Synthesis Engine trains students to connect reagent conditions with mechanism, major-product structure, regioselectivity, stereochemistry, and synthetic planning.

## Public route

- `/lab/reaction-prediction`

## Prediction workflow

Each challenge asks the learner to make three independent decisions:

1. choose the reagent conditions;
2. select the major product;
3. choose the mechanistic explanation.

The engine scores each decision separately so a learner can distinguish reagent-recognition errors from product or mechanism errors.

## Synthesis planner

The planner uses a directed transformation graph. Only reactions compatible with the current structure are offered. Each rule records:

- starting structure;
- product structure;
- reagents;
- reaction family;
- mechanistic rationale.

A route is evaluated for target completion, step-limit compliance, and whether it matches the recommended efficient route.

## Current chemistry coverage

- ionic and radical HBr addition;
- acid hydration;
- hydroboration–oxidation;
- bromination;
- hydrogenation;
- SN1 and SN2 substitution;
- E1 and E2 elimination.

## Extension rules

When adding a prediction challenge, include plausible distractors and explain the specific misconception behind the wrong pathway. When adding a transformation, ensure its `fromStructureId` and `toStructureId` exist in the structure registry and add unit coverage for any new multi-step route.
