import { getSectionEntries } from "@/lib/content";
import { EntryCard } from "@/components/entry-card";

export default async function LogsPage() {
  const entries = await getSectionEntries("logs");

  return (
    <div>
      <h1 className="text-terminal-red text-2xl font-bold mb-2 text-glow-red">
        {"// logs"}
      </h1>
      <p className="text-terminal-green/50 text-sm mb-8">
        chronological learning journal.
      </p>
      <div className="space-y-3">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))
        ) : (
          <p className="text-terminal-green/40 text-sm italic">
            no log entries yet.
          </p>
        )}
      </div>
    </div>
  );
}
