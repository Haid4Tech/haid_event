"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Event, Ticket } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { useFollowedOrganizers } from "@/lib/follows-store";
import { EventCard } from "@/components/event-card";

export function WalletTabs({
  tickets,
  eventsById,
  events,
}: {
  tickets: Ticket[];
  eventsById: Record<string, Event>;
  events: Event[];
}) {
  const [tab, setTab] = useState<"upcoming" | "completed" | "following">("upcoming");
  const following = useFollowedOrganizers();
  const filtered = tickets.filter((t) => t.status === tab);
  const followedEvents = events.filter((e) => following.includes(e.organizer));

  return (
    <div>
      <div className="inline-flex rounded-full border border-border bg-panel p-1">
        {(["upcoming", "completed", "following"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm capitalize transition-colors duration-200 ease-out ${
              tab === t ? "bg-primary text-white" : "text-muted hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "following" ? (
        <div className="mt-6">
          {followedEvents.length === 0 ? (
            <p className="text-muted">
              You&apos;re not following any organizers yet. Follow one from an event page to
              see their upcoming events here.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {followedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {filtered.length === 0 && (
            <p className="text-muted">No {tab} tickets yet.</p>
          )}
          {filtered.map((ticket) => {
            const event = eventsById[ticket.eventId];
            if (!event) return null;
            return (
              <Link
                key={ticket.id}
                href={`/tickets/${ticket.id}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-panel p-4 hover:border-primary"
              >
                <Image
                  src={event.image}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{event.title}</p>
                  <p className="text-sm text-muted">{formatDateTime(event.date)}</p>
                  <p className="text-xs text-muted">{ticket.tierName}</p>
                </div>
                <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium uppercase text-success">
                  Confirmed
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
