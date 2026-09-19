import { Suspense } from "react";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { eventCategories, events } from "@/lib/data";
import { SortSelect } from "./sort-select";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; city?: string; category?: string; sort?: string }>;
}) {
  const { q, city, category, sort } = await searchParams;

  const filtered = events.filter((event) => {
    const matchesQuery = q
      ? `${event.title} ${event.organizer} ${event.lineup.join(" ")}`
          .toLowerCase()
          .includes(q.toLowerCase())
      : true;
    const matchesCity = city ? event.city === city : true;
    const matchesCategory = category ? event.category === category : true;
    return matchesQuery && matchesCity && matchesCategory;
  });

  if (sort === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else {
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  const cities = Array.from(new Set(events.map((e) => e.city)));

  function withParams(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const next = { q, city, category, sort, ...overrides };
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
    }
    const qs = params.toString();
    return qs ? `/events?${qs}` : "/events";
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">Discover Events</h1>
      <p className="mt-2 text-muted">
        {filtered.length} event{filtered.length === 1 ? "" : "s"}
        {city ? ` in ${city}` : ""}
        {category ? ` in ${category}` : ""}
        {q ? ` matching "${q}"` : ""}
      </p>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
        <Link
          href={withParams({ category: undefined })}
          className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm ${
            !category ? "border-primary text-fg" : "border-transparent text-muted hover:text-fg"
          }`}
        >
          All Events
        </Link>
        {eventCategories.map((c) => (
          <Link
            key={c}
            href={withParams({ category: c })}
            className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm ${
              category === c ? "border-primary text-fg" : "border-transparent text-muted hover:text-fg"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Link
            href={withParams({ city: undefined })}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              !city ? "border-primary bg-primary/15 text-lilac" : "border-border text-muted hover:text-fg"
            }`}
          >
            All cities
          </Link>
          {cities.map((c) => (
            <Link
              key={c}
              href={withParams({ city: c })}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                city === c ? "border-primary bg-primary/15 text-lilac" : "border-border text-muted hover:text-fg"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
        <Suspense fallback={null}>
          <SortSelect />
        </Suspense>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-muted">No events found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}
