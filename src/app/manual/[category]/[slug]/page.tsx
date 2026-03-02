import { getManualEntries, getAdjacentEntries, type EntryMetadata } from "@/lib/content";
import { EntryNav } from "@/components/entry-nav";

export async function generateStaticParams() {
  const entries = await getManualEntries();
  return entries.map((e) => ({
    category: e.category,
    slug: e.slug,
  }));
}

export const dynamicParams = false;

export default async function ManualEntryPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const {
    default: MDXContent,
    metadata,
  }: { default: React.ComponentType; metadata: EntryMetadata } = await import(
    `../../../../../content/manual/${category}/${slug}.mdx`
  );

  const { prev, next } = await getAdjacentEntries("manual", slug);

  return (
    <article>
      <header className="mb-8">
        <p className="text-terminal-green/40 text-xs mb-2">
          manual / {category} / {slug}
        </p>
        <h1 className="text-terminal-red text-3xl font-bold text-glow-red mb-2">
          {metadata.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-terminal-green/50">
          <span>{metadata.date}</span>
          {metadata.tags?.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </header>

      <div className="mdx-content">
        <MDXContent />
      </div>

      <EntryNav prev={prev} next={next} />
    </article>
  );
}
