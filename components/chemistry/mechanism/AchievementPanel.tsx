import type { PracticeAchievement } from "./AchievementTypes";

type AchievementPanelProps = {
  achievements: PracticeAchievement[];
};

export default function AchievementPanel({
  achievements,
}: AchievementPanelProps) {
  const unlockedCount = achievements.filter(
    (achievement) => achievement.unlocked,
  ).length;

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-5"
      aria-label="Practice achievements"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
            Achievements
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-950">
            Mechanism milestones
          </h3>
        </div>

        <p className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-800">
          {unlockedCount}/{achievements.length} unlocked
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {achievements.map((achievement) => (
          <article
            key={achievement.id}
            className={`rounded-xl border p-4 transition ${
              achievement.unlocked
                ? "border-amber-200 bg-amber-50"
                : "border-slate-200 bg-slate-50 opacity-55"
            }`}
          >
            <div
              className="text-2xl"
              aria-hidden="true"
            >
              {achievement.unlocked ? achievement.icon : "🔒"}
            </div>

            <h4 className="mt-2 font-bold text-slate-950">
              {achievement.title}
            </h4>

            <p className="mt-1 text-sm leading-5 text-slate-600">
              {achievement.description}
            </p>

            <p
              className={`mt-3 text-xs font-bold uppercase tracking-wide ${
                achievement.unlocked
                  ? "text-amber-800"
                  : "text-slate-500"
              }`}
            >
              {achievement.unlocked ? "Unlocked" : "Locked"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}