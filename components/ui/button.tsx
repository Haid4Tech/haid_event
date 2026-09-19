import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  cream: "bg-cream text-bg hover:brightness-95",
  outline: "border border-border text-fg hover:bg-panel",
  ghost: "text-fg hover:bg-panel",
};

type Variant = keyof typeof variants;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-[color,background-color,border-color,filter,transform] duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}

export function LinkButton({
  variant = "primary",
  className,
  href,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props} />
  );
}
