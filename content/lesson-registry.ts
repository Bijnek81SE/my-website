export type LessonModule = "Fundamentals";

export type LessonLink = {
  title: string;
  href: string;
};

export type LessonRecord = {
  slug: string;
  module: LessonModule;
  title: string;
  description: string;
  readingTime: string;
  href: string;
  previous?: LessonLink;
  next?: LessonLink;
};

export const lessons: readonly LessonRecord[] = [
  {
    slug: "what-is-organic-chemistry",
    module: "Fundamentals",
    title: "What Is Organic Chemistry?",
    description:
      "Learn what organic chemistry studies, why carbon is unique, and why the subject matters.",
    readingTime: "8 min",
    href: "/learn/fundamentals/what-is-organic-chemistry",
    previous: { title: "Curriculum", href: "/learn" },
    next: {
      title: "Atomic Structure",
      href: "/learn/fundamentals/atomic-structure",
    },
  },
  {
    slug: "atomic-structure",
    module: "Fundamentals",
    title: "Atomic Structure",
    description:
      "Understand how protons, neutrons, and electrons determine atomic identity, charge, and chemical behaviour.",
    readingTime: "10 min",
    href: "/learn/fundamentals/atomic-structure",
    previous: {
      title: "What Is Organic Chemistry?",
      href: "/learn/fundamentals/what-is-organic-chemistry",
    },
    next: {
      title: "Chemical Bonding",
      href: "/learn/fundamentals/chemical-bonding",
    },
  },
  {
    slug: "chemical-bonding",
    module: "Fundamentals",
    title: "Chemical Bonding",
    description:
      "Learn why atoms form bonds and how ionic, covalent, polar, sigma, and pi bonds differ.",
    readingTime: "12 min",
    href: "/learn/fundamentals/chemical-bonding",
    previous: {
      title: "Atomic Structure",
      href: "/learn/fundamentals/atomic-structure",
    },
    next: {
      title: "Hybridization",
      href: "/learn/fundamentals/hybridization",
    },
  },
  {
    slug: "hybridization",
    module: "Fundamentals",
    title: "Hybridization",
    description:
      "Connect carbon hybridization with molecular geometry and sigma and pi bonding.",
    readingTime: "12 min",
    href: "/learn/fundamentals/hybridization",
    previous: {
      title: "Chemical Bonding",
      href: "/learn/fundamentals/chemical-bonding",
    },
    next: {
      title: "Lewis Structures",
      href: "/learn/fundamentals/lewis-structures",
    },
  },
  {
    slug: "lewis-structures",
    module: "Fundamentals",
    title: "Lewis Structures",
    description:
      "Draw Lewis structures systematically and recognise octet-rule exceptions.",
    readingTime: "14 min",
    href: "/learn/fundamentals/lewis-structures",
    previous: {
      title: "Hybridization",
      href: "/learn/fundamentals/hybridization",
    },
    next: {
      title: "Formal Charge",
      href: "/learn/fundamentals/formal-charge",
    },
  },
  {
    slug: "formal-charge",
    module: "Fundamentals",
    title: "Formal Charge",
    description:
      "Calculate formal charge and use it to compare possible Lewis structures.",
    readingTime: "11 min",
    href: "/learn/fundamentals/formal-charge",
    previous: {
      title: "Lewis Structures",
      href: "/learn/fundamentals/lewis-structures",
    },
    next: {
      title: "Resonance",
      href: "/learn/fundamentals/resonance",
    },
  },
  {
    slug: "resonance",
    module: "Fundamentals",
    title: "Resonance",
    description:
      "Understand resonance contributors, electron delocalisation, and resonance hybrids.",
    readingTime: "13 min",
    href: "/learn/fundamentals/resonance",
    previous: {
      title: "Formal Charge",
      href: "/learn/fundamentals/formal-charge",
    },
  },
] as const;

export function getLessonBySlug(slug: string): LessonRecord {
  const lesson = lessons.find((item) => item.slug === slug);

  if (!lesson) {
    throw new Error(`Unknown lesson slug: ${slug}`);
  }

  return lesson;
}

export function getLessonPosition(slug: string): {
  current: number;
  total: number;
  percentage: number;
} {
  const index = lessons.findIndex((lesson) => lesson.slug === slug);

  if (index < 0) {
    throw new Error(`Unknown lesson slug: ${slug}`);
  }

  const current = index + 1;
  const total = lessons.length;

  return {
    current,
    total,
    percentage: Math.round((current / total) * 100),
  };
}

export function getLessonsByModule(module: LessonModule): readonly LessonRecord[] {
  return lessons.filter((lesson) => lesson.module === module);
}
