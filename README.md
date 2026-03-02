# system-logs

A personal knowledge base that forces clear writing about what I learn.

## Why

Notes don't stick. I learn something, scribble it down, and forget the details in weeks. Writing structured documents — where I state what I know, what it means, and what to do about it — is the only way knowledge compounds.

This site is the forcing function.

## Sections

- **Manual** — permanent reference docs (the personal man page)
- **Logs** — what happened today, what was learned
- **Projects** — post-mortems on things built
- **Thinking** — ideas and mental models

## Stack

Next.js 16, MDX, Tailwind v4, Fuse.js. Static export — no server, no database.

## Running

```bash
bun run dev     # dev server
bun run build   # static export
bun run lint    # eslint
```

## Project Structure

```
content/
  manual/{category}/{slug}.mdx    → /manual/{category}/{slug}
  logs/{slug}.mdx                 → /logs/{slug}
  projects/{slug}.mdx             → /projects/{slug}
  thinking/{slug}.mdx             → /thinking/{slug}

src/
  app/                            → Next.js app router pages
  lib/content.ts                  → filesystem-based content loading
  components/                     → React components
```

## Writing Content

When creating or editing `.mdx` content files, follow these rules strictly.

### Core Principle

**State what you know. State what it means. State what to do about it.**

Every entry follows this. If any layer is missing, the document is incomplete.

### Writing Rules

1. **Lead with the point.** First sentence carries the main idea. Don't build up to conclusions.
2. **One idea per section.** If you can't name the section in 3 words, split it.
3. **Concrete over abstract.** Code, commands, tables, diagrams > prose. Show the thing, then explain it.
4. **Include failure modes.** What breaks, how it breaks, what it looks like when it breaks.
5. **Cut filler.** "In order to" → "to". "It is important to note that" → delete. If removing a word doesn't change meaning, remove it.
6. **Tables for comparisons.** Comparing 2+ things across multiple dimensions? Use a table.
7. **No walls of text.** If a section is longer than a screen, break it up.

### MDX Metadata

Every `.mdx` file must export a metadata object as the first thing in the file:

```typescript
export const metadata = {
  title: "Document Title",
  date: "YYYY-MM-DD",
  category: "section-or-subcategory",
  concept: "One-line summary shown on index cards",
  tags: ["lowercase", "tags"],
  related: ["other-entry-slugs"],
}
```

### Section Templates

#### MANUAL — Field Reference Documents

Permanent reference material. The "man page" for a concept or tool.

```
## Topic Name
One paragraph: what is this, why does it matter.

## Core Concepts / Architecture
Diagram or table showing the structure.

## Operations / Usage (numbered sections)
How to actually use the thing. Code examples. Tables for commands.

## Common Mistakes
What breaks. Bullet list. Each item: name, description, consequence.
```

#### LOGS — Operational Dispatches

After-action reports. What happened, what you learned, what changed.

```
## What Happened
One paragraph: the event, the outcome, the key takeaway.

## Why
Context. What were you doing, why did this matter.

## Decisions Made (if applicable)
What choices were made and why.

## What I Learned
Numbered list. Specific, concrete insights.

## What's Next
What changes as a result.
```

#### PROJECTS — Engineering Assessments

Post-mortems and documentation for things you built.

```
## What Is This
What it does, why it exists. 2-3 sentences max.

## Stack
Table: layer, choice, why.

## Architecture
Diagram or description of how the pieces fit together.

## What Went Right
What worked.

## What Went Wrong
What didn't.

## Lessons
Numbered list.

## Status
Current state and next actions.
```

#### THINKING — Ideas and Mental Models

Long-form reasoning about engineering, tools, or process.

```
## The Problem
What prompted this thinking.

## The Principle / Thesis
One sentence, bold. The core idea.

## The Argument
Structured points supporting the thesis.

## Counter-arguments
Steelman the other side.

## How This Changes Behavior
Concrete actions. What do you do differently now.
```

### Quality Check

Before finishing any content, verify:

1. Does it state what I know? (facts, evidence, code)
2. Does it state what it means? (interpretation, why it matters)
3. Does it state what to do? (action, next steps, behavior change)
4. Could someone else understand this without additional context?
5. Could I understand this in 6 months with no additional context?
