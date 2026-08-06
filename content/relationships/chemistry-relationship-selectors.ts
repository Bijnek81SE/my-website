import { chemistryRelationships } from "./chemistry-relationship-engine";
import type {
  ChemistryEntityId,
  ChemistryRelationship,
  ChemistryRelationshipQuery,
} from "./chemistry-relationship-types";

const outgoingByEntity = new Map<ChemistryEntityId, ChemistryRelationship[]>();
const incomingByEntity = new Map<ChemistryEntityId, ChemistryRelationship[]>();

for (const relationship of chemistryRelationships) {
  const outgoing = outgoingByEntity.get(relationship.from) ?? [];
  outgoing.push(relationship);
  outgoingByEntity.set(relationship.from, outgoing);

  const incoming = incomingByEntity.get(relationship.to) ?? [];
  incoming.push(relationship);
  incomingByEntity.set(relationship.to, incoming);
}

export function selectChemistryRelationships(
  query: ChemistryRelationshipQuery = {},
): readonly ChemistryRelationship[] {
  const direction = query.direction ?? "outgoing";
  let candidates: readonly ChemistryRelationship[] = chemistryRelationships;

  if (query.entityId) {
    if (direction === "outgoing") candidates = outgoingByEntity.get(query.entityId) ?? [];
    else if (direction === "incoming") candidates = incomingByEntity.get(query.entityId) ?? [];
    else {
      candidates = [
        ...(outgoingByEntity.get(query.entityId) ?? []),
        ...(incomingByEntity.get(query.entityId) ?? []),
      ];
    }
  }

  const semantics = query.semantics ? new Set(query.semantics) : null;
  const targetKinds = query.targetKinds ? new Set(query.targetKinds) : null;
  const includeInferred = query.includeInferred ?? true;

  return candidates.filter((relationship) => {
    if (!includeInferred && relationship.inferred) return false;
    if (semantics && !semantics.has(relationship.semantic)) return false;

    if (targetKinds) {
      const targetId =
        direction === "incoming" && query.entityId
          ? relationship.from
          : relationship.to;
      const targetKind = targetId.split(":", 1)[0];
      if (!targetKinds.has(targetKind as never)) return false;
    }

    return true;
  });
}

export function getOutgoingChemistryRelationships(
  entityId: ChemistryEntityId,
): readonly ChemistryRelationship[] {
  return outgoingByEntity.get(entityId) ?? [];
}

export function getIncomingChemistryRelationships(
  entityId: ChemistryEntityId,
): readonly ChemistryRelationship[] {
  return incomingByEntity.get(entityId) ?? [];
}

export function getConnectedChemistryEntityIds(
  entityId: ChemistryEntityId,
): readonly ChemistryEntityId[] {
  const ids = new Set<ChemistryEntityId>();
  for (const relationship of getOutgoingChemistryRelationships(entityId)) ids.add(relationship.to);
  for (const relationship of getIncomingChemistryRelationships(entityId)) ids.add(relationship.from);
  return [...ids];
}
