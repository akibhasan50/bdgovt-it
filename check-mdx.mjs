#!/usr/bin/env node
/**
 * Compile-check every content/topics/*.mdx file.
 * Usage: node check-mdx.mjs [slug...]
 */
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const dir = path.join(process.cwd(), "content", "topics");
const slugs = process.argv.slice(2);
const files = slugs.length
  ? slugs.map((s) => `${s}.mdx`)
  : (await fs.readdir(dir)).filter((f) => f.endsWith(".mdx"));

const components = {
  Callout: ({ children }) => children,
};

let failed = 0;
for (const file of files) {
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
