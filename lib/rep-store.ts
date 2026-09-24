"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "sonik-rep-stats";
const listeners = new Set<() => void>();

type RepStats = Record<string, { clicks: number; sales: number }>;

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? "{}";
}

function getServerSnapshot() {
  return "{}";
}

function notify() {
  for (const listener of listeners) listener();
}

function read(): RepStats {
  try {
    return JSON.parse(getSnapshot());
  } catch {
    return {};
  }
}

function write(stats: RepStats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  notify();
}

export function recordRepClick(ref: string) {
  const stats = read();
  const entry = stats[ref] ?? { clicks: 0, sales: 0 };
  stats[ref] = { ...entry, clicks: entry.clicks + 1 };
  write(stats);
}

export function recordRepSale(ref: string, ticketCount: number) {
  const stats = read();
  const entry = stats[ref] ?? { clicks: 0, sales: 0 };
  stats[ref] = { ...entry, sales: entry.sales + ticketCount };
  write(stats);
}

export function useRepStats(ref: string) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const stats: RepStats = JSON.parse(raw);
  return stats[ref] ?? { clicks: 0, sales: 0 };
}
