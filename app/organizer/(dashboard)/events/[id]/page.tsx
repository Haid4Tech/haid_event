import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventById, team } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";
import { EventTabs } from "./event-tabs";

export default async function OrganizerEventDetailPage(
  props: PageProps<"/organizer/events/[id]">
) {
  const { id } = await props.params;
  const event = getEventById(id);
  if (!event) notFound();

  return (
    <div>
      <Link href="/organizer/events" className="text-sm text-muted hover:text-fg">← Events</Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-wide">{event.title}</h1>
          <p className="mt-1 text-muted">{formatDateTime(event.date)} · {event.venue}, {event.city}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/scan" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-panel">
            Scan Tickets
          </Link>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover">
            Send Tickets
          </button>
        </div>
      </div>

      <div className="mt-8">
        <EventTabs event={event} team={team} />
      </div>
    </div>
  );
}
