const notifications = [
  { id: "n1", text: "Ticket sales for Live in Concert: The Midnight Beats crossed 60%.", time: "2h ago" },
  { id: "n2", text: "James Brown purchased 3 tickets to NYLA — Release & Relay.", time: "5h ago" },
  { id: "n3", text: "Seth Murphy was added to your team as Doorman.", time: "1d ago" },
];

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">Notifications</h1>
      <div className="mt-6 flex flex-col gap-3">
        {notifications.map((n) => (
          <div key={n.id} className="rounded-xl border border-border bg-panel p-4 text-sm">
            <p>{n.text}</p>
            <p className="mt-1 text-xs text-muted">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
