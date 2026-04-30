interface FramedPlaceholderProps {
  path: string;
  recommendation: string;
}

export function FramedPlaceholder({ path, recommendation }: FramedPlaceholderProps) {
  return (
    <div className="rounded-xl border border-dashed bg-muted/30 p-6 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">Add image: {path}</p>
      <p className="mt-1">Recommended: {recommendation}</p>
    </div>
  );
}
