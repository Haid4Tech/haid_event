"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NewEventPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ponytail: mock create — data is static, so this just returns to the list.
    router.push("/organizer/events");
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-3xl tracking-wide">New Event</h1>
      <p className="mt-1 text-muted">Define the event structure, then publish when you&apos;re ready.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Event name</label>
          <input required className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted">Date</label>
            <input required type="date" className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted">Doors open</label>
            <input required type="time" className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Venue</label>
          <input required className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Description</label>
          <textarea rows={4} className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Music sample</label>
          <input
            type="file"
            accept="audio/*"
            className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm text-muted outline-none file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
          />
          <p className="text-xs text-muted">
            A short audio preview attendees can play from the event card before buying.
          </p>
        </div>
        <Button type="submit" className="mt-2 w-fit">Publish Event</Button>
      </form>
    </div>
  );
}
