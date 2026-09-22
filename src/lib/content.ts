import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";

const contentDir = path.join(process.cwd(), "content", "topics");

export type TopicFrontmatter = {
  title_en: string;
  title_bn: string;
  summary_en: string;
  summary_bn: string;
};

export async function getTopicContent(slug: string) {
  try {
    const file = path.join(contentDir, `${slug}.mdx`);
    const raw = await fs.readFile(file, "utf8");
    const { content, data } = matter(raw);
    const compiled = await compileMDX({
      source: content,
      components: mdxComponents,
    });
    return {
      frontmatter: data as unknown as TopicFrontmatter,
      content: compiled.content,
      exists: true,
    };
  } catch {
    return { frontmatter: null, content: null, exists: false };
  }
}
