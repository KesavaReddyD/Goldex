interface EmptyPlaceholderProps {
  title: string;
  description: string;
}

export function EmptyPlaceholder({ title, description }: EmptyPlaceholderProps) {
  return (
    <div className="flex h-full min-h-[120px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
} 