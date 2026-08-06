import { defineLesson } from "../lesson-types";
export default defineLesson({
  id: "hybridization", slug: "hybridization", moduleId: "fundamentals", module: "Fundamentals", order: 40,
  title: "Hybridization", description: "Connect carbon hybridization with molecular geometry and sigma and pi bonding.", estimatedMinutes: 12, difficulty: "introductory",
  learningObjectives: ["Identify sp, sp2, and sp3 carbon centres.", "Predict geometry from hybridization.", "Connect hybridization to sigma and pi bonding."], prerequisiteLessonIds: ["chemical-bonding"],
  moleculeIds: ["ethanol", "propene", "acetone", "toluene"], reactionIds: ["electrophilic-addition"], mechanismIds: ["electrophilic-addition"], reagentIds: [], spectroscopyDatasetIds: ["ethanol", "acetone", "toluene"], keywords: ["sp", "sp2", "sp3", "geometry"],
  capabilities: { public: true, searchable: true, sitemap: true, studyDashboard: true, recommendations: true, workspace: true },
});
