import Image from "next/image";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { LinkButton } from "@/components/ui/button";
import { eventCategories, events, getCategoryCover } from "@/lib/data";
import { formatDateTime } from "@/lib/utils";

const cities = [
  {
    name: "Medellín",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/El_Poblado_Medell%C3%ADn.jpg/1280px-El_Poblado_Medell%C3%ADn.jpg",
  },
  {
    name: "Bogotá",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Bogota%2C_Colombia_%2836668708290%29.jpg/1280px-Bogota%2C_Colombia_%2836668708290%29.jpg",
  },
  {
    name: "Brooklyn",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Brooklyn_skyline.jpg/1280px-Brooklyn_skyline.jpg",
  },
  {
    name: "New York",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1280px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg",
  },
];

export default function HomePage() {
  const upcoming = events.slice(0, 4);
  const categoryRows = eventCategories
    .map((category) => ({
      category,
      events: events.filter((e) => e.category === category).slice(0, 3),
    }))
    .filter((row) => row.events.length > 0);

  return (
    <div>
      <section className="relative isolate flex min-h-[640px] items-center overflow-hidden border-b border-border">
        <Image
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1920&auto=format&fit=crop"
          alt="Crowd at golden hour during a Sonik festival"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-lilac">
              Welcome to the age of Sonik
            </p>
            <h1 className="max-w-xl font-display text-5xl leading-[1.05] sm:text-6xl">
              Discover what&apos;s happening in your city
            </h1>
            <form
              action="/events"
              className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-white/20 bg-black/40 p-2 backdrop-blur-md"
            >
              <input
                name="q"
                placeholder="Search events, artists, venues..."
                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/50"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-hover"
              >
                Search
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
            <p className="font-display text-sm tracking-widest text-white/80">
              UPCOMING EVENTS
            </p>
            <div className="mt-3 flex flex-col divide-y divide-white/10">
              {upcoming.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <Image
                    src={event.image}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">{event.title}</p>
                    <p className="truncate text-xs text-white/50">
                      {formatDateTime(event.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="mb-6 font-display text-2xl tracking-wide">Popular Categories</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {eventCategories.map((category) => (
            <Link
              key={category}
              href={`/events?category=${encodeURIComponent(category)}`}
              className="group relative isolate flex h-40 w-56 shrink-0 items-end overflow-hidden rounded-xl border border-border p-4"
            >
              <Image
                src={getCategoryCover(category)}
                alt={category}
                fill
                sizes="224px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/45" />
              <span className="relative text-base font-medium text-white">{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {categoryRows.map(({ category, events: rowEvents }) => (
        <section key={category} className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl tracking-wide">{category}</h2>
            <Link
              href={`/events?category=${encodeURIComponent(category)}`}
              className="text-sm text-lilac hover:text-fg"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rowEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-border bg-panel p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="font-display text-3xl leading-tight tracking-wide sm:text-4xl">
              Make more than
              <br />
              just a ticket sale.
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              An all-in-one ticketing and marketing platform designed to make
              your events more profitable, more quickly. Trusted by
              organizers running everything from house nights to festivals.
            </p>
          </div>
          <LinkButton href="/organizer/login" variant="cream" className="shrink-0">
            Start selling for free
          </LinkButton>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="mb-6 font-display text-2xl tracking-wide">In your city</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/events?city=${encodeURIComponent(city.name)}`}
              className="group relative isolate flex h-32 items-end overflow-hidden rounded-xl border border-border p-4 hover:border-primary"
            >
              <Image
                src={city.image}
                alt={city.name}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/45" />
              <span className="relative font-display text-xl tracking-wide text-white">
                {city.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative isolate flex min-h-[480px] items-start overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1508973379184-7517410fb0bc?q=80&w=1920&auto=format&fit=crop"
          alt="Crowd at a live Sonik event"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
          <div className="max-w-md">
            <h2 className="font-display text-4xl leading-[1.05] tracking-wide sm:text-5xl">
              ATMOSPHERE
              <br />
              BEGINS <span className="text-peach">HERE</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              The most memorable events are never accidental. They are
              thoughtfully designed, carefully curated, and felt by every
              guest in the room.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
