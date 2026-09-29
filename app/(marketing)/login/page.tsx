"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { loginSchema, signUpSchema } from "@/lib/validation/auth";
import { Button } from "@/components/ui/button";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [supabase] = useState(() => (isSupabaseConfigured() ? createClient() : null));
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);

  function firstFieldErrors(error: { flatten(): { fieldErrors: Record<string, string[] | undefined> } }) {
    const flat = error.flatten().fieldErrors;
    return Object.fromEntries(
      Object.entries(flat)
        .filter(([, messages]) => messages?.length)
        .map(([field, messages]) => [field, messages![0]])
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (mode === "signup") {
      const result = signUpSchema.safeParse({ name, email, password });
      if (!result.success) {
        setFieldErrors(firstFieldErrors(result.error));
        return;
      }
      if (!supabase) {
        setError("Supabase isn't configured yet — set up .env.local and restart the app.");
        return;
      }
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
        options: { data: { full_name: result.data.name } },
      });
      setLoading(false);
      if (error) return setError(error.message);
      if (!data.session) return setPendingConfirmation(true);
      router.push("/tickets");
      router.refresh();
      return;
    }

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setFieldErrors(firstFieldErrors(result.error));
      return;
    }
    if (!supabase) {
      setError("Supabase isn't configured yet — set up .env.local and restart the app.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(result.data);
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

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-3">
        {mode === "signup" && (
          <div className="flex flex-col gap-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            {fieldErrors.name && <p className="text-xs text-red-400">{fieldErrors.name}</p>}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          {fieldErrors.email && <p className="text-xs text-red-400">{fieldErrors.email}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          {fieldErrors.password && <p className="text-xs text-red-400">{fieldErrors.password}</p>}
        </div>
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
