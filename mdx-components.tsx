import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ className = "", ...props }) => (
      <p className={`mt-5 first:mt-0 ${className}`} {...props} />
    ),
    ul: ({ className = "", ...props }) => (
      <ul
        className={`mt-5 list-disc space-y-2 pl-7 marker:text-blue-700 ${className}`}
        {...props}
      />
    ),
    ol: ({ className = "", ...props }) => (
      <ol
        className={`mt-5 list-decimal space-y-2 pl-7 marker:font-semibold marker:text-blue-700 ${className}`}
        {...props}
      />
    ),
    li: ({ className = "", ...props }) => (
      <li className={`pl-1 ${className}`} {...props} />
    ),
    strong: ({ className = "", ...props }) => (
      <strong className={`font-semibold text-slate-950 ${className}`} {...props} />
    ),
    em: ({ className = "", ...props }) => (
      <em className={`italic text-slate-800 ${className}`} {...props} />
    ),
    a: ({ className = "", ...props }) => (
      <a
        className={`font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${className}`}
        {...props}
      />
    ),
    table: ({ className = "", ...props }) => (
      <table
        className={`w-full border-collapse text-left text-base ${className}`}
        {...props}
      />
    ),
    thead: ({ className = "", ...props }) => (
      <thead className={`bg-slate-100 text-slate-900 ${className}`} {...props} />
    ),
    tbody: ({ className = "", ...props }) => (
      <tbody className={`divide-y divide-slate-200 ${className}`} {...props} />
    ),
    th: ({ className = "", ...props }) => (
      <th className={`px-5 py-4 font-semibold ${className}`} {...props} />
    ),
    td: ({ className = "", ...props }) => (
      <td className={`px-5 py-4 align-top ${className}`} {...props} />
    ),
    blockquote: ({ className = "", ...props }) => (
      <blockquote
        className={`mt-6 border-l-4 border-blue-500 bg-blue-50 px-5 py-4 text-slate-700 ${className}`}
        {...props}
      />
    ),
    ...components,
  };
}
