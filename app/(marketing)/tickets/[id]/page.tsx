import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventById, tickets } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";
import { QrPattern } from "@/components/qr-pattern";

export default async function TicketDetailPage(props: PageProps<"/tickets/[id]">) {
  const { id } = await props.params;
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) notFound();
  const event = getEventById(ticket.eventId);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <Link href="/tickets" className="text-sm text-muted hover:text-fg">← Tickets</Link>

      <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-panel">
        <div className="relative flex h-32 items-end p-5">
          <Image src={event.image} alt="" fill sizes="448px" className="object-cover" />
          <span className="relative rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium uppercase text-white backdrop-blur">
            {ticket.status}
          </span>
        </div>
        <div className="p-6">
          <h1 className="font-display text-2xl tracking-wide">{event.title}</h1>
          <p className="mt-1 text-sm text-lilac">{formatDateTime(event.date)}</p>
          <p className="text-sm text-muted">{event.venue}, {event.city}</p>

          <div className="mt-6 flex justify-center">
            <QrPattern code={ticket.code} />
          </div>
          <p className="mt-3 text-center text-xs tracking-widest text-muted">{ticket.code}</p>

          <div className="mt-6 rounded-xl border border-border bg-bg-elevated p-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Ticket tier</span>
              <span className="text-fg">{ticket.tierName}</span>
            </div>
            <div className="mt-2 flex justify-between text-muted">
              <span>Doors open</span>
              <span className="text-fg">{event.doors}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
