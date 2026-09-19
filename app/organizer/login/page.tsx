"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function OrganizerLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ponytail: mock auth — any credentials route straight into the dashboard.
    router.push("/organizer/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#241f3d,_#0a0912_65%)] px-4">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-panel p-8">
        <Link href="/" className="mb-6 block">
          <Logo />
        </Link>
        <h1 className="font-display text-2xl tracking-wide">
          {mode === "login" ? "Log in to your workspace" : "Create an organizer account"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Manage events, ticketing, and your team from the Sonik Organizer Portal.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          {mode === "signup" && (
            <input
              required
              placeholder="Organization name"
              className="rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          )}
          <input
            required
            type="email"
            placeholder="Email"
            className="rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <Button type="submit" className="mt-2 w-full">
            {mode === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 text-sm text-lilac hover:text-fg"
        >
          {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}
