"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/organizer/dashboard", label: "Dashboard" },
  { href: "/organizer/events", label: "Events" },
  { href: "/organizer/customers", label: "Customers" },
  { href: "/organizer/finance", label: "Finance" },
  { href: "/organizer/team", label: "Team" },
  { href: "/organizer/orders", label: "Orders" },
];

const secondaryLinks = [
  { href: "/organizer/notifications", label: "Notifications" },
  { href: "/organizer/support", label: "Support" },
  { href: "/organizer/settings", label: "Settings" },
];

export function OrganizerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-bg-elevated p-4">
      <Link href="/organizer/dashboard" className="px-2 py-2">
        <Logo />
      </Link>

      <div className="mt-4 rounded-xl bg-panel px-3 py-2 text-sm text-muted">
        Workspace: <span className="text-fg">Nova Sound Collective</span>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {primaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors duration-200 ease-out",
              pathname.startsWith(link.href)
                ? "bg-primary/15 text-lilac"
                : "text-muted hover:bg-panel hover:text-fg"
            )}
          >
            {link.label}
          </Link>
        ))}

        <div className="my-3 h-px bg-border" />

        {secondaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors duration-200 ease-out",
              pathname.startsWith(link.href)
                ? "bg-primary/15 text-lilac"
                : "text-muted hover:bg-panel hover:text-fg"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/organizer/events/new"
        className="mb-3 rounded-full bg-cream px-4 py-2.5 text-center text-sm font-medium text-bg transition-[filter] duration-200 ease-out hover:brightness-95"
      >
        + New Event
      </Link>

      <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm">
        <div className="h-8 w-8 rounded-full bg-primary/40" />
        <div className="min-w-0">
          <p className="truncate text-fg">James Brown</p>
          <p className="truncate text-xs text-muted">james@sonik.fm</p>
        </div>
      </div>
    </aside>
  );
}
