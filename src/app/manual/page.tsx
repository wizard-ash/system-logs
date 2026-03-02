import Link from "next/link";
import { getManualCategories, getManualEntriesByCategory, getCategoryMeta } from "@/lib/content";
import { SectionDivider } from "@/components/section-divider";
import { EntryCard } from "@/components/entry-card";

export default async function ManualIndexPage() {
  const categories = getManualCategories();

  const categoriesWithEntries = await Promise.all(
    categories.map(async (cat) => ({
      cat,
      entries: await getManualEntriesByCategory(cat),
    }))
  );

  // Only show categories that have entries
  const nonEmpty = categoriesWithEntries.filter((c) => c.entries.length > 0);

  return (
    <div>
      <h1 className="text-terminal-red text-2xl font-bold mb-2 text-glow-red">
        {"// field manual"}
      </h1>
      <p className="text-terminal-green/50 text-sm mb-8">
        core systems knowledge, organized by domain.
      </p>

      {nonEmpty.map(({ cat, entries }, i) => {
        const info = getCategoryMeta(cat);
        return (
          <div key={cat}>
            {i > 0 && <SectionDivider />}
            <section>
              <Link href={`/manual/${cat}`}>
                <h2 className="text-terminal-cyan text-lg font-bold mb-1 hover:text-terminal-green transition-colors">
                  [{info.label}]
                </h2>
              </Link>
              <p className="text-terminal-green/40 text-xs mb-4">
                {info.desc}
              </p>
              <div className="space-y-3">
                {entries.map((entry) => (
                  <EntryCard key={entry.slug} entry={entry} />
                ))}
              </div>
            </section>
          </div>
        );
      })}

      {nonEmpty.length === 0 && (
        <p className="text-terminal-green/40 text-sm italic">
          no entries found. add .mdx files under content/manual/
        </p>
      )}
    </div>
  );
}
