import { defineLesson } from "../lesson-types";
export default defineLesson({
  id: "chemical-bonding", slug: "chemical-bonding", moduleId: "fundamentals", module: "Fundamentals", order: 30,
  title: "Chemical Bonding", description: "Learn why atoms form bonds and how ionic, covalent, polar, sigma, and pi bonds differ.", estimatedMinutes: 12, difficulty: "introductory",
  learningObjectives: ["Compare ionic and covalent bonding.", "Distinguish sigma and pi bonds.", "Relate electronegativity to bond polarity."], prerequisiteLessonIds: ["atomic-structure"],
  moleculeIds: ["ethanol", "propene"], reactionIds: [], mechanismIds: [], reagentIds: [], spectroscopyDatasetIds: ["ethanol"], keywords: ["bond", "sigma", "pi", "polarity"],
  capabilities: { public: true, searchable: true, sitemap: true, studyDashboard: true, recommendations: true, workspace: true },
});
