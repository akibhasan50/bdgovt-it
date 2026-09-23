import fs from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { cache } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx/mdx-components";

const contentDir = path.join(process.cwd(), "content", "topics");

const mdxOptions = { remarkPlugins: [remarkGfm] };

export type TopicFrontmatter = {
  title_en: string;
  title_bn: string;
  summary_en: string;
  summary_bn: string;
};

export type TopicSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export type TopicContent = {
  frontmatter: TopicFrontmatter | null;
  intro: ReactNode | null;
  sections: TopicSection[];
  exists: boolean;
};

function slugify(title: string, fallbackIndex: number) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `section-${fallbackIndex + 1}`;
}

function splitSections(source: string) {
  const lines = source.split("\n");
  const introLines: string[] = [];
  const raw: { title: string; body: string[] }[] = [];
  let current: { title: string; body: string[] } | null = null;
  let inCode = false;

  for (const line of lines) {
    if (/^```/.test(line)) inCode = !inCode;
    if (!inCode && /^##\s+/.test(line)) {
      if (current) raw.push(current);
      current = { title: line.replace(/^##\s+/, "").trim(), body: [] };
      continue;
    }
    if (current) current.body.push(line);
    else introLines.push(line);
  }
  if (current) raw.push(current);

  return {
    intro: introLines.join("\n").trim(),
    sections: raw.map((s) => ({ title: s.title, body: s.body.join("\n").trim() })),
  };
}

export const getTopicContent = cache(async (slug: string): Promise<TopicContent> => {
  try {
    const file = path.join(contentDir, `${slug}.mdx`);
    const raw = await fs.readFile(file, "utf8");
    const { content, data } = matter(raw);
    const { intro, sections } = splitSections(content);

    const compiled = await Promise.all(
      sections.map((s) =>
        compileMDX({ source: s.body, components: mdxComponents, options: { mdxOptions } })
      )
    );
    const introCompiled = intro
      ? await compileMDX({ source: intro, components: mdxComponents, options: { mdxOptions } })
      : null;

    const seen = new Set<string>();
    return {
      frontmatter: data as unknown as TopicFrontmatter,
      intro: introCompiled?.content ?? null,
      sections: sections.map((s, i) => {
        let id = slugify(s.title, i);
        while (seen.has(id)) id = `${id}-${i + 1}`;
        seen.add(id);
        return { id, title: s.title, content: compiled[i].content };
      }),
      exists: true,
    };
  } catch {
    return { frontmatter: null, intro: null, sections: [], exists: false };
  }
});
