import { events, organizerStats, revenueByMonth } from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import { StatCard } from "@/components/organizer/stat-card";
import { RevenueChart } from "@/components/organizer/revenue-chart";

export default function FinancePage() {
  const totalPayout = events.reduce(
    (sum, e) => sum + e.tiers.reduce((s, t) => s + t.price * (t.capacity - t.available), 0),
    0
  );

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Finance</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Net income (YTD)" value={formatMoney(organizerStats.netIncome)} />
        <StatCard label="Pending payout" value={formatMoney(totalPayout)} />
        <StatCard label="Processing fees" value={formatMoney(Math.round(totalPayout * 0.029))} />
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-panel p-5">
        <h2 className="font-display text-lg tracking-wide">Revenue Growth</h2>
        <div className="mt-4">
          <RevenueChart data={revenueByMonth} />
        </div>
      </div>
    </div>
  );
}
