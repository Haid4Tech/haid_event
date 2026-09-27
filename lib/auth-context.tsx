"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

type AuthState = {
  user: User | null;
  name: string | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

function displayName(user: User | null): string | null {
  if (!user) return null;
  const fullName = user.user_metadata?.full_name as string | undefined;
  return fullName || user.email?.split("@")[0] || "Guest";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => (isSupabaseConfigured() ? createClient() : null));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function signOut() {
    await supabase?.auth.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, name: displayName(user), signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
