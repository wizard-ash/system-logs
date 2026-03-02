#!/usr/bin/env node

/**
 * Validates content file naming conventions.
 * All .mdx files in content/ must be kebab-case — no date prefixes, no underscores.
 * Allowed: hello-world.mdx, tmux.mdx, on-writing-clearly.mdx
 * Rejected: 2026-03-02-tmux-deep-dive.mdx, my_file.mdx, MyFile.mdx
 */

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const KEBAB_CASE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;

let errors = 0;

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(CONTENT_DIR, fullPath);

    if (entry.isDirectory()) {
      // Skip _meta dirs, validate folder names
      if (!entry.name.startsWith("_") && !KEBAB_CASE.test(entry.name)) {
        console.error(`  ✗ folder not kebab-case: content/${relPath}`);
        errors++;
      }
      walk(fullPath);
    } else if (entry.name.endsWith(".mdx")) {
      const stem = entry.name.replace(/\.mdx$/, "");

      if (DATE_PREFIX.test(stem)) {
        console.error(`  ✗ date prefix not allowed: content/${relPath}`);
        console.error(`    → rename to: ${stem.replace(DATE_PREFIX, "")}.mdx (date belongs in frontmatter)`);
        errors++;
      } else if (!KEBAB_CASE.test(stem)) {
        console.error(`  ✗ filename not kebab-case: content/${relPath}`);
        errors++;
      }
    }
  }
}

console.log("Checking content file naming conventions...\n");
walk(CONTENT_DIR);

if (errors > 0) {
  console.error(`\n✗ ${errors} naming violation${errors > 1 ? "s" : ""} found`);
  process.exit(1);
} else {
  console.log("✓ all content files follow kebab-case convention");
}
