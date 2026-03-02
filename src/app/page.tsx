import { AsciiBanner } from "@/components/ascii-banner";
import { EntryCard } from "@/components/entry-card";
import { getRecentEntries } from "@/lib/content";

export default async function HomePage() {
  const recent = await getRecentEntries(5);

  return (
    <div>
      <AsciiBanner />

      <p className="text-terminal-green/80 mb-2 text-sm">
        &gt; personal systems engineering field manual
      </p>
      <p className="text-terminal-green/50 text-xs mb-8">
        a living reference for low-level systems knowledge, algorithms,
        reverse engineering, and engineering thinking.
      </p>

      <section>
        <h2 className="text-terminal-red text-xl font-bold mb-4 text-glow-red">
          {"// recent entries"}
        </h2>
        <div className="space-y-3">
          {recent.length > 0 ? (
            recent.map((entry) => (
              <EntryCard
                key={`${entry.section}-${entry.slug}`}
                entry={entry}
              />
            ))
          ) : (
            <p className="text-terminal-green/40 text-sm italic">
              no entries yet. start writing.
            </p>
          )}
        </div>
      </section>

    </div>
  );
}
