"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import SearchDialog from "./SearchDialog";

type SearchContextValue = {
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openSearch = useCallback(() => setOpen(true), []);
  const closeSearch = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const commandShortcut =
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k";
      const slashShortcut =
        event.key === "/" && !isTypingTarget(event.target);

      if (commandShortcut || slashShortcut) {
        event.preventDefault();
        openSearch();
        return;
      }

      if (event.key === "Escape") {
        closeSearch();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.documentElement.dataset.searchReady = "true";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      delete document.documentElement.dataset.searchReady;
    };
  }, [closeSearch, openSearch]);

  const value = useMemo(
    () => ({ openSearch, closeSearch }),
    [closeSearch, openSearch],
  );

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchDialog open={open} onClose={closeSearch} />
    </SearchContext.Provider>
  );
}

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider.");
  }

  return context;
}
