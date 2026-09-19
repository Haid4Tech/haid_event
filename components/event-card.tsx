import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { SonikMark } from "@/components/sonik-mark";
import { CalendarIcon, DotsIcon, PinIcon } from "@/components/icons";
import { SamplePlayButton } from "@/components/sample-play-button";

export function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative isolate flex aspect-[3/4] w-full flex-col overflow-hidden rounded-3xl border border-border transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <Image
        src={event.image}
        alt={event.title}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div className="relative flex items-center justify-between p-3">
        <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          <CalendarIcon className="h-3.5 w-3.5" />
          Future
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur">
          <DotsIcon className="h-4 w-4" />
        </span>
      </div>

      <div className="relative mt-auto flex flex-col">
        <div className="flex items-center justify-between px-4 pb-2">
          <SonikMark className="pointer-events-none h-8 w-8 text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          {event.sampleUrl && <SamplePlayButton src={event.sampleUrl} />}
        </div>

        <div className="flex flex-col gap-1.5 bg-black/55 p-4 text-white backdrop-blur-sm">
          <p className="truncate font-medium leading-snug">{event.title}</p>
          <p className="flex items-center gap-1.5 text-xs text-white/70">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
            {formatDateTime(event.date)}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/70">
            <PinIcon className="h-3.5 w-3.5 shrink-0" />
            {event.venue}, {event.city}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex -space-x-2">
              {event.attendees.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full border-2 border-black/40 object-cover"
                />
              ))}
            </div>
            <span className="text-xs text-white/70">+{Math.max(event.attendeeCount - event.attendees.length, 0)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
