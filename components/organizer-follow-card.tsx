"use client";

import { formatCompactNumber } from "@/lib/utils";
import { toggleFollow, useFollowedOrganizers } from "@/lib/follows-store";

export function OrganizerFollowCard({
  name,
  followers,
}: {
  name: string;
  followers: number;
}) {
  const following = useFollowedOrganizers().includes(name);
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-panel p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/20 font-display text-lg text-lilac">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium">{name}</p>
          <p className="text-sm text-muted">
            {formatCompactNumber(following ? followers + 1 : followers)} followers
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => toggleFollow(name)}
        className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium active:scale-[0.97] ${
          following
            ? "border-border bg-bg-elevated text-fg hover:bg-panel"
            : "border-transparent bg-primary text-white hover:bg-primary-hover"
        }`}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}
