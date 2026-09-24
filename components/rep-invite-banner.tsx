"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { recordRepClick } from "@/lib/rep-store";

export function RepInviteBanner() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const recorded = useRef<string | null>(null);

  useEffect(() => {
    if (ref && recorded.current !== ref) {
      recorded.current = ref;
      recordRepClick(ref);
    }
  }, [ref]);

  if (!ref) return null;

  return (
    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-lilac">
      Invited by @{ref} 🎉
    </p>
  );
}
