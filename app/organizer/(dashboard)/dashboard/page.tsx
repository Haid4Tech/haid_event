import Link from "next/link";
import { events, organizerStats, revenueByMonth } from "@/lib/data";
import { formatDateTime, formatMoney } from "@/lib/utils";
import { StatCard } from "@/components/organizer/stat-card";
import { RevenueChart } from "@/components/organizer/revenue-chart";

export default function OrganizerDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Dashboard</h1>
      <p className="mt-1 text-muted">Track your analytics. Stay up to date on all your events.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total tickets sold" value={organizerStats.totalTicketsSold.toLocaleString()} />
        <StatCard label="Page views" value={organizerStats.pageViews.toLocaleString()} />
        <StatCard label="Net income" value={formatMoney(organizerStats.netIncome)} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-panel p-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg tracking-wide">Revenue Growth</h2>
          <span className="font-display text-xl">{formatMoney(organizerStats.netIncome)}</span>
        </div>
        <div className="mt-4">
          <RevenueChart data={revenueByMonth} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-panel p-5">
          <p className="text-sm text-muted">Gender ratio</p>
          <p className="mt-2 font-display text-2xl">{organizerStats.genderRatio.female}% Female</p>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-5">
          <p className="text-sm text-muted">New vs. returning</p>
          <p className="mt-2 font-display text-2xl">{organizerStats.newVsReturning.new} new accounts</p>
        </div>
      </div>

      <div className="mt-8 flex items-baseline justify-between">
        <h2 className="font-display text-lg tracking-wide">Upcoming events</h2>
        <Link href="/organizer/events" className="text-sm text-lilac hover:text-fg">View all →</Link>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {events.slice(0, 3).map((event) => (
          <Link
            key={event.id}
            href={`/organizer/events/${event.id}`}
            className="flex items-center justify-between rounded-xl border border-border bg-panel p-4 hover:border-primary"
          >
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted">{formatDateTime(event.date)} · {event.venue}, {event.city}</p>
            </div>
            <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium uppercase text-lilac">
              Future
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
