import { getManualCategories, getManualEntriesByCategory } from "@/lib/content";
import { EntryCard } from "@/components/entry-card";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getManualCategories().map((category) => ({ category }));
}

export const dynamicParams = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const entries = await getManualEntriesByCategory(category);

  if (entries.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-terminal-red text-2xl font-bold mb-2 text-glow-red">
        {"// manual / "}{category}
      </h1>
      <p className="text-terminal-green/50 text-sm mb-8">
        {entries.length} {entries.length === 1 ? "entry" : "entries"}
      </p>
      <div className="space-y-3">
        {entries.map((entry) => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}
