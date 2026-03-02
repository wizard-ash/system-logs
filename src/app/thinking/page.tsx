import { getSectionEntries } from "@/lib/content";
import { EntryCard } from "@/components/entry-card";

export default async function ThinkingPage() {
  const entries = await getSectionEntries("thinking");

  return (
    <div>
      <h1 className="text-terminal-red text-2xl font-bold mb-2 text-glow-red">
        {"// thinking"}
      </h1>
      <p className="text-terminal-green/50 text-sm mb-8">
        mental models and engineering philosophy.
      </p>
      <div className="space-y-3">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))
        ) : (
          <p className="text-terminal-green/40 text-sm italic">
            no thinking entries yet.
          </p>
        )}
      </div>
    </div>
  );
}
