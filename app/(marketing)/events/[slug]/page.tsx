import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventBySlug } from "@/lib/data";
import { formatDateTime, formatMoney } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";
import { SamplePlayButton } from "@/components/sample-play-button";
import { CalendarIcon, PinIcon, TagIcon } from "@/components/icons";
import { OrganizerFollowCard } from "@/components/organizer-follow-card";

export default async function EventDetailPage(props: PageProps<"/events/[slug]">) {
  const { slug } = await props.params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const fromPrice = Math.min(...event.tiers.map((t) => t.price));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr]">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
            priority
          />
          {event.sampleUrl && (
            <SamplePlayButton
              src={event.sampleUrl}
              className="absolute bottom-4 right-4 h-11 w-11"
            />
          )}
        </div>

        <div>
          <p className="text-sm text-muted">{event.organizer}</p>
          <h1 className="mt-1 font-display text-4xl leading-tight tracking-wide sm:text-5xl">
            {event.title}
          </h1>

          <div className="mt-5 flex flex-col gap-2.5 text-sm">
            <p className="flex items-center gap-2.5 text-fg">
              <CalendarIcon className="h-4 w-4 shrink-0 text-lilac" />
              {formatDateTime(event.date)} · Doors {event.doors}
            </p>
            <p className="flex items-center gap-2.5 text-fg">
              <PinIcon className="h-4 w-4 shrink-0 text-lilac" />
              {event.venue}, {event.city}
            </p>
            <p className="flex items-center gap-2.5 text-fg">
              <TagIcon className="h-4 w-4 shrink-0 text-lilac" />
              From {formatMoney(fromPrice)}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <LinkButton href={`/events/${event.slug}/checkout`}>Buy Now</LinkButton>
          </div>

          <div className="mt-8 max-w-md">
            <OrganizerFollowCard name={event.organizer} followers={event.organizerFollowers} />
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl tracking-wide">Lineup</h2>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg">
              {event.lineup.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10 max-w-2xl">
            <h2 className="font-display text-xl tracking-wide">About</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{event.about}</p>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl tracking-wide">Venue information</h2>
            <p className="mt-3 text-sm text-muted">{event.address}</p>
          </div>

          <Link
            href={`/events/${event.slug}/checkout`}
            className="mt-10 inline-block text-sm text-lilac hover:text-fg"
          >
            See ticket tiers →
          </Link>
        </div>
      </div>
    </div>
  );
}
