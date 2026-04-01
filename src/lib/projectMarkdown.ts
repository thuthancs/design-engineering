import { readFile } from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/** Add target="_blank" to <a> tags from remark-html (safe for same-page # links too). */
function addTargetBlankToAnchors(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (full, attrs: string) => {
    if (/\btarget\s*=/i.test(attrs)) return full;
    const t = attrs.trim();
    const inner = t
      ? `${t} target="_blank" rel="noopener noreferrer"`
      : `target="_blank" rel="noopener noreferrer"`;
    return `<a ${inner}>`;
  });
}

function normalizeSectionKey(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitMarkdownIntoSections(markdown: string): Array<{ key: string; body: string }> {
  const lines = markdown.split(/\r?\n/);
  const sections: Array<{ key: string; body: string }> = [];
  let currentKey: string | null = null;
  let currentBody: string[] = [];

  const pushCurrent = () => {
    if (!currentKey) return;
    sections.push({ key: currentKey, body: currentBody.join("\n").trim() });
  };

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+?)\s*$/);
    if (headingMatch) {
      pushCurrent();
      currentKey = normalizeSectionKey(headingMatch[1]);
      currentBody = [];
      continue;
    }
    if (currentKey) currentBody.push(line);
  }
  pushCurrent();
  return sections;
}

export async function loadProjectMarkdownSections(
  slug: string,
): Promise<Record<string, string> | null> {
  const filePath = path.join(process.cwd(), "src", "content", "projects", `${slug}.md`);
  let raw: string;
  try {
    raw = await readFile(filePath, "utf8");
  } catch {
    return null;
  }

  const sections = splitMarkdownIntoSections(raw);
  if (!sections.length) return null;

  const result: Record<string, string> = {};
  for (const section of sections) {
    const html = await remark().use(remarkGfm).use(remarkHtml).process(section.body);
    result[section.key] = addTargetBlankToAnchors(String(html));
  }
  return result;
}

export { normalizeSectionKey };
