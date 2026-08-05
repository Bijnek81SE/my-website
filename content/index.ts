export {
  getKnowledgeConnections,
  getKnowledgeNode,
  getKnowledgeNodeIdForLesson,
  knowledgeNodes,
  knowledgeRelations,
} from "./knowledge-graph";
export type {
  KnowledgeConnection,
  KnowledgeNode,
  KnowledgeNodeKind,
  KnowledgeRelation,
  KnowledgeRelationKind,
} from "./knowledge-types";
export {
  getLessonBySlug,
  getLessonPosition,
  getLessonsByModule,
  lessons,
} from "./lesson-registry";
export type { LessonLink, LessonModule, LessonRecord } from "./lesson-registry";

export { getReaction, getReactions, reactions } from "./reactions";
export type { ReactionDefinition, ReactionFamily, ReactionMechanismClass, ReactionSelectivity } from "./reactions";
