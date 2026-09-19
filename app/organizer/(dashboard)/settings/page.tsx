export default function SettingsPage() {
  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl tracking-wide">Settings</h1>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Workspace name</label>
          <input
            defaultValue="Nova Sound Collective"
            className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-muted">Support email</label>
          <input
            defaultValue="organizers@sonik.fm"
            className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <button className="w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover">
          Save changes
        </button>
      </div>
    </div>
  );
}
