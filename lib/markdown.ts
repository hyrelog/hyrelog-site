/**
 * Minimal server-side markdown-to-HTML for blog content.
 * Handles headings, bold, links, lists, paragraphs. No external deps.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function markdownToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // h1
    if (trimmed.startsWith("# ")) {
      out.push(`<h1>${escapeHtml(trimmed.slice(2))}</h1>`);
      i++;
      continue;
    }

    // h2
    if (trimmed.startsWith("## ")) {
      out.push(`<h2>${escapeHtml(trimmed.slice(3))}</h2>`);
      i++;
      continue;
    }
    // h3
    if (trimmed.startsWith("### ")) {
      out.push(`<h3>${escapeHtml(trimmed.slice(4))}</h3>`);
      i++;
      continue;
    }

    // ul
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        items.push(inlineMarkdown(lines[i].trim().slice(2)));
        i++;
      }
      out.push("<ul>" + items.map((li) => `<li>${li}</li>`).join("") + "</ul>");
      continue;
    }

    // paragraph
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].trim().startsWith("#") && !lines[i].trim().startsWith("- ") && !lines[i].trim().startsWith("* ")) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      out.push("<p>" + inlineMarkdown(paraLines.join(" ")) + "</p>");
    } else {
      // Safety fallback for unsupported markdown lines to avoid infinite loops.
      i++;
    }
  }

  return out.join("\n");
}

function inlineMarkdown(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, (_m, g) => `<strong>${escapeHtml(g)}</strong>`)
    .replace(/\*(.+?)\*/g, (_m, g) => `<em>${escapeHtml(g)}</em>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => `<a href="${escapeHtml(href)}" class="underline hover:no-underline">${escapeHtml(text)}</a>`)
    .replace(/`([^`]+)`/g, (_m, g) => `<code class="text-sm">${escapeHtml(g)}</code>`);
}
