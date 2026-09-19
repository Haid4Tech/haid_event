export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-panel p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl tracking-wide">{value}</p>
    </div>
  );
}
