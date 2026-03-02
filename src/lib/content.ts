import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface EntryMetadata {
  title: string;
  date: string;
  category: string;
  concept: string;
  tags: string[];
  related: string[];
  slug: string;
  section: string;
}

function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export async function getManualEntries(): Promise<EntryMetadata[]> {
  const manualDir = path.join(CONTENT_DIR, "manual");
  if (!fs.existsSync(manualDir)) {
    return [];
  }

  const categories = fs
    .readdirSync(manualDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const entries: EntryMetadata[] = [];

  for (const category of categories) {
    const categoryDir = path.join(manualDir, category);
    const files = getMdxFiles(categoryDir);

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      try {
        const mod = await import(
          `../../content/manual/${category}/${slug}.mdx`
        );
        const meta = mod.metadata as Partial<EntryMetadata>;
        entries.push({
          title: meta.title || slug,
          date: meta.date || "",
          category,
          concept: meta.concept || "",
          tags: meta.tags || [],
          related: meta.related || [],
          slug,
          section: "manual",
        });
      } catch {
        // Skip files that can't be imported
      }
    }
  }

  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getManualEntriesByCategory(
  category: string
): Promise<EntryMetadata[]> {
  const all = await getManualEntries();
  return all.filter((e) => e.category === category);
}

export interface CategoryMeta {
  label: string;
  desc: string;
}

export function getManualCategories(): string[] {
  const manualDir = path.join(CONTENT_DIR, "manual");
  if (!fs.existsSync(manualDir)) {
    return [];
  }
  return fs
    .readdirSync(manualDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getCategoryMeta(category: string): CategoryMeta {
  const metaPath = path.join(CONTENT_DIR, "manual", category, "_meta.json");
  if (fs.existsSync(metaPath)) {
    return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  }
  return { label: category, desc: "" };
}

export async function getSectionEntries(
  section: "logs" | "projects" | "thinking"
): Promise<EntryMetadata[]> {
  const sectionDir = path.join(CONTENT_DIR, section);
  const files = getMdxFiles(sectionDir);
  const entries: EntryMetadata[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    try {
      const mod = await import(`../../content/${section}/${slug}.mdx`);
      const meta = mod.metadata as Partial<EntryMetadata>;
      entries.push({
        title: meta.title || slug,
        date: meta.date || "",
        category: meta.category || section,
        concept: meta.concept || "",
        tags: meta.tags || [],
        related: meta.related || [],
        slug,
        section,
      });
    } catch {
      // Skip files that can't be imported
    }
  }

  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllEntries(): Promise<EntryMetadata[]> {
  const [manual, logs, projects, thinking] = await Promise.all([
    getManualEntries(),
    getSectionEntries("logs"),
    getSectionEntries("projects"),
    getSectionEntries("thinking"),
  ]);

  return [...manual, ...logs, ...projects, ...thinking].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getEntryHref(entry: EntryMetadata): string {
  if (entry.section === "manual") {
    return `/manual/${entry.category}/${entry.slug}`;
  }
  return `/${entry.section}/${entry.slug}`;
}

export async function getAdjacentEntries(
  section: string,
  slug: string
): Promise<{ prev: EntryMetadata | null; next: EntryMetadata | null }> {
  const entries =
    section === "manual"
      ? await getManualEntries()
      : await getSectionEntries(section as "logs" | "projects" | "thinking");

  // entries are sorted newest first
  const index = entries.findIndex((e) => e.slug === slug);
  return {
    prev: index < entries.length - 1 ? entries[index + 1] : null, // older
    next: index > 0 ? entries[index - 1] : null, // newer
  };
}

export async function getRecentEntries(limit = 5): Promise<EntryMetadata[]> {
  const [manual, logs, projects, thinking] = await Promise.all([
    getManualEntries(),
    getSectionEntries("logs"),
    getSectionEntries("projects"),
    getSectionEntries("thinking"),
  ]);

  return [...manual, ...logs, ...projects, ...thinking]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
