import { markdownToHtml } from "@/lib/markdown";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const html = markdownToHtml(content);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
