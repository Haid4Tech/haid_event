import { redirect } from "next/navigation";
import { events, tickets } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { WalletTabs } from "./wallet-tabs";

export default async function TicketsPage() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");
  }

  const eventsById = Object.fromEntries(events.map((e) => [e.id, e]));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl tracking-wide">Ticket Wallet</h1>
      <p className="mt-2 text-muted">Every ticket you&apos;ve bought, in one place.</p>
      <div className="mt-8">
        <WalletTabs tickets={tickets} eventsById={eventsById} events={events} />
      </div>
    </div>
  );
}
