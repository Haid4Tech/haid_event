import { notFound } from "next/navigation";
import Link from "next/link";
import { getEventBySlug } from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";

export default async function OrderConfirmationPage(
  props: PageProps<"/orders/[slug]">
) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const tierParams = searchParams.tier;
  const rawLines = Array.isArray(tierParams)
    ? tierParams
    : tierParams
      ? [tierParams]
      : [];

  const lines = rawLines.map((raw) => {
    const [name, qty, price] = raw.split(":");
    return { name, qty: Number(qty), price: Number(price) };
  });

  const refParam = searchParams.ref;
  const ref = typeof refParam === "string" ? refParam : undefined;

  const promoParam = searchParams.promo;
  const [promoCode, promoDiscount] = typeof promoParam === "string"
    ? promoParam.split(":")
    : [undefined, undefined];
  const discount = Number(promoDiscount) || 0;

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const fees = Math.round(subtotal * 0.05);
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + fees + tax;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl tracking-wide">Your tickets are in the app</h1>
      <p className="mt-2 text-muted">
        A confirmation has been generated for {event.title}.
      </p>
      {ref && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-lilac">
          Booked via @{ref}&apos;s rep link — thanks for supporting them 🎉
        </p>
      )}

      <div className="mt-8 rounded-2xl border border-border bg-panel p-5">
        <div className="flex items-center justify-between">
          <p className="font-medium">{event.title}</p>
        </div>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          {lines.length === 0 && (
            <p className="text-muted">No line items — this is a preview confirmation.</p>
          )}
          {lines.map((l, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-muted">{l.qty}× {l.name}</span>
              <div className="flex items-center gap-3">
                <span>{formatMoney(l.price * l.qty)}</span>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium uppercase text-success">
                  Confirmed
                </span>
              </div>
            </div>
          ))}
          {lines.length > 0 && (
            <>
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount ({promoCode})</span>
                  <span>−{formatMoney(discount)}</span>
                </div>
              )}
              <div className="my-2 h-px bg-border" />
              <div className="flex justify-between text-muted"><span>Tax</span><span>{formatMoney(tax)}</span></div>
              <div className="flex justify-between text-muted"><span>Fees</span><span>{formatMoney(fees)}</span></div>
              <div className="my-2 h-px bg-border" />
              <div className="flex justify-between font-medium text-fg"><span>Total</span><span>{formatMoney(total)}</span></div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-bg-elevated p-5">
        <p className="font-medium">Download the Sonik app</p>
        <p className="mt-1 text-sm text-muted">
          Quickly find and explore events uniquely tailored to your tastes. Access your tickets without the hassle.
        </p>
      </div>

      <div className="mt-8 flex gap-3">
        <LinkButton href="/tickets">View My Tickets</LinkButton>
        <Link
          href="/events"
          className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm text-fg hover:bg-panel"
        >
          Discover more events
        </Link>
      </div>
    </div>
  );
}
