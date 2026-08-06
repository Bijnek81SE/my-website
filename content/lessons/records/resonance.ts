import { defineLesson } from "../lesson-types";
export default defineLesson({
  id: "resonance", slug: "resonance", moduleId: "fundamentals", module: "Fundamentals", order: 70,
  title: "Resonance", description: "Understand resonance contributors, electron delocalisation, and resonance hybrids.", estimatedMinutes: 13, difficulty: "introductory",
  learningObjectives: ["Draw valid resonance contributors.", "Identify delocalised electrons.", "Compare contributor importance."], prerequisiteLessonIds: ["formal-charge"],
  moleculeIds: ["acetone", "ethyl-acetate", "toluene"], reactionIds: ["sn1", "e1"], mechanismIds: ["sn1", "e1"], reagentIds: [], spectroscopyDatasetIds: ["acetone", "ethyl-acetate", "toluene"], keywords: ["resonance", "delocalisation", "contributors", "hybrid"],
  capabilities: { public: true, searchable: true, sitemap: true, studyDashboard: true, recommendations: true, workspace: true },
});
