"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { LinkButton } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const baseLinks = [
  { href: "/events", label: "Discover Events" },
  { href: "/help", label: "Help Center" },
];

export function SiteHeader() {
  const { name, signOut } = useAuth();

  const navLinks = name
    ? [baseLinks[0], { href: "/tickets", label: "My Tickets" }, baseLinks[1]]
    : baseLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-fg">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/organizer/login"
            className="hidden text-sm font-medium text-lilac hover:text-fg sm:block"
          >
            I&apos;m an organizer
          </Link>
          {name ? (
            <>
              <span className="hidden text-sm text-muted sm:block">Hi, {name}</span>
              <button
                onClick={signOut}
                className="rounded-full border border-border px-4 py-2 text-sm text-fg hover:bg-panel"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <LinkButton href="/login" variant="outline" className="text-sm">
                Log In
              </LinkButton>
              <LinkButton href="/login" variant="cream" className="text-sm">
                Sign Up
              </LinkButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
