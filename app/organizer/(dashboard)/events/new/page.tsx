"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createEventSchema } from "@/lib/validation/event";

export default function NewEventPage() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = createEventSchema.safeParse({
      name: formData.get("name"),
      date: formData.get("date"),
      doors: formData.get("doors"),
      venue: formData.get("venue"),
      description: formData.get("description") || undefined,
    });

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      setFieldErrors(
        Object.fromEntries(
          Object.entries(flat)
            .filter(([, messages]) => messages?.length)
            .map(([field, messages]) => [field, messages![0]])
        )
      );
      return;
    }

    setFieldErrors({});
    // ponytail: mock create — data is static, so this just returns to the list.
    router.push("/organizer/events");
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-3xl tracking-wide">New Event</h1>
      <p className="mt-1 text-muted">Define the event structure, then publish when you&apos;re ready.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Event name</label>
          <input name="name" className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
          {fieldErrors.name && <p className="text-xs text-red-400">{fieldErrors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted">Date</label>
            <input name="date" type="date" className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
            {fieldErrors.date && <p className="text-xs text-red-400">{fieldErrors.date}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted">Doors open</label>
            <input name="doors" type="time" className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
            {fieldErrors.doors && <p className="text-xs text-red-400">{fieldErrors.doors}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Venue</label>
          <input name="venue" className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
          {fieldErrors.venue && <p className="text-xs text-red-400">{fieldErrors.venue}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Description</label>
          <textarea name="description" rows={4} className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary" />
          {fieldErrors.description && <p className="text-xs text-red-400">{fieldErrors.description}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Music sample</label>
          <input
            name="sample"
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
