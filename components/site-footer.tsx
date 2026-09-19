import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-8 pt-12 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex gap-16">
          <div>
            <p className="font-display text-sm tracking-wide text-fg">Links</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <Link href="/events" className="hover:text-fg">Discover Events</Link>
              <Link href="/tickets" className="hover:text-fg">My Tickets</Link>
              <Link href="/organizer/login" className="hover:text-fg">For Organizers</Link>
              <Link href="/scan" className="hover:text-fg">Staff Scanning</Link>
              <Link href="/help" className="hover:text-fg">Help Center</Link>
            </nav>
          </div>
          <div>
            <p className="font-display text-sm tracking-wide text-fg">Contacts</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <div>
                <p className="text-muted">Phone:</p>
                <p className="text-fg/80">(907) 746-3488</p>
              </div>
              <div>
                <p className="text-muted">Email:</p>
                <p className="text-fg/80">support@sonik.fm</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 sm:items-end">
          <Link
            href="/help"
            className="rounded-full border border-border px-5 py-2 text-sm text-fg hover:bg-fg hover:text-bg"
          >
            Contact us
          </Link>
          <p className="text-xs text-muted">
            Copyright © {new Date().getFullYear()} Sonik - All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="relative h-24 sm:h-36 md:h-64">
        <p className="absolute inset-x-0 top-0 select-none whitespace-nowrap text-center font-display leading-none text-fg [font-size:24vw]">
          SONIK
        </p>
      </div>
    </footer>
  );
}
