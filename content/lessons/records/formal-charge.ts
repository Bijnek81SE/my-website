import { defineLesson } from "../lesson-types";
export default defineLesson({
  id: "formal-charge", slug: "formal-charge", moduleId: "fundamentals", module: "Fundamentals", order: 60,
  title: "Formal Charge", description: "Calculate formal charge and use it to compare possible Lewis structures.", estimatedMinutes: 11, difficulty: "introductory",
  learningObjectives: ["Calculate formal charge.", "Compare candidate Lewis structures using charge placement."], prerequisiteLessonIds: ["lewis-structures"],
  moleculeIds: [], reactionIds: [], mechanismIds: [], reagentIds: [], spectroscopyDatasetIds: [], keywords: ["formal charge", "Lewis structure", "electron bookkeeping"],
  capabilities: { public: true, searchable: true, sitemap: true, studyDashboard: true, recommendations: true, workspace: false },
});
