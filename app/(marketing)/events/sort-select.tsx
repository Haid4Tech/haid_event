"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "date", label: "Date" },
  { value: "price", label: "Price: Low to High" },
];

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "date";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "date") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    router.push(`/events?${params.toString()}`);
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="rounded-full border border-border bg-panel px-4 py-1.5 text-sm text-fg outline-none focus:border-primary"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          Sort by {o.label}
        </option>
      ))}
    </select>
  );
}
