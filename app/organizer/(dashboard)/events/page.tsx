import Image from "next/image";
import Link from "next/link";
import { events } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";
import { CalendarIcon } from "@/components/icons";

export default function OrganizerEventsPage() {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-3xl tracking-wide">Events</h1>
        <Link
          href="/organizer/events/new"
          className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-bg transition-[filter] duration-200 ease-out hover:brightness-95"
        >
          + New Event
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/organizer/events/${event.id}`}
            className="overflow-hidden rounded-2xl border border-border bg-panel hover:border-primary"
          >
            <div className="relative flex h-28 items-start justify-between p-4">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="relative flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium uppercase text-white backdrop-blur">
                <CalendarIcon className="h-3.5 w-3.5" />
                Future
              </span>
            </div>
            <div className="p-4">
              <p className="font-medium">{event.title}</p>
              <p className="mt-1 text-sm text-muted">{formatDateTime(event.date)}</p>
              <p className="text-sm text-muted">{event.venue}, {event.city}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
