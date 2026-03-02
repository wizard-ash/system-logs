import { getAllEntries, getEntryHref } from "@/lib/content";
import { Search } from "./search";

export async function SearchProvider() {
  const entries = await getAllEntries();

  const searchEntries = entries.map((entry) => ({
    title: entry.title,
    date: entry.date,
    category: entry.category,
    concept: entry.concept,
    tags: entry.tags,
    slug: entry.slug,
    section: entry.section,
    href: getEntryHref(entry),
  }));

  return <Search entries={searchEntries} />;
}
