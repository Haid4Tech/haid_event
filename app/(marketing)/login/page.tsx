"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ponytail: mock auth — any name/email routes straight into a signed-in session.
    signIn(name.trim() || "Guest");
    router.push("/tickets");
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
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
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
  );
}
