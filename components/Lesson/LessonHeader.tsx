type LessonHeaderProps = {
  title: string;
  description: string;
  category: string;
  readingTime: string;
};

export default function LessonHeader({
  title,
  description,
  category,
  readingTime,
}: LessonHeaderProps) {
  return (
    <header className="border-b border-slate-200 pb-8">
      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
        {category}
      </span>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>

      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        {description}
      </p>

      <p className="mt-6 text-sm text-slate-500">
        Reading time: {readingTime}
      </p>
    </header>
  );
}