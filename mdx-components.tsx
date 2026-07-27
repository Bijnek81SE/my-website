import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
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
  strong: ({ className = "", ...props }) => (
    <strong className={`font-semibold text-slate-950 ${className}`} {...props} />
  ),
  a: ({ className = "", ...props }) => (
    <a
      className={`font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900 ${className}`}
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
