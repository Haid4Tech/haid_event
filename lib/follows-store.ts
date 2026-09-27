"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "sonik-follows";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? "";
}

function getServerSnapshot() {
  return "";
}

function notify() {
  for (const listener of listeners) listener();
}

function parse(raw: string): string[] {
  return raw ? raw.split("|") : [];
}

export function useFollowedOrganizers() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return parse(raw);
}

export function toggleFollow(name: string) {
  const current = parse(getSnapshot());
  const next = current.includes(name)
    ? current.filter((n) => n !== name)
    : [...current, name];
  localStorage.setItem(STORAGE_KEY, next.join("|"));
  notify();
}
