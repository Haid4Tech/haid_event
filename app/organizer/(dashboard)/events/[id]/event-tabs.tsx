"use client";

import { useState } from "react";
import type { Event, TeamMember } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { RevenueChart } from "@/components/organizer/revenue-chart";
import { revenueByMonth } from "@/lib/data";
import { SamplePlayButton } from "@/components/sample-play-button";

const tabs = ["Analytics", "Details", "Tickets", "Team"] as const;

export function EventTabs({ event, team }: { event: Event; team: TeamMember[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Analytics");

  return (
    <div>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2.5 text-sm ${
              tab === t ? "border-primary text-fg" : "border-transparent text-muted hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Analytics" && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-panel p-5">
                <p className="text-sm text-muted">Total tickets sold</p>
                <p className="mt-2 font-display text-2xl">
                  {event.tiers.reduce((s, t) => s + (t.capacity - t.available), 0)}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-panel p-5">
                <p className="text-sm text-muted">Net revenue</p>
                <p className="mt-2 font-display text-2xl">
                  {formatMoney(event.tiers.reduce((s, t) => s + t.price * (t.capacity - t.available), 0))}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-panel p-5">
                <p className="text-sm text-muted">Capacity</p>
                <p className="mt-2 font-display text-2xl">{event.attendeeCount}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-panel p-5">
              <h3 className="font-display text-lg tracking-wide">Revenue Growth</h3>
              <div className="mt-4">
                <RevenueChart data={revenueByMonth} />
              </div>
            </div>
          </div>
        )}

        {tab === "Details" && (
          <div className="max-w-2xl rounded-2xl border border-border bg-panel p-5 text-sm">
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-muted">Organizer</span><span>{event.organizer}</span>
            </div>
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-muted">Venue</span><span>{event.venue}</span>
            </div>
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-muted">Address</span><span>{event.address}</span>
            </div>
            <div className="flex justify-between border-b border-border py-2.5">
              <span className="text-muted">Doors</span><span>{event.doors}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-2.5">
              <span className="text-muted">Music sample</span>
              {event.sampleUrl ? (
                <div className="flex items-center gap-2">
                  <SamplePlayButton src={event.sampleUrl} className="h-7 w-7" />
                  <span className="text-fg">Preview track</span>
                </div>
              ) : (
                <span className="text-muted">Not uploaded</span>
              )}
            </div>
            <div className="py-2.5">
              <span className="text-muted">About</span>
              <p className="mt-1 text-fg">{event.about}</p>
            </div>
          </div>
        )}

        {tab === "Tickets" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{event.tiers.length} Ticket Tiers</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-border bg-panel">
              <table className="w-full text-left text-sm">
                <thead className="text-muted">
                  <tr>
                    <th className="px-4 py-3 font-normal">Tier</th>
                    <th className="px-4 py-3 font-normal">Status</th>
                    <th className="px-4 py-3 font-normal">Available</th>
                    <th className="px-4 py-3 font-normal">Price</th>
                    <th className="px-4 py-3 font-normal">Scanned</th>
                  </tr>
                </thead>
                <tbody>
                  {event.tiers.map((tier) => (
                    <tr key={tier.id} className="border-t border-border">
                      <td className="px-4 py-3">{tier.name}</td>
                      <td className="px-4 py-3 text-muted">On Sale</td>
                      <td className="px-4 py-3">{tier.available}/{tier.capacity}</td>
                      <td className="px-4 py-3">{formatMoney(tier.price)}</td>
                      <td className="px-4 py-3">{tier.scanned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "Team" && (
          <div className="flex flex-col gap-3">
            {team.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-xl border border-border bg-panel p-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/40" />
                  <div>
                    <p className="text-sm">{member.name}</p>
                    <p className="text-xs text-muted">{member.email}</p>
                  </div>
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs uppercase text-muted">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
