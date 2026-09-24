"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRepStats } from "@/lib/rep-store";
import { formatCompactNumber, slugify } from "@/lib/utils";
import { ShareIcon } from "@/components/icons";

export function RepShareCard({ eventSlug }: { eventSlug: string }) {
  const { name } = useAuth();
  const [copied, setCopied] = useState(false);
  const ref = name ? slugify(name) : "";
  const stats = useRepStats(ref);

  if (!name) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-panel/60 p-4">
        <div className="flex items-center gap-3">
          <ShareIcon className="h-5 w-5 shrink-0 text-lilac" />
          <p className="text-sm text-muted">
            <Link href="/login" className="text-lilac hover:text-fg">
              Sign in
            </Link>{" "}
            to get your rep link and earn credit when friends buy through it.
          </p>
        </div>
      </div>
    );
  }

  const link =
    typeof window !== "undefined"
      ? `${window.location.origin}/events/${eventSlug}?ref=${ref}`
      : `/events/${eventSlug}?ref=${ref}`;

  function copyLink() {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-panel p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-fg">
        <ShareIcon className="h-5 w-5 shrink-0 text-lilac" />
        Share &amp; earn as a rep
      </div>
      <p className="text-sm text-muted">
        Share your link — every ticket sold through it counts toward your rep rewards.
      </p>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={link}
          className="w-full truncate rounded-full border border-border bg-bg-elevated px-4 py-2 text-xs text-muted outline-none"
        />
        <button
          type="button"
          onClick={copyLink}
          className="shrink-0 rounded-full border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover active:scale-[0.97]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {(stats.clicks > 0 || stats.sales > 0) && (
        <p className="text-xs text-muted">
          Your rep stats: {formatCompactNumber(stats.clicks)} clicks ·{" "}
          {formatCompactNumber(stats.sales)} tickets sold
        </p>
      )}
    </div>
  );
}
