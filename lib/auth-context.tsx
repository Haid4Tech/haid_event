"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

const STORAGE_KEY = "sonik-customer-name";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

function notify() {
  for (const listener of listeners) listener();
}

type AuthState = {
  name: string | null;
  signIn: (name: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const name = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function signIn(name: string) {
    localStorage.setItem(STORAGE_KEY, name);
    notify();
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEY);
    notify();
  }

  return (
    <AuthContext.Provider value={{ name, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
