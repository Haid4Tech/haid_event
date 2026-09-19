import { getEventById, orders } from "@/lib/data";
import { formatMoney } from "@/lib/utils";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Orders</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-panel">
        <table className="w-full text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="px-4 py-3 font-normal">Order</th>
              <th className="px-4 py-3 font-normal">Event</th>
              <th className="px-4 py-3 font-normal">Buyer</th>
              <th className="px-4 py-3 font-normal">Total</th>
              <th className="px-4 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const event = getEventById(order.eventId);
              const total =
                order.lines.reduce((s, l) => s + l.price * l.qty, 0) + order.tax + order.fees;
              return (
                <tr key={order.id} className="border-t border-border">
                  <td className="px-4 py-3">#{order.id.toUpperCase()}</td>
                  <td className="px-4 py-3">{event?.title}</td>
                  <td className="px-4 py-3 text-muted">{order.buyerName}</td>
                  <td className="px-4 py-3">{formatMoney(total)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium uppercase text-success">
                      {order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
