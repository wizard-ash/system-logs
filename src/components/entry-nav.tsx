import Link from "next/link";
import { getEntryHref, type EntryMetadata } from "@/lib/content";

export function EntryNav({
  prev,
  next,
}: {
  prev: EntryMetadata | null;
  next: EntryMetadata | null;
}) {
  if (!prev && !next) {
    return null;
  }

  return (
    <footer className="mt-12 border-t border-dashed border-terminal-green/40 pt-6 flex justify-between items-start gap-4">
      {prev ? (
        <Link
          href={getEntryHref(prev)}
          className="group text-left"
        >
          <span className="text-terminal-green/40 text-xs">-- prev</span>
          <p className="text-terminal-cyan text-sm font-bold group-hover:text-terminal-green transition-colors">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={getEntryHref(next)}
          className="group text-right"
        >
          <span className="text-terminal-green/40 text-xs">next --</span>
          <p className="text-terminal-cyan text-sm font-bold group-hover:text-terminal-green transition-colors">
            {next.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </footer>
  );
}
