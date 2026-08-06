# Canonical Mechanism Registry

Milestone 4 of the Unified Chemistry Content & Extension Architecture.

## Source of truth

- `content/mechanisms/records/` contains one typed record per mechanism.
- `content/mechanisms/mechanism-registry.ts` provides indexed lookup.
- `content/mechanisms/mechanism-validation.ts` validates routes and relationships.
- `components/chemistry/mechanism/MechanismPlayerRegistry.tsx` connects content records to UI players.
- All mechanism route pages use the generic `MechanismLabPage` shell.

## Future addition workflow

1. Add one mechanism record.
2. Add or reuse a player implementation.
3. Register the player once.
4. Add the route and platform feature record if public.
5. Add focused chemistry tests.
