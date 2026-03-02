import { getSectionEntries, getAdjacentEntries, type EntryMetadata } from "@/lib/content";
import { EntryNav } from "@/components/entry-nav";

export async function generateStaticParams() {
  const entries = await getSectionEntries("thinking");
  return entries.map((e) => ({
    slug: e.slug,
  }));
}

export const dynamicParams = false;

export default async function ThinkingEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const {
    default: MDXContent,
    metadata,
  }: { default: React.ComponentType; metadata: EntryMetadata } = await import(
    `../../../../content/thinking/${slug}.mdx`
  );

  const { prev, next } = await getAdjacentEntries("thinking", slug);

  return (
    <article>
      <header className="mb-8">
        <p className="text-terminal-green/40 text-xs mb-2">
          thinking / {slug}
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
