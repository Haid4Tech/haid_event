import { cn } from "@/lib/utils";

const tones = {
  success: "bg-success/15 text-success",
  primary: "bg-primary/15 text-lilac",
  muted: "bg-white/10 text-muted",
};

export function Badge({
  tone = "muted",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
