import Link from "next/link";
import { getEntryHref, type EntryMetadata } from "@/lib/content";

export function EntryCard({ entry }: { entry: EntryMetadata }) {
  return (
    <Link
      href={getEntryHref(entry)}
      className="block border border-dashed border-terminal-green/30 p-4 hover:border-terminal-cyan/50 transition-colors duration-150"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-terminal-cyan font-bold">{entry.title}</h3>
        <span className="text-terminal-green/40 text-xs shrink-0">
          {entry.date}
        </span>
      </div>
      {entry.concept && (
        <p className="text-terminal-green/50 text-xs mt-1">{entry.concept}</p>
      )}
      {entry.tags && entry.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span key={tag} className="text-xs text-terminal-green/50">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
