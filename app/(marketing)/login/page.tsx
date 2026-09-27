"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { Button } from "@/components/ui/button";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [supabase] = useState(() => (isSupabaseConfigured() ? createClient() : null));
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!supabase) {
      setError("Supabase isn't configured yet — set up .env.local and restart the app.");
      return;
    }

    setLoading(true);

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name.trim() || "Guest" } },
      });
      setLoading(false);
      if (error) return setError(error.message);
      if (!data.session) return setPendingConfirmation(true);
      router.push("/tickets");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    router.push("/tickets");
    router.refresh();
  }

  if (pendingConfirmation) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl tracking-wide">Check your email</h1>
        <p className="mt-2 text-sm text-muted">
          We sent a confirmation link to {email}. Click it to activate your account, then log
          in below.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl tracking-wide">
        {mode === "login" ? "Log in to Sonik" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Sign in to view your ticket wallet and manage your orders.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        {mode === "signup" && (
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        )}
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          minLength={6}
          className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button type="submit" disabled={loading} className="mt-2 w-full">
          {loading ? "Please wait…" : mode === "login" ? "Log In" : "Sign Up"}
        </Button>
      </form>

      <button
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setError("");
        }}
        className="mt-4 text-sm text-lilac hover:text-fg"
      >
        {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </button>
    </div>
  );
}
