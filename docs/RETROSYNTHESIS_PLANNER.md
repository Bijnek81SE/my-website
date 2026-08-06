# Retrosynthesis Planner

The Retrosynthesis Planner turns the existing forward-reaction registry into a student-facing reverse-synthesis workflow.

## Engine model

Each target molecule is a graph node. A retrosynthetic rule connects that product to one or more plausible precursors and records the forward reagents, mechanism route, selectivity constraints, reliability, difficulty, and risk.

The engine recursively expands applicable rules until it reaches an allowed starting material, a depth limit, a cycle, or a molecule with no known disconnection. It then ranks complete routes before incomplete routes and scores them using reliability, difficulty, risk, and route length.

## Student experience

Students choose a target problem, inspect allowed starting materials, compare ranked disconnections, reveal a strategic hint, and open the forward mechanism that validates each proposed step.

## Initial scope

The initial rule set covers hydroboration–oxidation, hydration, ionic and radical HBr addition, bromination, E2 elimination, SN2 substitution, and alcohol-to-bromide conversion. The architecture supports multi-precursor rules and deeper branching as the molecule registry expands.
