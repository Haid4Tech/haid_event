"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Event } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PROMO_CODES: Record<string, number> = {
  SONIK10: 0.1,
  FRIENDS: 0.15,
};

export function CheckoutForm({ event }: { event: Event }) {
  const router = useRouter();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  const lines = useMemo(
    () =>
      event.tiers
        .map((tier) => ({ tier, qty: qty[tier.id] ?? 0 }))
        .filter((line) => line.qty > 0),
    [event.tiers, qty]
  );

  const subtotal = lines.reduce((sum, l) => sum + l.tier.price * l.qty, 0);
  const discount = promo ? Math.round(subtotal * promo.discount) : 0;
  const fees = Math.round(subtotal * 0.05);
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + fees + tax;

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    const rate = PROMO_CODES[code];
    if (rate) {
      setPromo({ code, discount: rate });
      setPromoError("");
    } else {
      setPromo(null);
      setPromoError("That code isn't valid for this event.");
    }
  }

  function updateQty(tierId: string, delta: number) {
    setQty((prev) => ({
      ...prev,
      [tierId]: Math.max(0, (prev[tierId] ?? 0) + delta),
    }));
  }

  function handleBuy() {
    const params = new URLSearchParams();
    lines.forEach((l) => params.append("tier", `${l.tier.name}:${l.qty}:${l.tier.price}`));
    if (promo) params.set("promo", `${promo.code}:${discount}`);
    router.push(`/orders/${event.slug}?${params.toString()}`);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-4">
        {event.tiers.map((tier) => (
          <div
            key={tier.id}
            className="rounded-2xl border border-border bg-panel p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-fg">{tier.name}</p>
                <p className="mt-1 text-sm text-muted">{tier.description}</p>
                <p className="mt-2 text-xs text-muted">{tier.available} available</p>
              </div>
              <p className="whitespace-nowrap font-display text-xl">
                {formatMoney(tier.price)}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateQty(tier.id, -1)}
                className="h-8 w-8 rounded-full border border-border text-fg hover:bg-bg-elevated"
              >
                –
              </button>
              <span className="w-6 text-center">{qty[tier.id] ?? 0}</span>
              <button
                type="button"
                onClick={() => updateQty(tier.id, 1)}
                className="h-8 w-8 rounded-full border border-border text-fg hover:bg-bg-elevated"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-fit rounded-2xl border border-border bg-panel p-5">
        <h2 className="font-display text-lg tracking-wide">Order Summary</h2>

        <form onSubmit={applyPromo} className="mt-4 flex gap-2">
          <input
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Enter promo code"
            className="w-full rounded-full border border-border bg-bg-elevated px-4 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full border border-border px-4 py-2 text-sm text-fg hover:bg-bg-elevated"
          >
            Apply
          </button>
        </form>
        {promo && (
          <p className="mt-2 text-xs text-success">
            {promo.code} applied — {Math.round(promo.discount * 100)}% off.
          </p>
        )}
        {promoError && <p className="mt-2 text-xs text-red-400">{promoError}</p>}

        {lines.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Select a ticket tier to continue.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-2 text-sm">
            {lines.map((l) => (
              <div key={l.tier.id} className="flex justify-between">
                <span className="text-muted">{l.qty}× {l.tier.name}</span>
                <span>{formatMoney(l.tier.price * l.qty)}</span>
              </div>
            ))}
            {promo && (
              <div className="flex justify-between text-success">
                <span>Discount ({promo.code})</span>
                <span>−{formatMoney(discount)}</span>
              </div>
            )}
            <div className="my-2 h-px bg-border" />
            <div className="flex justify-between text-muted">
              <span>Fees</span>
              <span>{formatMoney(fees)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Tax</span>
              <span>{formatMoney(tax)}</span>
            </div>
            <div className="my-2 h-px bg-border" />
            <div className="flex justify-between font-medium text-fg">
              <span>Total</span>
              <span>{formatMoney(total)}</span>
            </div>
          </div>
        )}
        <Button
          className="mt-5 w-full"
          disabled={lines.length === 0}
          onClick={handleBuy}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
