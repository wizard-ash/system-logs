"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Fuse, { type IFuseOptions } from "fuse.js";

interface SearchEntry {
  title: string;
  date: string;
  category: string;
  concept: string;
  tags: string[];
  slug: string;
  section: string;
  href: string;
}

const fuseOptions: IFuseOptions<SearchEntry> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "tags", weight: 0.25 },
    { name: "concept", weight: 0.2 },
    { name: "category", weight: 0.15 },
  ],
  threshold: 0.4,
  includeScore: true,
};

function getSectionFromPath(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return null; // homepage — search everything
  }
  return segments[0]; // "manual", "logs", "projects", "thinking"
}

function getSectionLabel(section: string | null): string {
  if (!section) {
    return "all";
  }
  return section;
}

export function Search({ entries }: { entries: SearchEntry[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentSection = getSectionFromPath(pathname);

  // Filter entries to current section
  const scopedEntries = useMemo(() => {
    if (!currentSection) {
      return entries;
    }
    return entries.filter((e) => e.section === currentSection);
  }, [entries, currentSection]);

  const fuse = useMemo(
    () => new Fuse(scopedEntries, fuseOptions),
    [scopedEntries]
  );

  const results =
    query.length > 0
      ? fuse.search(query).slice(0, 8)
      : scopedEntries
          .slice(0, 8)
          .map((item) => ({ item, score: 0, refIndex: 0 }));

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      setSelectedIndex(0);
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  function handleQueryChange(value: string) {
    setQuery(value);
    setSelectedIndex(0);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigate(results[selectedIndex].item.href);
    }
  }

  const sectionLabel = getSectionLabel(currentSection);

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="flex items-center gap-2 text-xs text-terminal-green/40 hover:text-terminal-green/70 transition-colors"
      >
        <span className="border border-terminal-green/20 px-2 py-0.5 rounded text-[0.6rem]">
          ctrl+k
        </span>
        <span>search {sectionLabel}</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={() => {
          setOpen(false);
          setQuery("");
        }}
      />

      {/* Palette */}
      <div className="relative w-full max-w-lg mx-4 border border-terminal-green/40 bg-black shadow-[0_0_30px_rgba(0,255,0,0.08)]">
        {/* Scope indicator */}
        <div className="px-4 pt-2 pb-0">
          <span className="text-[0.6rem] text-terminal-cyan/50 tracking-wider uppercase">
            searching in: [{sectionLabel}]
            {" "}&mdash;{" "}
            {scopedEntries.length} {scopedEntries.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {/* Input */}
        <div className="flex items-center border-b border-terminal-green/30 px-4">
          <span className="text-terminal-green/50 text-sm mr-2">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              handleQueryChange(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={`search ${sectionLabel} entries...`}
            className="w-full bg-transparent text-terminal-green py-3 text-sm outline-none placeholder:text-terminal-green/30 font-mono"
          />
          <span className="text-terminal-green/20 text-xs ml-2">esc</span>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            results.map((result, i) => (
              <button
                key={`${result.item.section}-${result.item.slug}`}
                onClick={() => {
                  navigate(result.item.href);
                }}
                onMouseEnter={() => {
                  setSelectedIndex(i);
                }}
                className={`w-full text-left px-4 py-3 flex items-baseline justify-between gap-4 transition-colors ${
                  i === selectedIndex
                    ? "bg-terminal-green/10 border-l-2 border-terminal-cyan"
                    : "border-l-2 border-transparent"
                }`}
              >
                <div className="min-w-0">
                  <div className="text-sm text-terminal-cyan font-bold truncate">
                    {result.item.title}
                  </div>
                  <div className="text-xs text-terminal-green/40 mt-0.5">
                    {result.item.section} / {result.item.category}
                    {result.item.tags.length > 0 && (
                      <span className="ml-2">
                        {result.item.tags
                          .slice(0, 3)
                          .map((t) => `#${t}`)
                          .join(" ")}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-terminal-green/30 text-xs shrink-0">
                  {result.item.date}
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-terminal-green/30 text-sm">
              no results in [{sectionLabel}].
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-terminal-green/20 px-4 py-2 flex gap-4 text-[0.6rem] text-terminal-green/30">
          <span>
            <kbd className="border border-terminal-green/20 px-1 rounded">
              ↑↓
            </kbd>{" "}
            navigate
          </span>
          <span>
            <kbd className="border border-terminal-green/20 px-1 rounded">
              enter
            </kbd>{" "}
            open
          </span>
          <span>
            <kbd className="border border-terminal-green/20 px-1 rounded">
              esc
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
}
