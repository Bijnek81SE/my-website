"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SearchResults from "./SearchResults";
import { searchContent, type SearchEntry } from "./SearchIndex";

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = useMemo(() => searchContent(query), [query]);
  const safeActiveIndex = results.length === 0 ? 0 : Math.min(activeIndex, results.length - 1);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  function selectResult(entry: SearchEntry) {
    onClose();
    setQuery("");
    setActiveIndex(0);
    router.push(entry.href);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + results.length) % results.length);
      return;
    }

    if (event.key === "Enter" && results[safeActiveIndex]) {
      event.preventDefault();
      selectResult(results[safeActiveIndex]);
    }
  }

  function close() {
    setQuery("");
    setActiveIndex(0);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/45 px-4 pt-[10vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <h2 id={titleId} className="sr-only">
          Search Organic Chemistry Hub
        </h2>

        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
          <span aria-hidden="true" className="text-xl text-slate-400">
            ⌕
          </span>
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-label="Search Organic Chemistry Hub"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls="global-search-results"
            aria-activedescendant={
              results[safeActiveIndex]
                ? `global-search-option-${results[safeActiveIndex].id}`
                : undefined
            }
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search resonance, SN2, hybridization…"
            className="min-w-0 flex-1 bg-transparent py-2 text-base text-slate-950 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={close}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Esc
          </button>
        </div>

        <SearchResults
          results={results}
          activeIndex={safeActiveIndex}
          query={query}
          onActiveIndexChange={setActiveIndex}
          onSelect={selectResult}
        />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
          <span>↑↓ Navigate</span>
          <span>Enter Open</span>
          <span>Esc Close</span>
        </div>
      </section>
    </div>
  );
}
