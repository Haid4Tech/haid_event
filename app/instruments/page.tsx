import { createClient } from "@/lib/supabase/server";

export default async function InstrumentsPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl tracking-wide">Instruments</h1>
        <p className="mt-4 rounded-2xl border border-border bg-panel p-5 text-sm text-muted">
          Supabase isn&apos;t configured yet. Copy <code>.env.example</code> to{" "}
          <code>.env.local</code> and fill in <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> from your Supabase project&apos;s
          Settings &gt; API page.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: instruments, error } = await supabase.from("instruments").select();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl tracking-wide">Instruments</h1>
      {error ? (
        <p className="mt-4 rounded-2xl border border-border bg-panel p-5 text-sm text-red-400">
          {error.message}
        </p>
      ) : (
        <pre className="mt-4 overflow-x-auto rounded-2xl border border-border bg-panel p-5 text-sm text-fg">
          {JSON.stringify(instruments, null, 2)}
        </pre>
      )}
    </div>
  );
}
