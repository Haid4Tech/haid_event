import Link from "next/link";
import { events } from "@/lib/data";
import { Logo } from "@/components/logo";
import { formatDateTime } from "@/lib/utils";

export default function ScanEventListPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <Logo />
      <h1 className="mt-4 font-display text-2xl tracking-wide">Upcoming Events</h1>
      <p className="mt-1 text-sm text-muted">Select an event to start scanning tickets.</p>

      <div className="mt-6 flex flex-col gap-3">
        {events.map((event) => {
          const scanned = event.tiers.reduce((s, t) => s + t.scanned, 0);
          const capacity = event.tiers.reduce((s, t) => s + t.capacity, 0);
          return (
            <Link
              key={event.id}
              href={`/scan/${event.id}`}
              className="rounded-2xl border border-border bg-panel p-4 hover:border-primary"
            >
              <p className="font-medium">{event.title}</p>
              <p className="mt-1 text-sm text-muted">{formatDateTime(event.date)}</p>
              <p className="mt-2 text-xs text-lilac">{scanned}/{capacity} Scanned</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
