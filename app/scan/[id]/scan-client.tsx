"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Event } from "@/lib/types";
import { tickets as allTickets } from "@/lib/data";

type ScanResult = { ok: boolean; message: string; ticketCode?: string } | null;

export function ScanClient({ event }: { event: Event }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ScanResult>(null);
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);

  const eventTickets = useMemo(
    () => allTickets.filter((t) => t.eventId === event.id),
    [event.id]
  );

  const scannedCounts = event.tiers.map((tier) => {
    const extra = scannedCodes.filter((c) =>
      eventTickets.find((t) => t.code === c && t.tierName === tier.name)
    ).length;
    return { tier, scanned: tier.scanned + extra };
  });

  function handleValidate(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    const ticket = eventTickets.find((t) => t.code.toUpperCase() === trimmed);

    if (!ticket) {
      setResult({ ok: false, message: "Ticket not found for this event." });
    } else if (scannedCodes.includes(ticket.code)) {
      setResult({ ok: false, message: "This ticket has already been scanned.", ticketCode: ticket.code });
    } else {
      setScannedCodes((prev) => [...prev, ticket.code]);
      setResult({ ok: true, message: `Valid entry — ${ticket.tierName}.`, ticketCode: ticket.code });
    }
    setCode("");
  }

  return (
    <div>
      <div className="rounded-2xl border border-dashed border-border bg-panel p-10 text-center">
        <p className="text-sm text-muted">Place code inside the box</p>
        <div className="mx-auto mt-4 h-40 w-40 rounded-xl border-2 border-primary/60" />
        <p className="mt-4 text-xs text-muted">
          Camera scanning isn&apos;t wired up in this preview — enter a ticket code below instead.
        </p>
      </div>

      <form onSubmit={handleValidate} className="mt-6 flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. SNK-NYLA-4821"
          className="w-full rounded-full border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Scan
        </button>
      </form>

      {result && (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm ${
            result.ok
              ? "border-success/40 bg-success/10 text-success"
              : "border-red-500/40 bg-red-500/10 text-red-400"
          }`}
        >
          {result.message}
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-display text-lg tracking-wide">{event.title}</h2>
        <div className="mt-4 flex flex-col gap-3">
          {scannedCounts.map(({ tier, scanned }) => {
            const pct = Math.min(100, Math.round((scanned / tier.capacity) * 100));
            return (
              <div key={tier.id} className="rounded-xl border border-border bg-panel p-4">
                <div className="flex justify-between text-sm">
                  <span>{tier.name}</span>
                  <span className="text-muted">{scanned}/{tier.capacity} scanned</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-bg-elevated">
                  <div
                    className="h-1.5 rounded-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link href="/scan" className="mt-8 inline-block text-sm text-muted hover:text-fg">
        ← Back to events
      </Link>
    </div>
  );
}
