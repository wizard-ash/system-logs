import { getSectionEntries } from "@/lib/content";
import { EntryCard } from "@/components/entry-card";

export default async function ProjectsPage() {
  const entries = await getSectionEntries("projects");

  return (
    <div>
      <h1 className="text-terminal-red text-2xl font-bold mb-2 text-glow-red">
        {"// projects"}
      </h1>
      <p className="text-terminal-green/50 text-sm mb-8">
        project writeups and post-mortems.
      </p>
      <div className="space-y-3">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))
        ) : (
          <p className="text-terminal-green/40 text-sm italic">
            no project entries yet.
          </p>
        )}
      </div>
    </div>
  );
}
