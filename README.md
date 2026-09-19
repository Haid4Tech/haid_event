# Sonik

A connected event ecosystem — discover events, buy tickets, manage an
organization, and scan attendees in — built from the [Sonik Behance
concept](https://www.behance.net/gallery/254502087/Sonik-SaaS-ecosystem-for-event-organizators)
as a Next.js (App Router) site with Tailwind CSS v4.

All data (events, tickets, orders, team members, analytics) is static mock
data in [`lib/data.ts`](lib/data.ts) — there is no database or backend.
Sign-in for both the public site and the organizer portal is a mock flow
that accepts any credentials.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## What's here

**Promo website** (`app/(marketing)`) — the public site: home page with a
featured-event hero and category browsing, a discover/search page with
city, category and price/date sorting, event detail pages with a music
sample preview and organizer follow card, a ticket checkout flow with promo
codes, order confirmation, and a customer ticket wallet with QR-style
tickets.

**Organizer Portal** (`app/organizer`) — a dashboard shell (sidebar +
workspace) covering events, ticket tiers, analytics, customers, finance,
team, orders, and settings. Sign in at `/organizer/login`.

**Staff scanning** (`app/scan`) — a lightweight ticket-validation flow for
door staff: pick an event, then scan/enter a ticket code to check attendees
in against live per-tier counts.

## Project structure

```
app/
  (marketing)/     public site — home, events, checkout, tickets, login
  organizer/       organizer portal — dashboard, events, team, finance...
  scan/            staff check-in flow
components/        shared UI (event cards, buttons, icons, nav, etc.)
lib/
  types.ts         shared TypeScript types
  data.ts          mock events, tickets, orders, team, analytics
  auth-context.tsx mock customer sign-in state (localStorage-backed)
  utils.ts         formatting helpers
```

## Notes

- Ticket QR codes are a visual-only pattern generated from the ticket code
  (see the `ponytail:` comment in `components/qr-pattern.tsx`) — not a real
  scannable encoding.
- Music samples use [SoundHelix](https://www.soundhelix.com)'s freely
  licensed demo tracks as stand-ins for organizer-uploaded audio.
