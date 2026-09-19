import { team } from "@/lib/data";

export default function TeamPage() {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-3xl tracking-wide">Team</h1>
        <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover">
          + Invite Member
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {team.map((member) => (
          <div key={member.id} className="flex items-center justify-between rounded-xl border border-border bg-panel p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/40" />
              <div>
                <p className="text-sm">{member.name}</p>
                <p className="text-xs text-muted">{member.email}</p>
              </div>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs uppercase text-muted">
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
