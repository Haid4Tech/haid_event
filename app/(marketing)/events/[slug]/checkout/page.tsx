import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/data";
import { CheckoutForm } from "./checkout-form";

export default async function CheckoutPage(
  props: PageProps<"/events/[slug]/checkout">
) {
  const { slug } = await props.params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm text-muted">{event.venue}, {event.city}</p>
      <h1 className="mt-1 font-display text-3xl tracking-wide sm:text-4xl">
        {event.title}
      </h1>
      <div className="mt-8">
        <CheckoutForm event={event} />
      </div>
    </div>
  );
}
