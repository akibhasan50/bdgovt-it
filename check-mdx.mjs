#!/usr/bin/env node
/**
 * Compile-check content/topics/*.mdx and content/banks/*.mdx.
 * Usage: node check-mdx.mjs [slug...]
 */
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const dirs = [
  { dir: path.join(process.cwd(), "content", "topics"), label: "content/topics" },
  { dir: path.join(process.cwd(), "content", "banks"), label: "content/banks" },
];
const slugs = process.argv.slice(2);
const components = {
  Callout: ({ children }) => children,
};

const files = [];
if (slugs.length) {
  for (const { dir, label } of dirs) {
    for (const s of slugs) {
      const file = `${s}.mdx`;
      try {
        await fs.access(path.join(dir, file));
        files.push({ dir, label, file });
      } catch {
        /* not in this dir */
      }
    }
  }
} else {
  for (const { dir, label } of dirs) {
    try {
      const list = await fs.readdir(dir);
      for (const file of list.filter((f) => f.endsWith(".mdx"))) {
        files.push({ dir, label, file });
      }
    } catch {
      /* dir may not exist */
    }
  }
}

let failed = 0;
for (const { dir, file } of files) {
  try {
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    const { content } = matter(raw);
    await compileMDX({
      source: content,
      components,
      options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
    });
    console.log(`ok   ${file}`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${file}\n  ${String(err.message || err).split("\n")[0]}`);
  }
}
if (failed) {
  console.error(`\n${failed} file(s) failed`);
  process.exit(1);
}
console.log(`\nAll ${files.length} MDX OK`);
