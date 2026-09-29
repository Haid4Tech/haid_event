import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export async function proxy(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return;
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
