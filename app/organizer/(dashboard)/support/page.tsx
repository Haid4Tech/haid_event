export default function SupportPage() {
  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl tracking-wide">Support</h1>
      <p className="mt-2 text-muted">
        Questions about payouts, ticketing configuration, or your account? Our organizer
        success team responds within one business day.
      </p>
      <a
        href="mailto:organizers@sonik.fm"
        className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
      >
        Email organizers@sonik.fm
      </a>
    </div>
  );
}
