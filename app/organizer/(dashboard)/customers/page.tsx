import { customers } from "@/lib/data";
import { formatMoney } from "@/lib/utils";

export default function CustomersPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Customers</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-panel">
        <table className="w-full text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="px-4 py-3 font-normal">Name</th>
              <th className="px-4 py-3 font-normal">Email</th>
              <th className="px-4 py-3 font-normal">Orders</th>
              <th className="px-4 py-3 font-normal">Total spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3 text-muted">{c.email}</td>
                <td className="px-4 py-3">{c.ordersCount}</td>
                <td className="px-4 py-3">{formatMoney(c.totalSpent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
